'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, MapPin, LayoutGrid, List } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import JobCard from '@/components/jobs/JobCard';
import JobFiltersPanel from '@/components/jobs/JobFilters';
import { getJobs } from '@/lib/api';
import { Job, JobFilters } from '@/lib/types';

function JobsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const [filters, setFilters] = useState<JobFilters>({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    location: searchParams.get('location') || '',
    type: searchParams.get('type') || '',
    page: 1,
    limit: 10,
  });

  const [searchInput, setSearchInput] = useState(filters.search || '');

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await getJobs(filters);
        setJobs(res.data);
        setTotal(res.meta.total);
        setTotalPages(res.meta.totalPages);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((f) => ({ ...f, search: searchInput, page: 1 }));
  };

  return (
    <>
      <Navbar />

      {/* Search bar header */}
      <div className="bg-neutrals-10 border-b border-neutrals-20 py-8">
        <div className="container-main">
          <h1 className="text-h3 font-bold text-neutrals-100 mb-2">
            Find your <span className="text-primary">dream job</span>
          </h1>
          <p className="text-body-md text-neutrals-60 mb-6">
            {total > 0 ? `${total} jobs available` : 'Search from thousands of opportunities'}
          </p>

          <form
            onSubmit={handleSearch}
            className="bg-white border border-neutrals-20 rounded-md flex flex-col sm:flex-row overflow-hidden shadow-search"
          >
            <div className="flex items-center gap-3 flex-1 px-5 py-4">
              <Search size={20} className="text-neutrals-60 flex-shrink-0" />
              <input
                type="text"
                placeholder="Job title, keyword or company"
                className="flex-1 bg-transparent outline-none text-body-md text-neutrals-100 placeholder:text-neutrals-60"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="hidden sm:block w-px bg-neutrals-20 my-3" />
            <div className="flex items-center gap-3 flex-1 px-5 py-4">
              <MapPin size={20} className="text-neutrals-60 flex-shrink-0" />
              <input
                type="text"
                placeholder="Location"
                className="flex-1 bg-transparent outline-none text-body-md text-neutrals-100 placeholder:text-neutrals-60"
                value={filters.location || ''}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, location: e.target.value, page: 1 }))
                }
              />
            </div>
            <button type="submit" className="btn-primary m-2 text-sm">
              Search
            </button>
          </form>
        </div>
      </div>

      <main className="container-main py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <JobFiltersPanel filters={filters} onChange={setFilters} />

          {/* Jobs list */}
          <div className="flex-1 min-w-0">
            {/* Controls */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <p className="text-body-md text-neutrals-60">
                Showing{' '}
                <span className="font-semibold text-neutrals-100">{jobs.length}</span> of{' '}
                <span className="font-semibold text-neutrals-100">{total}</span> results
                {filters.search && ` for "${filters.search}"`}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-primary-25 text-primary' : 'text-neutrals-60 hover:text-neutrals-100'}`}
                >
                  <List size={18} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-primary-25 text-primary' : 'text-neutrals-60 hover:text-neutrals-100'}`}
                >
                  <LayoutGrid size={18} />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white border border-neutrals-20 rounded-md p-6 animate-pulse"
                  >
                    <div className="flex gap-4">
                      <div className="w-14 h-14 bg-neutrals-20 rounded-md" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-neutrals-20 rounded w-1/3" />
                        <div className="h-3 bg-neutrals-20 rounded w-1/4" />
                        <div className="h-3 bg-neutrals-20 rounded w-1/5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-20 border border-neutrals-20 rounded-md bg-white">
                <p className="text-5xl mb-4">😔</p>
                <h3 className="font-semibold text-neutrals-100 text-body-lg mb-2">
                  No jobs found
                </h3>
                <p className="text-body-md text-neutrals-60">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : viewMode === 'list' ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} variant="list" />
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} variant="grid" />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setFilters((f) => ({ ...f, page: Math.max(1, (f.page || 1) - 1) }))}
                  disabled={filters.page === 1}
                  className="px-4 py-2 border border-neutrals-20 rounded text-body-sm text-neutrals-80 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setFilters((f) => ({ ...f, page: p }))}
                    className={`w-10 h-10 rounded text-body-sm font-medium transition-colors ${
                      filters.page === p
                        ? 'bg-primary text-white'
                        : 'border border-neutrals-20 text-neutrals-80 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setFilters((f) => ({
                      ...f,
                      page: Math.min(totalPages, (f.page || 1) + 1),
                    }))
                  }
                  disabled={filters.page === totalPages}
                  className="px-4 py-2 border border-neutrals-20 rounded text-body-sm text-neutrals-80 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <JobsPageContent />
    </Suspense>
  );
}
