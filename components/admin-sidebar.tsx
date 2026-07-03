'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { 
  Menu, X, LogOut, LayoutDashboard, Users, BookOpen, 
  CreditCard, MessageSquare, BarChart3, Settings, 
  TrendingUp, Share2, MessageCircle, Bell, FileText 
} from 'lucide-react';

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
    ...(userRole === 'super_admin' ? [
      { href: '/admin/users', label: 'User Management', icon: Users },
      { href: '/admin/courses', label: 'Courses', icon: BookOpen },
      { href: '/admin/reports', label: 'Reports', icon: FileText },
    ] : []),
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/sign-in');
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-[#111] border border-white/10 text-white rounded-lg hover:text-purple-400 transition-colors"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-[#050505] border-r border-white/5 overflow-y-auto transition-transform duration-300 z-40 flex flex-col ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-white/5 bg-black/50 sticky top-0 backdrop-blur-md z-10">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-900 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-[0_0_20px_rgba(147,51,234,0.3)]">
              SA
            </div>
            <div>
              <h2 className="font-black tracking-widest uppercase text-white leading-none">AURA</h2>
              <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest leading-none">Admin Panel</span>
            </div>
          </Link>
          <div className="mt-6 px-3 py-2 bg-white/5 rounded-lg border border-white/5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-gray-400 font-medium capitalize">{userRole.replace('_', ' ')}</span>
          </div>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <button
                  onClick={() => setOpen(false)}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all text-sm font-semibold group ${
                    active
                      ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20 shadow-[inset_0_0_20px_rgba(147,51,234,0.05)]'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-colors ${active ? 'text-purple-400' : 'text-gray-500 group-hover:text-white'}`} />
                  {item.label}
                </button>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 bg-black/50 sticky bottom-0 backdrop-blur-md">
          <Button
            variant="outline"
            className="w-full gap-2 bg-transparent border-white/10 text-gray-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all rounded-xl"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}