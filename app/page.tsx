"use client"

import React, { useState, useEffect, useRef } from 'react';

import TestimonialsSection from '@/components/TestimonialsSection';

// ── Router shim (works standalone or inside Next/React Router) ──────────────
function useNavigate() {
  return (path) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };
}

// ── Reusable animated counter ──────────────────────────────────────────────
function AnimatedNumber({ target, suffix = '', prefix = '' }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 1800;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(step);
          else setValue(target);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{prefix}{value.toLocaleString()}{suffix}</span>;
}

// ── Scroll-reveal hook ────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Floating particle background ──────────────────────────────────────────
function ParticleField({ count = 30 }) {
  const [particles, setParticles] = useState<
    {
      id: number;
      x: number;
      y: number;
      size: number;
      speed: number;
      delay: number;
    }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 20 + 15,
        delay: Math.random() * -20,
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-purple-400 opacity-20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `float ${p.speed}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
} 

// ── Main Component ────────────────────────────────────────────────────────
export default function SkillsAuraHome() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [batchCity, setBatchCity] = useState('All');

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const featureDetails = {
    'Live Market Learning': 'Sessions happen during active market hours — you watch and execute real trades alongside mentors, not pre-recorded theory.',
    'Structured Roadmap': 'A clear 8-module progression from zero to independent trader, with weekly milestones and progress checkpoints.',
    'Expert Mentorship': 'Direct access to traders who manage real accounts. Ask questions, get trade reviews, and shadow real decisions.',
    'Community Access': 'A private Discord + WhatsApp group of 700+ active traders sharing setups, reviewing each others charts, and holding accountability.',
    'Independence Focus': 'The goal is never dependency — every lesson is designed to make you self-sufficient in reading markets and executing trades.',
  };

  const batches = [
    { date: 'July 5, 2025',  time: '8:00 PM – 10:00 PM PKT', loc: '🌐 Online via Zoom',    city: 'Online',    seats: 7,  total: 20 },
    { date: 'July 8, 2025',  time: '4:00 PM – 7:00 PM',      loc: '📍 Lahore Campus',      city: 'Lahore',    seats: 3,  total: 15 },
    { date: 'July 12, 2025', time: '6:00 PM – 9:00 PM',      loc: '📍 Islamabad Campus',   city: 'Islamabad', seats: 11, total: 20 },
    { date: 'July 18, 2025', time: '7:00 PM – 10:00 PM',     loc: '📍 Karachi Campus',     city: 'Karachi',   seats: 5,  total: 20 },
    { date: 'July 22, 2025', time: '9:00 AM – 11:00 AM PKT', loc: '🌐 Online via Zoom',    city: 'Online',    seats: 15, total: 20 },
    { date: 'Aug 1, 2025',   time: '2:00 PM – 5:00 PM',      loc: '📍 Lahore Campus',      city: 'Lahore',    seats: 18, total: 20 },
  ];

  const filteredBatches = batchCity === 'All' ? batches : batches.filter(b => b.city === batchCity);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-purple-600 selection:text-white">

      <style>{`
        @keyframes float {
          0%   { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          25%  { transform: translateY(-30px) translateX(10px); opacity: 0.4; }
          50%  { transform: translateY(-15px) translateX(-10px); opacity: 0.2; }
          75%  { transform: translateY(-40px) translateX(5px); opacity: 0.35; }
          100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
        }
        @keyframes gradientShift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 30px rgba(147,51,234,0.4); }
          50%      { box-shadow: 0 0 60px rgba(147,51,234,0.7); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-animate { animation: heroReveal 0.9s cubic-bezier(.16,1,.3,1) both; }
        .hero-delay-1 { animation-delay: 0.1s; }
        .hero-delay-2 { animation-delay: 0.25s; }
        .hero-delay-3 { animation-delay: 0.4s; }
        .hero-delay-4 { animation-delay: 0.55s; }
        .hero-delay-5 { animation-delay: 0.7s; }
        .gradient-text {
          background: linear-gradient(135deg, #fff 30%, #a855f7 60%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .animated-gradient-bg {
          background: linear-gradient(270deg, #0f0020, #000, #0a001a, #000);
          background-size: 400% 400%;
          animation: gradientShift 12s ease infinite;
        }
        .pulse-glow { animation: pulseGlow 3s ease-in-out infinite; }
        .spin-slow  { animation: spin-slow 20s linear infinite; }
        .card-hover {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(147,51,234,0.5);
          box-shadow: 0 16px 40px rgba(147,51,234,0.12);
        }
      `}</style>

      

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black z-10 pt-20">
        {/* Dot grid */}
        <div
          className="absolute inset-0 z-0 opacity-[0.08]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px' }}
        />
        {/* Floating particles */}
        <ParticleField count={40} />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-800/20 rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        {/* Slow-spin ring */}
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] border border-purple-500/10 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 spin-slow" />

        {heroVisible && (
          <div className="relative z-20 flex flex-col items-center text-center px-4 mt-[-5vh]">
            <p className="hero-animate hero-delay-1 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              Pakistan's First Elite Trading Academy
            </p>

            <h1 className="hero-animate hero-delay-2 text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
              <span className="gradient-text">LEARN TRADING.</span>
              <br />
              <span className="text-white">THE INSTITUTIONAL WAY.</span>
            </h1>

            <p className="hero-animate hero-delay-3 text-gray-300 text-base md:text-xl max-w-2xl font-medium mb-10 leading-relaxed">
              Master the markets through live market execution, expert mentorship, and a structured path to financial independence.
            </p>

            <div className="hero-animate hero-delay-4 flex flex-col sm:flex-row gap-4 mb-16">
              <button
                onClick={() => navigate('/enroll')}
                className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all pulse-glow"
              >
                Enroll Now
              </button>
              <button className="bg-transparent border border-white/20 text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Watch Video
              </button>
            </div>

            {/* Stats */}
            <div className="hero-animate hero-delay-5 flex flex-wrap justify-center gap-8 md:gap-16 text-center border-t border-white/10 pt-8">
              <div>
                <p className="text-3xl font-black tracking-tighter"><AnimatedNumber target={713} suffix="+" /></p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Students Trained</p>
              </div>
              <div>
                <p className="text-3xl font-black tracking-tighter text-purple-400"><AnimatedNumber target={971} prefix="$" suffix="K+" /></p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Student Profits</p>
              </div>
              <div>
                <p className="text-3xl font-black tracking-tighter"><AnimatedNumber target={5} /></p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Countries Reached</p>
              </div>
            </div>

            <div className="hero-animate hero-delay-5 flex flex-wrap justify-center gap-4 mt-6 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              <span className="bg-[#111] px-3 py-1 rounded-full border border-white/5">✓ Online & Physical</span>
              <span className="bg-[#111] px-3 py-1 rounded-full border border-white/5">✓ Live Mentorship</span>
              <span className="bg-[#111] px-3 py-1 rounded-full border border-white/5">✓ Community Access</span>
            </div>
          </div>
        )}

        {/* Glowing horizon */}
        <div className="absolute bottom-[-20vh] md:bottom-[-30vh] left-[-25%] w-[150%] h-[40vh] md:h-[50vh] bg-black rounded-t-[100%] border-t-2 border-purple-500 shadow-[0_-50px_150px_rgba(147,51,234,0.4)] z-10 pointer-events-none" />
      </section>

      {/* ── WHO IS THIS FOR ─────────────────────────────────────────────── */}
      <section className="relative w-full py-24 px-6 md:px-20 bg-black z-20 overflow-hidden">
        <div className="absolute inset-0 animated-gradient-bg opacity-40 pointer-events-none" />
        <div className="absolute right-[-10%] top-1/2 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 text-center leading-[0.95]">
              DESIGNED FOR <span className="text-purple-400">EVERY STAGE</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Beginner',          desc: 'Learn trading from absolute zero with no prior experience needed.' },
              { title: 'Student',           desc: 'Build a future skill and an additional income source while studying.' },
              { title: 'Job Holder',        desc: 'Trade alongside your career and build toward financial freedom.' },
              { title: 'Struggling Trader', desc: 'Fix mistakes, stop gambling, and learn institutional concepts.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div
                  className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 card-hover cursor-pointer h-full"
                  onClick={() => navigate('/enroll')}
                >
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">{item.desc}</p>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500">Enroll Now →</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SKILLS AURA + HOW IT WORKS ─────────────────────────────── */}
      <section
        id="about"
        className="relative w-full py-24 px-6 md:px-20 bg-[#050505] border-t border-b border-white/5 z-20 overflow-hidden"
      >
        <div className="absolute left-[-15%] top-0 w-[500px] h-[500px] bg-purple-950/30 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">

          {/* Why Skills Aura */}
          <div className="flex-1">
            <Reveal>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">The Institutional Edge</p>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                WHY <span className="text-purple-400">SKILLS AURA?</span>
              </h2>
            </Reveal>

            <div className="space-y-3 mb-10">
              {Object.keys(featureDetails).map((feature, i) => (
                <Reveal key={i} delay={i * 60}>
                  <button
                    className="w-full text-left flex justify-between items-center bg-black border border-white/5 p-5 rounded-xl transition-all hover:bg-[#111]"
                    onClick={() => setActiveFeature(activeFeature === feature ? null : feature)}
                  >
                    <span className="font-semibold">{feature}</span>
                    <span
                      className="text-xl font-light text-purple-500 transition-transform duration-300"
                      style={{ transform: activeFeature === feature ? 'rotate(45deg)' : 'none' }}
                    >+</span>
                  </button>
                  {activeFeature === feature && (
                    <div className="bg-[#0d0d0d] border border-purple-500/20 rounded-xl px-5 py-4 text-sm text-gray-300 leading-relaxed mt-1">
                      {featureDetails[feature]}
                    </div>
                  )}
                </Reveal>
              ))}
            </div>

            <button
              onClick={() => navigate('/enroll')}
              className="bg-white text-black text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-gray-200 transition-colors"
            >
              Start Your Journey
            </button>
          </div>

          {/* How It Works */}
          <div className="flex-1">
            <Reveal>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">The Process</p>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                HOW IT <span className="text-purple-400">WORKS</span>
              </h2>
            </Reveal>

            <div className="relative border-l border-purple-500/20 ml-4 space-y-8 pb-4">
              {[
                { step: '01', title: 'Learn',               desc: 'Master institutional concepts and market structure in live sessions.' },
                { step: '02', title: 'Practice',            desc: 'Apply strategies on demo accounts with real-time mentor supervision.' },
                { step: '03', title: 'Trade',               desc: 'Execute live trades with real capital, discipline, and risk management.' },
                { step: '04', title: 'Become Independent',  desc: 'Scale your account and trade profitably on your own — for life.' },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="relative pl-10">
                    <div className="absolute -left-[17px] top-1 w-8 h-8 bg-black border-2 border-purple-500 rounded-full flex items-center justify-center text-[10px] font-bold text-purple-400">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSES ─────────────────────────────────────────────────────── */}
      <section id="courses" className="w-full py-32 px-6 md:px-20 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-[-10%] w-[40%] h-[80%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
        <div className="absolute top-1/2 right-[-10%] w-[30%] h-[60%] bg-indigo-900/10 blur-[130px] rounded-full pointer-events-none -translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto flex flex-col items-center">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-center leading-[0.95]">
              OUR FLAGSHIP <span className="gradient-text">COURSES</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl text-center mb-16 mx-auto">
              Every course is designed to take you from where you are to where you want to be — profitably and independently.
            </p>
          </Reveal>

          <div className="w-full flex flex-col lg:flex-row gap-6 items-end justify-center">

            {/* Grooming */}
            <Reveal className="w-full lg:w-[30%]" delay={0}>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 shadow-xl card-hover h-full">
                <div className="inline-block bg-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">New Program</div>
                <h3 className="text-2xl font-bold mb-1">Grooming Program</h3>
                <p className="text-xs text-gray-400 mb-6 pb-6 border-b border-white/10">Psychology & Consistency Mastery</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-light">Rs. 5,000</span>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-8">Online Only · Intensive Format</p>
                <ul className="space-y-4 mb-10">
                  {['Trading Psychology Deep-Dive', 'Emotional Control Framework', 'Consistency & Discipline Systems', 'Journal & Review Methodology', 'Mindset of Professional Traders', 'Group Accountability Sessions'].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-gray-300">
                      <span className="text-purple-500 mt-0.5">✓</span> {feat}
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-bold text-purple-400 mb-6">✓ 4 Modules · 4 Weeks · Certificate</p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate('/enroll?course=grooming')}
                    className="w-full bg-white text-black text-xs font-bold uppercase tracking-widest py-3 rounded-full hover:bg-gray-200 transition-colors"
                  >Apply Now</button>
                  <button
                    onClick={() => navigate('/courses/grooming')}
                    className="w-full border border-white/20 text-white text-xs font-bold uppercase tracking-widest py-3 rounded-full hover:bg-white/5 transition-colors"
                  >View Details</button>
                </div>
              </div>
            </Reveal>

            {/* Ultimate Trader – elevated */}
            <Reveal className="w-full lg:w-[35%] lg:-translate-y-8" delay={100}>
              <div className="bg-gradient-to-b from-[#1a1025] to-[#0a0a0a] border border-purple-500/40 rounded-3xl p-8 shadow-[0_0_60px_rgba(147,51,234,0.2)] relative card-hover">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">Most Popular</div>
                <h3 className="text-3xl font-bold mb-1 text-white mt-4">Ultimate Trader™</h3>
                <p className="text-xs text-gray-400 mb-6 pb-6 border-b border-white/10">Basic to Expert — The Complete Journey</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-light text-white">Rs. 10,000</span>
                </div>
                <p className="text-[10px] text-purple-300 uppercase tracking-widest mb-8">Online & Physical · One-Time Fee</p>
                <ul className="space-y-4 mb-10">
                  {['Forex, Gold & Commodity Trading', 'Institutional Trading Concepts', 'Smart Money & Liquidity Theory', 'Risk Management Framework', 'Live Market Sessions', 'Trade Psychology & Discipline', 'Withdrawal & Account Growth', 'Lifetime Community Access'].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-200 font-medium">
                      <span className="text-purple-400 mt-0.5">✓</span> {feat}
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-bold text-white mb-8">✓ 8 Modules · 12 Weeks · Certificate</p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate('/enroll?course=ultimate')}
                    className="w-full bg-purple-600 text-white text-sm font-bold uppercase tracking-widest py-4 rounded-full hover:bg-purple-500 transition-colors shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                  >Apply Now</button>
                  <button
                    onClick={() => navigate('/courses/ultimate')}
                    className="w-full text-gray-300 text-xs font-bold uppercase tracking-widest py-3 hover:text-white transition-colors"
                  >View Details</button>
                </div>
              </div>
            </Reveal>

            {/* Special Slot */}
            <Reveal className="w-full lg:w-[30%]" delay={200}>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 shadow-xl card-hover h-full">
                <div className="inline-block bg-[#222] text-gray-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">Elite Access</div>
                <h3 className="text-2xl font-bold mb-1">Special Slot</h3>
                <p className="text-xs text-gray-400 mb-6 pb-6 border-b border-white/10">1-on-1 Private Mentorship</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-light">Custom</span>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-8">Consultation Required · Limited Slots</p>
                <ul className="space-y-4 mb-10">
                  {['Dedicated Personal Mentor', 'Custom Learning Path', 'Daily Trade Reviews', 'Direct WhatsApp Access', 'Portfolio Building Support', 'Funded Account Guidance'].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-gray-300">
                      <span className="text-purple-500 mt-0.5">✓</span> {feat}
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-bold text-gray-300 mb-6">✓ Fully Personalized · 1-to-1 · Ongoing</p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate('/consultation')}
                    className="w-full bg-white text-black text-xs font-bold uppercase tracking-widest py-3 rounded-full hover:bg-gray-200 transition-colors"
                  >Book Consultation</button>
                  <button
                    onClick={() => navigate('/courses/special-slot')}
                    className="w-full border border-white/20 text-white text-xs font-bold uppercase tracking-widest py-3 rounded-full hover:bg-white/5 transition-colors"
                  >Learn More</button>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── BATCHES ─────────────────────────────────────────────────────── */}
      <section id="batches" className="relative w-full py-24 px-6 md:px-20 bg-[#050505] border-t border-white/5 z-20 overflow-hidden">
        <div className="absolute right-0 top-0 w-[500px] h-full bg-gradient-to-l from-purple-950/20 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8 gap-6">
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Schedules</p>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">FIND YOUR <span className="text-purple-400">PERFECT BATCH</span></h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {['All', 'Online', 'Lahore', 'Islamabad', 'Karachi'].map(city => (
                  <button
                    key={city}
                    onClick={() => setBatchCity(city)}
                    className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all ${
                      batchCity === city
                        ? 'bg-white text-black'
                        : 'bg-transparent border border-white/20 text-gray-400 hover:text-white'
                    }`}
                  >
                    {city === 'Online' ? '🌐' : city !== 'All' ? '📍' : ''} {city}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBatches.map((batch, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="bg-black border border-white/10 rounded-2xl p-6 card-hover flex flex-col justify-between h-full">
                  <div>
                    <h4 className="text-2xl font-bold mb-1">{batch.date}</h4>
                    <p className="text-xs text-gray-400 mb-4 font-mono">{batch.time}</p>
                    <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-6">{batch.loc}</p>
                  </div>
                  <button
                    onClick={() => navigate('/enroll')}
                    className="w-full border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest py-2.5 rounded-full hover:bg-white hover:text-black transition-colors mt-4"
                  >
                    Select This Batch
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          {filteredBatches.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg mb-2">No batches found for {batchCity}.</p>
              <p className="text-sm">Check back soon or <button onClick={() => setBatchCity('All')} className="text-purple-400 underline">view all batches</button>.</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/enroll')}
              className="text-xs font-bold text-purple-400 uppercase tracking-widest hover:text-purple-300 transition-colors"
            >
              Secure Your Seat →
            </button>
          </div>
        </div>
      </section>

      



      <TestimonialsSection/>

      {/* ── FINAL CTA ───────────────────────────────────────────────────── */}
      <section className="relative w-full py-32 px-6 md:px-20 bg-black overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 animated-gradient-bg opacity-60 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-[80%] h-[100%] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              STOP WATCHING OTHERS
              <br />
              <span className="gradient-text">MAKE MONEY.</span>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto">
              Join Pakistan's Premium Trading Academy and learn an institutional skill that will last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/enroll')}
                className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-widest px-10 py-5 rounded-full pulse-glow transition-colors"
              >
                Enroll Now
              </button>
              <button
                onClick={() => navigate('/consultation')}
                className="bg-white text-black hover:bg-gray-200 text-sm font-bold uppercase tracking-widest px-10 py-5 rounded-full transition-colors"
              >
                Free Consultation
              </button>
            </div>
          </Reveal>
        </div>
      </section>

     
    </div>
  );
}

// ── Inline consultation mini-form ─────────────────────────────────────────
function ConsultationForm({ onSubmit }) {
  const [form, setForm]   = useState({ name: '', phone: '', course: '', time: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.phone) return alert('Please fill in your name and phone number.');
    setSubmitted(true);
    setTimeout(onSubmit, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-[#111] to-[#050505] border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl">
      <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Book Free Consultation</h3>
      <p className="text-xs text-gray-400 mb-8">Speak directly with an advisor to find the right path for you.</p>

      {submitted ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-purple-900/40 border border-purple-500/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="font-bold text-lg mb-1">You're booked in!</p>
          <p className="text-sm text-gray-400">Redirecting you to confirm your slot…</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <input
                name="name" value={form.name} onChange={handleChange}
                type="text" placeholder="Name"
                className="bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors w-full"
              />
              <input
                name="phone" value={form.phone} onChange={handleChange}
                type="tel" placeholder="Phone"
                className="bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors w-full"
              />
            </div>
            <select
              name="course" value={form.course} onChange={handleChange}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none focus:border-purple-500 transition-colors appearance-none"
            >
              <option value="">Select Course Interest</option>
              <option value="ultimate">Ultimate Trader Course</option>
              <option value="grooming">Grooming Program</option>
              <option value="special">Special Slot (1-on-1)</option>
            </select>
            <select
              name="time" value={form.time} onChange={handleChange}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none focus:border-purple-500 transition-colors appearance-none"
            >
              <option value="">Preferred Call Time</option>
              <option value="morning">Morning (9 AM – 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM – 5 PM)</option>
              <option value="evening">Evening (5 PM – 9 PM)</option>
            </select>
            <button
              onClick={handleSubmit}
              className="w-full bg-white text-black text-xs font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-gray-200 transition-colors mt-2"
            >
              Schedule Consultation
            </button>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Or talk to us instantly</p>
            <a
              href="https://wa.me/92XXXXXXXXXX"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-[#25D366]/20 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </>
      )}
    </div>
  );
}