import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR = [
  "a",
  "button",
  "[role='button']",
  "input",
  "textarea",
  "select",
  "label",
  "article",
  "img",
  ".hover-lift",
  "[data-cursor='interactive']",
].join(",");

function shouldEnableCursor() {
  if (typeof window === "undefined") return false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const widePointer = window.matchMedia(
    "(min-width: 992px) and (hover: hover) and (pointer: fine)",
  ).matches;
  const touchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  return widePointer && !touchDevice && !reducedMotion;
}

export function GlassWaterCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ripplesRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const updateEnabled = () => setEnabled(shouldEnableCursor());
    updateEnabled();

    const mediaQueries = [
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(min-width: 992px) and (hover: hover) and (pointer: fine)"),
    ];

    mediaQueries.forEach((query) => query.addEventListener("change", updateEnabled));
    window.addEventListener("resize", updateEnabled, { passive: true });

    return () => {
      mediaQueries.forEach((query) => query.removeEventListener("change", updateEnabled));
      window.removeEventListener("resize", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-glass-water-cursor");
      setHovering(false);
      if (animationRef.current != null) cancelAnimationFrame(animationRef.current);
      return;
    }

    document.documentElement.classList.add("has-glass-water-cursor");

    const onPointerMove = (event: PointerEvent) => {
      positionRef.current.targetX = event.clientX;
      positionRef.current.targetY = event.clientY;
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      setHovering(Boolean(target?.closest(HOVER_SELECTOR)));
    };

    const onPointerOut = (event: PointerEvent) => {
      const related = event.relatedTarget instanceof Element ? event.relatedTarget : null;
      setHovering(Boolean(related?.closest(HOVER_SELECTOR)));
    };

    const onPointerDown = (event: PointerEvent) => {
      const rippleHost = ripplesRef.current;
      if (!rippleHost) return;

      const ripple = document.createElement("span");
      ripple.className = "glass-water-ripple";
      ripple.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%) scale(0.18)`;
      rippleHost.appendChild(ripple);

      window.setTimeout(() => ripple.remove(), 560);
    };

    const animate = () => {
      const cursor = cursorRef.current;
      const position = positionRef.current;
      position.currentX += (position.targetX - position.currentX) * 0.18;
      position.currentY += (position.targetY - position.currentY) * 0.18;

      if (cursor) {
        cursor.style.transform = `translate3d(${position.currentX}px, ${position.currentY}px, 0) translate(-50%, -50%)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove("has-glass-water-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("pointerdown", onPointerDown);
      if (animationRef.current != null) cancelAnimationFrame(animationRef.current);
      ripplesRef.current?.replaceChildren();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`glass-water-cursor${hovering ? " is-hovering" : ""}`}
        aria-hidden="true"
      />
      <div ref={ripplesRef} className="glass-water-ripple-layer" aria-hidden="true" />
    </>
  );
}
