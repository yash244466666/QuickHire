'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { label: 'Job Listings', icon: Briefcase, href: '/admin/jobs' },
  { label: 'Applicants', icon: Users, href: '/admin/applicants' },
  { label: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-neutrals-20 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-neutrals-20">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="font-bold text-lg text-neutrals-100">QuickHire</span>
        </Link>
        <p className="text-body-sm text-neutrals-60 mt-1 ml-10">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-md text-body-md font-medium transition-colors',
                    isActive
                      ? 'bg-primary-25 text-primary'
                      : 'text-neutrals-80 hover:bg-neutrals-10 hover:text-neutrals-100'
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-neutrals-20 space-y-1">
        <Link
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-md text-body-md font-medium text-neutrals-60 hover:bg-neutrals-10 hover:text-neutrals-100 transition-colors"
        >
          <HelpCircle size={18} />
          Help
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-md text-body-md font-medium text-error hover:bg-error/10 transition-colors"
        >
          <LogOut size={18} />
          Exit Admin
        </Link>
      </div>
    </aside>
  );
}
