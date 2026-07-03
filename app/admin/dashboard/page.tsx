'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Users, BookOpen, CreditCard, TrendingUp, 
  ArrowUpRight, Activity, CheckCircle2 
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
        const { data: enrollments } = await supabase.from('enrollments').select('*', { count: 'exact' });
        const { data: payments } = await supabase.from('payments').select('amount').eq('status', 'completed');
        const { data: activeEnrollments } = await supabase.from('enrollments').select('*', { count: 'exact' }).eq('status', 'active');
        const { data: completed } = await supabase.from('enrollments').select('*', { count: 'exact' }).eq('status', 'completed');

        const totalRevenue = payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

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

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  const statCards = [
    { label: 'Total Enrollments', value: stats.totalEnrollments, change: '+12%', icon: Users, href: '/admin/enrollments' },
    { label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, change: '+8%', icon: CreditCard, href: '/admin/payments' },
    { label: 'Active Students', value: stats.activeStudents, change: '+5%', icon: BookOpen, href: '/admin/enrollments' },
    { label: 'Completed Courses', value: stats.completedCourses, change: '+15%', icon: TrendingUp, href: '/admin/analytics' },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 max-w-7xl mx-auto">
      
      <motion.div variants={item}>
        <h1 className="text-4xl font-black uppercase tracking-tighter scale-y-110">Admin Dashboard</h1>
        <p className="text-gray-400 font-medium mt-2">Welcome back. Here is the pulse of the ecosystem.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link key={i} href={stat.href}>
              <div className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-all group shadow-lg">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{stat.label}</p>
                    <p className="text-3xl font-black text-white">{loading ? '...' : stat.value}</p>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-green-400">
                      <ArrowUpRight className="w-3 h-3" /> <span>{stat.change}</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-black border border-white/5 rounded-xl flex items-center justify-center group-hover:border-purple-500/30">
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item} className="bg-[#111] border border-white/5 rounded-3xl p-8">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
          <Activity className="w-4 h-4 text-purple-500" /> Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'View Enrollments', href: '/admin/enrollments' },
            { label: 'Process Payments', href: '/admin/payments' },
            { label: 'Check Messages', href: '/admin/messages' },
            { label: 'Schedule Consultations', href: '/admin/consultations' }
          ].map((action, i) => (
            <Link key={i} href={action.href}>
              <Button variant="outline" className="border-white/10 bg-transparent hover:bg-white/5 hover:border-purple-500/50 rounded-xl">
                {action.label}
              </Button>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* System Status */}
      <motion.div variants={item} className="bg-[#111] border border-white/5 rounded-3xl p-8">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" /> System Status
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: 'Database Status', val: 'Connected' },
            { label: 'API Routes', val: 'Operational' },
            { label: 'Payment Gateway', val: 'Active' },
          ].map((sys, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-black border border-white/5 rounded-2xl">
              <span className="text-xs font-bold text-gray-500 uppercase">{sys.label}</span>
              <span className="text-xs font-bold text-green-400 uppercase">{sys.val}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}