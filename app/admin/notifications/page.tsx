'use client';

import { motion } from 'framer-motion';
import { Bell, Settings2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotificationsPage() {
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
        <h1 className="text-4xl font-black uppercase tracking-tighter scale-y-110 mb-2">Notifications</h1>
        <p className="text-gray-400 font-medium">Manage your system alerts, updates, and configuration preferences.</p>
      </motion.div>

      <motion.div variants={item} className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center">
            <Bell className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">System Feed</h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">No active notifications</p>
          </div>
        </div>

        <div className="bg-black border border-white/5 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
          <Settings2 className="w-10 h-10 text-gray-700 mb-4" />
          <h3 className="text-white font-bold mb-2">All Caught Up</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-xs">You currently have no new notifications waiting to be processed.</p>
          
          <Button 
            disabled 
            className="bg-white/5 text-gray-500 hover:bg-white/5 border-none cursor-not-allowed uppercase tracking-widest font-bold text-xs"
          >
            No Notifications Found
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}