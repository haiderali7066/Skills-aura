'use client';

import { motion } from 'framer-motion';
import { Share2, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReferralProgramPage() {
  // Animation Variants
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="space-y-8 max-w-4xl mx-auto"
    >
      <motion.div variants={item}>
        <h1 className="text-4xl font-black uppercase tracking-tighter scale-y-110">Referral Program</h1>
        <p className="text-gray-400 font-medium mt-2">Manage your growth loops and incentive configurations.</p>
      </motion.div>

      <motion.div variants={item} className="bg-[#111] border border-white/5 rounded-3xl p-10 flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
        {/* Decorative Glow */}
        <div className="absolute top-0 left-1/2 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full -translate-x-1/2"></div>
        
        <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mb-8 relative">
          <Share2 className="w-8 h-8 text-purple-500" />
        </div>

        <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">Coming Soon</h2>
        <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
          The referral management system is currently under development. This module will allow you to track advocates, manage payouts, and scale your user base.
        </p>

        <div className="flex gap-4">
          <Button disabled className="h-12 px-8 font-bold uppercase tracking-widest bg-white/5 border border-white/10 hover:bg-white/10 text-gray-500 cursor-not-allowed">
            <Clock className="w-4 h-4 mr-2" />
            Under Construction
          </Button>
          <Button className="h-12 px-8 font-bold uppercase tracking-widest bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]">
            <Zap className="w-4 h-4 mr-2" />
            Notify Me
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}