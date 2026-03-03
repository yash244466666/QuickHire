'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-neutrals-10 flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle size={36} className="text-error" />
      </div>
      <h1 className="text-h2 font-bold text-neutrals-100 mb-3">Something went wrong</h1>
      <p className="text-body-lg text-neutrals-60 mb-8 max-w-md">
        An unexpected error occurred. Please try again, or return to the home page.
      </p>
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <button onClick={reset} className="btn-primary px-8">
          Try Again
        </button>
        <Link href="/" className="btn-secondary px-8">
          Go Home
        </Link>
      </div>
    </div>
  );
}
