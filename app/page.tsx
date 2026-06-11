"use client";

import { useEffect, useRef, useState } from "react";
import {
  TrendingUp, TrendingDown, Globe, Users, Clock, Shield,
  ChevronDown, ArrowRight, Check, MapPin,
  BarChart2, Target, Brain, BookOpen, Zap, Award,
  Phone, Mail, MessageSquare, Star,
  DollarSign, Activity, Lock, Repeat, Layers, ChevronRight
} from "lucide-react";

// ─── Intersection observer reveal ────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Counter ─────────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 2000, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let s: number | null = null;
    const step = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return val;
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-4">
      <span className="block h-px w-8 bg-violet-500" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-400">
        {children}
      </span>
    </div>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────
const TICKS = [
  { pair: "EUR/USD", val: "1.0847", chg: "+0.12", up: true },
  { pair: "XAU/USD", val: "2,345.80", chg: "+0.87", up: true },
  { pair: "GBP/USD", val: "1.2701", chg: "-0.04", up: false },
  { pair: "USD/JPY", val: "157.23", chg: "+0.33", up: true },
  { pair: "WTI OIL", val: "79.42", chg: "-0.19", up: false },
  { pair: "S&P 500", val: "5,312", chg: "+0.58", up: true },
  { pair: "BTC/USD", val: "67,120", chg: "+2.14", up: true },
  { pair: "NAS 100", val: "18,740", chg: "+1.02", up: true },
  { pair: "USD/CHF", val: "0.8921", chg: "-0.11", up: false },
  { pair: "EUR/GBP", val: "0.8540", chg: "+0.06", up: true },
];

function TickerBar() {
  return (
    <div className="w-full overflow-hidden border-y border-white/[0.06] bg-[#070710] py-3">
      <div
        className="flex gap-10 whitespace-nowrap w-max"
        style={{ animation: "ticker 35s linear infinite" }}
      >
        {[...TICKS, ...TICKS, ...TICKS].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2.5 text-[11px] font-mono shrink-0">
            <span className="text-white/30 tracking-wider">{t.pair}</span>
            <span className="text-white/80 font-medium">{t.val}</span>
            <span className={`flex items-center gap-1 font-semibold ${t.up ? "text-emerald-400" : "text-rose-400"}`}>
              {t.up ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
              {t.chg}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  val,
  suffix,
  label,
  delay,
  active,
}: {
  icon: React.ElementType;
  val: number;
  suffix: string;
  label: string;
  delay: number;
  active: boolean;
}) {
  const count = useCounter(val, 2200, active);
  return (
    <Reveal delay={delay}>
      <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 sm:p-8 hover:border-violet-500/30 hover:bg-white/[0.05] transition-all duration-300">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 group-hover:border-violet-500/40 transition-colors">
          <Icon size={17} className="text-violet-400" />
        </div>
        <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-1">
          {count.toLocaleString()}{suffix}
        </div>
        <div className="text-xs text-white/35 font-medium">{label}</div>
      </div>
    </Reveal>
  );
}

// ─── Feature card ─────────────────────────────────────────────────────────────
function FeatureCard({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="group relative flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 hover:border-violet-500/25 hover:bg-white/[0.05] transition-all duration-300 h-full">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 group-hover:bg-violet-500/15 transition-colors">
          <Icon size={16} className="text-violet-400" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-1.5">{title}</h4>
          <p className="text-xs leading-relaxed text-white/40">{desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Course card ──────────────────────────────────────────────────────────────
function CourseCard({
  tier,
  title,
  price,
  desc,
  items,
  featured,
  delay,
}: {
  tier: string;
  title: string;
  price: string;
  desc: string;
  items: string[];
  featured?: boolean;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div
        className={`relative flex flex-col rounded-2xl border p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 h-full ${
          featured
            ? "border-violet-500/50 bg-gradient-to-b from-violet-950/60 to-[#0c0c18]"
            : "border-white/[0.07] bg-white/[0.03] hover:border-white/15"
        }`}
      >
        {featured && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-violet-600 px-4 py-1.5 whitespace-nowrap">
            <Star size={9} className="text-white fill-white" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Most Popular</span>
          </div>
        )}
        <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400">{tier}</div>
        <h3 className="mb-1 text-xl font-black tracking-tight text-white">{title}</h3>
        <p className="mb-6 text-[11px] text-white/35 leading-relaxed">{desc}</p>
        <div className="mb-6 flex items-baseline gap-1.5">
          <span className="text-4xl font-black tracking-tight text-white">{price}</span>
          {price !== "Custom" && <span className="text-sm text-white/30">USD</span>}
        </div>
        <ul className="mb-8 flex flex-col gap-2.5 flex-1">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-500/15">
                <Check size={8} className="text-violet-400" strokeWidth={3} />
              </div>
              <span className="text-[11px] leading-relaxed text-white/55">{item}</span>
            </li>
          ))}
        </ul>
        <button
          className={`w-full rounded-xl py-3 text-sm font-bold tracking-wide transition-all duration-200 ${
            featured
              ? "bg-violet-600 text-white hover:bg-violet-500"
              : "border border-white/15 text-white/70 hover:border-white/30 hover:text-white"
          }`}
        >
          Enroll Now
        </button>
      </div>
    </Reveal>
  );
}

// ─── Step ─────────────────────────────────────────────────────────────────────
function Step({
  n,
  title,
  desc,
  last,
  delay,
}: {
  n: string;
  title: string;
  desc: string;
  last?: boolean;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex gap-5">
        <div className="flex flex-col items-center shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/50 bg-violet-500/10 text-xs font-black text-violet-300">
            {n}
          </div>
          {!last && (
            <div className="mt-2 w-px flex-1 min-h-[36px] bg-gradient-to-b from-violet-500/30 to-transparent" />
          )}
        </div>
        <div className="pb-7">
          <h4 className="mb-1 text-sm font-bold text-white">{title}</h4>
          <p className="text-xs leading-relaxed text-white/40">{desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Testimonial card ─────────────────────────────────────────────────────────
function TestCard({
  name,
  loc,
  quote,
  profit,
  up = true,
  delay,
}: {
  name: string;
  loc: string;
  quote: string;
  profit: string;
  up?: boolean;
  delay: number;
}) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <Reveal delay={delay}>
      <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 hover:border-violet-500/20 transition-all duration-300 h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-700/40 border border-violet-500/20 text-xs font-black text-violet-200">
              {initials}
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">{name}</p>
              <div className="flex items-center gap-1 text-[11px] text-white/30 mt-0.5">
                <MapPin size={9} />
                {loc}
              </div>
            </div>
          </div>
          <div
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold shrink-0 ${
              up ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
            }`}
          >
            {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {profit}
          </div>
        </div>
        <p className="text-[11px] leading-relaxed text-white/45 italic flex-1">"{quote}"</p>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// ─── FAQ item ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors group"
      >
        <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
          {q}
        </span>
        <div
          className={`shrink-0 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-200 ${
            open
              ? "border-violet-500/50 bg-violet-500/10 text-violet-400 rotate-180"
              : "border-white/10 text-white/25"
          }`}
        >
          <ChevronDown size={12} />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-48 opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-xs leading-relaxed text-white/40">{a}</p>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const statsReveal = useReveal(0.2);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const students = useCounter(713, 2000, statsReveal.visible);
  const profit = useCounter(971, 2000, statsReveal.visible);
  const countries = useCounter(5, 1200, statsReveal.visible);
  const hours = useCounter(12, 1600, statsReveal.visible);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#03030a] text-white antialiased selection:bg-violet-500/30">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pb-16 pt-24 lg:pt-32">

        {/* Gradient mesh background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Deep violet orb — top left */}
          <div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
              animation: "floatOrb 12s ease-in-out infinite",
            }}
          />
          {/* Indigo orb — bottom right */}
          <div
            className="absolute -bottom-60 -right-32 w-[700px] h-[700px] rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, #4f46e5 0%, transparent 70%)",
              animation: "floatOrb 15s ease-in-out infinite reverse",
            }}
          />
          {/* Mesh grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(167,139,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Stars */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${(i * 17 + 11) % 100}%`,
                top: `${(i * 23 + 7) % 85}%`,
                width: `${(i % 3) + 1}px`,
                height: `${(i % 3) + 1}px`,
                opacity: 0.1 + (i % 5) * 0.08,
                animation: `twinkle ${3 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${(i % 6) * 0.8}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left col — copy */}
            <div>
              {/* Eyebrow */}
              <div
                className={`inline-flex items-center gap-2.5 rounded-full border border-violet-500/25 bg-violet-950/40 px-4 py-2 mb-8 transition-all duration-700 ${
                  heroVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300">
                  Pakistan's First Elite Trading Institute
                </span>
              </div>

              {/* Headline — slim black with tight tracking */}
              <h1 className="mb-6">
                {["Learn", "Trading", "From The", "Minds That", "Move Markets."].map((word, i) => (
                  <span
                    key={word}
                    className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black tracking-[-0.04em] leading-none transition-all duration-700"
                    style={{
                      transitionDelay: `${150 + i * 80}ms`,
                      opacity: heroVisible ? 1 : 0,
                      transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                      ...(i >= 2 && {
                        background: "linear-gradient(120deg, #a78bfa 0%, #7c3aed 40%, #c4b5fd 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }),
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>

              <p
                className={`text-sm sm:text-base leading-relaxed text-white/45 max-w-sm mb-8 transition-all duration-700 ${
                  heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                Forex, commodities, risk management and trading psychology — through live institutional mentorship built for long-term, consistent profitability.
              </p>

              <div
                className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 ${
                  heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "720ms" }}
              >
                <button className="group flex items-center gap-2 rounded-full bg-violet-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-violet-500 hover:gap-3 transition-all duration-200">
                  Enroll Now
                  <ArrowRight size={14} />
                </button>
                <button className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/60 hover:text-white hover:border-white/30 transition-all duration-200">
                  Free Consultation
                </button>
              </div>

              {/* Trust strip */}
              <div
                className={`flex flex-wrap gap-x-5 gap-y-2 transition-all duration-700 ${
                  heroVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: "850ms" }}
              >
                {[
                  { icon: Users, label: "700+ Students" },
                  { icon: Globe, label: "5 Countries" },
                  { icon: Shield, label: "100% Guarantee" },
                  { icon: Award, label: "0% Dropout" },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5 text-[11px] text-white/25">
                    <Icon size={11} className="text-violet-500/70" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right col — trading image card */}
            <div
              className={`transition-all duration-1000 ${
                heroVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-95"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="relative">
                {/* Glow behind card */}
                <div className="absolute -inset-6 rounded-3xl opacity-30"
                  style={{ background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)" }} />

                {/* Main image card */}
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c18]">
                  <img
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=85&auto=format"
                    alt="Professional trading charts and market analysis"
                    className="w-full h-56 sm:h-72 lg:h-80 object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c18] via-transparent to-transparent" />

                  {/* Overlay stats */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-white/40 mb-0.5">XAU / USD</p>
                        <p className="text-2xl font-black tracking-tight text-white">2,345.80</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <TrendingUp size={11} className="text-emerald-400" />
                          <span className="text-xs font-semibold text-emerald-400">+0.87% today</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 mb-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[10px] font-bold text-emerald-400">Live Session</span>
                        </div>
                        <p className="text-[10px] text-white/30">Markets Open</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                <div
                  className="absolute -top-4 -right-4 sm:-right-6 rounded-xl border border-white/[0.08] bg-[#0c0c18]/90 backdrop-blur-sm p-3.5 shadow-2xl"
                  style={{ animation: "float 4s ease-in-out infinite" }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15">
                      <TrendingUp size={14} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/35">Student Profit</p>
                      <p className="text-sm font-black text-emerald-400">+$971K</p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-4 -left-4 sm:-left-6 rounded-xl border border-white/[0.08] bg-[#0c0c18]/90 backdrop-blur-sm p-3.5 shadow-2xl"
                  style={{ animation: "float 4s ease-in-out infinite", animationDelay: "2s" }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/15">
                      <Users size={14} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/35">Trained</p>
                      <p className="text-sm font-black text-violet-300">713 Traders</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ────────────────────────────────────────────────────────── */}
      <TickerBar />

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-[#07070f]">
        <div className="mx-auto max-w-6xl">
          <div ref={statsReveal.ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Users} val={students} suffix="+" label="Students Trained" delay={0} active={statsReveal.visible} />
            <StatCard icon={DollarSign} val={profit} suffix="K+" label="Cumulative Profit (USD)" delay={100} active={statsReveal.visible} />
            <StatCard icon={Globe} val={countries} suffix="" label="Countries Worldwide" delay={200} active={statsReveal.visible} />
            <StatCard icon={Clock} val={hours} suffix="K+" label="Mentorship Hours" delay={300} active={statsReveal.visible} />
          </div>
        </div>
      </section>

      {/* ── WHY SKILLS AURA ───────────────────────────────────────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-12 lg:mb-16 max-w-xl">
              <Label>Our Edge</Label>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-none text-white mb-4">
                Why Future Traders<br />
                <span className="text-white/30">Choose Skills Aura</span>
              </h2>
              <p className="text-sm text-white/40 leading-relaxed">
                7 reasons we have a zero-dropout record and a 100% money-back guarantee.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <FeatureCard icon={BarChart2} title="Golden Map Framework" desc="A structured institutional system to analyze markets with professional precision." delay={0} />
            <FeatureCard icon={TrendingUp} title="Zero to Withdrawal" desc="We mentor you until you make and withdraw your very first real profit." delay={80} />
            <FeatureCard icon={Layers} title="Institutional Mentorship" desc="Learn from traders who actively trade markets — not just teach theory." delay={160} />
            <FeatureCard icon={Target} title="Personalized Journey" desc="Every student follows a path tailored to their strengths and pace." delay={240} />
            <FeatureCard icon={Award} title="Pakistan's First Premium Academy" desc="Setting a new national standard for trading education delivery." delay={320} />
            <FeatureCard icon={Zap} title="Hands-On Practical" desc="Real charts. Real trades. Real-time guidance. Zero empty theory." delay={400} />
            <FeatureCard icon={Brain} title="Trading Psychology" desc="The discipline and emotional mastery that separates pros from amateurs." delay={480} />
            <FeatureCard icon={Repeat} title="Lifetime Skill" desc="Build a high-income skill that generates consistent returns for decades." delay={560} />
          </div>
        </div>
      </section>

      {/* ── JOURNEY ───────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-32 bg-[#07070f]">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left sticky */}
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <Label>The Roadmap</Label>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-none text-white mb-5">
                  Your Path To<br />
                  <span className="text-white/25">Consistent</span><br />
                  <span className="text-white/25">Profits</span>
                </h2>
                <p className="text-sm leading-relaxed text-white/40 mb-8 max-w-sm">
                  A structured 6-phase framework that has produced 700+ profitable traders across 5 countries in under 4 months.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { val: "3 mo", label: "Avg. to first trade" },
                    { val: "70%+", label: "Strategy win rate" },
                    { val: "4 mo", label: "To funded account" },
                    { val: "100%", label: "Money-back guarantee" },
                  ].map(({ val, label }) => (
                    <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
                      <p className="text-xl font-black tracking-tight text-violet-300 mb-0.5">{val}</p>
                      <p className="text-[11px] text-white/30">{label}</p>
                    </div>
                  ))}
                </div>
                <button className="flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-bold text-white hover:bg-violet-500 transition-colors">
                  Start Your Journey
                  <ArrowRight size={14} />
                </button>
              </Reveal>
            </div>

            {/* Right steps */}
            <div className="mt-2">
              <Step n="01" title="Market Foundations" desc="Candlesticks, chart reading, account setup, and trade execution from first principles." delay={0} />
              <Step n="02" title="Market Structure" desc="Supply & demand zones, price action, trend identification and institutional order flow." delay={80} />
              <Step n="03" title="Risk Management" desc="Capital preservation, position sizing, stop-loss discipline and account scaling rules." delay={160} />
              <Step n="04" title="Trading Psychology" desc="Emotional control, journaling systems, discipline frameworks and routine-building." delay={240} />
              <Step n="05" title="Personal Strategy" desc="Build your own edge with a calibrated strategy achieving 70%+ win rate." delay={320} />
              <Step n="06" title="Trade Independently" last desc="Live trading, funded account acquisition and consistent monthly withdrawals." delay={400} />
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSES ───────────────────────────────────────────────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 w-[800px] h-72 opacity-15"
          style={{ background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <div className="text-center mb-12 lg:mb-16">
              <Label>Enroll Today</Label>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-none text-white mb-4">
                Choose Your<br />Learning Path
              </h2>
              <p className="text-sm text-white/40 max-w-sm mx-auto">
                All programs include mentorship until your first real withdrawal — not just until course end.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            <CourseCard
              tier="Beginner"
              title="Basic Program"
              price="$420"
              desc="For those starting from zero with no prior market knowledge."
              delay={0}
              items={[
                "Market basics & chart reading",
                "Types of market trends",
                "Account setup & trade execution",
                "Introduction to risk management",
                "Golden Map framework introduction",
                "Live session access",
              ]}
            />
            <CourseCard
              tier="Intermediate"
              title="Grooming Program"
              price="$280"
              desc="For traders with foundational knowledge needing advanced refinement."
              featured
              delay={120}
              items={[
                "Advanced risk & money management",
                "Emotional discipline framework",
                "Personal trading journal system",
                "Strategy dev (70%+ win rate)",
                "Finding & fixing weak points",
                "One-on-one coaching sessions",
                "Funded account preparation",
              ]}
            />
            <CourseCard
              tier="Professional"
              title="Special Slot"
              price="$1,060"
              desc="Complete institutional mentorship from beginner to funded account."
              delay={240}
              items={[
                "Full Forex & commodity curriculum",
                "Fundamental analysis (NFP, CPI, GDP)",
                "Supply & demand deep-dive",
                "Day & swing trading strategies",
                "Account scaling methodology",
                "Institutional concepts & order flow",
                "Lifetime strategy access",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL LEARN ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-[#07070f]">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="text-center mb-12">
              <Label>Curriculum</Label>
              <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.04em] leading-none text-white">What You'll Master</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {[
              { icon: BarChart2, label: "Forex Trading" },
              { icon: Activity, label: "Commodity Trading" },
              { icon: TrendingUp, label: "Technical Analysis" },
              { icon: BookOpen, label: "Fundamental Analysis" },
              { icon: Shield, label: "Risk Management" },
              { icon: Brain, label: "Trading Psychology" },
              { icon: Zap, label: "Strategy Building" },
              { icon: DollarSign, label: "Capital Management" },
              { icon: TrendingUp, label: "Account Growth" },
              { icon: Layers, label: "Market Structure" },
            ].map(({ icon: Icon, label }, i) => (
              <Reveal key={label} delay={i * 50}>
                <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5 text-[11px] font-semibold text-white/50 hover:border-violet-500/30 hover:text-white/80 transition-all duration-200 cursor-default">
                  <Icon size={13} className="shrink-0 text-violet-400/70" />
                  {label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER ───────────────────────────────────────────────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <Reveal className="order-2 lg:order-1">
              <div className="relative max-w-sm mx-auto lg:mx-0">
                <div className="absolute -inset-3 rounded-3xl opacity-20"
                  style={{ background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)" }} />
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.07]">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=85&auto=format"
                    alt="Bilal Rizwan, Director of Skills Aura"
                    className="w-full aspect-[3/4] object-cover object-top"
                    style={{ filter: "brightness(0.75) grayscale(15%)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03030a] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-lg font-black tracking-tight text-white">Bilal Rizwan</p>
                        <p className="text-xs text-violet-300 font-semibold mt-0.5">Director & Lead Mentor</p>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-400">Active Trader</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Copy */}
            <div className="order-1 lg:order-2">
              <Reveal>
                <Label>Meet The Founder</Label>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-none text-white mb-6">
                  Built By A Trader,<br />
                  <span className="text-white/25">For Traders.</span>
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <blockquote className="mb-6 border-l-2 border-violet-500 pl-5">
                  <p className="text-sm sm:text-base italic leading-relaxed text-white/50">
                    "Success in trading comes from skill, discipline, and consistency — not luck. Anyone can read a chart. Few master themselves."
                  </p>
                </blockquote>
              </Reveal>
              <Reveal delay={200}>
                <p className="mb-4 text-sm leading-relaxed text-white/40">
                  Skills Aura was built with one mission: to create truly independent traders who understand markets rather than relying on signals. After years of professional trading, Bilal and his team built the exact framework they wished they'd had from day one.
                </p>
                <p className="mb-8 text-sm leading-relaxed text-white/40">
                  The Golden Map framework has helped 700+ students across 5 countries go from complete beginners to consistent, profitable, withdrawing traders — in an average of 3 months.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-bold text-white hover:bg-violet-500 transition-colors">
                    Enroll Now
                    <ArrowRight size={14} />
                  </button>
                  <button className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/60 hover:text-white hover:border-white/30 transition-colors">
                    <Phone size={13} />
                    Book Consultation
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-[#07070f]">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="text-center mb-12">
              <Label>Student Stories</Label>
              <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.04em] leading-none text-white mb-3">
                Real Results.<br />
                <span className="text-white/25">Real Traders.</span>
              </h2>
              <p className="text-sm text-white/35 mt-4">Verified outcomes from students across Pakistan, UK, UAE, and Canada.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <TestCard name="Mohammad Bilal" loc="Lahore, PK" quote="The perspective they give on trading is unbelievable. No mentor I've encountered comes close." profit="+$2,400" delay={0} />
            <TestCard name="Malik Nauman" loc="Karachi, PK" quote="I attended four trading academies before this one. I wish I had come here first." profit="+$1,800" delay={80} />
            <TestCard name="Jason Kahn" loc="Bristol, UK" quote="If you actually want consistent profit, not just knowledge, this is the place to be." profit="+$5,100" delay={160} />
            <TestCard name="Arsalan Nadeem" loc="Islamabad, PK" quote="Made my first $400 in 5 months — starting from zero prior knowledge whatsoever." profit="+$400" delay={240} />
          </div>
        </div>
      </section>

      {/* ── SPOTLIGHT ─────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="relative rounded-3xl border border-violet-500/20 overflow-hidden">
              {/* Grid texture */}
              <div className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(79,70,229,0.08) 50%, transparent 100%)",
                }} />
              <div className="absolute inset-0 opacity-[0.025]"
                style={{
                  backgroundImage: "linear-gradient(rgba(167,139,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }} />

              <div className="relative p-8 sm:p-12 lg:p-14">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-950/50 px-4 py-2 mb-6">
                      <Award size={12} className="text-violet-400" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300">Student Spotlight</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] leading-none text-white mb-5">
                      Funded Account<br />
                      <span className="text-white/30">At Age 16.</span>
                    </h3>
                    <p className="text-sm leading-relaxed text-white/45 mb-8 max-w-sm">
                      Taha Shah became the youngest Skills Aura student to acquire a funded trading account — in just 4 months. He now trades professionally.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
                      {[
                        { label: "Age at funding", val: "16" },
                        { label: "Months to fund", val: "4" },
                        { label: "Win rate", val: "71%" },
                        { label: "Status", val: "Funded" },
                      ].map(({ label, val }) => (
                        <div key={label} className="rounded-xl border border-white/[0.07] bg-black/30 p-4">
                          <p className="text-[10px] text-white/30 mb-1">{label}</p>
                          <p className="text-xl font-black tracking-tight text-violet-300">{val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative max-w-xs mx-auto lg:mx-0 w-full">
                    <div className="absolute -inset-4 rounded-3xl opacity-25"
                      style={{ background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)" }} />
                    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07]">
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=85&auto=format"
                        alt="Taha Shah — youngest funded trader at Skills Aura"
                        className="w-full aspect-square object-cover"
                        style={{ filter: "brightness(0.75)" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#03030a] via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p className="text-sm font-black tracking-tight text-white">Taha Shah</p>
                        <p className="text-xs text-violet-300">Youngest Funded Trader</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GLOBAL ────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-[#07070f]">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="text-center mb-12">
              <Label>Global Community</Label>
              <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.04em] leading-none text-white mb-3">
                Students Across<br />
                <span className="text-white/25">The World</span>
              </h2>
              <div className="flex items-center justify-center gap-2 text-xs text-white/25 mt-3">
                <MapPin size={11} className="text-violet-400/60" />
                Launched in Pakistan — February 2025
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0c0c18]">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png"
                alt="World map"
                className="w-full opacity-[0.06] select-none pointer-events-none"
              />
              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    { code: "pk", country: "Pakistan", students: "500+" },
                    { code: "gb", country: "United Kingdom", students: "60+" },
                    { code: "us", country: "United States", students: "45+" },
                    { code: "ca", country: "Canada", students: "35+" },
                    { code: "no", country: "Norway", students: "20+" },
                  ].map(({ code, country, students }) => (
                    <div
                      key={country}
                      className={`rounded-xl border px-5 py-3.5 text-center backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 ${
                        code === "pk"
                          ? "border-violet-500/35 bg-violet-950/60"
                          : "border-white/[0.08] bg-black/50 hover:border-white/15"
                      }`}
                    >
                      <img
                        src={`https://flagcdn.com/24x18/${code}.png`}
                        alt={country}
                        className="mx-auto mb-2 rounded-sm"
                        width={24}
                        height={18}
                      />
                      <p className="text-xs font-bold text-white">{country}</p>
                      <p className="text-xs font-black text-violet-300 mt-0.5">{students}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="text-center mb-12">
              <Label>FAQ</Label>
              <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.04em] leading-none text-white">
                Common Questions
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-6 sm:px-8 py-2">
              <FAQItem
                q="Can complete beginners join?"
                a="Absolutely. Our Basic Program starts from scratch — no prior trading knowledge required. We cover everything from what a candlestick is to live trade execution."
              />
              <FAQItem
                q="Is this Forex or Commodity trading?"
                a="Both. We teach Forex (EUR/USD, GBP/USD) and Commodities (Gold/XAU, Oil/WTI), giving you multiple professional markets to trade profitably."
              />
              <FAQItem
                q="Do you offer online classes?"
                a="Yes. We offer both in-person sessions in Pakistan and fully live online sessions via Zoom for students in the UK, UAE, Canada, USA and beyond."
              />
              <FAQItem
                q="How long does training take?"
                a="Most students complete the core curriculum in 3 months and begin live trading. Mentorship continues beyond completion until you achieve your first consistent withdrawal."
              />
              <FAQItem
                q="Is there a refund policy?"
                a="Yes — 100% money-back guarantee. If you complete the full program and feel you haven't genuinely learned to trade, we refund in full. No questions asked."
              />
              <FAQItem
                q="Will I get mentorship after the course ends?"
                a="Yes. We stay with you through live sessions and direct access until you are consistently profitable — not just until your course completion date."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-[#07070f]" id="contact">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <Reveal>
              <Label>Get In Touch</Label>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-none text-white mb-5">
                Start Your Trading<br />
                <span className="text-white/25">Journey Today.</span>
              </h2>
              <p className="text-sm leading-relaxed text-white/40 mb-10 max-w-sm">
                Fill out the form and a mentor will respond within 24 hours, or reach us directly on WhatsApp for an immediate response.
              </p>
              <div className="flex flex-col gap-5">
                {[
                  { icon: Phone, label: "WhatsApp", val: "+92 322 6098992" },
                  { icon: Globe, label: "Serving", val: "Pakistan · UK · UAE · Canada · USA" },
                  { icon: Clock, label: "Response Time", val: "Within 24 hours" },
                  { icon: Lock, label: "Privacy", val: "Your data is never shared" },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
                      <Icon size={16} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/25 font-medium mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-white/65">{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7 sm:p-8">
                <h3 className="text-lg font-black tracking-tight text-white mb-1">Book a Free Consultation</h3>
                <p className="text-xs text-white/30 mb-6">No commitment. A mentor will walk you through the right program.</p>
                <div className="flex flex-col gap-3">
                  {["Full Name", "Email Address", "Phone Number", "City"].map((pl) => (
                    <input
                      key={pl}
                      type="text"
                      placeholder={pl}
                      className="w-full rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-violet-500/40 focus:bg-white/[0.05] transition-all"
                    />
                  ))}
                  <select className="w-full rounded-xl border border-white/[0.07] bg-[#07070f] px-4 py-3 text-sm text-white/40 outline-none focus:border-violet-500/40 transition-all">
                    <option value="">Select a course</option>
                    <option>Basic Program — $420</option>
                    <option>Grooming Program — $280</option>
                    <option>Special Slot — $1,060</option>
                  </select>
                  <textarea
                    rows={3}
                    placeholder="Your question or message (optional)"
                    className="w-full resize-none rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-violet-500/40 transition-all"
                  />
                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-sm font-bold text-white hover:bg-violet-500 transition-colors">
                      <Mail size={14} />
                      Send Message
                    </button>
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 py-3.5 text-sm font-semibold text-white/60 hover:text-white hover:border-white/30 transition-all">
                      <MessageSquare size={14} />
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-28 lg:py-40 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[900px] h-80 opacity-20"
            style={{ background: "radial-gradient(ellipse, #7c3aed 0%, transparent 65%)" }} />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(rgba(167,139,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }} />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <Label>Join 700+ Traders</Label>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-[-0.04em] leading-none text-white mb-5">
              Ready To Learn A
              <br />
              <span style={{
                background: "linear-gradient(120deg, #a78bfa 0%, #7c3aed 40%, #c4b5fd 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                High-Income Skill?
              </span>
            </h2>
            <p className="text-sm leading-relaxed text-white/35 max-w-md mx-auto mb-10">
              Join Skills Aura and learn how institutional traders analyze markets, manage risk, and generate consistent income for life.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <button className="group flex items-center gap-2 rounded-full bg-violet-600 px-8 py-4 text-sm font-bold text-white hover:bg-violet-500 hover:gap-3 hover:scale-105 transition-all duration-200">
                Enroll Now — Start Today
                <ArrowRight size={14} />
              </button>
              <button className="flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white/50 hover:text-white hover:border-white/30 transition-all">
                <Phone size={13} />
                Talk To An Advisor
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {[
                { icon: Shield, label: "100% Money-Back Guarantee" },
                { icon: Users, label: "Live Mentorship Included" },
                { icon: Award, label: "0% Dropout Rate" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-[11px] text-white/20">
                  <Icon size={11} className="text-violet-500/50" />
                  {label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GLOBAL KEYFRAMES ──────────────────────────────────────────────── */}
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(40px, -30px) scale(1.05); }
          66%       { transform: translate(-20px, 20px) scale(0.97); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50%       { opacity: 0.6;  transform: scale(1.5); }
        }
      `}</style>
    </main>
  );
}