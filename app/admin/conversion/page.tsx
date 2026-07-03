'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Users, Target, Activity } from 'lucide-react';

export default function ConversionPage() {
  // Animation Variants
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="space-y-8 max-w-7xl mx-auto"
    >
      <motion.div variants={item}>
        <h1 className="text-4xl font-black uppercase tracking-tighter scale-y-110">Conversion Metrics</h1>
        <p className="text-gray-400 font-medium mt-2">Analyze visitor-to-customer conversion pathways.</p>
      </motion.div>

      {/* Conversion Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Visitor Count', value: '000', icon: Users },
          { label: 'Conversions', value: '000', icon: Target },
          { label: 'Conversion Rate', value: '00%', icon: BarChart3 },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{stat.label}</span>
                <Icon className="h-4 w-4 text-purple-500" />
              </div>
              <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">This Month</div>
            </div>
          );
        })}
      </motion.div>

      {/* Conversion Pipeline Card */}
      <motion.div variants={item} className="bg-[#111] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-5 h-5 text-purple-500" />
          <h2 className="text-lg font-black uppercase tracking-tighter scale-y-110">Conversion Pipeline</h2>
        </div>
        
        <p className="text-gray-400 font-medium mb-8 max-w-lg">
          Deep-dive analytics for the conversion funnel are currently being calibrated. 
          Monitor this space for real-time visualization updates.
        </p>

        <Button 
          disabled 
          className="bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl px-6 h-12 uppercase tracking-widest text-xs font-bold transition-all"
        >
          View Detailed Analytics <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
}