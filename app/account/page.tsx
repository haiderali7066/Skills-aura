'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Enrollment, Course } from '@/lib/types';
import { User, BookOpen, LogOut, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface EnrollmentWithCourse extends Enrollment {
  courses?: Course;
}

export default function AccountPage() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [enrollments, setEnrollments] = useState<EnrollmentWithCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUserData() {
      try {
        // Lazy load supabase
        const { supabase } = await import('@/lib/supabase');
        
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          router.push('/sign-in');
          return;
        }

        setEmail(session.user.email || '');

        const { data: userData } = await supabase
          .from('users')
          .select('name')
          .eq('id', session.user.id)
          .single();

        if (userData) {
          setUserName(userData.name);
        }

        const { data: enrollmentData } = await supabase
          .from('enrollments')
          .select(`
            *,
            courses (*)
          `)
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });

        if (enrollmentData) {
          setEnrollments(enrollmentData);
        }
      } catch (error) {
        console.error('[v0] Error loading account data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/sign-in');
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-primary" />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* User Profile */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{userName}</p>
                    <p className="text-sm text-muted-foreground">{email}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </CardTitle>
            </CardHeader>
          </Card>

          {/* My Enrollments */}
          <div>
            <h2 className="text-2xl font-bold mb-6">My Courses</h2>
            {enrollments.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground mb-6">You haven&apos;t enrolled in any courses yet</p>
                  <Link href="/courses">
                    <Button>Explore Courses</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrollments.map((enrollment) => (
                  <Card key={enrollment.id}>
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between">
                        <div className="space-y-2">
                          <p>{enrollment.courses?.name}</p>
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            enrollment.status === 'active'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                              : enrollment.status === 'completed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {enrollment.status}
                          </span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Enrollment Date</span>
                          <span>{new Date(enrollment.enrollment_date).toLocaleDateString()}</span>
                        </div>
                        {enrollment.courses?.price && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Price</span>
                            <span>${enrollment.courses.price.toFixed(2)}</span>
                          </div>
                        )}
                        {enrollment.completion_date && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Completed</span>
                            <span>{new Date(enrollment.completion_date).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
