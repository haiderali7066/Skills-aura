
import { BookOpen } from 'lucide-react';

export default function BlogPage() {
  return (
    <>
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <BookOpen className="w-16 h-16 mx-auto text-primary/40 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Blog & Resources</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Insights, tips, and guides to help you succeed in your learning journey.
          </p>
        </div>
      </main>
    </>
  );
}
