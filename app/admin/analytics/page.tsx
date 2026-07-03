'use client';

import { Card } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
  // Animation Variants
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  const metrics = [
    { label: 'Total Students', value: '000', change: '+0% from last month', icon: Users },
    { label: 'Completion Rate', value: '00%', change: '+0% from last month', icon: TrendingUp },
    { label: 'Avg. Rating', value: '0.0/5', change: 'Based on 0 reviews', icon: BarChart3 },
  ];

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="space-y-8 max-w-7xl mx-auto"
    >
      <motion.div variants={item}>
        <h1 className="text-4xl font-black uppercase tracking-tighter scale-y-110">Analytics</h1>
        <p className="text-gray-400 font-medium mt-2">View detailed course and enrollment performance metrics.</p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
              <div className="flex items-center justify-between pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{metric.label}</span>
                <Icon className="h-4 w-4 text-purple-500" />
              </div>
              <div className="text-4xl font-black text-white mb-2">{metric.value}</div>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">{metric.change}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Course Performance */}
      <motion.div variants={item} className="bg-[#111] border border-white/5 rounded-3xl p-8">
        <h2 className="text-lg font-black uppercase tracking-tighter scale-y-110 mb-8">Course Performance</h2>
        {/* <div className="space-y-8">
          {[
            { title: "Web Development Basics", count: "000 students", width: "0%" },
            { title: "Digital Marketing", count: "000 students", width: "0%" },
            { title: "Data Science 101", count: "000 students", width: "0%" }
          ].map((course, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-white">{course.title}</span>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">{course.count}</span>
              </div>
              <div className="w-full bg-black border border-white/5 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-purple-400 h-full rounded-full" 
                  style={{ width: course.width }} 
                />
              </div>
            </div>
          ))}
        </div> */}
      </motion.div>
    </motion.div>
  );
}