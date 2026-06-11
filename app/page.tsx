
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Award, Users, Zap, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="mb-16 space-y-6">
            <h1 className="text-4xl font-bold">About Skills Aura</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              We are dedicated to transforming careers through accessible, high-quality professional education and personalized mentorship.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To empower professionals worldwide by providing accessible, expert-led learning experiences that bridge the gap between skills and career advancement.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the leading platform for professional skill development, where learners from all backgrounds can achieve their career goals with personalized guidance and world-class education.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 py-12 border-y border-border">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">10K+</p>
              <p className="text-muted-foreground">Students</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">50+</p>
              <p className="text-muted-foreground">Courses</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">500+</p>
              <p className="text-muted-foreground">Expert Instructors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">8</p>
              <p className="text-muted-foreground">Branches</p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <Award className="w-8 h-8 text-primary" />
                <h3 className="font-semibold">Excellence</h3>
                <p className="text-sm text-muted-foreground">
                  Committed to delivering the highest quality education and training
                </p>
              </div>
              <div className="space-y-3">
                <Users className="w-8 h-8 text-primary" />
                <h3 className="font-semibold">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Building a supportive ecosystem for learners to grow together
                </p>
              </div>
              <div className="space-y-3">
                <Zap className="w-8 h-8 text-primary" />
                <h3 className="font-semibold">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Continuously evolving with latest trends and technologies
                </p>
              </div>
              <div className="space-y-3">
                <Globe className="w-8 h-8 text-primary" />
                <h3 className="font-semibold">Accessibility</h3>
                <p className="text-sm text-muted-foreground">
                  Making quality education accessible to everyone
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-muted/50 rounded-lg p-12 text-center space-y-6">
            <h2 className="text-3xl font-bold">Join Our Community</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Become part of thousands of professionals transforming their careers with Skills Aura
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/courses">
                <Button>Explore Courses</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">Get in Touch</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
