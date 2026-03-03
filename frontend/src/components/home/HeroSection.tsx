'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import Image from 'next/image';

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
    <section className="bg-neutrals-10 overflow-hidden relative min-h-[740px]">
      {/* Background geometric decoration — matches Figma design (parallelogram outlines) */}
      <div
        className="absolute right-0 top-0 w-[740px] h-full pointer-events-none hidden lg:block"
        style={{
          backgroundImage: 'url(/images/hero-pattern.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right top',
          backgroundSize: '740px auto',
        }}
      />

      {/* Hero illustration — full-body person, bottom-anchored so head stays in frame */}
      <div className="hidden lg:block absolute right-8 bottom-0 w-[480px] pointer-events-none overflow-hidden" style={{ height: '739px' }}>
        <Image
          src="/images/hero-illustration.png"
          alt="Job seekers and professionals"
          fill
          sizes="(max-width: 1024px) 100vw, 480px"
          className="object-contain object-bottom"
          priority
        />
      </div>

      <div className="container-main py-16 lg:py-24 relative z-10">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="text-body-md text-neutrals-60 mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-0.5 bg-neutrals-60" />
            No. 1 Job Search Platform
          </p>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-neutrals-100 leading-tight mb-6">
            Discover more than{' '}
            <span className="text-primary relative inline-block">
              5000+
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8C50 3 100 3 198 8"
                  stroke="#4640DE"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            {' '}Jobs
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-neutrals-60 mb-10 max-w-lg leading-relaxed">
            Great platform for the job seeker that searching for new career heights and passionate about startups.
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

          {/* Popular searches — pill chips */}
          <div className="flex flex-wrap items-center gap-2 mt-5">
            <span className="text-body-sm font-semibold text-neutrals-80">Popular:</span>
            {['UI Designer', 'UX Researcher', 'Android', 'Admin'].map((term) => (
              <a
                key={term}
                href={`/jobs?search=${encodeURIComponent(term)}`}
                className="inline-flex items-center px-3 py-1 rounded-full border border-neutrals-20 text-body-sm text-neutrals-80 hover:border-primary hover:text-primary hover:bg-primary-25 transition-colors"
              >
                {term}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
