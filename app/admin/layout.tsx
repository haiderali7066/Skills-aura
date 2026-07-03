'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { AdminSidebar } from '@/components/admin-sidebar';
import { UserRole } from '@/lib/types';
import { Loader2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          router.push('/sign-in');
          return;
        }

        const { data: userData, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (error || !userData) {
          router.push('/sign-in');
          return;
        }

        if (userData.role === 'user') {
          router.push('/account');
          return;
        }

        setUserRole(userData.role);
      } catch (error) {
        console.error('[v0] Auth check error:', error);
        router.push('/sign-in');
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
      </div>
    );
  }

  if (!userRole || (userRole !== 'super_admin' && userRole !== 'branch_admin')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="text-center space-y-4 bg-[#111] border border-red-500/20 p-10 rounded-3xl max-w-md shadow-[0_0_50px_rgba(239,68,68,0.1)]"
        >
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Access Denied</h1>
          <p className="text-gray-400 font-medium">You don&apos;t have the required administrative permissions to access this ecosystem.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white font-sans selection:bg-purple-600">
      <AdminSidebar userRole={userRole as 'super_admin' | 'branch_admin'} />
      <main className="flex-1 md:ml-64 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="relative z-10 p-6 md:p-10 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}