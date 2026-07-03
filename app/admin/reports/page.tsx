'use client';

import { motion } from 'framer-motion';
import { FileText, Download, Filter, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReportsAndAnalyticsPage() {
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
        <h1 className="text-4xl font-black uppercase tracking-tighter scale-y-110">Reports & Analytics</h1>
        <p className="text-gray-400 font-medium mt-2">Manage, configure, and export your system data insights.</p>
      </motion.div>

      <motion.div variants={item} className="bg-[#111] border border-white/5 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full"></div>
        
        <div className="flex flex-col items-center text-center space-y-6 relative z-10">
          <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center">
            <FileText className="w-10 h-10 text-purple-500" />
          </div>
          
          <div className="max-w-md">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">Configure Reports</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Unlock advanced reporting features to gain deeper insights into your ecosystem performance. 
              Configure your preferences to begin generating automated data streams.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 h-12 rounded-xl transition-all">
              <Filter className="w-4 h-4 mr-2" />
              Configure Filters
            </Button>
            <Button variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5 h-12 rounded-xl px-8">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'System Overview', desc: 'High-level performance health checks.' },
          { title: 'Revenue Analytics', desc: 'Detailed breakdown of financial inflows.' }
        ].map((card, i) => (
          <div key={i} className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
            <BarChart3 className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="font-bold text-white mb-1">{card.title}</h3>
            <p className="text-xs text-gray-500">{card.desc}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}