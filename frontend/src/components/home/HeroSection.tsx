'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (location) params.set('location', location);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section className="bg-neutrals-10 overflow-hidden relative">
      {/* Background decoration */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 50%, #4640DE 0%, transparent 60%)',
        }}
      />

      <div className="container-main py-16 lg:py-24 relative">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-body-md text-neutrals-60 mb-4 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-neutrals-60" />
            No. 1 Job Search Platform
          </p>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-neutrals-100 leading-tight mb-5">
            Discover more than{' '}
            <span className="text-primary relative">
              5000+{' '}
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6C50 2 100 2 198 6"
                  stroke="#4640DE"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            Jobs
          </h1>

          {/* Subtitle */}
          <p className="text-body-xl text-neutrals-60 mb-8 max-w-xl leading-relaxed">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-md shadow-search flex flex-col sm:flex-row gap-0 overflow-hidden border border-neutrals-20"
          >
            {/* Job title input */}
            <div className="flex items-center gap-3 flex-1 px-5 py-4">
              <Search size={20} className="text-neutrals-60 flex-shrink-0" />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="flex-1 bg-transparent outline-none text-body-md text-neutrals-100 placeholder:text-neutrals-60"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px bg-neutrals-20 my-3" />

            {/* Location input */}
            <div className="flex items-center gap-3 flex-1 px-5 py-4">
              <MapPin size={20} className="text-neutrals-60 flex-shrink-0" />
              <input
                type="text"
                placeholder="City, country or remote"
                className="flex-1 bg-transparent outline-none text-body-md text-neutrals-100 placeholder:text-neutrals-60"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary m-2 sm:m-2 text-sm font-bold whitespace-nowrap"
            >
              Search my job
            </button>
          </form>

          {/* Popular searches */}
          <p className="text-body-sm text-neutrals-60 mt-4">
            <span className="font-semibold text-neutrals-80">Popular:</span>{' '}
            {['UI Designer', 'UX Researcher', 'Android', 'Admin'].map((term, i) => (
              <span key={term}>
                <a
                  href={`/jobs?search=${term}`}
                  className="hover:text-primary underline underline-offset-2 transition-colors"
                >
                  {term}
                </a>
                {i < 3 && ', '}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
