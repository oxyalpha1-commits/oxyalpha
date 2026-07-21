import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  ShieldCheck,
  Truck,
  Sparkles,
  Mail,
  MapPin,
  Clock,
  Star,
  Facebook,
  Instagram,
  Filter,
  Beaker,
  Package,
  Coffee,
  BriefcaseBusiness,
  Gift,
  Tags,
  Send,
} from "lucide-react";

import oxyalphaProduct from "@/assets/oxyalpha-product.png";
import mountainSpring from "@/assets/mountain-spring.jpg";
import bottle500 from "@/assets/bottle-500.jpg";
import bottle1l from "@/assets/bottle-1l.jpg";
import bulkBottle from "@/assets/bulk.jpg";
import jar20l from "@/assets/jar-20l.jpg";
import oxyalphaLogo from "@/assets/oxyalpha_logo.png";
import whatsappIcon from "@/assets/whatsapp_icon.png";
import { GlassWaterCursor } from "@/components/GlassWaterCursor";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Service", href: "#process" },
  { label: "Products", href: "#products" },
  { label: "Testimonial", href: "#reviews" },
  { label: "Delivery", href: "#why" },
  { label: "Contact Us", href: "#contact" },
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
        [data-reveal]{opacity:0;transform:translateY(26px) scale(.985);transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1);will-change:opacity,transform}
        [data-reveal="left"]{transform:translateX(-24px)}
        [data-reveal="right"]{transform:translateX(24px)}
        [data-reveal].is-visible{opacity:1;transform:none}
      `}</style>
      <Nav />
      <main id="home">
        <Hero />
        <About />
        <Process />
        <PrivateLabelSolutions />
        <WhyUs />
        <Stats />
        <Products />
        <Testimonials />
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
              </button>{" "}
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
            src="/fast-delivery.jpg"
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
            <Field label="Full Name" name="name" />
            <Field label="Mail ID" name="email" type="email" />
            <Field label="Phone Number" name="phone" className="sm:col-span-2" />
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                required
                maxLength={800}
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
    <section className="gradient-hero animate-water-drift relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28">
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
              <div key={v.t} className="glass-card water-shine rounded-2xl p-5 hover-lift">
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

/* ---------- Services ---------- */
function Process() {
  const services = [
    {
      icon: Package,
      title: "Residential Waters",
      text: "Pure, safe drinking water tailored for every home.",
      position: "lg:col-start-1 lg:row-start-1",
    },
    {
      icon: Truck,
      title: "Commercial Waters",
      text: "Reliable water solutions for businesses of all sizes.",
      position: "lg:col-start-3 lg:row-start-1",
    },
    {
      icon: Filter,
      title: "Filtration Plants",
      text: "Advanced filtration systems for large-scale water purification.",
      position: "lg:col-start-1 lg:row-start-2",
    },
    {
      icon: Beaker,
      title: "Water Softening",
      text: "Efficient softening support for clean, balanced water quality.",
      position: "lg:col-start-3 lg:row-start-2",
    },
  ];

  return (
    <section
      id="process"
      className="animate-water-drift relative overflow-hidden bg-[oklch(0.97_0.018_235)] py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 bottom-0 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full border-[5rem] border-white/60"
      />
      <div
        aria-hidden="true"
        className="absolute left-[-8rem] bottom-8 hidden h-72 w-72 rounded-full bg-[oklch(0.79_0.14_220)]/12 blur-3xl md:block"
      />
      <div
        aria-hidden="true"
        className="absolute right-[-8rem] top-8 hidden h-80 w-80 rounded-full bg-primary/10 blur-3xl lg:block"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-6">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[oklch(0.7_0.15_220)]">
            Services
          </span>
          <h2 className="mt-3 font-display text-3xl text-primary sm:text-4xl lg:text-5xl">
            Water solutions for every space
          </h2>
        </div>

        <div className="relative mt-14 grid gap-6 lg:min-h-[590px] lg:grid-cols-[1fr_1.2fr_1fr] lg:grid-rows-2 lg:items-center lg:gap-x-10 lg:gap-y-20">
          <div
            data-reveal
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto hidden h-[590px] w-full max-w-[520px] lg:block"
          >
            <img
              src="/service-tab.png"
              alt="Oxyalpha service delivery illustration"
              loading="lazy"
              className="absolute inset-x-0 bottom-0 mx-auto h-full w-full object-contain object-bottom"
            />
          </div>

          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                data-reveal={index % 2 === 0 ? "left" : "right"}
                style={{ transitionDelay: `${index * 70}ms` }}
                className={`group relative z-20 glass-card water-shine rounded-2xl p-7 text-center transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,76,129,0.13)] lg:min-h-[190px] ${service.position}`}
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[oklch(0.79_0.14_220)]/10 text-[oklch(0.7_0.15_220)] transition duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-[oklch(0.22_0.06_255)]">
                  {service.title}
                </h3>
                <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-foreground/58">
                  {service.text}
                </p>
              </article>
            );
          })}

          <div data-reveal className="relative z-10 mx-auto w-full max-w-md lg:hidden">
            <img
              src="/service-tab.png"
              alt="Oxyalpha service delivery illustration"
              loading="lazy"
              className="aspect-[4/3] w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
/* ---------- Private Label Solutions ---------- */
function PrivateLabelSolutions() {
  const solutions = [
    {
      icon: Coffee,
      title: "Hospitality Branding",
      text: "Serve guests with custom-branded bottles that make your hotel, resort, or restaurant feel more memorable.",
    },
    {
      icon: BriefcaseBusiness,
      title: "Corporate Conferences",
      text: "Put your identity on every table with premium bottled water for meetings, expos, launches, and office events.",
    },
    {
      icon: Gift,
      title: "Celebration Giveaways",
      text: "Add a personal touch to weddings, receptions, and functions with elegant labels made for the occasion.",
    },
    {
      icon: Tags,
      title: "Retail Promotions",
      text: "Extend your brand into everyday hydration with bottles designed for campaigns, counters, and in-store sales.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <h2 className="font-display text-3xl text-primary sm:text-4xl lg:text-5xl">
            Customized Private Label Solutions
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/55">
            Build your own water bottle identity with premium packaged drinking water, thoughtful
            label design, and dependable supply for business, events, and retail needs.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <article
                key={solution.title}
                data-reveal
                style={{ transitionDelay: `${index * 70}ms` }}
                className="group relative px-4 text-center"
              >
                {index > 0 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-[-1rem] top-16 hidden h-24 w-px bg-gradient-to-b from-transparent via-border to-transparent lg:block"
                  />
                )}
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[oklch(0.79_0.14_220)]/10 text-[oklch(0.7_0.15_220)] transition duration-300 group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-9 w-9" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-[oklch(0.22_0.06_255)]">
                  {solution.title}
                </h3>
                <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-foreground/58">
                  {solution.text}
                </p>
              </article>
            );
          })}
        </div>

        <div
          className="mx-auto mt-16 max-w-3xl border-t border-border pt-14 text-center"
          data-reveal
        >
          <h2 className="font-display text-3xl text-primary sm:text-4xl">Bulk Supply Services</h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/55">
            We support institutions, campuses, commercial setups, and events with consistent bulk
            water supply, sealed packaging, and quality-focused delivery planning.
          </p>
        </div>
      </div>
    </section>
  );
}
/* ---------- Delivery Service ---------- */
function WhyUs() {
  const benefits = [
    {
      icon: Clock,
      title: "Delivery Within 2 Hours",
      text: "Quick dispatch for homes, offices, shops, and events.",
    },
    {
      icon: Truck,
      title: "Free Doorstep Delivery",
      text: "No extra delivery charge across active service areas.",
    },
    {
      icon: ShieldCheck,
      title: "Available 7 Days A Week",
      text: "Reliable supply support from morning to late evening.",
    },
  ];
  const coverage = [
    { icon: MapPin, value: "50 KM", label: "Delivery Radius" },
    { icon: Truck, value: "10+", label: "Delivery Partners" },
    { icon: ShieldCheck, value: "Pune, PCMC & Lonavala", label: "Coverage" },
  ];

  return (
    <section
      id="why"
      className="animate-water-drift relative overflow-hidden bg-[oklch(0.98_0.015_235)] py-24"
    >
      <div
        aria-hidden="true"
        className="absolute left-[-6rem] top-12 hidden h-64 w-64 rounded-full bg-[oklch(0.79_0.14_220)]/15 blur-3xl md:block"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-[-5rem] hidden h-72 w-72 rounded-full bg-primary/10 blur-3xl lg:block"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 600 80"
        className="absolute left-0 top-8 hidden h-20 w-full text-primary/5 lg:block"
        preserveAspectRatio="none"
      >
        <path
          d="M0 42c38 0 38-22 76-22s38 22 76 22 38-22 76-22 38 22 76 22 38-22 76-22 38 22 76 22 38-22 76-22 38 22 76 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-[1fr_0.92fr] md:px-6 lg:gap-16">
        <div data-reveal>
          <span className="inline-flex rounded-full border border-primary/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[oklch(0.7_0.15_220)] shadow-sm">
            Quick Water Delivery
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-3xl leading-tight text-primary sm:text-4xl lg:text-5xl">
            Fresh Water <span className="text-[oklch(0.7_0.15_220)]">Delivered</span> Right To Your{" "}
            <span className="text-[oklch(0.7_0.15_220)]">Doorstep</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/65">
            We provide fast and dependable water delivery across Pimpri-Chinchwad, Pune and Lonavala
            through our trusted delivery network.
          </p>

          <div className="mt-8 grid gap-4">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <article
                  key={benefit.title}
                  data-reveal
                  style={{ transitionDelay: `${i * 70}ms` }}
                  className="glass-card group flex items-start gap-4 rounded-2xl p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,76,129,0.12)]"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-primary">{benefit.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/60">
                      {benefit.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 glass-card rounded-2xl p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              {coverage.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-2xl bg-secondary p-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-semibold">{item.value}</span>
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-foreground/45">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div data-reveal="right" className="relative mx-auto w-full max-w-xl md:max-w-none">
          <div className="glass-card relative rounded-2xl p-4 sm:p-5">
            <div
              aria-hidden="true"
              className="absolute inset-6 rounded-full bg-[oklch(0.79_0.14_220)]/12"
            />
            <img
              src="/fast-delivery.jpg"
              alt="Fast packaged drinking water delivery service"
              loading="lazy"
              className="relative z-10 aspect-[4/3] w-full rounded-2xl object-cover"
            />
            <div className="motion-safe:animate-float absolute -left-2 top-10 z-30 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-[0_16px_35px_rgba(15,76,129,0.12)] backdrop-blur sm:-left-5">
              <div className="font-display text-2xl text-primary">2 Hr</div>
              <div className="text-xs uppercase tracking-[0.12em] text-foreground/50">Delivery</div>
            </div>
            <div className="motion-safe:animate-float absolute -bottom-5 right-4 z-30 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-[0_16px_35px_rgba(15,76,129,0.12)] backdrop-blur sm:right-8">
              <div className="font-display text-2xl text-primary">100%</div>
              <div className="text-xs uppercase tracking-[0.12em] text-foreground/50">Safe</div>
            </div>
          </div>
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
        <div className="glass-card water-shine rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatItem end={500} suffix="+" label="Happy Customers" />
            <StatItem end={2} suffix="+ yrs" label="Experience" />
            <StatItem end={12000} suffix="+" label="Daily Bottle Deliveries" />
            <StatItem end={5} suffix="M+" label="Bottles Delivered" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Products ---------- */
function Products() {
  const products = [
    { size: "200 ml", price: "5.00", image: bottle500, imageClass: "max-h-44" },
    { size: "500 ml", price: "10.00", image: bottle500, imageClass: "max-h-56" },
    { size: "1 Liter", price: "18.00", image: bottle1l, imageClass: "max-h-60" },
    { size: "2 Liter", price: "30.00", image: bottle1l, imageClass: "max-h-64" },
    { size: "5 Liter Jars", price: "60.00", image: bulkBottle, imageClass: "max-h-64" },
    { size: "20 Liter Jars", price: "40.00", image: jar20l, imageClass: "max-h-56" },
  ];

  return (
    <section id="products" className="animate-water-drift bg-[oklch(0.98_0.01_240)] py-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[oklch(0.7_0.15_220)]">
            Products
          </span>
          <h2 className="mt-3 font-display text-3xl text-primary sm:text-4xl lg:text-5xl">
            Packaged water for every need
          </h2>
        </div>
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <article
              key={product.size}
              data-reveal
              style={{ transitionDelay: `${i * 70}ms` }}
              className="glass-card water-shine group flex min-h-[430px] flex-col items-center justify-end px-8 py-8 text-center transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,76,129,0.12)]"
            >
              <div className="flex h-64 w-full items-end justify-center">
                <img
                  src={product.image}
                  alt={`${product.size} Oxyalpha mineral water bottle`}
                  loading="lazy"
                  className={`w-full object-contain drop-shadow-[0_18px_18px_rgba(15,23,42,0.12)] transition duration-500 group-hover:scale-105 ${product.imageClass}`}
                />
              </div>
              <svg
                aria-hidden="true"
                viewBox="0 0 280 18"
                className="mt-8 h-5 w-full max-w-[280px] text-border"
                preserveAspectRatio="none"
              >
                <path
                  d="M1 9c10 0 10-7 20-7s10 7 20 7 10-7 20-7 10 7 20 7 10-7 20-7 10 7 20 7 10-7 20-7 10 7 20 7 10-7 20-7 10 7 20 7 10-7 20-7 10 7 20 7 10-7 20-7 10 7 20 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <p className="mt-6 text-base text-foreground/50">{product.size}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-[oklch(0.22_0.06_255)]">
                Mineral Water Bottle
              </h3>
              <p className="mt-6 text-xl font-semibold text-[oklch(0.72_0.16_220)]">
                &#8377;{product.price}
              </p>
            </article>
          ))}
        </div>
      </div>
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
    {
      name: "Sneha Kulkarni",
      role: "Cafe Owner",
      text: "The jars are always sealed, clean, and delivered right when our team needs them.",
      avatar: "https://i.pravatar.cc/120?img=44",
    },
    {
      name: "Amit Patil",
      role: "Society Chairman",
      text: "Oxyalpha made regular water supply simple for our entire apartment community.",
      avatar: "https://i.pravatar.cc/120?img=68",
    },
  ];
  const slides = Array.from({ length: Math.ceil(reviews.length / 3) }, (_, i) =>
    reviews.slice(i * 3, i * 3 + 3),
  );
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section id="reviews" className="py-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
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
            {slides.map((slide, slideIndex) => (
              <div key={slideIndex} className="w-full shrink-0 px-1">
                <div className="grid gap-5 lg:grid-cols-3">
                  {slide.map((r) => (
                    <article
                      key={r.name}
                      className="glass-card water-shine flex h-full flex-col rounded-3xl p-6 sm:p-7"
                    >
                      <div className="flex gap-1 text-[oklch(0.82_0.16_85)]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <p className="mt-4 flex-1 font-display text-lg leading-relaxed text-foreground/85">
                        &ldquo;{r.text}&rdquo;
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
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Show testimonial group ${i + 1}`}
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
                  <div key={c.t} className="glass-card flex items-start gap-3 rounded-2xl p-4">
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
            className="glass-card water-shine rounded-3xl p-6 sm:p-8"
          >
            <h3 className="font-display text-xl text-primary sm:text-2xl">Send us a message</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" />
              <Field label="Phone" name="phone" />
              <Field label="Email" name="email" type="email" className="sm:col-span-2" />
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  maxLength={800}
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
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
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
                src="/favicon.png"
                alt="OxyAlpha"
                className="h-16 w-16 shrink-0 object-contain sm:h-20 sm:w-20"
              />
            </div>
            <p className="mt-4 text-sm text-white/60">
              Oxyalpha powered by Sarika Food's & Beverages Private Limited.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                {
                  Icon: Facebook,
                  href: "https://www.facebook.com/share/1KQxtm6Ut6/",
                  label: "Facebook",
                },
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com/oxyalpha1/",
                  label: "Instagram",
                },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href === "#" ? undefined : "_blank"}
                  rel={href === "#" ? undefined : "noreferrer"}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-[oklch(0.79_0.14_220)] hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
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
          &copy; 2026 All Rights Reserved By Oxyalpha
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
