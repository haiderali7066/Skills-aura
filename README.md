# Skills Aura - Professional Learning Platform

A comprehensive full-stack web application for managing online courses, enrollments, payments, consultations, and user management. Built with Next.js 16, TypeScript, Tailwind CSS, Supabase, and Stripe.

## Features

### Public Website
- **Homepage** - Introduction and feature highlights
- **Courses Catalog** - Browse available courses with details
- **Course Details** - View course information, batches, and enrollment
- **About Page** - Company information and mission
- **Contact Page** - Get in touch with the team
- **Success Stories** - Student testimonials and case studies
- **Blog** - Educational content and articles
- **Events** - Upcoming webinars and workshops
- **Partnerships** - Corporate and institutional partnerships
- **FAQ** - Frequently asked questions
- **User Account** - View enrollments, payment history, and consultations

### Authentication & Authorization
- Email/password authentication with Supabase Auth
- Role-based access control (User, Branch Admin, Super Admin)
- Secure session management
- Protected routes with authentication middleware

### Course & Enrollment Management
- Course creation and management (Super Admin)
- Batch scheduling per branch
- Enrollment tracking with status management
- Multi-step enrollment flow
- Course capacity management

### Payment Processing
- Stripe integration for secure payments
- Payment intent creation and verification
- Webhook handling for payment confirmation
- Payment status tracking
- Payment verification system
- Fraud detection

### Admin Panel
- **Dashboard** - Key metrics and overview
- **Enrollments Management** - Track and manage student enrollments
- **Payments Tracking** - Monitor payment status and revenue
- **Consultations** - Schedule and manage consultations
- **Messages/CRM** - Handle student inquiries and communication
- **Analytics** - Detailed analytics and reporting
- **User Management** - Manage system users and roles (Super Admin)
- **Settings** - System configuration and preferences

### Role-Based Features
- **Super Admin**: Full access to all branches and administrative functions
- **Branch Admin**: View all branches (read-only), manage only assigned branch's data
- **Regular User**: Access to own enrollments, consultations, and profile

### Advanced Features
- Consultation booking system
- Message/inquiry management
- Analytics and reporting
- Branch management
- User role management
- Payment verification with screenshot support

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Shadcn/ui
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Email**: Resend (optional)
- **Data Fetching**: SWR
- **Validation**: Zod

## Database Schema

### Core Tables
- `users` - User accounts and roles
- `branches` - Business branches/locations
- `courses` - Course catalog
- `batches` - Course batch scheduling
- `enrollments` - Student enrollments
- `payments` - Payment records
- `consultations` - Consultation bookings
- `messages` - Inquiry and message system
- `advisors` - Advisor profiles
- `analytics` - Analytics tracking

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account and project
- Stripe account and API keys

### Environment Variables
Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

### Installation

```bash
# Install dependencies
pnpm install

# Run database migrations
# (Schema is already set up - execute the SQL in scripts/init-database.sql in Supabase)

# Seed database with test data
pnpm ts-node scripts/seed.ts

# Start development server
pnpm dev
```

Visit http://localhost:3000 to access the application.

## Project Structure

```
app/
  ├── page.tsx                 # Homepage
  ├── courses/                 # Course pages
  ├── checkout/                # Payment checkout
  ├── consultation/            # Consultation booking
  ├── account/                 # User dashboard
  ├── sign-in/                 # Authentication
  ├── sign-up/                 # Registration
  ├── admin/                   # Admin dashboard
  │   ├── dashboard/
  │   ├── enrollments/
  │   ├── payments/
  │   ├── consultations/
  │   ├── messages/
  │   ├── analytics/
  │   └── settings/
  ├── api/                     # API routes
  │   ├── auth/
  │   ├── checkout/
  │   ├── enrollments/
  │   ├── consultations/
  │   ├── messages/
  │   ├── webhooks/stripe/
  │   └── admin/

components/
  ├── header.tsx
  ├── footer.tsx
  ├── admin-sidebar.tsx
  ├── payment-form.tsx
  └── ui/                      # Shadcn components

lib/
  ├── supabase.ts              # Supabase client
  ├── auth.ts                  # Auth utilities
  ├── api.ts                   # API helpers
  ├── types.ts                 # TypeScript types
  ├── validations.ts           # Zod schemas
  └── auth-middleware.ts       # Role-based middleware
```

## API Endpoints

### Authentication
- `POST /api/auth/sign-up` - Register new user
- `POST /api/auth/sign-in` - Login user
- `POST /api/auth/sign-out` - Logout user

### Enrollments
- `POST /api/enrollments` - Create enrollment
- `GET /api/enrollments` - Get user's enrollments

### Payments
- `POST /api/checkout` - Create payment intent
- `POST /api/webhooks/stripe` - Stripe webhook handler

### Consultations
- `POST /api/consultations` - Book consultation
- `GET /api/consultations` - Get user's consultations

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages` - Get messages

### Admin Routes
- `GET /api/admin/users` - List users
- `POST /api/admin/users` - Create user
- `GET /api/admin/branches` - List branches
- `GET /api/admin/courses` - List courses
- `POST /api/admin/courses` - Create course
- `GET /api/admin/analytics` - Get analytics

## Deployment

### Deploy to Vercel

```bash
# Push to GitHub
git push origin main

# Deploy from Vercel dashboard
# Add environment variables in Vercel project settings
# Deploy automatically on push
```

### Production Checklist
- [ ] Configure environment variables
- [ ] Set up Stripe live keys
- [ ] Configure Supabase production database
- [ ] Set up custom domain
- [ ] Enable HTTPS
- [ ] Configure Stripe webhooks
- [ ] Test payment flow
- [ ] Test admin panel
- [ ] Verify email notifications (if using Resend)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support

For issues and support, please create an issue in the repository or contact support@skillsaura.com.

## License

MIT License - see LICENSE file for details
