"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaInstagram, FaLinkedinIn, FaWhatsapp, FaGlobe } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

export default function Footer() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <footer className="relative w-full bg-black text-white border-t border-white/5 pt-24 pb-8 px-6 md:px-20 overflow-hidden z-40">
      
      {/* Subtle Upward Purple Horizon Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[150px] bg-purple-900/10 blur-[80px] rounded-b-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section: Brand & Primary Links Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.05 } }
          }}
        >
          {/* Column 1: Brand Identifier */}
          <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-white text-xl font-black tracking-tighter uppercase scale-y-105">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-purple-500" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
              Skills Aura
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-medium">
              Pakistan's first elite trading academy. Teaching institutional trading concepts through live markets, expert mentorship, and high-performance execution.
            </p>
            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: <FaYoutube />, link: "#" },
                { icon: <FaInstagram />, link: "#" },
                { icon: <FaLinkedinIn />, link: "#" },
                { icon: <FaWhatsapp />, link: "#" }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.link} 
                  className="w-9 h-9 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500 hover:bg-purple-950/20 transition-all duration-300 text-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Flagship Programs */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h5 className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Trading Programs</h5>
            <ul className="space-y-3 text-xs font-semibold text-gray-400">
              <li>
                <a href="/courses#ultimate-trader" className="hover:text-purple-400 transition-colors flex items-center justify-between group">
                  Ultimate Trader Course™ 
                  <span className="text-[9px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold tracking-normal">Popular</span>
                </a>
              </li>
              <li>
                <a href="/courses#grooming-program" className="hover:text-white transition-colors flex items-center justify-between group">
                  Grooming Program
                  <span className="text-[9px] bg-white/10 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold tracking-normal">New</span>
                </a>
              </li>
              <li>
                <a href="/courses#special-slot" className="hover:text-white transition-colors flex items-center justify-between group">
                  Special Slot 1-on-1
                  <span className="text-[9px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold tracking-normal">Elite</span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Ecosystem Navigation */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h5 className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Academy</h5>
            <ul className="space-y-3 text-xs font-semibold text-gray-400">
              <li><a href="/about" className="hover:text-white transition-colors">About Our Mission</a></li>
              <li><a href="/mentorship" className="hover:text-white transition-colors">Mentorship Model</a></li>
              <li><a href="/success-stories" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="/events" className="hover:text-white transition-colors">Events & Workshops</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Insights & Resources</a></li>
            </ul>
          </motion.div>

          {/* Column 4: Corporate & Actions */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h5 className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Get Connected</h5>
            <ul className="space-y-3 text-xs font-semibold text-gray-400">
              <li><a href="/partnerships" className="hover:text-white transition-colors">Become a Partner</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Support</a></li>
              <li>
                <a href="/consultation" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
                  Book Consultation <FiArrowUpRight className="text-sm shrink-0" />
                </a>
              </li>
              <li>
                <a href="/enroll" className="text-white bg-purple-600/10 border border-purple-500/20 px-3 py-1.5 rounded-full inline-block text-center text-[10px] font-bold uppercase tracking-widest hover:bg-purple-600 transition-all duration-300 mt-2">
                  Enroll Funnel
                </a>
              </li>
            </ul>
          </motion.div>

        </motion.div>

        {/* Bottom Section: Compliance, Risk Warnings & Legal Assets */}
        <div className="pt-12 space-y-8">
          
          {/* Metadata Meta Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <FaGlobe className="text-gray-600" />
              <span>Headquartered in Punjab, Pakistan · Global Student Access</span>
            </div>
            <p>© 2026 Skills Aura Academy. All rights reserved.  Developed by devntom solutions</p>
          </div>

          

          

        </div>

      </div>
    </footer>
  );
}