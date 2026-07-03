'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Consultation } from '@/lib/types';
import { Search, Calendar, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [filteredConsultations, setFilteredConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    async function fetchConsultations() {
      try {
        const { data, error } = await supabase
          .from('consultations')
          .select('*')
          .order('scheduled_at', { ascending: true });

        if (error) throw error;
        setConsultations(data || []);
        setFilteredConsultations(data || []);
      } catch (error) {
        console.error('[v0] Error fetching consultations:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchConsultations();
  }, []);

  useEffect(() => {
    let filtered = consultations;

    if (searchTerm) {
      filtered = filtered.filter((consultation) =>
        consultation.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((consultation) => consultation.status === statusFilter);
    }

    setFilteredConsultations(filtered);
  }, [searchTerm, statusFilter, consultations]);

  const scheduledCount = consultations.filter((c) => c.status === 'scheduled').length;
  const completedCount = consultations.filter((c) => c.status === 'completed').length;

  return (
    <motion.div 
      className="space-y-6 relative z-10"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          Consultations
        </h1>
        <p className="text-muted-foreground mt-1">Manage student consultations and schedule sessions</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[ 
          { label: 'Total Consultations', value: consultations.length },
          { label: 'Scheduled', value: scheduledCount },
          { label: 'Completed', value: completedCount }
        ].map((stat, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <Card className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-2xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative group">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search consultations by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 dark:bg-black/5 border-white/10 backdrop-blur-md focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 dark:bg-black/5 backdrop-blur-md focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no_show">No Show</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Consultations List */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
          <CardHeader>
            <CardTitle>Consultations ({filteredConsultations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground animate-pulse">Loading consultations...</div>
            ) : filteredConsultations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No consultations found</div>
            ) : (
              <div className="space-y-3">
                {filteredConsultations.map((consultation) => (
                  <motion.div
                    key={consultation.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start justify-between p-4 border border-white/10 dark:border-white/5 bg-white/5 dark:bg-black/20 rounded-xl hover:bg-white/10 dark:hover:bg-white/5 backdrop-blur-md transition-all duration-300"
                  >
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold">{consultation.title}</h3>
                      <p className="text-sm text-muted-foreground">{consultation.description}</p>
                      {consultation.scheduled_at && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2 bg-white/5 dark:bg-black/10 w-fit px-2 py-1 rounded-md">
                          <Calendar className="w-3 h-3" />
                          {new Date(consultation.scheduled_at).toLocaleString()}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium shadow-sm backdrop-blur-md ${
                        consultation.status === 'completed'
                          ? 'bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20'
                          : consultation.status === 'scheduled'
                          ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20'
                          : 'bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20'
                      }`}>
                        {consultation.status}
                      </span>
                      <Button variant="ghost" size="sm" className="gap-1 rounded-xl hover:bg-white/10 dark:hover:bg-white/10">
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}