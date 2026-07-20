import { useEffect, useRef, useState } from "react";
import {
  Droplets,
  Menu,
  X,
  Phone,
  MessageCircle,
  ShieldCheck,
  Truck,
  Sparkles,
  Award,
  Headphones,
  Wallet,
  ChevronDown,
  Mail,
  MapPin,
  Clock,
  Star,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mountain,
  Filter,
  Beaker,
  Sun,
  Wind,
  FlaskConical,
  Package,
  Send,
} from "lucide-react";

import heroBottle from "@/assets/hero-bottle.jpg";
import oxyalphaProduct from "@/assets/oxyalpha-product.png";
import mountainSpring from "@/assets/mountain-spring.jpg";
import plant from "@/assets/plant.jpg";
import jar20l from "@/assets/jar-20l.jpg";
import family from "@/assets/family.jpg";
import splash from "@/assets/splash.jpg";
import delivery from "@/assets/delivery.jpg";
import oxyalphaLogo from "@/assets/oxyalpha_logo.png";
import whatsappIcon from "@/assets/whatsapp_icon.png";
import { GlassWaterCursor } from "@/components/GlassWaterCursor";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Why Us", href: "#why" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  useReveal();
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <style>{`
        [data-reveal]{opacity:0;transform:translateY(24px);transition:opacity .9s cubic-bezier(.22,1,.36,1),transform .9s cubic-bezier(.22,1,.36,1)}
        [data-reveal="left"]{transform:translateX(-24px)}
        [data-reveal="right"]{transform:translateX(24px)}
        [data-reveal].is-visible{opacity:1;transform:none}
      `}</style>
      <Nav />
      <main id="home">
        <Hero />
        <About />
        <Process />
        <WhyUs />
        <Stats />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <GlassWaterCursor />
    </div>
  );
}

/* ---------- Navigation ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 max-w-full transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div
          className={`glass flex items-center justify-between rounded-xl px-3 py-2.5 transition-all sm:rounded-2xl sm:px-4 sm:py-3 ${
            scrolled ? "soft-shadow" : ""
          }`}
        >
          <a href="#home" className="flex items-center">
            <img
              src={oxyalphaLogo}
              alt="OxyAlpha"
              className="h-9 w-auto shrink-0 object-contain sm:h-12 lg:h-14"
            />
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => setEnquiryOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:scale-[1.03]"
            >
              <Send className="h-4 w-4" /> Enquire Now
            </button>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl p-2 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div className="glass mt-2 max-h-[calc(100vh-5.5rem)] overflow-y-auto rounded-xl p-3 lg:hidden">
            <div className="flex flex-col gap-1">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary"
                >
                  {n.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setEnquiryOpen(true);
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                <Send className="h-4 w-4" /> Enquire Now
              </button>
            </div>
          </div>
        )}
      </div>
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </header>
  );
}

function EnquiryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] overflow-y-auto bg-primary/45 p-3 backdrop-blur-sm sm:grid sm:place-items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative my-3 grid min-h-0 w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl sm:my-0 sm:max-h-[92vh] lg:grid-cols-[0.92fr_1fr]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close enquiry form"
          className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl ring-2 ring-white/90 transition hover:scale-105"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="relative hidden min-h-[520px] overflow-hidden lg:block">
          <img
            src={delivery}
            alt="Oxyalpha packaged drinking water delivery"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
              Oxyalpha
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight">
              Pure water delivered with care.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Share your requirement and our team will get back to you shortly.
            </p>
          </div>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
            setTimeout(() => {
              setSent(false);
              onClose();
            }, 1800);
            (event.currentTarget as HTMLFormElement).reset();
          }}
          className="p-6 pb-8 sm:overflow-y-auto sm:p-8 lg:p-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[oklch(0.7_0.15_220)]">
            Enquiry
          </p>
          <h2 id="enquiry-title" className="mt-3 font-display text-3xl text-primary">
            Enquire Now
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/65">
            Fill in your details and we will contact you for orders, subscriptions, or bulk supply.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" name="name" placeholder="Your name" />
            <Field label="Mail ID" name="email" type="email" placeholder="you@email.com" />
            <Field
              label="Phone Number"
              name="phone"
              placeholder="9545692550"
              className="sm:col-span-2"
            />
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                required
                maxLength={800}
                placeholder="Tell us your requirement"
                className="mt-2 w-full resize-none rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="submit"
              className="hover-lift inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground soft-shadow sm:w-auto"
            >
              <Send className="h-4 w-4" /> Submit Enquiry
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-border px-6 py-3 text-sm font-medium text-primary hover:bg-secondary sm:w-auto"
            >
              Cancel
            </button>
            {sent && (
              <span className="text-sm text-[oklch(0.55_0.14_155)]">
                Thanks, we will contact you shortly.
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="gradient-hero relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28">
      <div
        aria-hidden
        className="absolute -top-20 -right-32 h-72 w-72 rounded-full bg-[oklch(0.85_0.1_220)] opacity-30 blur-3xl sm:-top-24 sm:-right-24 sm:h-96 sm:w-96"
      />
      <div
        aria-hidden
        className="absolute bottom-0 -left-32 h-72 w-72 rounded-full bg-[oklch(0.9_0.08_200)] opacity-40 blur-3xl sm:-left-24 sm:h-96 sm:w-96"
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-4">
        <div className="relative z-20" data-reveal>
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-3 py-1.5 text-[11px] font-medium text-primary sm:px-4 sm:text-xs">
            <Sparkles className="h-3.5 w-3.5" /> Certified Pure • ISO 22000
          </span>
          <h1 className="mt-5 font-display text-[2.35rem] leading-[1.04] text-primary sm:text-5xl lg:text-6xl">
            Pure Drinking Water
            <br />
            Delivered To Your <span className="text-gradient">Doorstep</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-foreground/70 sm:text-lg sm:leading-relaxed">
            Sourced from pristine springs, refined through 9-stage RO+UV purification, and delivered
            fresh — Oxyalpha keeps every sip crystal-clear, safe, and effortlessly premium.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
            <a
              href="tel:9545692550"
              className="hover-lift relative z-20 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-3 py-3 text-xs font-medium text-primary-foreground soft-shadow sm:px-6 sm:py-3.5 sm:text-sm"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a
              href="https://wa.me/919545692550"
              target="_blank"
              rel="noreferrer"
              className="hover-lift inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[oklch(0.62_0.14_155)] px-3 py-3 text-xs font-medium text-white sm:px-6 sm:py-3.5 sm:text-sm"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
          <div className="mt-9 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
            {[
              { k: "25K+", v: "Homes served" },
              { k: "9-Stage", v: "RO + UV filter" },
              { k: "24/7", v: "Fast delivery" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-xl text-primary sm:text-2xl">{s.k}</div>
                <div className="text-[10px] uppercase tracking-[0.12em] text-foreground/50 sm:text-xs sm:tracking-widest">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative" data-reveal="right">
          <div className="absolute inset-0 -z-10 mx-auto h-80 w-80 rounded-full bg-gradient-to-br from-[oklch(0.9_0.08_220)] to-white blur-2xl sm:h-[520px] sm:w-[520px]" />
          <div className="relative mx-auto flex items-center justify-center">
            <img
              src={oxyalphaProduct}
              width={1024}
              height={1024}
              alt="Oxyalpha packaged drinking water bottle with fresh water splash"
              className="animate-float relative z-10 mx-auto aspect-square max-h-[360px] w-full max-w-[360px] rounded-[2rem] object-cover drop-shadow-[0_30px_50px_rgba(15,76,129,0.25)] sm:max-h-[560px] sm:max-w-[560px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 lg:grid-cols-2">
        <div data-reveal="left" className="relative">
          <div className="overflow-hidden rounded-3xl soft-shadow">
            <img
              src={mountainSpring}
              alt="Natural mountain spring water source"
              width={1600}
              height={900}
              loading="lazy"
              className="h-[420px] w-full object-cover"
            />
          </div>
        </div>
        <div data-reveal="right">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[oklch(0.7_0.15_220)]">
            About Oxyalpha
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-primary sm:text-4xl lg:text-5xl">
            Crafting purity, one bottle at a time.
          </h2>
          <p className="mt-5 leading-relaxed text-foreground/70">
            Oxyalpha, powered by Sarika Food's & Beverages Private Limited, has redefined what
            packaged drinking water should feel like. From sourcing to sealing, every stage is
            engineered with obsessive care to deliver water that's not just safe — but genuinely
            refreshing.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {[
              {
                t: "Our Mission",
                d: "Deliver reliably pure drinking water to every household and workspace.",
              },
              {
                t: "Our Vision",
                d: "A world where clean, premium hydration is a right, not a luxury.",
              },
              {
                t: "Our Promise",
                d: "Uncompromising quality tested at 30+ checkpoints before dispatch.",
              },
              {
                t: "Our Craft",
                d: "Sustainable packaging and cold-chain delivery, every single day.",
              },
            ].map((v) => (
              <div key={v.t} className="rounded-2xl border border-border bg-white p-5 hover-lift">
                <div className="font-display text-lg text-primary">{v.t}</div>
                <p className="mt-1 text-sm text-foreground/65">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
function Process() {
  const steps = [
    { icon: Mountain, t: "Water Source", d: "Sourced from protected springs" },
    { icon: Filter, t: "Multi-stage Filtration", d: "Sediment & carbon layers" },
    { icon: Beaker, t: "RO Purification", d: "Reverse osmosis membrane" },
    { icon: Sun, t: "UV Treatment", d: "Ultra-violet sterilization" },
    { icon: Wind, t: "Ozonization", d: "Ozone-enriched freshness" },
    { icon: FlaskConical, t: "Quality Testing", d: "Lab-tested 30+ params" },
    { icon: Package, t: "Packaging", d: "Hygienic sealed packaging" },
    { icon: Truck, t: "Delivery", d: "Same-day doorstep dispatch" },
  ];
  return (
    <section id="process" className="py-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[oklch(0.7_0.15_220)]">
            Purification Journey
          </span>
          <h2 className="mt-3 font-display text-3xl text-primary sm:text-4xl lg:text-5xl">
            8 stages. One promise: purity.
          </h2>
        </div>
        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-primary/30 via-[oklch(0.79_0.14_220)]/40 to-primary/10 md:left-1/2 md:block" />
          <div className="grid gap-6 md:grid-cols-2 md:gap-y-10">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const left = i % 2 === 0;
              return (
                <div
                  key={s.t}
                  data-reveal={left ? "left" : "right"}
                  className={`relative flex ${left ? "md:justify-end md:pr-12" : "md:col-start-2 md:pl-12"}`}
                >
                  <div className="w-full max-w-md rounded-2xl border border-border bg-white p-5 hover-lift">
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.5_0.14_230)] text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold uppercase tracking-widest text-[oklch(0.7_0.15_220)]">
                          Stage {String(i + 1).padStart(2, "0")}
                        </div>
                        <h3 className="mt-0.5 font-display text-lg text-primary">{s.t}</h3>
                        <p className="mt-1 text-sm text-foreground/60">{s.d}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why choose us ---------- */
function WhyUs() {
  const items = [
    { icon: Droplets, t: "100% Pure Water", d: "Zero contaminants, zero compromise." },
    { icon: Beaker, t: "Advanced RO Technology", d: "State-of-the-art purification systems." },
    { icon: Truck, t: "Fast Delivery", d: "Doorstep delivery within hours." },
    { icon: Wallet, t: "Affordable Pricing", d: "Premium quality at a fair price." },
    { icon: Award, t: "Certified Quality", d: "ISO, FSSAI, BIS approved." },
    { icon: Headphones, t: "24×7 Support", d: "Always here when you need us." },
  ];
  return (
    <section id="why" className="relative overflow-hidden bg-primary py-24 text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${splash})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "screen",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[oklch(0.35_0.12_250)]/90"
      />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[oklch(0.85_0.14_220)]">
            Why Choose Oxyalpha
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">
            Trusted for what matters most — you.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <div
                key={it.t}
                data-reveal
                style={{ transitionDelay: `${i * 60}ms` }}
                className="hover-lift group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-[oklch(0.9_0.13_220)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl">{it.t}</h3>
                <p className="mt-2 text-sm text-white/70">{it.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
function useCounter(end: number, active: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, active, duration]);
  return val;
}

function StatItem({ end, suffix, label }: { end: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setActive(true), {
      threshold: 0.4,
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const val = useCounter(end, active);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl text-primary sm:text-5xl">
        {val.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-foreground/50">{label}</div>
    </div>
  );
}

function Stats() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-border bg-white p-8 sm:p-12 soft-shadow">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatItem end={25000} suffix="+" label="Happy Customers" />
            <StatItem end={15} suffix=" yrs" label="Years Experience" />
            <StatItem end={1200} suffix="+" label="Daily Deliveries" />
            <StatItem end={5} suffix="M+" label="Bottles Delivered" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Gallery ---------- */
function Gallery() {
  const imgs = [
    { src: heroBottle, alt: "Oxyalpha premium bottle" },
    { src: plant, alt: "Water purification plant" },
    { src: family, alt: "Family enjoying Oxyalpha water" },
    { src: jar20l, alt: "20 litre water jar" },
    { src: delivery, alt: "Office water delivery" },
    { src: mountainSpring, alt: "Natural spring source" },
  ];
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="gallery" className="gradient-soft py-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[oklch(0.7_0.15_220)]">
            Gallery
          </span>
          <h2 className="mt-3 font-display text-3xl text-primary sm:text-4xl lg:text-5xl">
            A look inside Oxyalpha
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {imgs.map((im, i) => (
            <button
              key={im.src}
              data-reveal
              style={{ transitionDelay: `${i * 60}ms` }}
              onClick={() => setActive(i)}
              className={`hover-lift group relative overflow-hidden rounded-3xl border border-border bg-white ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <img
                src={im.src}
                alt={im.alt}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  i === 0 ? "aspect-square md:aspect-auto md:h-full" : "aspect-square"
                }`}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>
      {active !== null && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-6 backdrop-blur"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute right-6 top-6 rounded-full bg-white/10 p-2 text-white"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={imgs[active].src}
            alt={imgs[active].alt}
            className="max-h-[85vh] max-w-[92vw] rounded-2xl object-contain"
          />
        </div>
      )}
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const reviews = [
    {
      name: "Priya Sharma",
      role: "Homemaker",
      text: "Switched to Oxyalpha a year ago and never looked back. The taste and freshness are unmatched.",
      avatar: "https://i.pravatar.cc/120?img=47",
    },
    {
      name: "Rohan Mehta",
      role: "Office Manager",
      text: "They deliver on time, every time. Our whole office runs on Oxyalpha jars now.",
      avatar: "https://i.pravatar.cc/120?img=12",
    },
    {
      name: "Ananya Iyer",
      role: "Fitness Coach",
      text: "Clean water is non-negotiable for me. Oxyalpha feels light, pure and genuinely premium.",
      avatar: "https://i.pravatar.cc/120?img=32",
    },
    {
      name: "Vikram Nair",
      role: "Restaurant Owner",
      text: "Reliable bulk supply and impeccable quality. Our customers keep noticing the difference.",
      avatar: "https://i.pravatar.cc/120?img=15",
    },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % reviews.length), 4500);
    return () => clearInterval(t);
  }, [reviews.length]);
  return (
    <section id="reviews" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[oklch(0.7_0.15_220)]">
            Testimonials
          </span>
          <h2 className="mt-3 font-display text-3xl text-primary sm:text-4xl lg:text-5xl">
            Loved by families & workplaces
          </h2>
        </div>
        <div className="relative mt-14 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {reviews.map((r) => (
              <div key={r.name} className="w-full shrink-0 px-2">
                <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-white p-8 sm:p-10 soft-shadow">
                  <div className="flex gap-1 text-[oklch(0.82_0.16_85)]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 font-display text-xl leading-relaxed text-foreground/85 sm:text-2xl">
                    “{r.text}”
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="h-12 w-12 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-medium text-primary">{r.name}</div>
                      <div className="text-[10px] uppercase tracking-[0.12em] text-foreground/50 sm:text-xs sm:tracking-widest">
                        {r.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Show review ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-8 bg-primary" : "w-2 bg-primary/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const faqs = [
    {
      q: "How is Oxyalpha water purified?",
      a: "We use a proprietary 9-stage RO + UV + Ozonization process, ensuring every drop is safe, mineral-balanced, and delicious.",
    },
    {
      q: "How quickly can I get a delivery?",
      a: "Most orders are delivered the same day within our service zones. Bulk and scheduled subscriptions are also available.",
    },
    {
      q: "Are your bottles and jars safe?",
      a: "Yes. Our packaging is 100% BPA-free, food-grade, and sanitized before every refill cycle.",
    },
    {
      q: "Do you serve offices and restaurants?",
      a: "Absolutely. We offer flexible corporate plans, on-demand jars, and cold-chain bulk supply.",
    },
    {
      q: "Can I schedule a subscription?",
      a: "Yes — pick a frequency, we handle the rest. Modify, pause, or cancel anytime from a quick WhatsApp.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="gradient-soft py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center" data-reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[oklch(0.7_0.15_220)]">
            FAQ
          </span>
          <h2 className="mt-3 font-display text-3xl text-primary sm:text-4xl lg:text-5xl">
            Questions, answered
          </h2>
        </div>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                data-reveal
                className="rounded-2xl border border-border bg-white overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg text-primary">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary/70 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-foreground/70">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="grid gap-10 lg:grid-cols-2">
          <div data-reveal="left">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[oklch(0.7_0.15_220)]">
              Contact
            </span>
            <h2 className="mt-3 font-display text-3xl text-primary sm:text-4xl lg:text-5xl">
              Order fresh water. Talk to us.
            </h2>
            <p className="mt-4 max-w-md text-foreground/65">
              Reach out for orders, subscriptions, or bulk queries. We respond within minutes.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { i: Phone, t: "Call us", d: "9545692550 / 9511245473" },
                { i: Mail, t: "Email", d: "info@oxyalpha.com" },
                {
                  i: MapPin,
                  t: "Address",
                  d: "Gat No 270/2/2 Plot No 3,4 Nannaj Tal North Solapur 413222",
                },
                { i: Clock, t: "Hours", d: "Mon–Sun • 7 AM – 10 PM" },
              ].map((c) => {
                const Icon = c.i;
                return (
                  <div
                    key={c.t}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-foreground/50 sm:text-xs sm:tracking-widest">
                        {c.t}
                      </div>
                      <div className="break-words text-sm font-medium text-primary">{c.d}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 overflow-hidden rounded-3xl border border-border">
              <iframe
                title="Oxyalpha location"
                src="https://www.google.com/maps?q=Gat No 270/2/2 Plot No 3,4 Nannaj Tal North Solapur 413222&output=embed"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <form
            data-reveal="right"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 3500);
              (e.currentTarget as HTMLFormElement).reset();
            }}
            className="rounded-3xl border border-border bg-white p-6 sm:p-8 soft-shadow"
          >
            <h3 className="font-display text-xl text-primary sm:text-2xl">Send us a message</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" placeholder="Priya Sharma" />
              <Field label="Phone" name="phone" placeholder="9545692550" />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="you@email.com"
                className="sm:col-span-2"
              />
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  maxLength={800}
                  placeholder="Tell us how many jars or bottles you need…"
                  className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="hover-lift inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground soft-shadow sm:w-auto"
              >
                <Send className="h-4 w-4" /> Send message
              </button>
              <a
                href="https://wa.me/919545692550"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-border px-6 py-3 text-sm font-medium text-primary hover:bg-secondary"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              {sent && (
                <span className="text-sm text-[oklch(0.55_0.14_155)]">
                  Thanks — we'll be in touch shortly.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required
        maxLength={120}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-[oklch(0.18_0.04_255)] pt-16 pb-8 text-white/80">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center">
              <img
                src={oxyalphaLogo}
                alt="OxyAlpha"
                className="h-12 w-auto shrink-0 object-contain sm:h-14"
              />
            </div>
            <p className="mt-4 text-sm text-white/60">
              Oxyalpha powered by Sarika Food's & Beverages Private Limited.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-[oklch(0.79_0.14_220)] hover:text-primary"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <FooterCol
            title="Quick Links"
            items={NAV.map((n) => ({ label: n.label, href: n.href }))}
          />{" "}
          <div>
            <h4 className="font-display text-lg text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4" /> 9545692550 / 9511245473
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4" /> info@oxyalpha.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> Gat No 270/2/2 Plot No 3,4 Nannaj Tal
                North Solapur 413222
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          � 2026 All Roghts Reserved By Oxyalpha
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-display text-lg text-white">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm text-white/60">
        {items.map((i) => (
          <li key={i.label}>
            <a href={i.href} className="transition hover:text-white">
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Floating actions ---------- */
function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
      <a
        href="tel:9545692550"
        aria-label="Call Oxyalpha"
        className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-110 sm:h-14 sm:w-14"
      >
        <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
      </a>
      <a
        href="https://wa.me/919545692550"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="animate-pulse-ring grid h-12 w-12 place-items-center rounded-full bg-white shadow-xl transition-transform hover:scale-110 sm:h-14 sm:w-14"
      >
        <img
          src={whatsappIcon}
          alt="WhatsApp"
          className="h-full w-full rounded-full object-contain"
        />
      </a>
    </div>
  );
}
