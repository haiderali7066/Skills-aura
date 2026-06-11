-- Create enum types
CREATE TYPE user_role AS ENUM ('user', 'branch_admin', 'super_admin');
CREATE TYPE enrollment_status AS ENUM ('active', 'completed', 'cancelled', 'pending');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded', 'verification_required');
CREATE TYPE consultation_status AS ENUM ('scheduled', 'completed', 'cancelled', 'no_show');
CREATE TYPE message_type AS ENUM ('inquiry', 'consultation', 'general');

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role user_role DEFAULT 'user',
  assigned_branch_id UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create branches table
CREATE TABLE branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(255),
  admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add foreign key constraint to users table
ALTER TABLE users ADD CONSTRAINT fk_assigned_branch
  FOREIGN KEY (assigned_branch_id) REFERENCES branches(id) ON DELETE SET NULL;

-- Create courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration_weeks INT,
  price DECIMAL(10, 2) NOT NULL,
  max_capacity INT,
  instructor_name VARCHAR(255),
  image_url VARCHAR(500),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create batches table
CREATE TABLE batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  time_slot VARCHAR(50),
  current_enrollment INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create enrollments table
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  status enrollment_status DEFAULT 'pending',
  enrollment_date TIMESTAMP DEFAULT NOW(),
  completion_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status payment_status DEFAULT 'pending',
  payment_method VARCHAR(50),
  stripe_payment_intent_id VARCHAR(255),
  stripe_session_id VARCHAR(255),
  transaction_reference VARCHAR(255),
  screenshot_url VARCHAR(500),
  notes TEXT,
  payment_date TIMESTAMP,
  verified_at TIMESTAMP,
  verified_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create consultations table
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  advisor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMP,
  duration_minutes INT DEFAULT 30,
  status consultation_status DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message_type message_type DEFAULT 'general',
  subject VARCHAR(255),
  body TEXT NOT NULL,
  branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
  read_at TIMESTAMP,
  replied_at TIMESTAMP,
  replied_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create advisors table
CREATE TABLE advisors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  specialization VARCHAR(255),
  phone VARCHAR(20),
  availability_json JSONB,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create analytics table
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  metric_name VARCHAR(100) NOT NULL,
  metric_value INT DEFAULT 0,
  recorded_at TIMESTAMP DEFAULT NOW(),
  period_start DATE,
  period_end DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_assigned_branch ON users(assigned_branch_id);
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_branch_id ON enrollments(branch_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_enrollment_id ON payments(enrollment_id);
CREATE INDEX idx_consultations_user_id ON consultations(user_id);
CREATE INDEX idx_consultations_branch_id ON consultations(branch_id);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_messages_branch_id ON messages(branch_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_batches_branch_id ON batches(branch_id);
CREATE INDEX idx_batches_course_id ON batches(course_id);
CREATE INDEX idx_analytics_branch_id ON analytics(branch_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE advisors ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Courses: anyone can view, only super admin can modify
CREATE POLICY "Courses are viewable by anyone"
  ON courses FOR SELECT
  USING (true);

CREATE POLICY "Courses can be modified by super_admin only"
  ON courses FOR INSERT
  WITH CHECK (auth.jwt() ->> 'role' = 'super_admin');

CREATE POLICY "Courses can be updated by super_admin only"
  ON courses FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'super_admin');

-- Branches: super_admin sees all, branch_admin sees their branch, users see nothing
CREATE POLICY "Super admin can view all branches"
  ON branches FOR SELECT
  USING (auth.jwt() ->> 'role' = 'super_admin');

CREATE POLICY "Branch admin can view all branches (read-only)"
  ON branches FOR SELECT
  USING (auth.jwt() ->> 'role' = 'branch_admin');

CREATE POLICY "Users cannot view branches"
  ON branches FOR SELECT
  USING (false);

-- Enrollments: users see their own, admins see their branch or all
CREATE POLICY "Users can view their own enrollments"
  ON enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Super admin can view all enrollments"
  ON enrollments FOR SELECT
  USING (auth.jwt() ->> 'role' = 'super_admin');

CREATE POLICY "Branch admin can view their branch enrollments"
  ON enrollments FOR SELECT
  USING (
    auth.jwt() ->> 'role' = 'branch_admin' 
    AND branch_id = (SELECT assigned_branch_id FROM users WHERE id = auth.uid())
  );

CREATE POLICY "Users can create enrollments for themselves"
  ON enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Payments: users see their own, admins see their branch or all
CREATE POLICY "Users can view their own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Super admin can view all payments"
  ON payments FOR SELECT
  USING (auth.jwt() ->> 'role' = 'super_admin');

CREATE POLICY "Branch admin can view their branch payments"
  ON payments FOR SELECT
  USING (
    auth.jwt() ->> 'role' = 'branch_admin'
    AND EXISTS (
      SELECT 1 FROM enrollments e 
      WHERE e.id = enrollment_id 
      AND e.branch_id = (SELECT assigned_branch_id FROM users WHERE id = auth.uid())
    )
  );

-- Messages: branch admin can view their branch messages, super_admin can view all
CREATE POLICY "Branch admin can view their branch messages"
  ON messages FOR SELECT
  USING (
    auth.jwt() ->> 'role' = 'branch_admin'
    AND branch_id = (SELECT assigned_branch_id FROM users WHERE id = auth.uid())
  );

CREATE POLICY "Super admin can view all messages"
  ON messages FOR SELECT
  USING (auth.jwt() ->> 'role' = 'super_admin');

CREATE POLICY "Anyone can create messages"
  ON messages FOR INSERT
  WITH CHECK (true);
