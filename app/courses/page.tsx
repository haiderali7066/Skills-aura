"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTimes, FaWhatsapp, FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { FiClock, FiBookOpen, FiTrendingUp, FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';

export default function CoursesPage() {
  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-purple-600 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-black z-10 pt-20 px-6">
        {/* Starry background effect */}
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px', backgroundPosition: '0 0, 40px 40px' }}></div>
        
        {/* Purple Glowing Horizon */}
        <div className="absolute top-[-10vh] left-[10%] w-[80%] h-[50vh] bg-purple-900/30 blur-[150px] rounded-full pointer-events-none z-0"></div>

        <motion.div 
          className="relative z-20 flex flex-col items-center text-center max-w-5xl mx-auto"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span> Our Programs
          </motion.p>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 text-white drop-shadow-2xl scale-y-110 leading-[0.9]">
            CHOOSE THE RIGHT <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">TRADING PROGRAM</span> <br/> FOR YOUR GOALS
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-300 text-base md:text-xl max-w-3xl font-medium mb-12 leading-relaxed">
            Whether you're starting from zero, struggling with consistency, or looking for personalized mentorship, Skills Aura has a program designed for you.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
            <a href="/enroll" className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all shadow-[0_0_30px_rgba(147,51,234,0.4)] flex items-center justify-center gap-3">
              Enroll Now <FaArrowRight />
            </a>
            <button className="bg-transparent border border-white/20 text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/10 transition-colors">
              Free Consultation
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. COURSE COMPARISON OVERVIEW */}
      <section className="relative w-full py-24 px-6 md:px-20 bg-[#050505] border-t border-b border-white/5 z-20">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12 text-center scale-y-110">Program Comparison</h2>
          
          <div className="overflow-x-auto pb-6">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-6 px-6 text-xs text-gray-500 uppercase tracking-widest font-bold">Feature</th>
                  <th className="py-6 px-6 text-xl font-bold text-white text-center">Ultimate Trader</th>
                  <th className="py-6 px-6 text-xl font-bold text-white text-center">Grooming Program</th>
                  <th className="py-6 px-6 text-xl font-bold text-purple-400 text-center">Special Slot</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { feat: "Beginner Friendly", u: true, g: false, s: true },
                  { feat: "Live Sessions", u: true, g: true, s: true },
                  { feat: "Mentorship", u: true, g: true, s: true },
                  { feat: "Personal Mentor", u: false, g: false, s: true },
                  { feat: "Online Mode", u: true, g: true, s: true },
                  { feat: "Physical Campus", u: true, g: false, s: "Optional" },
                  { feat: "Duration", u: "12 Weeks", g: "4 Weeks", s: "Flexible" },
                  { feat: "Price", u: "Rs. 10,000", g: "Rs. 5,000", s: "Custom" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-300">{row.feat}</td>
                    <td className="py-5 px-6 text-center">
                      {typeof row.u === 'boolean' ? (row.u ? <FaCheck className="inline text-purple-500" /> : <FaTimes className="inline text-gray-700" />) : <span className="font-bold">{row.u}</span>}
                    </td>
                    <td className="py-5 px-6 text-center">
                      {typeof row.g === 'boolean' ? (row.g ? <FaCheck className="inline text-purple-500" /> : <FaTimes className="inline text-gray-700" />) : <span className="font-bold">{row.g}</span>}
                    </td>
                    <td className="py-5 px-6 text-center text-purple-300 bg-purple-900/10">
                      {typeof row.s === 'boolean' ? (row.s ? <FaCheck className="inline text-purple-400" /> : <FaTimes className="inline text-gray-700" />) : <span className="font-bold">{row.s}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-8">
            <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-white flex items-center gap-2 transition-colors">
              Scroll down for details <FaChevronDown />
            </button>
          </div>
        </motion.div>
      </section>

      {/* 3. FEATURED COURSE: ULTIMATE TRADER */}
      <section id="ultimate-trader" className="relative w-full py-32 px-6 md:px-20 bg-black z-20 overflow-hidden">
        {/* Abstract Glow */}
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <motion.div 
          className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
        >
          <div className="flex-1">
            <div className="inline-block bg-white text-black text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">Most Popular</div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 scale-y-110 leading-[0.9]">
              ULTIMATE TRADER COURSE™
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-gray-400 mb-6 border-b border-white/10 pb-6">Basic To Expert — The Complete Trading Journey</h3>
            
            <div className="flex items-center gap-6 mb-8">
              <span className="text-5xl font-light">Rs. 10,000</span>
              <span className="bg-[#111] border border-white/10 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-purple-400 flex items-center gap-2">
                <FiMapPin /> Online & Physical
              </span>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-10 max-w-xl">
              Designed for complete beginners and developing traders who want to learn institutional trading concepts from scratch and build the skills needed to trade independently.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              <div className="flex flex-col gap-2">
                <FiClock className="text-2xl text-purple-500 mb-1" />
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Duration</span>
                <span className="text-lg font-bold">12 Weeks</span>
              </div>
              <div className="flex flex-col gap-2">
                <FiBookOpen className="text-2xl text-purple-500 mb-1" />
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Modules</span>
                <span className="text-lg font-bold">8 Modules</span>
              </div>
              <div className="flex flex-col gap-2">
                <FiTrendingUp className="text-2xl text-purple-500 mb-1" />
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Level</span>
                <span className="text-lg font-bold">Beginner to Adv.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/enroll?course=ultimate-trader-course" className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full text-center transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)]">
                Apply Now
              </a>
              <a href="/courses/ultimate-trader-course" className="bg-transparent border border-white/20 text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/10 text-center transition-colors">
                View Curriculum
              </a>
            </div>
          </div>

          <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl">
            <h4 className="text-xl font-bold mb-6 uppercase tracking-widest text-white flex items-center gap-3">
              <span className="w-8 h-[2px] bg-purple-500"></span> What You'll Learn
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-10">
              {['Forex Trading', 'Gold Trading', 'Commodity Trading', 'Market Structure', 'Institutional Concepts', 'Smart Money Concepts', 'Liquidity Theory', 'Risk Management', 'Live Market Execution', 'Trade Psychology', 'Account Growth Strategies'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <FaCheck className="text-purple-500 mt-1 shrink-0" /> {item}
                </li>
              ))}
            </ul>

            <h4 className="text-xl font-bold mb-6 uppercase tracking-widest text-white flex items-center gap-3">
              <span className="w-8 h-[2px] bg-gray-500"></span> What's Included
            </h4>
            <div className="flex flex-wrap gap-3">
              {['Live Sessions', 'Community Access', 'Mentorship', 'Certificate'].map((item, i) => (
                <span key={i} className="bg-[#111] border border-white/5 px-4 py-2 rounded-full text-xs font-bold text-gray-400">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. GROOMING PROGRAM */}
      <section id="grooming-program" className="relative w-full py-32 px-6 md:px-20 bg-[#050505] border-t border-b border-white/5 z-20">
        <motion.div 
          className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse gap-16 relative z-10"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
        >
          <div className="flex-1">
            <div className="inline-block bg-pink-500/20 text-pink-400 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">New Program</div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 scale-y-110 leading-[0.9]">
              GROOMING PROGRAM
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-gray-400 mb-6 border-b border-white/10 pb-6">Psychology & Consistency Mastery</h3>
            
            <div className="flex items-center gap-6 mb-8">
              <span className="text-5xl font-light">Rs. 5,000</span>
              <span className="bg-[#111] border border-white/10 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-pink-400 flex items-center gap-2">
                <FiUsers /> Online Only
              </span>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-10 max-w-xl">
              Designed for traders who already know the basics but struggle with discipline, emotional control, consistency, and execution. Stop gambling and start trading professionally.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              <div className="flex flex-col gap-2">
                <FiClock className="text-2xl text-pink-500 mb-1" />
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Duration</span>
                <span className="text-lg font-bold">4 Weeks</span>
              </div>
              <div className="flex flex-col gap-2">
                <FiBookOpen className="text-2xl text-pink-500 mb-1" />
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Modules</span>
                <span className="text-lg font-bold">4 Modules</span>
              </div>
              <div className="flex flex-col gap-2">
                <FiTrendingUp className="text-2xl text-pink-500 mb-1" />
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Level</span>
                <span className="text-lg font-bold">Intermediate</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/enroll?course=grooming-program" className="bg-white text-black text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full text-center hover:bg-gray-200 transition-colors">
                Apply Now
              </a>
              <a href="/courses/grooming-program" className="bg-transparent border border-white/20 text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/10 text-center transition-colors">
                View Curriculum
              </a>
            </div>
          </div>

          <div className="flex-1 bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-3xl p-8 lg:p-12 shadow-xl">
            <h4 className="text-xl font-bold mb-6 uppercase tracking-widest text-white flex items-center gap-3">
              <span className="w-8 h-[2px] bg-pink-500"></span> What You'll Learn
            </h4>
            <ul className="space-y-4 mb-10">
              {['Trading Psychology', 'Emotional Control', 'Discipline Framework', 'Trading Journal Systems', 'Performance Review', 'Professional Mindset Development'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <FaCheck className="text-pink-500 mt-1 shrink-0" /> {item}
                </li>
              ))}
            </ul>

            <h4 className="text-xl font-bold mb-6 uppercase tracking-widest text-white flex items-center gap-3">
              <span className="w-8 h-[2px] bg-gray-500"></span> What's Included
            </h4>
            <div className="flex flex-wrap gap-3">
              {['Group Sessions', 'Accountability Support', 'Community Access', 'Certificate'].map((item, i) => (
                <span key={i} className="bg-black border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-gray-400">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. SPECIAL SLOT (Elite) */}
      <section id="special-slot" className="relative w-full py-32 px-6 md:px-20 bg-black z-20">
        <motion.div 
          className="max-w-5xl mx-auto bg-[#050505] border border-purple-500/30 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-[0_0_80px_rgba(147,51,234,0.15)]"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
        >
          {/* Subtle bg glow inside card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-purple-900/20 blur-[100px] pointer-events-none"></div>

          <div className="relative z-10">
            <div className="inline-block bg-[#111] border border-white/10 text-gray-300 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">Elite Access</div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 scale-y-110">
              1-ON-1 PRIVATE MENTORSHIP
            </h2>
            <p className="text-xl font-bold text-purple-400 mb-6">Custom Pricing • Fully Personalized</p>
            
            <p className="text-gray-300 leading-relaxed mb-12 max-w-2xl mx-auto">
              A completely customized mentorship experience for individuals seeking direct guidance, faster growth, and personal support tailored exactly to your schedule and skill level.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto text-left">
               <div className="bg-black border border-white/5 rounded-2xl p-6">
                 <h4 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-4">Includes</h4>
                 <ul className="space-y-3">
                   {['Dedicated Mentor', 'Custom Learning Path', 'Personal Reviews'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-400"><FaCheck className="text-purple-500"/> {item}</li>
                   ))}
                 </ul>
               </div>
               <div className="bg-black border border-white/5 rounded-2xl p-6">
                 <h4 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-4">Support</h4>
                 <ul className="space-y-3">
                   {['Direct WhatsApp Access', 'Trade Development', 'Portfolio Building'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-400"><FaCheck className="text-purple-500"/> {item}</li>
                   ))}
                 </ul>
               </div>
               <div className="bg-black border border-white/5 rounded-2xl p-6 flex flex-col justify-center gap-4">
                 <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">One-on-One</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Ongoing</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Limited Availability</span>
                 </div>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-black text-sm font-bold uppercase tracking-widest px-10 py-4 rounded-full text-center hover:bg-gray-200 transition-colors">
                Book Consultation
              </button>
              <a href="/courses/special-slot" className="bg-transparent border border-white/20 text-white text-sm font-bold uppercase tracking-widest px-10 py-4 rounded-full hover:bg-white/10 text-center transition-colors">
                Learn More
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. WHICH COURSE IS RIGHT FOR YOU? */}
      <section className="relative w-full py-24 px-6 md:px-20 bg-[#050505] border-t border-white/5 z-20">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12 text-center scale-y-110">
            WHICH COURSE IS RIGHT FOR YOU?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { type: "Beginner", rec: "Ultimate Trader Course™", cta: "Start Here", link: "/enroll", border: "hover:border-purple-500" },
              { type: "Losing Trader", rec: "Grooming Program", cta: "Improve Consistency", link: "/enroll", border: "hover:border-pink-500" },
              { type: "Serious Trader", rec: "Special Slot", cta: "Book Consultation", link: "#", border: "hover:border-white" }
            ].map((card, i) => (
              <motion.div 
                key={i} variants={fadeInUp} whileHover={{ y: -5 }}
                className={`bg-black border border-white/10 rounded-2xl p-8 flex flex-col justify-between transition-colors cursor-pointer group ${card.border}`}
              >
                <div>
                  <h3 className="text-xl font-bold mb-6 text-gray-300">{card.type}</h3>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-600 mb-1">Recommended:</p>
                  <p className="text-lg font-bold text-white mb-10 group-hover:text-purple-400 transition-colors">{card.rec}</p>
                </div>
                <a href={card.link} className="flex items-center justify-between text-xs font-bold uppercase tracking-widest border-t border-white/10 pt-6 group-hover:text-white text-gray-500 transition-colors">
                  {card.cta} <FaArrowRight />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 7. UPCOMING BATCHES PREVIEW */}
      <section className="relative w-full py-24 px-6 md:px-20 bg-black border-t border-white/5 z-20">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        >
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8 gap-6">
            <motion.div variants={fadeInUp}>
              <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-2">Live Training</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter scale-y-110">UPCOMING BATCHES</h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Ultimate Trader", date: "June 1, 2025", time: "8:00 PM – 10:00 PM", mode: "🌐 Online via Zoom", seats: 7, total: 20 },
              { name: "Ultimate Trader", date: "June 5, 2025", time: "4:00 PM – 7:00 PM", mode: "📍 Lahore Campus", seats: 3, total: 15 },
              { name: "Grooming Program", date: "June 15, 2025", time: "7:00 PM – 9:00 PM", mode: "🌐 Online Only", seats: 12, total: 20 }
            ].map((batch, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-[#050505] border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-colors flex flex-col justify-between">
                <div>
                  <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-white font-bold uppercase tracking-widest mb-4 inline-block">{batch.name}</span>
                  <h4 className="text-2xl font-bold mb-1 flex items-center gap-2"><FiCalendar className="text-purple-400"/> {batch.date}</h4>
                  <p className="text-xs text-gray-400 mb-4 font-mono pl-7">{batch.time}</p>
                  <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mb-6 pl-7">{batch.mode}</p>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">
                    <span>{batch.seats} seats remaining</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden mb-6">
                    <div className="h-full bg-purple-500" style={{ width: `${((batch.total - batch.seats) / batch.total) * 100}%` }}></div>
                  </div>
                  <a href={`/enroll?batch=${i}`} className="block w-full border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest py-3 text-center rounded-full hover:bg-white hover:text-black transition-colors">
                    Select Batch
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 8. FAQS */}
      <section className="relative w-full py-24 px-6 md:px-20 bg-[#050505] border-t border-white/5 z-20">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12 text-center scale-y-110">FREQUENTLY ASKED QUESTIONS</h2>
          
          <div className="space-y-4">
            {[
              { q: "Do I need previous experience?", a: "No. The Ultimate Trader Course starts from the basics and builds you up to advanced institutional concepts." },
              { q: "Are classes online or physical?", a: "Both options are available depending on the batch you select for the Ultimate Trader course. The Grooming Program is exclusively online." },
              { q: "How do I enroll?", a: "Choose a course, select a batch that fits your schedule, and complete the card payment through our secure portal." },
              { q: "Will I get WhatsApp and Telegram access?", a: "Yes, immediately after successful enrollment, you will receive invite links to our private community groups." },
              { q: "Can I book a consultation before enrolling?", a: "Yes. We encourage booking a free consultation if you are unsure which program is the right fit for your current skill level." }
            ].map((faq, i) => (
              <div key={i} className="border border-white/10 bg-black rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-bold text-lg">{faq.q}</span>
                  <FaChevronDown className={`transform transition-transform duration-300 text-purple-500 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: "auto", opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-gray-400 text-sm leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 9 & 10. CTAS (Consultation + Final Enrollment) */}
      <section className="relative w-full py-32 px-6 md:px-20 bg-black overflow-hidden border-t border-white/5 z-20">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 w-[80%] h-[100%] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-16">
          
          {/* Consultation CTA Card */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="bg-gradient-to-r from-[#111] to-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
          >
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Need Help Choosing?</h3>
              <p className="text-sm text-gray-400">Talk with our team and get personalized guidance based on your goals and experience level.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
              <button className="bg-white text-black text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-gray-200 transition-colors">
                Book Free Consultation
              </button>
              <button className="bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#25D366]/20 transition-colors flex items-center justify-center gap-2">
                <FaWhatsapp className="text-lg" /> Chat On WhatsApp
              </button>
            </div>
          </motion.div>

          {/* Final Huge CTA */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mt-10"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 scale-y-110 leading-[0.9] drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
              YOUR TRADING <br/> JOURNEY STARTS HERE
            </h2>
            <p className="text-gray-300 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto">
              Choose your program, secure your seat, and take the first step toward becoming a confident, independent trader.
            </p>
            <div className="flex justify-center gap-4">
              <a href="/enroll" className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-widest px-12 py-5 rounded-full shadow-[0_0_40px_rgba(147,51,234,0.5)] transition-all">
                Enroll Now
              </a>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}