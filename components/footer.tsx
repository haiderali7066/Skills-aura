'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Share2, MessageCircle, Code } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // Don't show footer on admin routes
  if (isAdminRoute) {
    return null;
  }

  return (
    <footer className="border-t border-border/50 bg-gradient-to-t from-card to-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold">
                SA
              </div>
              <div>
                <div className="font-bold text-lg text-gradient">Skills Aura</div>
                <div className="text-xs text-muted-foreground">Premium Learning</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering professionals through expert-led skill development and personalized guidance.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <Code className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors duration-300 group flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors duration-300 group flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </Link>
              </li>
           
              <li>
                <Link href="/consultation" className="text-muted-foreground hover:text-primary transition-colors duration-300 group flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Consultations
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-widest">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors duration-300 group flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Blog
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group cursor-pointer">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors">Email</div>
                  <a href="mailto:info@skillsaura.com" className="text-primary hover:text-secondary transition-colors">
                    info@skillsaura.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group cursor-pointer">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors">Phone</div>
                  <a href="tel:+919876543210" className="text-primary hover:text-secondary transition-colors">
                    +91 9876 543 210
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-muted-foreground">Location</div>
                  <span className="text-foreground">Multiple Locations</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider with Gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>&copy; 2024 Skills Aura. All rights reserved. Premium Learning Platform.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-primary transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
