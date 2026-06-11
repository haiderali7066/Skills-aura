'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';

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

  return (
    <>
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Book a Consultation</h1>
            <p className="text-muted-foreground">
              Connect with our expert advisors to discuss your learning goals and get personalized guidance.
            </p>
          </div>

          <Card className="p-6">
            {success ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <p className="text-green-800 font-semibold mb-2">Consultation Booked Successfully!</p>
                <p className="text-sm text-green-700">Redirecting to your account...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Consultation Topic</label>
                  <Input
                    type="text"
                    placeholder="e.g., Career Guidance, Course Selection"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    placeholder="Tell us what you'd like to discuss..."
                    className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Preferred Date & Time</label>
                    <Input
                      type="datetime-local"
                      value={formData.scheduledAt}
                      onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Duration (minutes)</label>
                    <select
                      value={formData.durationMinutes}
                      onChange={(e) => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>1 hour</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    'Book Consultation'
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </main>
    </>
  );
}
