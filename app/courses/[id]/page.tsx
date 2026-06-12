'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getCourseById, getBatchesByCourse } from '@/lib/api';
import { Course, Batch } from '@/lib/types';
import { Clock, Users, Star, BookOpen, Loader } from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    async function fetchCourseData() {
      try {
        const courseData = await getCourseById(courseId);
        setCourse(courseData);
        
        const batchesData = await getBatchesByCourse(courseId);
        setBatches(batchesData);
      } catch (error) {
        console.error('[v0] Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    }

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const handleEnroll = async (batchId: string) => {
    setEnrolling(true);
    try {
      // Redirect to checkout page with course and batch info
      const searchParams = new URLSearchParams({
        courseId: courseId,
        batchId: batchId,
      });
      window.location.href = `/checkout?${searchParams.toString()}`;
    } catch (error) {
      console.error('[v0] Enrollment error:', error);
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <>
        <main className="min-h-screen flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-primary" />
        </main>
      </>
    );
  }

  if (!course) {
    return (
      <>
        <main className="min-h-screen py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
            <p className="text-muted-foreground">The course you're looking for doesn't exist.</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Course Header Image */}
              <div className="mb-8">
                {course.image_url ? (
                  <img
                    src={course.image_url}
                    alt={course.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-32 h-32 text-primary/40" />
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{course.name}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {course.category && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {course.category}
                      </span>
                    )}
                    {course.duration_weeks && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration_weeks} weeks
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      4.8 (128 reviews)
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* What You'll Learn */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">What You&apos;ll Learn</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span>Comprehensive understanding of core concepts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span>Hands-on projects and real-world applications</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span>Industry best practices and latest techniques</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span>Certification upon completion</span>
                    </li>
                  </ul>
                </div>

                {/* Instructor */}
                {course.instructor_name && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Instructor</h2>
                    <Card className="p-6">
                      <p className="font-semibold">{course.instructor_name}</p>
                      <p className="text-sm text-muted-foreground mt-1">Expert Instructor</p>
                    </Card>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Enrollment Card */}
              <Card className="p-6 sticky top-24 space-y-4">
                <div>
                  <p className="text-3xl font-bold">${course.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">per course</p>
                </div>

                {batches.length > 0 ? (
                  <>
                    <div>
                      <h3 className="font-semibold mb-3">Available Batches</h3>
                      <select className="w-full px-3 py-2 border border-input rounded-lg bg-background">
                        <option value="">Select a batch</option>
                        {batches.map((batch) => (
                          <option key={batch.id} value={batch.id}>
                            {new Date(batch.start_date).toLocaleDateString()} - {new Date(batch.end_date).toLocaleDateString()}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => {
                        const select = document.querySelector('select') as HTMLSelectElement;
                        if (select.value) {
                          handleEnroll(select.value);
                        }
                      }}
                      disabled={enrolling}
                    >
                      {enrolling ? 'Processing...' : 'Enroll Now'}
                    </Button>
                  </>
                ) : (
                  <Button className="w-full" size="lg" disabled>
                    No Batches Available
                  </Button>
                )}

                <div className="pt-4 space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span>Comprehensive course materials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>Expert instructor support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    <span>Certificate of completion</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Share Course
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
