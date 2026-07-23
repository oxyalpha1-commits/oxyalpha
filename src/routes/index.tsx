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

const FORM_ACCESS_KEY = "0364c373-0321-4245-a8cb-2a18e213c0e3";

async function submitWebsiteForm(form: HTMLFormElement, subject: string) {
  const formData = new FormData(form);
  formData.set("access_key", FORM_ACCESS_KEY);
  formData.set("subject", subject);
  formData.set("from_name", "Oxyalpha Website");

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Unable to send form");
  }
}

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
        <QualityStrip />
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
              className="h-11 w-auto shrink-0 object-contain sm:h-14 lg:h-16"
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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
            src="/fast-delivery.png"
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
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.currentTarget as HTMLFormElement;
            setSubmitting(true);
            setError("");
            try {
              await submitWebsiteForm(form, "New Oxyalpha enquiry");
              setSent(true);
              form.reset();
              setTimeout(() => {
                setSent(false);
                onClose();
              }, 1800);
            } catch {
              setError("Could not send enquiry. Please try again or call us directly.");
            } finally {
              setSubmitting(false);
            }
          }}
          className="p-6 pb-8 sm:overflow-y-auto sm:p-8 lg:p-10"
        >
          <input type="hidden" name="access_key" value={FORM_ACCESS_KEY} />
          <input type="hidden" name="form_name" value="Enquiry form" />
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
              disabled={submitting}
              className="hover-lift inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground soft-shadow disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              <Send className="h-4 w-4" /> {submitting ? "Sending..." : "Submit Enquiry"}
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
            {error && <span className="text-sm text-destructive">{error}</span>}
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
          <span className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-primary/15 bg-white/70 px-3 py-1.5 text-[11px] font-medium leading-relaxed text-primary sm:px-4 sm:text-xs">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span>Certified Pure | ISO 9001:2015 | ISO 22000:2018</span>
          </span>
          <h1 className="mt-5 font-display text-[2.35rem] leading-[1.04] text-primary sm:text-5xl lg:text-6xl">
            Pure Drinking Water
            <br />
            Delivered To Your <span className="text-gradient">Doorstep</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-foreground/70 sm:text-lg sm:leading-relaxed">
            Sourced from pristine springs, refined through 9-stage RO+UV purification, and delivered
            fresh, so Oxyalpha keeps every sip crystal-clear, safe, and effortlessly premium.
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
              className="animate-float relative z-10 mx-auto aspect-square max-h-[360px] w-full max-w-[360px] object-contain drop-shadow-[0_34px_58px_rgba(15,76,129,0.28)] sm:max-h-[560px] sm:max-w-[560px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function QualityStrip() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Certified Safety",
      text: "ISO 9001:2015 and ISO 22000:2018 quality practices.",
    },
    {
      icon: Filter,
      title: "9-Stage Purity",
      text: "RO + UV filtration with routine quality checks.",
    },
    {
      icon: Sparkles,
      title: "Freshly Sealed",
      text: "Clean packaging that keeps every bottle crisp and ready.",
    },
    {
      icon: Truck,
      title: "Reliable Delivery",
      text: "Prompt doorstep supply for homes, offices, and events.",
    },
  ];

  return (
    <section className="relative z-10 -mt-6 pb-16 sm:-mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
        <div className="grid gap-3 rounded-3xl border border-white/70 bg-white/85 p-3 shadow-[0_24px_70px_rgba(15,76,129,0.12)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-2xl px-3 py-4 transition hover:bg-[oklch(0.98_0.018_235)] sm:px-4"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-primary">{item.title}</span>
                  <span className="mt-1 block text-xs leading-5 text-foreground/58">
                    {item.text}
                  </span>
                </span>
              </div>
            );
          })}
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
            engineered with obsessive care to deliver water that's not just safe, but genuinely
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
      title: "Residential Water",
      text: "Pure, safe drinking water tailored for every home.",
      position: "lg:col-start-1 lg:row-start-1",
    },
    {
      icon: Truck,
      title: "Commercial Water",
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
  const points = ["Free Delivery", "7 Days In A Week Service"];

  return (
    <section id="why" className="relative overflow-hidden bg-white py-16">
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 72"
        className="absolute inset-x-0 top-0 z-20 h-12 w-full text-white sm:h-16"
        preserveAspectRatio="none"
      >
        <path
          d="M0 22c170 30 330 26 510 4 216-26 426-28 650-2 110 13 200 9 280-3V0H0z"
          fill="currentColor"
        />
      </svg>
      <div className="animate-water-drift relative overflow-hidden bg-[oklch(0.34_0.14_255)] pt-20 pb-20 text-white sm:pt-24 lg:pt-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_16%_38%,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_76%_12%,rgba(46,196,241,0.18),transparent_32%),linear-gradient(135deg,rgba(15,76,129,0.72),rgba(20,68,169,0.92))]"
        />
        <div
          aria-hidden="true"
          className="absolute -left-24 top-10 h-[30rem] w-[30rem] rounded-full bg-black/10"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[-12rem] right-[-6rem] h-[34rem] w-[34rem] rounded-full bg-white/5"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 md:grid-cols-2 md:px-6 lg:gap-16">
          <div data-reveal="left" className="mx-auto w-full max-w-xl md:order-1">
            <div className="relative mx-auto max-w-lg">
              <div className="absolute inset-8 rounded-full bg-[oklch(0.79_0.14_220)]/18 blur-3xl" />
              <img
                src="/fast-delivery.png"
                alt="Fast packaged drinking water delivery service"
                loading="lazy"
                className="relative z-10 mx-auto aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_30px_80px_rgba(0,0,0,0.22)]"
              />
            </div>
          </div>

          <div data-reveal="right" className="md:order-2">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[oklch(0.85_0.11_220)] backdrop-blur">
              Delivery Service
            </span>
            <h2 className="mt-5 max-w-xl font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Ready To Get Our Premium Water Delivery Service.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/80">
              We offer delivery within a 50 km radius, covering Pimpri-Chinchwad, Pune and Lonavala
              through a dependable network of 10+ delivery partners.
            </p>

            <ul className="mt-6 space-y-4">
              {points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-sm font-semibold text-white/95"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white/18 text-[oklch(0.86_0.12_220)]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <a
              href="#process"
              className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[oklch(0.79_0.14_220)] px-7 py-3 text-sm font-semibold text-primary shadow-[0_18px_40px_rgba(46,196,241,0.24)] transition hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Our Services
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 74"
        className="absolute inset-x-0 bottom-0 z-20 h-12 w-full text-white sm:h-16"
        preserveAspectRatio="none"
      >
        <path
          d="M0 34c150 25 306 24 470 5 212-24 348 40 558 18 192-20 276-45 412-18v35H0z"
          fill="currentColor"
        />
      </svg>
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
    { name: "200 ml Mineral Water Bottle", size: "200 ml", price: "5.00", image: "/200 ml.png" },
    {
      name: "200 ml Oxyalpha Water Bottle",
      size: "200 ml",
      price: "5.00",
      image: "/200 ml (2).png",
    },
    { name: "500 ml Mineral Water Bottle", size: "500 ml", price: "10.00", image: "/500 ml.png" },
    {
      name: "500 ml Oxyalpha Water Bottle",
      size: "500 ml",
      price: "10.00",
      image: "/500 ml (2).png",
    },
    {
      name: "1 Litre Mineral Water Bottle",
      size: "1 Litre",
      price: "20.00",
      image: "/1 litre.png",
    },
    {
      name: "1 Litre Oxyalpha Water Bottle",
      size: "1 Litre",
      price: "20.00",
      image: "/1 litre (2).png",
    },
    {
      name: "2 Litre Mineral Water Bottle",
      size: "2 Litre",
      price: "30.00",
      image: "/2 litre.png",
    },
    {
      name: "2 Litre Oxyalpha Water Bottle",
      size: "2 Litre",
      price: "30.00",
      image: "/2 litre (2).png",
    },
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
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, i) => (
            <article
              key={product.image}
              data-reveal
              style={{ transitionDelay: `${i * 70}ms` }}
              className="glass-card group flex min-h-[390px] flex-col items-center justify-end px-5 py-7 text-center transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,76,129,0.12)] sm:min-h-[420px] lg:px-6"
            >
              <div className="flex h-52 w-full items-center justify-center sm:h-60">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="max-h-full w-full object-contain drop-shadow-[0_18px_18px_rgba(15,23,42,0.12)] transition duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-6 inline-flex rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {product.size}
              </p>
              <h3 className="mt-3 min-h-14 font-display text-2xl font-semibold leading-tight text-[oklch(0.22_0.06_255)] xl:text-xl">
                {product.name}
              </h3>
              <div className="mt-6 flex w-full items-center justify-center rounded-2xl bg-white/72 px-4 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/45">
                    Rate
                  </span>
                  <span className="block text-xl font-semibold text-[oklch(0.72_0.16_220)]">
                    &#8377;{product.price}
                  </span>
                </span>
              </div>
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
    },
    {
      name: "Rohan Mehta",
      role: "Office Manager",
      text: "They deliver on time, every time. Our whole office runs on Oxyalpha jars now.",
    },
    {
      name: "Ananya Iyer",
      role: "Fitness Coach",
      text: "Clean water is non-negotiable for me. Oxyalpha feels light, pure and genuinely premium.",
    },
    {
      name: "Vikram Nair",
      role: "Restaurant Owner",
      text: "Reliable bulk supply and impeccable quality. Our customers keep noticing the difference.",
    },
    {
      name: "Sneha Kulkarni",
      role: "Cafe Owner",
      text: "The jars are always sealed, clean, and delivered right when our team needs them.",
    },
    {
      name: "Amit Patil",
      role: "Society Chairman",
      text: "Oxyalpha made regular water supply simple for our entire apartment community.",
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
                          src="/profile.png"
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
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
                { i: Clock, t: "Hours", d: "Mon-Sun: 9 AM - 6 PM | Wed: Closed" },
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
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              setSubmitting(true);
              setError("");
              try {
                await submitWebsiteForm(form, "New Oxyalpha contact message");
                setSent(true);
                form.reset();
                setTimeout(() => setSent(false), 3500);
              } catch {
                setError("Could not send message. Please try again or WhatsApp us.");
              } finally {
                setSubmitting(false);
              }
            }}
            className="glass-card water-shine rounded-3xl p-6 sm:p-8"
          >
            <input type="hidden" name="access_key" value={FORM_ACCESS_KEY} />
            <input type="hidden" name="form_name" value="Contact form" />
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
                disabled={submitting}
                className="hover-lift inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground soft-shadow disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                <Send className="h-4 w-4" /> {submitting ? "Sending..." : "Send message"}
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
                  Thanks, we'll be in touch shortly.
                </span>
              )}
              {error && <span className="text-sm text-destructive">{error}</span>}
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
