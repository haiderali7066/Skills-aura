import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

async function seedDatabase() {
  try {
    console.log('[v0] Starting database seed...');

    // Create branches
    const { data: branches, error: branchError } = await supabase
      .from('branches')
      .insert([
        {
          name: 'Downtown Branch',
          location: '123 Main Street',
          city: 'New York',
          phone: '+1-555-0101',
          email: 'downtown@skillsaura.com',
        },
        {
          name: 'Uptown Branch',
          location: '456 Park Avenue',
          city: 'New York',
          phone: '+1-555-0102',
          email: 'uptown@skillsaura.com',
        },
      ])
      .select();

    if (branchError) {
      console.error('[v0] Branch creation error:', branchError);
      return;
    }

    console.log('[v0] Created branches:', branches?.length);

    // Create courses
    const { data: courses, error: courseError } = await supabase
      .from('courses')
      .insert([
        {
          name: 'Web Development Fundamentals',
          description: 'Learn HTML, CSS, and JavaScript basics',
          duration_weeks: 8,
          price: 299.99,
          max_capacity: 30,
          instructor_name: 'John Doe',
          category: 'Technology',
        },
        {
          name: 'Advanced React.js',
          description: 'Master React hooks, context, and state management',
          duration_weeks: 6,
          price: 399.99,
          max_capacity: 25,
          instructor_name: 'Jane Smith',
          category: 'Technology',
        },
        {
          name: 'Digital Marketing Mastery',
          description: 'SEO, SEM, social media, and content strategy',
          duration_weeks: 10,
          price: 349.99,
          max_capacity: 40,
          instructor_name: 'Mike Johnson',
          category: 'Marketing',
        },
        {
          name: 'Data Science Essentials',
          description: 'Python, pandas, scikit-learn, and machine learning basics',
          duration_weeks: 12,
          price: 449.99,
          max_capacity: 20,
          instructor_name: 'Sarah Williams',
          category: 'Technology',
        },
        {
          name: 'Business Communication',
          description: 'Effective communication skills for professionals',
          duration_weeks: 4,
          price: 199.99,
          max_capacity: 35,
          instructor_name: 'Robert Brown',
          category: 'Business',
        },
      ])
      .select();

    if (courseError) {
      console.error('[v0] Course creation error:', courseError);
      return;
    }

    console.log('[v0] Created courses:', courses?.length);

    // Create batches for each course in each branch
    if (branches && courses) {
      const batches = [];
      for (const branch of branches) {
        for (const course of courses) {
          const startDate = new Date();
          startDate.setDate(startDate.getDate() + 7);
          const endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + (course.duration_weeks * 7));

          batches.push({
            course_id: course.id,
            branch_id: branch.id,
            start_date: startDate.toISOString().split('T')[0],
            end_date: endDate.toISOString().split('T')[0],
            time_slot: 'Monday-Wednesday, 6:00 PM - 8:00 PM',
            current_enrollment: Math.floor(Math.random() * (course.max_capacity || 30)),
          });
        }
      }

      const { data: batchesData, error: batchError } = await supabase
        .from('batches')
        .insert(batches)
        .select();

      if (batchError) {
        console.error('[v0] Batch creation error:', batchError);
        return;
      }

      console.log('[v0] Created batches:', batchesData?.length);
    }

    console.log('[v0] Database seed completed successfully!');
  } catch (error) {
    console.error('[v0] Seed error:', error);
  }
}

seedDatabase();
