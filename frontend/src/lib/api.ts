import {
  Job,
  CreateJobInput,
  CreateApplicationInput,
  ApiResponse,
  PaginatedResponse,
  JobFilters,
  Application,
} from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001';

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `HTTP error! status: ${response.status}`);
  }

  return data;
}

// ─── Jobs ─────────────────────────────────────────────────────────

export async function getJobs(
  filters: JobFilters = {}
): Promise<PaginatedResponse<Job>> {
  const params = new URLSearchParams();

  if (filters.search) params.set('search', filters.search);
  if (filters.category) params.set('category', filters.category);
  if (filters.location) params.set('location', filters.location);
  if (filters.type) params.set('type', filters.type);
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));

  const query = params.toString();
  return fetchApi(`/api/jobs${query ? `?${query}` : ''}`);
}

export async function getJob(id: number): Promise<ApiResponse<Job>> {
  return fetchApi(`/api/jobs/${id}`);
}

export async function createJob(
  data: CreateJobInput
): Promise<ApiResponse<Job>> {
  return fetchApi('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function deleteJob(id: number): Promise<ApiResponse<void>> {
  return fetchApi(`/api/jobs/${id}`, { method: 'DELETE' });
}

// ─── Applications ─────────────────────────────────────────────────

export async function createApplication(
  data: CreateApplicationInput
): Promise<ApiResponse<Application>> {
  return fetchApi('/api/applications', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getApplications(
  jobId?: number
): Promise<ApiResponse<Application[]>> {
  const query = jobId ? `?jobId=${jobId}` : '';
  return fetchApi(`/api/applications${query}`);
}
