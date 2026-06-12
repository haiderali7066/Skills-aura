"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  TrendingUp, TrendingDown, Globe, Users, Clock, Shield,
  ChevronDown, ChevronRight, ArrowRight, Check, MapPin,
  BarChart2, Target, Brain, BookOpen, Zap, Award,
  Phone, Mail, MessageSquare, Star, Play, Minus, Plus,
  DollarSign, Activity, Lock, Repeat, Layers
} from "lucide-react";

// ─────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, duration = 2200, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setVal(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return val;
}

// ─────────────────────────────────────────────
// Live Candlestick Chart — signature element
// ─────────────────────────────────────────────
type Candle = { o: number; h: number; l: number; c: number };

function generateCandles(count: number): Candle[] {
  const candles: Candle[] = [];
  let price = 1850;
  for (let i = 0; i < count; i++) {
    const o = price;
    const change = (Math.random() - 0.48) * 18;
    const c = o + change;
    const h = Math.max(o, c) + Math.random() * 8;
    const l = Math.min(o, c) - Math.random() * 8;
    candles.push({ o, h, l, c });
    price = c;
  }
  return candles;
}

function CandlestickChart() {
  const [candles, setCandles] = useState<Candle[]>(() => generateCandles(28));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCandles(prev => {
        const last = prev[prev.length - 1];
        const newC = last.c + (Math.random() - 0.48) * 14;
        const newO = last.c;
        const newH = Math.max(newO, newC) + Math.random() * 7;
        const newL = Math.min(newO, newC) - Math.random() * 7;
        return [...prev.slice(1), { o: newO, h: newH, l: newL, c: newC }];
      });
      setTick(t => t + 1);
    }, 900);
    return () => clearInterval(id);
  }, []);

  const W = 560, H = 160, PAD = 12;
  const all = candles.flatMap(c => [c.h, c.l]);
  const minP = Math.min(...all) - 5;
  const maxP = Math.max(...all) + 5;
  const scaleY = (p: number) => H - PAD - ((p - minP) / (maxP - minP)) * (H - PAD * 2);
  const cW = (W - PAD * 2) / candles.length;

  const linePoints = candles.map((c, i) => `${PAD + i * cW + cW / 2},${scaleY(c.c)}`).join(" ");
  const lastCandle = candles[candles.length - 1];
  const isUp = lastCandle.c >= lastCandle.o;

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-[#0a0a12] border border-white/[0.07]">
      {/* Header row */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-violet-600/20 rounded-md px-2.5 py-1">
            <Activity size={13} className="text-violet-400" />
            <span className="text-xs font-semibold text-violet-300 tracking-wide">XAU / USD</span>
          </div>
          <span className="text-xs text-white/30 font-mono">GOLD SPOT</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xl font-bold text-white">
            {lastCandle.c.toFixed(2)}
          </span>
          <span className={cn(
            "text-xs font-semibold px-2 py-0.5 rounded",
            isUp ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
          )}>
            {isUp ? "+" : ""}{((lastCandle.c - candles[0].o) / candles[0].o * 100).toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Chart */}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 160 }}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map(t => (
          <line key={t} x1={PAD} y1={PAD + t * (H - PAD * 2)} x2={W - PAD} y2={PAD + t * (H - PAD * 2)}
            stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {/* Candles */}
        {candles.map((c, i) => {
          const x = PAD + i * cW + cW / 2;
          const up = c.c >= c.o;
          const color = up ? "#10b981" : "#f43f5e";
          const bodyTop = scaleY(Math.max(c.o, c.c));
          const bodyH = Math.max(2, Math.abs(scaleY(c.o) - scaleY(c.c)));
          return (
            <g key={i}>
              <line x1={x} y1={scaleY(c.h)} x2={x} y2={scaleY(c.l)} stroke={color} strokeWidth="1" opacity="0.7" />
              <rect x={x - cW * 0.3} y={bodyTop} width={cW * 0.6} height={bodyH}
                fill={color} opacity={i === candles.length - 1 ? 1 : 0.75} rx="1" />
            </g>
          );
        })}
        {/* Price line */}
        <polyline points={linePoints} fill="none" stroke="rgba(167,139,250,0.4)" strokeWidth="1" />
        {/* Current price dot */}
        <circle
          cx={PAD + (candles.length - 1) * cW + cW / 2}
          cy={scaleY(lastCandle.c)}
          r="4" fill="#a78bfa"
        />
      </svg>

      {/* Time selector */}
      <div className="flex gap-1 px-5 pb-4">
        {["1H","4H","1D","1W","1M"].map((t, i) => (
          <button key={t} className={cn(
            "px-2.5 py-1 rounded text-xs font-semibold transition-colors",
            i === 2 ? "bg-violet-600/30 text-violet-300" : "text-white/25 hover:text-white/50"
          )}>{t}</button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Live Ticker Bar
// ─────────────────────────────────────────────
const TICKERS = [
  { pair: "EUR/USD", val: "1.0847", chg: "+0.12", up: true },
  { pair: "XAU/USD", val: "2,345.80", chg: "+0.87", up: true },
  { pair: "GBP/USD", val: "1.2701", chg: "-0.04", up: false },
  { pair: "USD/JPY", val: "157.23", chg: "+0.33", up: true },
  { pair: "USD/CHF", val: "0.8921", chg: "-0.11", up: false },
  { pair: "WTI OIL", val: "79.42", chg: "-0.19", up: false },
  { pair: "S&P 500", val: "5,312", chg: "+0.58", up: true },
  { pair: "BTC/USD", val: "67,120", chg: "+2.14", up: true },
  { pair: "EUR/GBP", val: "0.8540", chg: "+0.06", up: true },
  { pair: "NAS 100", val: "18,740", chg: "+1.02", up: true },
];

function TickerBar() {
  return (
    <div className="w-full overflow-hidden border-y border-white/[0.06] bg-[#07070f] py-2.5">
      <div className="flex gap-8 whitespace-nowrap" style={{ animation: "ticker 30s linear infinite" }}>
        {[...TICKERS, ...TICKERS].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-xs font-mono shrink-0">
            <span className="text-white/35">{t.pair}</span>
            <span className="text-white font-semibold">{t.val}</span>
            <span className={cn("flex items-center gap-0.5", t.up ? "text-emerald-400" : "text-rose-400")}>
              {t.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {t.chg}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Section Label
// ─────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="h-px w-6 bg-violet-500" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">{children}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// Reason Card
// ─────────────────────────────────────────────
function ReasonCard({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#0d0d18] p-6 transition-all duration-300 hover:border-violet-500/30 hover:bg-[#10101f]">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
        <Icon size={18} className="text-violet-400" />
      </div>
      <div>
        <h4 className="mb-1.5 text-sm font-bold text-white">{title}</h4>
        <p className="text-xs leading-relaxed text-white/45">{desc}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Course Card
// ─────────────────────────────────────────────
interface CourseCardProps {
  tier: string;
  title: string;
  price: string;
  desc: string;
  items: string[];
  featured?: boolean;
}
function CourseCard({ tier, title, price, desc, items, featured }: CourseCardProps) {
  return (
    <div className={cn(
      "relative flex flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1",
      featured
        ? "border-violet-500/60 bg-gradient-to-b from-violet-950/50 to-[#0d0d18]"
        : "border-white/[0.07] bg-[#0d0d18] hover:border-white/15"
    )}>
      {featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-violet-600 px-4 py-1.5">
          <Star size={10} className="text-white fill-white" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white">Most Popular</span>
        </div>
      )}
      <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">{tier}</div>
      <h3 className="mb-1 text-xl font-black text-white">{title}</h3>
      <p className="mb-6 text-xs text-white/40 leading-relaxed">{desc}</p>
      <div className="mb-6 flex items-baseline gap-1">
        <span className="text-4xl font-black text-white">{price}</span>
        {price !== "Custom" && <span className="text-sm text-white/30 mb-0.5">USD</span>}
      </div>
      <ul className="mb-8 flex flex-col gap-2.5">
        {items.map(item => (
          <li key={item} className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-500/15">
              <Check size={9} className="text-violet-400" strokeWidth={3} />
            </div>
            <span className="text-xs leading-relaxed text-white/60">{item}</span>
          </li>
        ))}
      </ul>
      <button className={cn(
        "mt-auto w-full rounded-xl py-3 text-sm font-bold tracking-wide transition-all duration-200",
        featured
          ? "bg-violet-600 text-white hover:bg-violet-500"
          : "border border-white/15 text-white/80 hover:border-white/30 hover:text-white"
      )}>
        Enroll Now
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Step
// ─────────────────────────────────────────────
function Step({ n, title, desc, last = false }: { n: string; title: string; desc: string; last?: boolean }) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center shrink-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/50 bg-violet-500/10 text-xs font-black text-violet-300">
          {n}
        </div>
        {!last && <div className="mt-2 w-px flex-1 bg-gradient-to-b from-violet-500/30 to-transparent min-h-[32px]" />}
      </div>
      <div className="pb-7">
        <h4 className="mb-1 text-sm font-bold text-white">{title}</h4>
        <p className="text-xs leading-relaxed text-white/45">{desc}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Testimonial Card
// ─────────────────────────────────────────────
function TestCard({ name, loc, quote, profit, up = true }: {
  name: string; loc: string; quote: string; profit: string; up?: boolean;
}) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2);
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#0d0d18] p-6 hover:border-violet-500/25 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-700/50 text-xs font-black text-violet-200">
            {initials}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{name}</p>
            <div className="flex items-center gap-1 text-xs text-white/35">
              <MapPin size={9} />
              {loc}
            </div>
          </div>
        </div>
        <div className={cn(
          "flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold",
          up ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
        )}>
          {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {profit}
        </div>
      </div>
      <p className="text-xs leading-relaxed text-white/50 italic">"{quote}"</p>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.07] last:border-b-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-violet-300"
      >
        <span className="text-sm font-semibold text-white/80">{q}</span>
        <div className={cn(
          "shrink-0 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-200",
          open ? "border-violet-500/50 bg-violet-500/10 text-violet-400 rotate-180" : "border-white/10 text-white/30"
        )}>
          <ChevronDown size={13} />
        </div>
      </button>
      {open && (
        <p className="pb-5 text-xs leading-relaxed text-white/45">{a}</p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────
export default function HomePage() {
  const statsRef = useInView(0.3);
  const students = useCounter(713, 2000, statsRef.inView);
  const profit = useCounter(971000, 2400, statsRef.inView);
  const countries = useCounter(5, 1000, statsRef.inView);
  const hours = useCounter(12000, 2200, statsRef.inView);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#05050a] text-white antialiased">

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-28">

        {/* Ambient glow — the only atmospheric effect, used with restraint */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.14) 0%, transparent 70%)" }} />

        {/* Star field */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 80}%`,
                width: `${Math.random() * 1.5 + 0.5}px`,
                height: `${Math.random() * 1.5 + 0.5}px`,
                opacity: Math.random() * 0.5 + 0.05,
                animation: `twinkle ${Math.random() * 5 + 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Eyebrow pill */}
        <div className="relative mb-8 flex items-center gap-2.5 rounded-full border border-violet-500/25 bg-violet-950/30 px-5 py-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
            Pakistan's First Elite Trading Institute
          </span>
        </div>

        {/* Headline */}
        <h1 className="relative max-w-4xl text-center font-black uppercase leading-none tracking-tighter text-white"
          style={{ fontSize: "clamp(2.8rem, 8vw, 7.5rem)" }}>
          Learn Trading
          <br />
          <span style={{ background: "linear-gradient(100deg, #7c3aed 0%, #a78bfa 45%, #c4b5fd 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            From The Minds
          </span>
          <br />
          Who Move Markets.
        </h1>

        <p className="relative mt-6 max-w-lg text-center text-sm leading-relaxed text-white/45">
          Forex, commodities, risk management, and trading psychology — through live institutional mentorship designed for long-term, consistent profitability.
        </p>

        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
          <button className="group flex items-center gap-2 rounded-full bg-violet-600 px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-violet-500 hover:gap-3">
            Enroll Now
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
          <button className="rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white/70 transition-all duration-200 hover:border-white/30 hover:text-white">
            Book Free Consultation
          </button>
        </div>

        {/* Trust line */}
        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            { icon: Users, label: "700+ Students" },
            { icon: Globe, label: "5 Countries" },
            { icon: Shield, label: "100% Money-Back" },
            { icon: Award, label: "0% Dropout Rate" },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-white/30">
              <Icon size={11} className="text-violet-400" />
              {label}
            </span>
          ))}
        </div>

        {/* Chart card */}
        <div className="relative mt-16 w-full max-w-xl">
          <CandlestickChart />
        </div>
      </section>

      {/* ── TICKER ───────────────────────────── */}
      <TickerBar />

      {/* ── STATS ────────────────────────────── */}
      <section ref={statsRef.ref} className="px-6 py-24 bg-[#07070e]">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <Label>By The Numbers</Label>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Results That Speak</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: Users, val: students, suffix: "+", label: "Students Trained" },
              { icon: DollarSign, val: profit, suffix: "+", label: "Cumulative Profit (USD)", format: true },
              { icon: Globe, val: countries, suffix: "", label: "Countries Worldwide" },
              { icon: Clock, val: hours, suffix: "+", label: "Hours of Mentorship", format: true },
            ].map(({ icon: Icon, val, suffix, label, format }) => (
              <div key={label} className="rounded-2xl border border-white/[0.07] bg-[#0d0d18] p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
                    <Icon size={16} className="text-violet-400" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white mb-1">
                  {format ? val.toLocaleString() : val}{suffix}
                </div>
                <div className="text-[11px] text-white/35 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SKILLS AURA ──────────────────── */}
      <section className="relative px-6 py-28 overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[500px] w-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.09) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-16">
            <Label>Our Edge</Label>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-3">Why Future Traders<br />Choose Skills Aura</h2>
            <p className="text-sm text-white/40 max-w-md">7 reasons we have a zero-dropout record and a 100% money-back guarantee.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ReasonCard icon={BarChart2} title="Golden Map Framework" desc="A structured institutional system to analyze markets with professional precision." />
            <ReasonCard icon={TrendingUp} title="Zero to Withdrawal" desc="We mentor you until you make and withdraw your very first real profit." />
            <ReasonCard icon={Layers} title="Institutional Mentorship" desc="Learn from traders who actively trade the markets — not just teach theory." />
            <ReasonCard icon={Target} title="Personalized Journey" desc="Every student follows a path tailored to their strengths and learning speed." />
            <ReasonCard icon={Award} title="Pakistan's First Premium Academy" desc="Setting a new national standard for how trading education is delivered." />
            <ReasonCard icon={Zap} title="Hands-On Practical" desc="Real charts. Real trades. Real-time guidance — zero empty theory." />
            <ReasonCard icon={Brain} title="Trading Psychology" desc="The discipline and emotional control that separates professionals from amateurs." />
            <ReasonCard icon={Repeat} title="Lifetime Skill" desc="Build a high-income skill that can generate consistent returns for decades." />
          </div>
        </div>
      </section>

      {/* ── LEARNING JOURNEY ─────────────────── */}
      <section className="bg-[#07070e] px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <div className="lg:sticky lg:top-24">
              <Label>The Roadmap</Label>
              <h2 className="mb-5 text-4xl font-black uppercase tracking-tighter text-white leading-none">
                Your Path To<br />Consistent Profits
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-white/45">
                Every student follows a structured, battle-tested roadmap. No shortcuts — only the exact framework that has produced 700+ profitable traders across 5 countries.
              </p>
              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { val: "3 mo", label: "Average to first trade" },
                  { val: "70%+", label: "Strategy win rate" },
                  { val: "4 mo", label: "To funded account" },
                  { val: "100%", label: "Money-back guarantee" },
                ].map(({ val, label }) => (
                  <div key={label} className="rounded-xl border border-white/[0.07] bg-[#0d0d18] p-4">
                    <p className="text-xl font-black text-violet-300 mb-0.5">{val}</p>
                    <p className="text-xs text-white/35">{label}</p>
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-bold text-white hover:bg-violet-500 transition-colors">
                Start Your Journey
                <ArrowRight size={14} />
              </button>
            </div>
            <div>
              <Step n="01" title="Market Foundations" desc="Candlesticks, chart reading, account setup, and trade execution from first principles." />
              <Step n="02" title="Market Structure" desc="Supply & demand zones, price action, trend identification, and institutional order flow." />
              <Step n="03" title="Risk Management" desc="Capital preservation rules, position sizing, stop-loss discipline, and account scaling." />
              <Step n="04" title="Trading Psychology" desc="Emotional control, journaling systems, discipline frameworks, and routine-building." />
              <Step n="05" title="Personal Strategy" desc="Build your own edge with a personally calibrated strategy achieving 70%+ win rate." />
              <Step n="06" title="Trade Independently" last desc="Live trading, funded account acquisition, and consistent withdrawals." />
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSES ──────────────────────────── */}
      <section className="relative px-6 py-28 overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-72 w-[700px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.11) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <Label>Enroll Today</Label>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-3">Choose Your Learning Path</h2>
            <p className="text-sm text-white/40 max-w-md mx-auto">All programs include mentorship until your first withdrawal — not just until course end.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            <CourseCard
              tier="Beginner"
              title="Basic Program"
              price="$420"
              desc="For those starting from absolute zero with no prior market knowledge."
              items={["Market basics & chart reading","Types of market trends","Account setup & trade execution","Introduction to risk management","Golden Map framework introduction","Live session access"]}
            />
            <CourseCard
              tier="Intermediate"
              title="Grooming Program"
              price="$280"
              desc="For traders who have foundational knowledge and need advanced refinement."
              featured
              items={["Advanced risk & money management","Emotional discipline framework","Personal trading journal system","Strategy development (70%+ win rate)","Finding & overcoming weak points","One-on-one coaching sessions","Funded account preparation"]}
            />
            <CourseCard
              tier="Professional"
              title="Special Slot"
              price="$1,060"
              desc="Complete institutional-level mentorship from absolute beginner to funded account."
              items={["Full Forex & commodity curriculum","Fundamental analysis (NFP, CPI, GDP)","Supply & demand deep-dive","Day & swing trading strategies","Account scaling methodology","Institutional concepts & order flow","Lifetime strategy access"]}
            />
          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL LEARN ────────────────── */}
      <section className="bg-[#07070e] px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <Label>Curriculum</Label>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">What You'll Master</h2>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5">
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
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-[#0d0d18] px-4 py-3.5 text-xs font-semibold text-white/55 transition-all hover:border-violet-500/30 hover:text-white/80">
                <Icon size={13} className="shrink-0 text-violet-400" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER ──────────────────────────── */}
      <section className="relative px-6 py-28 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[500px] w-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-5xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] aspect-[3/4] max-w-sm">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=85&auto=format"
                  alt="Bilal Rizwan, Director of Skills Aura"
                  className="h-full w-full object-cover object-top grayscale"
                  style={{ filter: "grayscale(20%) brightness(0.85)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-lg font-black text-white">Bilal Rizwan</p>
                      <p className="text-xs text-violet-300 font-semibold">Director & Lead Mentor</p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1">
                      <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      <span className="text-[10px] font-bold text-emerald-400">Live Trading</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Label>Meet The Founder</Label>
              <h2 className="mb-6 text-4xl font-black uppercase tracking-tighter text-white leading-none">
                Built By A Trader,<br />For Traders.
              </h2>
              <blockquote className="mb-6 border-l-2 border-violet-500 pl-5">
                <p className="text-base italic leading-relaxed text-white/55">
                  "Success in trading comes from skill, discipline, and consistency — not luck. Anyone can be taught to read markets. Few are taught to master themselves."
                </p>
              </blockquote>
              <p className="mb-4 text-sm leading-relaxed text-white/45">
                Skills Aura was built with one mission: to create truly independent traders who understand markets rather than relying on signals. After years of professional trading, Bilal and his team built the exact framework they wished they'd had from day one.
              </p>
              <p className="mb-8 text-sm leading-relaxed text-white/45">
                The Golden Map — a complete institutional trading framework — is the product of 5+ years of professional market experience, distilled into a 3-month curriculum.
              </p>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-bold text-white hover:bg-violet-500 transition-colors">
                  Enroll Now
                  <ArrowRight size={14} />
                </button>
                <button className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/70 hover:border-white/30 hover:text-white transition-colors">
                  <Phone size={13} />
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────── */}
      <section className="bg-[#07070e] px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <Label>Student Stories</Label>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-3">Real Results, Real Traders</h2>
            <p className="text-sm text-white/40">Verified outcomes from students across Pakistan, UK, UAE, and Canada.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <TestCard name="Mohammad Bilal" loc="Lahore, PK" quote="The perspective they give on trading is unbelievable. No mentor I've found comes close." profit="+$2,400" />
            <TestCard name="Malik Nauman" loc="Karachi, PK" quote="I attended four trading academies before this. I wish I had come here first." profit="+$1,800" />
            <TestCard name="Jason Kahn" loc="Bristol, UK" quote="If you actually want to start making consistent profit, this is the place to be." profit="+$5,100" />
            <TestCard name="Arsalan Nadeem" loc="Islamabad, PK" quote="Made my first $400 in 5 months — starting with zero prior knowledge." profit="+$400" />
          </div>
        </div>
      </section>

      {/* ── STUDENT SPOTLIGHT ────────────────── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-950/40 via-[#0d0d18] to-[#0d0d18] overflow-hidden p-10 lg:p-14">
            {/* Background grid */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: "linear-gradient(rgba(167,139,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-950/50 px-4 py-2">
                  <Award size={12} className="text-violet-400" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">Student Spotlight</span>
                </div>
                <h3 className="mb-4 text-3xl font-black uppercase tracking-tighter text-white leading-none">
                  Funded Account<br />At Age 16.
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-white/50">
                  Taha Shah became the youngest Skills Aura student to acquire a funded trading account — achieving this milestone in just 4 months of mentorship. He now trades professionally.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Age at funding", val: "16" },
                    { label: "Months to funded", val: "4" },
                    { label: "Strategy win rate", val: "71%" },
                    { label: "Status", val: "Funded" },
                  ].map(({ label, val }) => (
                    <div key={label} className="rounded-xl border border-white/[0.07] bg-black/30 p-4">
                      <p className="text-xs text-white/35 mb-1">{label}</p>
                      <p className="text-xl font-black text-violet-300">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] aspect-square max-w-xs mx-auto">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=85&auto=format"
                    alt="Taha Shah — youngest funded trader at Skills Aura"
                    className="h-full w-full object-cover"
                    style={{ filter: "brightness(0.8)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-sm font-black text-white">Taha Shah</p>
                    <p className="text-xs text-violet-300">Youngest Funded Trader</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GLOBAL MAP ───────────────────────── */}
      <section className="bg-[#07070e] px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <Label>Global Community</Label>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">Students Across The World</h2>
            <div className="flex items-center justify-center gap-2 text-xs text-white/30 mt-2">
              <MapPin size={11} className="text-violet-400" />
              Launched in Pakistan — February 2025
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0d0d18]">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png"
              alt="World map"
              className="w-full opacity-[0.08]"
              style={{ mixBlendMode: "luminosity" }}
            />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { flag: "PK", country: "Pakistan", students: "500+" },
                  { flag: "GB", country: "United Kingdom", students: "60+" },
                  { flag: "US", country: "United States", students: "45+" },
                  { flag: "CA", country: "Canada", students: "35+" },
                  { flag: "NO", country: "Norway", students: "20+" },
                ].map(({ flag, country, students }) => (
                  <div key={country}
                    className={cn("rounded-xl border px-5 py-3 text-center backdrop-blur-sm",
                      flag === "PK" ? "border-violet-500/40 bg-violet-950/50" : "border-white/10 bg-black/50"
                    )}>
                    <img
                      src={`https://flagcdn.com/24x18/${flag.toLowerCase()}.png`}
                      alt={country}
                      className="mx-auto mb-2 rounded-sm"
                      width={24} height={18}
                    />
                    <p className="text-xs font-bold text-white">{country}</p>
                    <p className="text-xs font-black text-violet-300">{students}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────── */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <Label>FAQ</Label>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Common Questions</h2>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d18] px-8 py-2">
            <FAQItem q="Can complete beginners join?" a="Absolutely. Our Basic Program starts from scratch — no prior trading knowledge is required. We cover everything from what a candlestick is to live trade execution." />
            <FAQItem q="Is this Forex or Commodity trading?" a="Both. We teach Forex (currency pairs including EUR/USD, GBP/USD) and Commodities (Gold/XAU, Oil/WTI), giving you multiple professional markets to trade." />
            <FAQItem q="Do you offer online classes?" a="Yes. We offer both in-person sessions in Pakistan and fully live online sessions via Zoom for students in the UK, UAE, Canada, and beyond." />
            <FAQItem q="How long does training take?" a="Most students complete the core curriculum in 3 months and begin live trading. Mentorship continues beyond completion until you achieve your first consistent withdrawal." />
            <FAQItem q="Is there a refund policy?" a="Yes — 100% money-back guarantee. If you complete the full program and feel you haven't genuinely learned, we refund you in full. No questions asked." />
            <FAQItem q="Will I get mentorship after the course ends?" a="Yes. We do not abandon students at course completion. Our team stays with you — through live sessions and direct access — until you are consistently profitable." />
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────── */}
      <section className="bg-[#07070e] px-6 py-28" id="contact">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <Label>Get In Touch</Label>
              <h2 className="mb-5 text-4xl font-black uppercase tracking-tighter text-white leading-none">
                Start Your Trading<br />Journey Today.
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-white/45">
                Fill out the form and a mentor will respond within 24 hours. Or reach us directly on WhatsApp for an immediate response.
              </p>
              <div className="flex flex-col gap-5">
                {[
                  { icon: Phone, label: "WhatsApp", val: "+92 322 6098992" },
                  { icon: Globe, label: "Serving", val: "Pakistan · UK · UAE · Canada · USA" },
                  { icon: Clock, label: "Response Time", val: "Within 24 hours" },
                  { icon: Lock, label: "Your data", val: "Private and never shared" },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
                      <Icon size={15} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-[11px] text-white/30 font-medium">{label}</p>
                      <p className="text-sm font-semibold text-white/75">{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d18] p-8">
              <h3 className="mb-1 text-lg font-black text-white">Book a Free Consultation</h3>
              <p className="mb-6 text-xs text-white/35">No commitment. A mentor will walk you through the right program for your goals.</p>
              <div className="flex flex-col gap-3">
                {["Full Name", "Email Address", "Phone Number", "City"].map(pl => (
                  <input key={pl} type="text" placeholder={pl}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-violet-500/50 focus:bg-white/[0.05]" />
                ))}
                <select className="w-full rounded-xl border border-white/[0.08] bg-[#0d0d18] px-4 py-3 text-sm text-white/50 outline-none focus:border-violet-500/50 transition-colors">
                  <option value="">Select a course</option>
                  <option>Basic Program — $420</option>
                  <option>Grooming Program — $280</option>
                  <option>Special Slot — $1,060</option>
                </select>
                <textarea rows={3} placeholder="Your question or message (optional)"
                  className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-violet-500/50" />
                <div className="flex gap-2.5 pt-1">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-sm font-bold text-white hover:bg-violet-500 transition-colors">
                    <Mail size={14} />
                    Send Message
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 py-3.5 text-sm font-semibold text-white/70 hover:border-white/30 hover:text-white transition-colors">
                    <MessageSquare size={14} />
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-36">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(124,58,237,0.22) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-3xl text-center">
          <Label>Join 700+ Traders</Label>
          <h2 className="mb-5 font-black uppercase leading-none tracking-tighter text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            Ready To Learn A<br />
            <span style={{ background: "linear-gradient(100deg, #7c3aed 0%, #a78bfa 45%, #c4b5fd 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              High-Income Skill?
            </span>
          </h2>
          <p className="mb-10 text-sm text-white/40 max-w-lg mx-auto leading-relaxed">
            Join Skills Aura and learn how institutional traders analyze markets, manage risk, and generate consistent income — for life.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="group flex items-center gap-2 rounded-full bg-violet-600 px-10 py-4 text-sm font-bold text-white hover:bg-violet-500 hover:scale-105 transition-all duration-200">
              Enroll Now — Start Today
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <button className="flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white/60 hover:border-white/30 hover:text-white transition-all">
              <Phone size={13} />
              Talk To An Advisor
            </button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { icon: Shield, label: "100% Money-Back Guarantee" },
              { icon: Users, label: "Live Mentorship Included" },
              { icon: Award, label: "0% Dropout Rate" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-white/25">
                <Icon size={11} className="text-violet-500" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL STYLES ────────────────────── */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.55; }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}