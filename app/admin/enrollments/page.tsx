'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Enrollment, Course } from '@/lib/types';
import { Search, Eye, Filter } from 'lucide-react';

interface EnrollmentWithDetails extends Enrollment {
  courses?: Course;
  users?: { name: string; email: string };
}

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<EnrollmentWithDetails[]>([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState<EnrollmentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    async function fetchEnrollments() {
      try {
        const { data, error } = await supabase
          .from('enrollments')
          .select(`*, courses (*), users:user_id (name, email)`)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setEnrollments(data || []);
        setFilteredEnrollments(data || []);
      } catch (error) {
        console.error('[v0] Error fetching enrollments:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEnrollments();
  }, []);

  useEffect(() => {
    let filtered = enrollments.filter((e) =>
      (e.courses?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       e.users?.name?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || e.status === statusFilter)
    );
    setFilteredEnrollments(filtered);
  }, [searchTerm, statusFilter, enrollments]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      className="space-y-8 max-w-7xl mx-auto"
    >
      <div>
        <h1 className="text-4xl font-black uppercase tracking-tighter scale-y-110">Enrollments</h1>
        <p className="text-gray-400 font-medium mt-2">Manage your student pipeline and track course progress.</p>
      </div>

      {/* Filters */}
      <div className="bg-[#111] border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search by student or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 bg-black border-white/10 rounded-xl focus-visible:ring-purple-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-12 px-6 rounded-xl border border-white/10 bg-black text-sm font-bold uppercase tracking-widest text-gray-400 focus:outline-none focus:border-purple-500"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-white/5">
          <h2 className="font-black uppercase tracking-widest text-white">Active Enrollments ({filteredEnrollments.length})</h2>
        </div>
        
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading enrollment data...</div>
        ) : filteredEnrollments.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No records found matching your criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-black/50 text-gray-500 uppercase tracking-widest font-bold text-xs">
                <tr>
                  <th className="text-left py-4 px-8">Student</th>
                  <th className="text-left py-4 px-8">Course</th>
                  <th className="text-left py-4 px-8">Status</th>
                  <th className="text-left py-4 px-8">Date</th>
                  <th className="text-right py-4 px-8">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEnrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-purple-500/5 transition-colors">
                    <td className="py-4 px-8 font-medium">{enrollment.users?.name}</td>
                    <td className="py-4 px-8 text-gray-400">{enrollment.courses?.name}</td>
                    <td className="py-4 px-8">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        enrollment.status === 'active' ? 'bg-blue-500/10 text-blue-400' :
                        enrollment.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                        'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {enrollment.status}
                      </span>
                    </td>
                    <td className="py-4 px-8 text-gray-500">
                      {new Date(enrollment.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-8 text-right">
                      <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">
                        <Eye className="w-4 h-4 mr-2" /> View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}