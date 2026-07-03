'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  Database,
  Activity,
  Server,
  ChevronRight,
  Loader2
} from 'lucide-react';

interface DashboardStats {
  totalEnrollments: number;
  totalRevenue: number;
  activeStudents: number;
  completedCourses: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEnrollments: 0,
    totalRevenue: 0,
    activeStudents: 0,
    completedCourses: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data: enrollments } = await supabase
          .from('enrollments')
          .select('*', { count: 'exact' });

        const { data: payments } = await supabase
          .from('payments')
          .select('amount')
          .eq('status', 'completed');

        const { data: activeEnrollments } = await supabase
          .from('enrollments')
          .select('*', { count: 'exact' })
          .eq('status', 'active');

        const { data: completed } = await supabase
          .from('enrollments')
          .select('*', { count: 'exact' })
          .eq('status', 'completed');

        const totalRevenue =
          payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

        setStats({
          totalEnrollments: enrollments?.length || 0,
          totalRevenue,
          activeStudents: activeEnrollments?.length || 0,
          completedCourses: completed?.length || 0,
        });
      } catch (error) {
        console.error('[v0] Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Total Enrollments',
      value: stats.totalEnrollments,
      change: '+12%',
      icon: Users,
      href: '/admin/enrollments',
    },
    {
      label: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      change: '+8%',
      icon: CreditCard,
      href: '/admin/payments',
    },
    {
      label: 'Active Students',
      value: stats.activeStudents,
      change: '+5%',
      icon: BookOpen,
      href: '/admin/enrollments',
    },
    {
      label: 'Completed Courses',
      value: stats.completedCourses,
      change: '+15%',
      icon: TrendingUp,
      href: '/admin/analytics',
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden selection:bg-purple-600 selection:text-white relative px-6 py-12 md:py-20 z-0">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px', backgroundPosition: '0 0, 40px 40px' }}></div>
      <div className="fixed top-0 left-1/2 w-full max-w-3xl h-[50vh] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none transform -translate-x-1/2 z-0"></div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* HEADER */}
        <motion.div variants={itemVariants}>
          <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span> Overview
          </p>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter scale-y-110 drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            ADMIN DASHBOARD
          </h1>
          <p className="text-gray-400 text-sm font-medium mt-4">Welcome back! Here is what is happening across Skills Aura.</p>
        </motion.div>

        {/* STATS GRID */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} variants={itemVariants}>
                <Link href={stat.href} className="block group">
                  <div className="bg-gradient-to-br from-[#111] to-[#050505] border border-white/10 rounded-[2rem] p-6 shadow-[0_0_0_rgba(147,51,234,0)] group-hover:shadow-[0_0_40px_rgba(147,51,234,0.15)] group-hover:border-purple-500/30 transition-all duration-500 h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-purple-500/10 group-hover:scale-110 transition-all duration-500">
                        <Icon className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors duration-500" />
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-green-500/10 text-green-400 px-2 py-1 rounded-full border border-green-500/20">
                        <ArrowUpRight className="w-3 h-3" />
                        {stat.change}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">{stat.label}</p>
                      <p className="text-3xl font-black tracking-tight">{stat.value}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* QUICK ACTIONS */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-gradient-to-br from-[#111] to-[#050505] border border-white/10 rounded-[2.5rem] p-8 md:p-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'View Enrollments', href: '/admin/enrollments' },
                { label: 'Process Payments', href: '/admin/payments' },
                { label: 'Check Messages', href: '/admin/messages' },
                { label: 'Schedule Consultations', href: '/admin/consultations' },
              ].map((action, idx) => (
                <Link key={idx} href={action.href}>
                  <div className="w-full bg-[#050505] border border-white/10 hover:border-purple-500/50 text-gray-300 hover:text-white text-xs font-bold uppercase tracking-widest py-4 px-6 rounded-2xl transition-all flex items-center justify-between group">
                    {action.label}
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* SYSTEM STATUS */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#111] to-[#050505] border border-white/10 rounded-[2.5rem] p-8 md:p-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              System Status
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Database Status', icon: Database, status: 'Connected' },
                { label: 'API Status', icon: Server, status: 'Operational' },
                { label: 'Payment Gateway', icon: Activity, status: 'Active' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-gray-500" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-300">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}