'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setRegistered(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (userError) throw userError;

        // Route based on user role
        if (userData.role === 'super_admin' || userData.role === 'branch_admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/account');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      console.error('[v0] Sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden selection:bg-purple-600 selection:text-white flex items-center justify-center relative px-6 py-20">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px', backgroundPosition: '0 0, 40px 40px' }}></div>
      <div className="absolute top-1/2 left-1/2 w-[90%] max-w-3xl h-[60vh] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-0"></div>

      {/* MAIN AUTH CARD */}
      <motion.div 
        className="relative z-10 w-full max-w-lg bg-gradient-to-br from-[#111] to-[#050505] border border-white/10 rounded-[2.5rem] p-10 md:p-14 shadow-[0_0_80px_rgba(147,51,234,0.15)]"
        initial="hidden" animate="visible" variants={fadeInUp}
      >
        <div className="text-center mb-10">
          <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span> Authentication
          </p>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 scale-y-110 drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            WELCOME BACK
          </h1>
          <p className="text-gray-400 text-sm font-medium">Sign in to your Skills Aura account</p>
        </div>

        {/* ALERTS */}
        {registered && (
          <div className="flex gap-4 p-4 mb-8 bg-[#111] border border-green-500/30 rounded-2xl items-center">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-sm font-medium text-gray-300">
              Account created! Please sign in to continue.
            </p>
          </div>
        )}

        {error && (
          <div className="flex gap-4 p-4 mb-8 bg-[#111] border border-red-500/30 rounded-2xl items-center">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-sm font-medium text-gray-300">{error}</p>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 text-white placeholder-gray-600 rounded-2xl py-4 pl-12 pr-4 focus:border-purple-500 focus:outline-none transition-all focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-500">Password</label>
              <Link href="/forgot-password" className="text-[10px] uppercase font-bold tracking-widest text-purple-400 hover:text-purple-300 transition-colors">
                Forgot?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 text-white placeholder-gray-600 rounded-2xl py-4 pl-12 pr-4 focus:border-purple-500 focus:outline-none transition-all focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-widest py-5 rounded-full shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_50px_rgba(147,51,234,0.5)] transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-gray-500 font-medium">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-white hover:text-purple-400 font-bold transition-colors">
              Sign up here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}