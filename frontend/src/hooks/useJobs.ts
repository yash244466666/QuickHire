'use client';

import { useEffect, useState, useCallback } from 'react';
import { getJobs } from '@/lib/api';
import { Job, JobFilters, PaginatedResponse } from '@/lib/types';
import { useDebounce } from './useDebounce';

interface UseJobsResult {
  jobs: Job[];
  total: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useJobs(filters: JobFilters): UseJobsResult {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(filters.search, 400);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getJobs({ ...filters, search: debouncedSearch });
      setJobs(res.data);
      setTotal(res.meta.total);
      setTotalPages(res.meta.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }, [filters, debouncedSearch]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, total, totalPages, loading, error, refetch: fetchJobs };
}
