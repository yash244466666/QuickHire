export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  description: string;
  logo?: string | null;
  salary?: string | null;
  createdAt: string;
  _count?: { applications: number };
}

export interface Application {
  id: number;
  jobId: number;
  name: string;
  email: string;
  resumeLink: string;
  coverNote?: string | null;
  createdAt: string;
  job?: { id: number; title: string; company: string };
}

export interface CreateJobInput {
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  description: string;
  logo?: string;
  salary?: string;
}

export interface CreateApplicationInput {
  jobId: number;
  name: string;
  email: string;
  resumeLink: string;
  coverNote?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface JobFilters {
  search?: string;
  category?: string;
  location?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export const JOB_CATEGORIES = [
  'Design',
  'Sales',
  'Marketing',
  'Finance',
  'Engineering',
  'Business',
  'HR',
  'Tech',
] as const;

export const JOB_TYPES = [
  'Full-Time',
  'Part-Time',
  'Remote',
  'Contract',
  'Internship',
] as const;

export type JobCategory = (typeof JOB_CATEGORIES)[number];
export type JobType = (typeof JOB_TYPES)[number];
