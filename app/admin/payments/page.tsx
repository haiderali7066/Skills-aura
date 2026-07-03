'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Payment } from '@/lib/types';
import { Search, Eye, CheckCircle, Clock, AlertCircle, XCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    async function fetchPayments() {
      try {
        const { data, error } = await supabase
          .from('payments')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPayments(data || []);
        setFilteredPayments(data || []);
      } catch (error) {
        console.error('[v0] Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, []);

  useEffect(() => {
    let filtered = payments;
    if (searchTerm) {
      filtered = filtered.filter((payment) =>
        payment.transaction_reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.stripe_payment_intent_id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter((payment) => payment.status === statusFilter);
    }
    setFilteredPayments(filtered);
  }, [searchTerm, statusFilter, payments]);

  const totalRevenue = payments.filter((p) => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter((p) => p.status === 'pending' || p.status === 'verification_required').reduce((sum, p) => sum + p.amount, 0);

  return (
    <motion.div 
      className="space-y-8 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-black uppercase tracking-tighter scale-y-110">Payments</h1>
        <p className="text-gray-400 font-medium mt-2">Manage and track your ecosystem transaction flow.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="bg-[#111] border border-white/5 rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Total Revenue</p>
          <p className="text-3xl font-black text-white">${totalRevenue.toFixed(2)}</p>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-[#111] border border-white/5 rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Pending Verification</p>
          <p className="text-3xl font-black text-white">${pendingAmount.toFixed(2)}</p>
        </motion.div>
      </div>

      {/* Filter/Search */}
      <motion.div variants={itemVariants} className="bg-[#111] border border-white/5 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search by ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black border-white/5 rounded-xl placeholder:text-gray-600 focus:border-purple-500/50"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-white/5 bg-black text-sm font-bold text-gray-300 outline-none focus:border-purple-500/50"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="verification_required">Verification Required</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </motion.div>

      {/* Payments Table */}
      <motion.div variants={itemVariants} className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-white/5">
          <h2 className="text-lg font-black uppercase tracking-tighter scale-y-110">Transactions ({filteredPayments.length})</h2>
        </div>
        
        {loading ? (
          <div className="text-center py-20 text-gray-500 font-medium">Loading transactions...</div>
        ) : filteredPayments.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-medium">No transactions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-black/20">
                <tr className="text-gray-500 uppercase text-[10px] font-bold tracking-widest">
                  <th className="text-left py-4 px-6">Amount</th>
                  <th className="text-left py-4 px-6">Status</th>
                  <th className="text-left py-4 px-6">Method</th>
                  <th className="text-left py-4 px-6">Reference</th>
                  <th className="text-left py-4 px-6">Date</th>
                  <th className="text-right py-4 px-6">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-bold text-white">${payment.amount.toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        payment.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                        payment.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                        payment.status === 'verification_required' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {payment.status === 'completed' && <CheckCircle className="w-3 h-3" />}
                        {payment.status === 'pending' && <Clock className="w-3 h-3" />}
                        {payment.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-400 text-xs">{payment.payment_method || 'Stripe'}</td>
                    <td className="py-4 px-6 font-mono text-xs text-gray-500">
                      {payment.transaction_reference?.substring(0, 12)}...
                    </td>
                    <td className="py-4 px-6 text-gray-400 text-xs">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}