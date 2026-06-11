'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CreditCard,
  MessageSquare,
  BarChart3,
  Settings,
  TrendingUp,
  Share2,
  MessageCircle,
  Bell,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface AdminSidebarProps {
  userRole: 'super_admin' | 'branch_admin';
}

export function AdminSidebar({ userRole }: AdminSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/enrollments', label: 'Enrollments', icon: BookOpen },
    { href: '/admin/payments', label: 'Payments', icon: CreditCard },
    { href: '/admin/consultations', label: 'Consultations', icon: MessageSquare },
    { href: '/admin/messages', label: 'Messages & CRM', icon: MessageCircle },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/admin/conversion', label: 'Conversion Funnel', icon: TrendingUp },
    { href: '/admin/referrals', label: 'Referrals', icon: Share2 },
    { href: '/admin/whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { href: '/admin/notifications', label: 'Notifications', icon: Bell },
    ...(userRole === 'super_admin'
      ? [
          { href: '/admin/users', label: 'User Management', icon: Users },
          { href: '/admin/courses', label: 'Courses', icon: BookOpen },
          { href: '/admin/reports', label: 'Reports', icon: FileText },
        ]
      : []),
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/sign-in');
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="fixed top-4 left-4 z-40 md:hidden p-2 bg-primary text-primary-foreground rounded-lg"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-border overflow-y-auto transition-transform duration-300 z-30 ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-border">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
              SA
            </div>
            <span className="hidden sm:inline">Admin</span>
          </Link>
          <div className="mt-4 text-xs text-muted-foreground">
            Role: <span className="capitalize">{userRole.replace('_', ' ')}</span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <button
                  onClick={() => setOpen(false)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors text-sm ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
