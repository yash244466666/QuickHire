'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-neutrals-20 sticky top-0 z-50">
      <div className="container-main flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="font-bold text-xl text-neutrals-100">QuickHire</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/jobs"
            className="text-body-md font-medium text-neutrals-80 hover:text-primary transition-colors"
          >
            Find Jobs
          </Link>
          <Link
            href="/admin"
            className="text-body-md font-medium text-neutrals-80 hover:text-primary transition-colors"
          >
            Browse Companies
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/admin" className="btn-ghost text-sm">
            Admin Panel
          </Link>
          <div className="w-px h-6 bg-neutrals-20" />
          <Link href="/jobs" className="btn-primary text-sm py-2.5 px-5">
            Post a Job
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-neutrals-80"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-neutrals-20 px-4 py-6 flex flex-col gap-4">
          <Link
            href="/jobs"
            className="text-body-md font-medium text-neutrals-80 hover:text-primary py-2"
            onClick={() => setMobileOpen(false)}
          >
            Find Jobs
          </Link>
          <Link
            href="/admin"
            className="text-body-md font-medium text-neutrals-80 hover:text-primary py-2"
            onClick={() => setMobileOpen(false)}
          >
            Browse Companies
          </Link>
          <hr className="border-neutrals-20" />
          <Link href="/admin" className="btn-ghost text-sm text-center">
            Admin Panel
          </Link>
          <Link href="/jobs" className="btn-primary text-sm text-center py-3">
            Post a Job
          </Link>
        </div>
      )}
    </nav>
  );
}
