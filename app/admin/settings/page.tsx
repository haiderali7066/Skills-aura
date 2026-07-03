'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, User, Lock, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    window.location.href = '/sign-in';
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      initial="hidden" animate="visible" variants={fadeInUp}
      className="space-y-8 max-w-2xl mx-auto"
    >
      <div>
        <h1 className="text-4xl font-black uppercase tracking-tighter scale-y-110">Settings</h1>
        <p className="text-gray-400 font-medium mt-2">Configure your administrative preferences and account security.</p>
      </div>

      {/* Account Settings */}
      <section className="bg-[#111] border border-white/5 rounded-3xl p-8">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
          <User className="w-4 h-4 text-purple-500" /> Account Settings
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
            <Input type="email" placeholder="admin@skillsaura.com" disabled className="bg-black border-white/5 h-12 rounded-xl text-gray-500" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Display Name</label>
            <Input type="text" placeholder="Admin Name" className="bg-black border-white/5 h-12 rounded-xl focus:border-purple-500/50" />
          </div>
          <Button className="bg-purple-600 hover:bg-purple-500 text-white font-bold h-12 rounded-xl px-8">Save Changes</Button>
        </div>
      </section>

      {/* Security */}
      <section className="bg-[#111] border border-white/5 rounded-3xl p-8">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
          <Lock className="w-4 h-4 text-purple-500" /> Security
        </h2>
        <div className="space-y-4">
          <Input type="password" placeholder="Current Password" className="bg-black border-white/5 h-12 rounded-xl" />
          <Input type="password" placeholder="New Password" className="bg-black border-white/5 h-12 rounded-xl" />
          <Input type="password" placeholder="Confirm Password" className="bg-black border-white/5 h-12 rounded-xl" />
          <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold h-12 rounded-xl">Update Password</Button>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-red-500/5 border border-red-500/10 rounded-3xl p-8">
        <h2 className="text-sm font-bold uppercase tracking-widest text-red-500 mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4" /> Danger Zone
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Sign out from your admin account. You will need to re-authenticate to regain access to the control panel.
        </p>
        <Button 
          variant="ghost" 
          onClick={handleLogout} 
          disabled={loading}
          className="text-red-500 hover:text-red-400 hover:bg-red-500/10 font-bold h-12 rounded-xl px-6 flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> {loading ? 'Signing Out...' : 'Sign Out'}
        </Button>
      </section>
    </motion.div>
  );
}