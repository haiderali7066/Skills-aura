"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaRegCalendarAlt, FaRegClock, FaSearch } from 'react-icons/fa';
import { FiTrendingUp, FiTarget, FiUser } from 'react-icons/fi';

// Mock Data with Real Image URLs
const FEATURED_POST = {
  title: "Mastering Institutional Order Blocks in Volatile Markets",
  excerpt: "Discover how elite traders identify true supply and demand zones, filter out retail noise, and execute high-probability setups using our proprietary volume-based methodologies.",
  category: "Technical Analysis",
  readTime: "8 min read",
  date: "June 18, 2026",
  author: "Lead Mentor",
  imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop", // Trading desk/charts
};

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Psychology of Managing a Prop Firm Funded Account",
    excerpt: "Passing the challenge is only step one. Learn the psychological frameworks required to maintain consistency and preserve capital when trading six-figure accounts.",
    category: "Trading Psychology",
    readTime: "6 min read",
    date: "June 12, 2026",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop", // Stock market screen
  },
  {
    id: 2,
    title: "Why Structured Learning Beats 'YouTube Surfing' Every Time",
    excerpt: "How our CRM-powered, multi-city branch ecosystem accelerates student success by providing structured curriculums, live batch accountability, and direct mentorship.",
    category: "Education",
    readTime: "5 min read",
    date: "June 05, 2026",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", // Data analysis/learning
  },
  {
    id: 3,
    title: "Top 5 Risk Management Mistakes Retail Traders Make",
    excerpt: "If you don't manage your risk, the market will manage it for you. We break down the most common lot-sizing errors and how to calculate dynamic risk dynamically.",
    category: "Risk Management",
    readTime: "7 min read",
    date: "May 28, 2026",
    imageUrl: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=800&auto=format&fit=crop", // Bear/Bull market risk
  },
  {
    id: 4,
    title: "Navigating High-Impact News Events Like a Professional",
    excerpt: "Should you trade NFP and CPI? A deep dive into liquidity sweeps, spread widening, and the institutional logic behind major macroeconomic data releases.",
    category: "Macro Economics",
    readTime: "10 min read",
    date: "May 20, 2026",
    imageUrl: "https://images.unsplash.com/photo-1612151855475-877969f4a6cc?q=80&w=800&auto=format&fit=crop", // Global finance / Macro
  },
  {
    id: 5,
    title: "What to Expect in Our Upcoming Grooming Program Batch",
    excerpt: "An inside look at our highly anticipated new cohort. Limited seats, rigorous weekly assessments, and 1-on-1 performance reviews.",
    category: "Academy News",
    readTime: "4 min read",
    date: "May 15, 2026",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop", // Classroom / Seminar
  },
  {
    id: 6,
    title: "The Evolution of Algorithmic Execution in Modern Forex",
    excerpt: "How automated logic and algorithmic execution are shaping the future of retail trading, and how you can adapt your manual strategies to survive.",
    category: "Market Insights",
    readTime: "9 min read",
    date: "May 08, 2026",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop", // Code/Algorithms
  }
];

const CATEGORIES = ["All", "Technical Analysis", "Trading Psychology", "Risk Management", "Academy News", "Market Insights"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter posts based on active category
  const filteredPosts = activeCategory === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
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
      {/* Added subtle radial background gradient to make the black pop */}
      <section className="relative w-full pt-32 pb-16 px-6 md:px-20 overflow-hidden z-10 border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px', backgroundPosition: '0 0, 40px 40px' }}></div>
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[60%] h-[60vh] bg-purple-900/30 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <motion.div 
          className="relative z-20 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <div className="max-w-2xl">
            <motion.p variants={fadeInUp} className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              Knowledge Hub
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-white drop-shadow-2xl scale-y-110 leading-[0.9]">
              INSIGHTS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">RESOURCES</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-400 text-sm md:text-base font-medium leading-relaxed">
              Master the markets with institutional strategies, psychological frameworks, and exclusive updates from the Skills Aura mentorship team.
            </motion.p>
          </div>

          {/* Search Bar */}
          <motion.div variants={fadeInUp} className="w-full md:w-72 relative">
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full bg-[#111] border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors">
              <FaSearch />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. FEATURED POST */}
      <section className="relative w-full py-20 px-6 md:px-20 z-20 bg-gradient-to-b from-black to-[#050505]">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
        >
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-purple-500/50"></span> Featured Article
          </h2>
          
          <div className="group relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col md:flex-row hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(147,51,234,0.1)] transition-all duration-500 cursor-pointer">
            {/* Visual Image Half */}
            <div className="w-full md:w-1/2 h-72 md:h-auto relative overflow-hidden">
              <img 
                src={FEATURED_POST.imageUrl} 
                alt={FEATURED_POST.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              {/* Gradient overlays to blend image with the dark theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r"></div>
              
              <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                {FEATURED_POST.category}
              </div>
            </div>

            {/* Content Half */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10 bg-gradient-to-l from-transparent to-[#0a0a0a]/90 md:to-transparent">
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                <span className="flex items-center gap-1.5"><FaRegCalendarAlt className="text-purple-500" /> {FEATURED_POST.date}</span>
                <span className="text-gray-700">|</span>
                <span className="flex items-center gap-1.5"><FaRegClock className="text-purple-500" /> {FEATURED_POST.readTime}</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter scale-y-110 mb-4 group-hover:text-purple-400 transition-colors leading-[1.1]">
                {FEATURED_POST.title}
              </h3>
              
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 line-clamp-3">
                {FEATURED_POST.excerpt}
              </p>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-widest">
                  <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center border border-purple-500/30">
                    <FiUser className="text-purple-500" />
                  </div>
                  {FEATURED_POST.author}
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all shadow-[0_0_15px_rgba(147,51,234,0)] group-hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]">
                  <FaArrowRight className="text-sm" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. CATEGORIES FILTER */}
      <section className="w-full px-6 md:px-20 z-20 pb-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto border-b border-white/5 pb-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-3 w-max">
            {CATEGORIES.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]' 
                    : 'bg-[#111] border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-900/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RECENT POSTS GRID */}
      {/* Background gradient added for depth beneath the grid */}
      <section className="w-full py-10 px-6 md:px-20 z-20 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/5 via-[#050505] to-[#050505]">
        <motion.div 
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        >
          {filteredPosts.map((post) => (
            <motion.article 
              key={post.id} 
              variants={fadeInUp}
              className="group bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-[0_15px_50px_rgba(147,51,234,0.15)] transition-all duration-500 flex flex-col cursor-pointer"
            >
              {/* Card Real Image */}
              <div className="h-56 w-full relative border-b border-white/5 overflow-hidden bg-black">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest text-gray-200 shadow-md">
                  {post.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 md:p-8 flex flex-col flex-grow bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">
                  <span className="flex items-center gap-1.5"><FaRegCalendarAlt className="text-purple-500/70" /> {post.date}</span>
                  <span className="text-gray-700">|</span>
                  <span className="flex items-center gap-1.5"><FaRegClock className="text-purple-500/70" /> {post.readTime}</span>
                </div>
                
                <h4 className="text-xl font-black uppercase tracking-tighter scale-y-110 mb-3 group-hover:text-purple-400 transition-colors leading-tight">
                  {post.title}
                </h4>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between text-xs font-bold uppercase tracking-widest text-white border-t border-white/5 pt-5 group-hover:text-purple-400 transition-colors">
                  Read Article
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-600/20 transition-colors">
                    <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-32 text-gray-500 font-bold uppercase tracking-widest text-sm bg-[#0a0a0a] rounded-2xl border border-white/5 mt-8">
            No articles found in this category.
          </div>
        )}
      </section>

      {/* 5. NEWSLETTER CTA SECTION */}
      <section className="relative w-full py-24 px-6 md:px-20 z-20 bg-black">
        <motion.div 
          className="max-w-4xl mx-auto bg-gradient-to-tr from-[#111] via-[#0a0514] to-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          {/* Abstract background glow for CTA */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="w-16 h-16 mx-auto bg-purple-900/30 rounded-2xl border border-purple-500/30 flex items-center justify-center mb-8 relative z-10 shadow-[0_0_30px_rgba(147,51,234,0.2)]">
            <FiTarget className="text-3xl text-purple-400" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 scale-y-110 relative z-10 drop-shadow-lg">
            STAY AHEAD OF THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">MARKET</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-medium mb-10 max-w-xl mx-auto relative z-10">
            Join thousands of traders receiving exclusive weekly insights, institutional breakdown videos, and upcoming batch announcements.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative z-10" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="flex-1 bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
            />
            <button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Subscribe <FiTrendingUp />
            </button>
          </form>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-6 relative z-10">No spam. Unsubscribe at any time.</p>
        </motion.div>
      </section>

    </div>
  );
}