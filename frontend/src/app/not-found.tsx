import Link from 'next/link';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutrals-10 flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-primary-25 rounded-full flex items-center justify-center mb-6">
        <Search size={36} className="text-primary" />
      </div>
      <h1 className="text-[80px] font-bold text-primary leading-none mb-2">404</h1>
      <h2 className="text-h3 font-bold text-neutrals-100 mb-3">Page Not Found</h2>
      <p className="text-body-lg text-neutrals-60 mb-8 max-w-md">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <Link href="/" className="btn-primary px-8">
          Go Home
        </Link>
        <Link href="/jobs" className="btn-secondary px-8">
          Browse Jobs
        </Link>
      </div>
    </div>
  );
}
