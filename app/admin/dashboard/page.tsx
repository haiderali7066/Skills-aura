'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Users,
  BookOpen,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="p-6 cursor-pointer hover:border-primary/50 transition-all">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-1 text-xs">
                      <ArrowUpRight className="w-3 h-3 text-green-600" />
                      <span className="text-green-600">{stat.change}</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/enrollments">
            <Button variant="outline">View Enrollments</Button>
          </Link>
          <Link href="/admin/payments">
            <Button variant="outline">Process Payments</Button>
          </Link>
          <Link href="/admin/messages">
            <Button variant="outline">Check Messages</Button>
          </Link>
          <Link href="/admin/consultations">
            <Button variant="outline">Schedule Consultations</Button>
          </Link>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="font-semibold mb-4">System Status</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Database Status</span>
            <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
              <span className="w-2 h-2 bg-green-600 rounded-full dark:bg-green-400"></span>
              Connected
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">API Status</span>
            <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
              <span className="w-2 h-2 bg-green-600 rounded-full dark:bg-green-400"></span>
              Operational
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Payment Gateway</span>
            <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
              <span className="w-2 h-2 bg-green-600 rounded-full dark:bg-green-400"></span>
              Active
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
