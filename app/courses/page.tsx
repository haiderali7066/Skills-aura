'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCourses } from '@/lib/api';
import { Course } from '@/lib/types';
import { BookOpen, Clock, Users, Loader } from 'lucide-react';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getCourses();
        setCourses(data);
        setFilteredCourses(data);
      } catch (error) {
        console.error('[v0] Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((course) => course.category === selectedCategory);
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, courses]);

  const categories = Array.from(
    new Set(courses.map((course) => course.category).filter(Boolean))
  ) as string[];

  return (
    <>
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Choose from our comprehensive range of professional development courses
            </p>
          </div>

          {/* Filters */}
          <div className="space-y-6 mb-12">
            <div>
              <label className="block text-sm font-medium mb-2">Search Courses</label>
              <Input
                type="text"
                placeholder="Search by course name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  size="sm"
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Courses Found</h2>
              <p className="text-muted-foreground">
                {searchTerm || selectedCategory !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Check back soon for new courses'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Link key={course.id} href={`/courses/${course.id}`}>
                  <div className="h-full rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden cursor-pointer">
                    {course.image_url ? (
                      <img
                        src={course.image_url}
                        alt={course.name}
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-primary/40" />
                      </div>
                    )}

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {course.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {course.duration_weeks && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration_weeks} weeks
                          </div>
                        )}
                        {course.max_capacity && (
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {course.max_capacity} spots
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="font-bold text-lg">
                          ${course.price.toFixed(2)}
                        </span>
                        <Button size="sm">Enroll Now</Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
