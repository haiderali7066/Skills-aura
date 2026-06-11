'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Consultation } from '@/lib/types';
import { Search, Calendar, Eye } from 'lucide-react';

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Consultations</h1>
        <p className="text-muted-foreground mt-1">Manage student consultations and schedule sessions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Consultations</p>
              <p className="text-3xl font-bold">{consultations.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Scheduled</p>
              <p className="text-3xl font-bold">{scheduledCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-3xl font-bold">{completedCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search consultations by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-input bg-background"
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

      {/* Consultations List */}
      <Card>
        <CardHeader>
          <CardTitle>Consultations ({filteredConsultations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading consultations...</div>
          ) : filteredConsultations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No consultations found</div>
          ) : (
            <div className="space-y-3">
              {filteredConsultations.map((consultation) => (
                <div
                  key={consultation.id}
                  className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1 flex-1">
                    <h3 className="font-semibold">{consultation.title}</h3>
                    <p className="text-sm text-muted-foreground">{consultation.description}</p>
                    {consultation.scheduled_at && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(consultation.scheduled_at).toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      consultation.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : consultation.status === 'scheduled'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {consultation.status}
                    </span>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
