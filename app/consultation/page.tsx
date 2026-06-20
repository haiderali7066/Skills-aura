'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import { FiClock, FiMessageSquare, FiTarget } from 'react-icons/fi';

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scheduledAt: '',
    durationMinutes: 30,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { supabase } = await import('@/lib/supabase');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        setError('Please sign in to book a consultation');
        return;
      }

      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          scheduledAt: formData.scheduledAt,
          durationMinutes: formData.durationMinutes,
          branchId: '', // Will be determined based on user preference
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to book consultation');
      }

      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        scheduledAt: '',
        durationMinutes: 30,
      });

      setTimeout(() => {
        window.location.href = '/account';
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
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
    <main className="min-h-screen bg-black text-white selection:bg-purple-600 selection:text-white relative overflow-hidden flex items-center justify-center py-20 px-6">
      
      {/* Background Ambient Effects */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px', backgroundPosition: '0 0, 40px 40px' }}></div>
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] max-w-3xl h-[50vh] bg-purple-900/30 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="container mx-auto max-w-2xl relative z-10">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="w-full"
        >
          {/* Header Section */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              Expert Guidance
            </p>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 scale-y-110 drop-shadow-2xl">
              BOOK A <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">CONSULTATION</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto font-medium">
              Connect with our elite advisors to discuss your trading goals, overcome psychological hurdles, and build a personalized learning roadmap.
            </p>
          </motion.div>

          {/* Main Card */}
          <motion.div variants={fadeInUp} className="bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            
            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-950/20 border border-green-500/30 rounded-2xl p-10 text-center flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
                  <FaCheckCircle className="text-4xl text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider">Session Booked!</h3>
                <p className="text-gray-400 text-sm">Your consultation has been successfully scheduled. Redirecting you to your account dashboard...</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Topic Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                    <FiTarget className="text-purple-500 text-sm" /> Consultation Topic
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Career Guidance, Strategy Review"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                    <FiMessageSquare className="text-purple-500 text-sm" /> Description
                  </label>
                  <textarea
                    placeholder="Tell us what you'd like to discuss in detail..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                  />
                </div>

                {/* Date/Time and Duration Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Date & Time Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                      <FaCalendarAlt className="text-purple-500 text-sm" /> Preferred Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.scheduledAt}
                      onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                      required
                      style={{ colorScheme: 'dark' }}
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>

                  {/* Duration Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                      <FiClock className="text-purple-500 text-sm" /> Duration
                    </label>
                    <select
                      value={formData.durationMinutes}
                      onChange={(e) => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) })}
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value={15}>15 Minutes</option>
                      <option value={30}>30 Minutes</option>
                      <option value={45}>45 Minutes</option>
                      <option value={60}>1 Hour</option>
                    </select>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-950/30 border border-red-500/30 rounded-xl text-red-400 text-xs font-bold uppercase tracking-widest text-center"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 disabled:cursor-not-allowed text-white text-sm font-bold uppercase tracking-widest py-5 rounded-xl shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="text-lg animate-spin" />
                        Confirming Slot...
                      </>
                    ) : (
                      'Book Consultation'
                    )}
                  </button>
                </div>

              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}