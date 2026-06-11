export type UserRole = 'user' | 'branch_admin' | 'super_admin';
export type EnrollmentStatus = 'active' | 'completed' | 'cancelled' | 'pending';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded' | 'verification_required';
export type ConsultationStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show';
export type MessageType = 'inquiry' | 'consultation' | 'general';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  assigned_branch_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  city?: string;
  phone?: string;
  email?: string;
  admin_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  name: string;
  description?: string;
  duration_weeks?: number;
  price: number;
  max_capacity?: number;
  instructor_name?: string;
  image_url?: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface Batch {
  id: string;
  course_id: string;
  branch_id: string;
  start_date: string;
  end_date: string;
  time_slot?: string;
  current_enrollment: number;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  batch_id: string;
  branch_id: string;
  status: EnrollmentStatus;
  enrollment_date: string;
  completion_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  enrollment_id: string;
  user_id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  payment_method?: string;
  stripe_payment_intent_id?: string;
  stripe_session_id?: string;
  transaction_reference?: string;
  screenshot_url?: string;
  notes?: string;
  payment_date?: string;
  verified_at?: string;
  verified_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Consultation {
  id: string;
  user_id: string;
  advisor_id?: string;
  branch_id: string;
  title: string;
  description?: string;
  scheduled_at?: string;
  duration_minutes: number;
  status: ConsultationStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  sender_id?: string;
  name: string;
  email: string;
  phone?: string;
  message_type: MessageType;
  subject?: string;
  body: string;
  branch_id?: string;
  read_at?: string;
  replied_at?: string;
  replied_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Advisor {
  id: string;
  user_id: string;
  specialization?: string;
  phone?: string;
  availability_json?: Record<string, any>;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface Analytics {
  id: string;
  branch_id: string;
  metric_name: string;
  metric_value: number;
  recorded_at: string;
  period_start?: string;
  period_end?: string;
  created_at: string;
}
