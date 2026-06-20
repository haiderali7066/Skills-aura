"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaArrowRight, FaGlobe, FaUserTie } from 'react-icons/fa';
import { FiBookOpen, FiCalendar, FiMessageSquare, FiTrendingUp, FiMapPin, FiTarget, FiEye, FiUsers, FiShield } from 'react-icons/fi';

export default function AboutPage() {
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
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-purple-600 selection:text-white pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-black z-10 pt-32 px-6">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px', backgroundPosition: '0 0, 40px 40px' }}></div>
        <div className="absolute top-[-10vh] left-[10%] w-[80%] h-[50vh] bg-purple-900/30 blur-[150px] rounded-full pointer-events-none z-0"></div>

        <motion.div 
          className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span> Discover Our Ecosystem
          </motion.p>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 text-white drop-shadow-2xl scale-y-110 leading-[0.9]">
            ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">SKILLS AURA</span>
          </motion.h1>
          <motion.h2 variants={fadeInUp} className="text-xl md:text-2xl font-bold text-gray-300 mb-6">
            Building the next generation of skilled traders, professionals, and entrepreneurs through structured learning and real-world mentorship.
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-sm md:text-base max-w-2xl font-medium leading-relaxed">
            Skills Aura is a modern education and training platform designed to bridge the gap between traditional learning and real market experience. We focus on practical skills, structured courses, and career-driven mentorship programs.
          </motion.p>
        </motion.div>
      </section>

      {/* 9. STATS SECTION (Moved up for better flow) */}
      <section className="relative w-full border-y border-white/5 bg-[#050505] z-20">
        <motion.div 
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
        >
          {[
            { value: "1000+", label: "Students Enrolled" },
            { value: "Multiple", label: "Active Batches" },
            { value: "Growing", label: "Branch Network" },
            { value: "Real-Time", label: "CRM System" }
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeInUp} className="py-12 px-6 text-center">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</h3>
              <p className="text-[10px] uppercase font-bold tracking-widest text-purple-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 2. WHO WE ARE SECTION */}
      <section className="relative w-full py-32 px-6 md:px-20 bg-black z-20">
        <motion.div 
          className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
        >
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 scale-y-110">
              WHO WE ARE
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6 text-lg">
              Skills Aura is a CRM-powered education ecosystem where courses, batches, and student enrollments are fully managed through a centralized system.
            </p>
            <p className="text-gray-400 leading-relaxed mb-10">
              We are not just a learning platform — we are a structured training organization that connects students with real mentors, active communities, and career-focused programs.
            </p>
            
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Our System Ensures:</h4>
              {[
                "Organized course delivery",
                "Branch-based management",
                "Real-time student tracking",
                "Seamless enrollment process"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-sm text-gray-300 bg-[#111] border border-white/5 p-4 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-purple-900/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                    <FaCheck className="text-purple-500 text-xs" />
                  </div>
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Abstract Visual Representation */}
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-transparent blur-3xl rounded-full"></div>
            <div className="relative bg-[#050505] border border-white/10 rounded-[2rem] p-8 grid grid-cols-2 gap-4 shadow-2xl">
               <div className="bg-[#111] h-32 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                 <FiTarget className="text-2xl text-purple-400" />
                 <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Centralized CRM</span>
               </div>
               <div className="bg-[#111] h-32 rounded-xl border border-white/5 p-4 flex flex-col justify-between mt-8">
                 <FiUsers className="text-2xl text-purple-400" />
                 <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Active Communities</span>
               </div>
               <div className="bg-[#111] h-32 rounded-xl border border-white/5 p-4 flex flex-col justify-between -mt-8">
                 <FiTrendingUp className="text-2xl text-purple-400" />
                 <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Career Growth</span>
               </div>
               <div className="bg-[#111] h-32 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                 <FiMapPin className="text-2xl text-purple-400" />
                 <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Branch Network</span>
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3 & 4. MISSION & VISION */}
      <section className="relative w-full py-24 px-6 md:px-20 bg-[#050505] border-y border-white/5 z-20">
        <motion.div 
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        >
          {/* Mission Card */}
          <motion.div variants={fadeInUp} className="bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-3xl p-10 hover:border-purple-500/50 transition-colors group">
            <FiTarget className="text-4xl text-purple-500 mb-8" />
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 scale-y-110">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Our mission is to empower students with practical skills that lead to real income opportunities and professional growth. We aim to:
            </p>
            <ul className="space-y-4">
              {[
                "Deliver industry-relevant training",
                "Make education accessible across multiple cities",
                "Provide structured mentorship programs",
                "Build strong learning communities"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <FaCheck className="text-purple-500 mt-1 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Vision Card */}
          <motion.div variants={fadeInUp} className="bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-3xl p-10 hover:border-white/30 transition-colors group">
            <FiEye className="text-4xl text-white mb-8 group-hover:text-purple-400 transition-colors" />
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 scale-y-110">Our Vision</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              To become a leading global skill development platform where learning is structured, measurable, and directly connected to real-world success. We envision a future where every student has access to:
            </p>
            <ul className="space-y-4">
              {[
                "Practical education",
                "Mentorship support",
                "Career-focused training systems"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <FaCheck className="text-white group-hover:text-purple-400 transition-colors mt-1 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* 5. WHAT WE OFFER */}
      <section className="relative w-full py-32 px-6 md:px-20 bg-black z-20">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter scale-y-110 mb-4">WHAT WE OFFER</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">A comprehensive ecosystem designed to deliver results, support growth, and scale education seamlessly.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <FiBookOpen />, title: "🎓 Structured Courses", desc: "Professionally designed courses created and managed through our admin CRM system." },
              { icon: <FiCalendar />, title: "📅 Live Batches", desc: "City-based and online batches with limited seats for focused learning." },
              { icon: <FiMessageSquare />, title: "💬 Mentorship Access", desc: "Direct communication with instructors and support teams for personalized guidance." },
              { icon: <FiTrendingUp />, title: "📊 Progress Tracking", desc: "Students are monitored through intelligent enrollment and performance systems." },
              { icon: <FaGlobe />, title: "🌍 Branch System", desc: "Multiple city-based branches managed through super admin and branch admin roles." }
            ].map((card, i) => (
              <motion.div 
                key={i} variants={fadeInUp} 
                className={`bg-[#050505] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.02] transition-colors ${i === 3 ? 'lg:col-start-1 lg:col-end-3' : ''} ${i === 4 ? 'lg:col-start-3 lg:col-end-4' : ''}`}
              >
                <div className="text-3xl text-purple-500 mb-6">{card.icon}</div>
                <h3 className="text-lg font-bold text-white mb-4">{card.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 6. HOW IT WORKS SECTION */}
      <section className="relative w-full py-32 px-6 md:px-20 bg-[#050505] border-t border-white/5 z-20">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter scale-y-110">HOW SKILLS AURA WORKS</h2>
          </motion.div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {[
                { step: "01", title: "Choose Course", desc: "Browse available courses created by our admin panel." },
                { step: "02", title: "Select Batch", desc: "Pick your preferred city or online batch." },
                { step: "03", title: "Enroll & Pay", desc: "Complete secure payment via card or local methods." },
                { step: "04", title: "Get Access", desc: "Join your batch WhatsApp/Telegram group instantly." },
                { step: "05", title: "Start Learning", desc: "Begin your structured learning journey with your assigned batch." }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-full bg-black border-2 border-white/20 text-white font-black text-xl flex items-center justify-center mb-6 group-hover:border-purple-500 group-hover:bg-purple-900/20 group-hover:text-purple-400 transition-all z-10 relative">
                    {item.step}
                  </div>
                  <h3 className="text-md font-bold mb-3 uppercase tracking-widest">{item.title}</h3>
                  <p className="text-xs text-gray-500 font-medium px-2">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 7. WHY CHOOSE US & 8. LEADERSHIP */}
      <section className="relative w-full py-32 px-6 md:px-20 bg-black border-t border-white/5 z-20">
        <motion.div 
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        >
          {/* Why Choose Us */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter scale-y-110 mb-10">
              WHY SKILLS AURA?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
              {[
                "CRM-powered education system",
                "Branch-based structured learning",
                "Limited-seat batches for better focus",
                "Real mentorship, not just videos",
                "Organized student management system",
                "Scalable multi-city platform"
              ].map((reason, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <FiShield className="text-purple-400 text-[10px]" />
                  </div>
                  <span className="text-sm font-semibold text-gray-300">{reason}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Leadership */}
          <motion.div variants={fadeInUp} className="bg-[#050505] border border-white/10 rounded-3xl p-10">
            <h2 className="text-3xl font-black uppercase tracking-tighter scale-y-110 mb-10 border-b border-white/10 pb-6 text-white flex items-center gap-4">
              <FaUserTie className="text-purple-500" /> OUR LEADERSHIP
            </h2>
            <div className="space-y-8">
              {[
                { role: "Founder & CEO", desc: "Vision-driven leadership focused on structured education systems" },
                { role: "Branch Admins", desc: "City-level management ensuring smooth operations" },
                { role: "Mentors", desc: "Industry professionals guiding students through practical learning" }
              ].map((person, i) => (
                <div key={i}>
                  <h4 className="text-lg font-bold text-white mb-2">{person.role}</h4>
                  <p className="text-sm text-gray-400">{person.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 10. CALL TO ACTION */}
      <section className="relative w-full pt-32 pb-16 px-6 md:px-20 bg-black z-20">
        <div className="absolute top-1/2 left-1/2 w-[80%] h-[100%] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
        
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto text-center bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/10 rounded-[3rem] p-12 md:p-20 shadow-[0_0_80px_rgba(147,51,234,0.15)]"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 scale-y-110 drop-shadow-2xl">
            START YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">JOURNEY TODAY</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto">
            Join Skills Aura and become part of a structured learning system designed for real-world success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/courses" className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-widest px-10 py-5 rounded-full shadow-[0_0_40px_rgba(147,51,234,0.5)] transition-all flex items-center justify-center gap-3">
              Explore Courses <FaArrowRight />
            </a>
            <a href="/contact" className="bg-transparent border border-white/20 text-white text-sm font-bold uppercase tracking-widest px-10 py-5 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
              Contact Us
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}