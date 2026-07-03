'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: formData.email,
            name: formData.name,
            role: 'user',
          });

        if (insertError) throw insertError;

        router.push('/sign-in?registered=true');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign up');
      console.error('[v0] Sign up error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-purple-600 selection:text-white flex items-center justify-center relative py-20 px-6">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px', backgroundPosition: '0 0, 40px 40px' }}></div>
      <div className="absolute top-1/2 left-1/2 w-[80vw] max-w-3xl h-[60vh] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-0"></div>

      <motion.div 
        className="relative z-10 w-full max-w-lg bg-gradient-to-br from-[#111] to-[#050505] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_0_80px_rgba(147,51,234,0.15)]"
        initial="hidden" animate="visible" variants={staggerContainer}
      >
        <div className="text-center mb-10">
          <motion.p variants={fadeInUp} className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span> Join The Ecosystem
          </motion.p>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 scale-y-110 drop-shadow-xl">
            CREATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">ACCOUNT</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-400 text-sm font-medium">
            Start your journey with structured learning and real mentorship.
          </motion.p>
        </div>

        {error && (
          <motion.div variants={fadeInUp} className="flex gap-3 p-4 mb-6 bg-red-500/10 border border-red-500/20 rounded-xl items-center">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm font-medium text-red-400">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div variants={fadeInUp}>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
              <Input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="pl-12 h-14 bg-black/50 border-white/10 rounded-xl text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
              <Input
                type="email"
                name="email"
                placeholder="john@skillsaura.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-12 h-14 bg-black/50 border-white/10 rounded-xl text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="pl-12 h-14 bg-black/50 border-white/10 rounded-xl text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Confirm Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
              <Input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-12 h-14 bg-black/50 border-white/10 rounded-xl text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="pt-4">
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-widest rounded-xl shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : (
                <>Sign Up Securely <ArrowRight className="w-4 h-4" /></>
              )}
            </Button>
          </motion.div>
        </form>

        <motion.p variants={fadeInUp} className="text-center text-sm text-gray-500 mt-8 font-medium">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors font-bold">
            Sign In
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}