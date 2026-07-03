'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, Lock } from 'lucide-react';

export default function UserManagementPage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="space-y-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-4xl font-black uppercase tracking-tighter scale-y-110">User Management</h1>
        <p className="text-gray-400 font-medium mt-2">Oversee user accounts, roles, and security configurations.</p>
      </motion.div>

      {/* Main Content Card */}
      <motion.div variants={item}>
        <Card className="bg-[#111] border border-white/5 p-8 md:p-12">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-purple-500/10 rounded-3xl flex items-center justify-center border border-purple-500/20">
              <Users className="w-10 h-10 text-purple-500" />
            </div>
            
            <div className="space-y-2 max-w-lg">
              <h2 className="text-2xl font-black uppercase tracking-tighter">System Access Control</h2>
              <p className="text-gray-400 font-medium leading-relaxed">
                Management of user access levels is currently locked. Use the administrative portal to grant permissions or configure role-based access control (RBAC) for your team members.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <Button 
                disabled 
                className="h-12 px-8 bg-white/5 border border-white/10 text-gray-500 rounded-xl cursor-not-allowed hover:bg-white/5"
              >
                <Lock className="w-4 h-4 mr-2" /> View Management
              </Button>
              <Button 
                variant="outline"
                className="h-12 px-8 border-purple-500/20 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 rounded-xl"
              >
                <ShieldCheck className="w-4 h-4 mr-2" /> Configure Roles
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}