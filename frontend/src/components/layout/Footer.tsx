import Link from 'next/link';
import { Twitter, Linkedin, Github, Instagram } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Find Jobs', href: '/jobs' },
    { label: 'Browse Companies', href: '/admin' },
    { label: 'Post a Job', href: '/admin' },
    { label: 'Career Advice', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  support: [
    { label: 'FAQ', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#202430] text-white">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="font-bold text-xl text-white">QuickHire</span>
            </Link>
            <p className="text-white/60 text-body-md leading-relaxed mb-6 max-w-xs">
              Great platform for job seekers searching for new career heights and
              passionate about startups.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4">
              {[
                { Icon: Twitter, href: '#' },
                { Icon: Linkedin, href: '#' },
                { Icon: Github, href: '#' },
                { Icon: Instagram, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 border border-white/20 rounded-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4 capitalize">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 text-body-md hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-body-sm">
            © {new Date().getFullYear()} QuickHire. All rights reserved.
          </p>
          <p className="text-white/40 text-body-sm">
            Built with ❤️ for job seekers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
