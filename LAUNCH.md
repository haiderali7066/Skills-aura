# Skills Aura Platform - Launch Guide

## Project Overview

Skills Aura is a comprehensive professional skill development platform built with Next.js 16, Supabase, and Stripe. The platform features:

- **Public Website**: 11 pages for course browsing, enrollment, consultations
- **Admin Panel**: Role-based access for Super Admin and Branch Admin
- **Payment System**: Complete Stripe integration with webhooks
- **Database**: PostgreSQL with Supabase for user management, enrollments, payments
- **Authentication**: Supabase Auth for user registration and login

## Setup Instructions

### 1. Environment Variables

Add the following to your `.env.local` file:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Email (Optional - for Resend)
RESEND_API_KEY=your_resend_key
```

### 2. Database Setup

The database schema has already been created in Supabase with the following tables:

- **users** - User accounts with roles (user, branch_admin, super_admin)
- **branches** - Physical branch locations
- **courses** - Course definitions
- **batches** - Course batches with schedules
- **enrollments** - Student enrollments
- **payments** - Payment records with Stripe integration
- **consultations** - Consultation bookings
- **messages** - Contact form messages and CRM
- **advisors** - Career advisors
- **analytics** - Analytics and metrics

### 3. Seed Data (Optional)

To populate test data:

```bash
npx ts-node scripts/seed.ts
```

This will create:
- Sample branches
- Sample courses with batches
- Test admin users
- Test data for all features

## Deployment

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Next.js project
3. Add environment variables in Vercel Settings → Environment Variables
4. Deploy automatically on push to main branch

```bash
# Or deploy manually
vercel deploy --prod
```

### Post-Deployment

1. **Configure Stripe Webhooks**:
   - Go to Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Subscribe to: `payment_intent.succeeded`, `payment_intent.failed`

2. **Test the Platform**:
   - Visit home page
   - Browse courses
   - Create test account
   - Test enrollment flow
   - Verify admin panel access

3. **Configure Email (Optional)**:
   - Set up Resend account for transactional emails
   - Add API key to environment variables

## Admin Access

### Super Admin
- Email: Create in Supabase Auth and set role to `super_admin`
- Permissions: Full access to all branches and features

### Branch Admin
- Email: Create in Supabase Auth and set role to `branch_admin`
- Assign to branch in users table
- Permissions: View all branches, manage only assigned branch

## Key Features

### Public Website Pages
- **Home** - Landing page with features
- **Courses** - Course directory
- **Course Details** - Full course information and enrollment
- **About** - Company information
- **Success Stories** - Student testimonials
- **Events** - Upcoming events
- **Blog** - Educational content
- **Partnerships** - Partner information
- **FAQ** - Frequently asked questions
- **Contact** - Contact form and consultations
- **Account** - User dashboard

### Admin Pages
- **Dashboard** - Overview and metrics
- **Enrollments** - Enrollment management (4 views)
- **Payments** - Payment verification and records (3 views)
- **Consultations** - Consultation scheduling (4 views)
- **Messages** - Contact messages and CRM
- **Analytics** - Business analytics
- **Conversion** - Conversion tracking
- **Referrals** - Referral program
- **WhatsApp** - WhatsApp integration
- **Notifications** - Alert management
- **Settings** - System configuration
- **User Management** - User and role management

## API Endpoints

### Authentication
- `POST /api/auth/[...all]` - Supabase Auth handler

### Payments
- `POST /api/checkout` - Create payment intent
- `POST /api/webhooks/stripe` - Stripe webhook handler

### Data Management
- `POST /api/enrollments` - Create enrollment
- `GET/POST /api/consultations` - Consultation management
- `GET/POST /api/messages` - Message handling
- `GET /api/admin/analytics` - Analytics data

## Security Notes

1. **Database**: All tables have RLS policies enabled in Supabase
2. **Authentication**: Supabase handles session management
3. **Payments**: Stripe handles PCI compliance
4. **API Routes**: Protected with authentication checks
5. **Environment Variables**: Keep sensitive keys secure in Vercel Settings

## Monitoring

Monitor these key metrics:
- Enrollment conversion rate
- Payment success rate
- Admin user activity
- Email delivery (via Resend logs)
- Stripe payment volumes

## Support & Maintenance

- Check Supabase Dashboard for database logs
- Monitor Stripe Dashboard for payment issues
- Review Vercel Analytics for traffic and performance
- Check Next.js logs in Vercel Deployments

## Next Steps

1. Customize branding and content
2. Add instructor profiles
3. Set up email notifications
4. Configure WhatsApp integration
5. Launch marketing campaigns
6. Onboard first users and admin team

---

For questions or issues, refer to documentation:
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Stripe: https://stripe.com/docs
