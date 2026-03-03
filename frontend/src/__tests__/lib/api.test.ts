import { getJobs, getJob, createJob, deleteJob, createApplication, getApplications } from '@/lib/api';

// Mock the global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

function mockResponse(data: unknown, ok = true, status = 200) {
  return Promise.resolve({
    ok,
    status,
    json: () => Promise.resolve(data),
  } as Response);
}

beforeEach(() => {
  mockFetch.mockReset();
});

const jobsResponse = {
  success: true,
  data: [
    {
      id: 1,
      title: 'Engineer',
      company: 'Acme',
      location: 'Remote',
      category: 'Tech',
      type: 'Full-Time',
      description: 'Great job',
      createdAt: new Date().toISOString(),
    },
  ],
  meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
};

describe('getJobs', () => {
  it('calls /api/jobs', async () => {
    mockFetch.mockReturnValue(mockResponse(jobsResponse));
    await getJobs();
    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('/api/jobs');
  });

  it('returns paginated response', async () => {
    mockFetch.mockReturnValue(mockResponse(jobsResponse));
    const result = await getJobs();
    expect(result.data).toHaveLength(1);
    expect(result.meta.total).toBe(1);
  });

  it('passes search query param', async () => {
    mockFetch.mockReturnValue(mockResponse(jobsResponse));
    await getJobs({ search: 'engineer' });
    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('search=engineer');
  });

  it('passes category query param', async () => {
    mockFetch.mockReturnValue(mockResponse(jobsResponse));
    await getJobs({ category: 'Technology' });
    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('category=Technology');
  });

  it('passes type query param', async () => {
    mockFetch.mockReturnValue(mockResponse(jobsResponse));
    await getJobs({ type: 'Remote' });
    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('type=Remote');
  });

  it('passes page and limit params', async () => {
    mockFetch.mockReturnValue(mockResponse(jobsResponse));
    await getJobs({ page: 2, limit: 5 });
    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('page=2');
    expect(url).toContain('limit=5');
  });
});

describe('getJob', () => {
  it('calls /api/jobs/:id', async () => {
    mockFetch.mockReturnValue(mockResponse({ success: true, data: jobsResponse.data[0] }));
    await getJob(1);
    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('/api/jobs/1');
  });

  it('throws on 404 response', async () => {
    mockFetch.mockReturnValue(mockResponse({ success: false, error: 'Not found' }, false, 404));
    await expect(getJob(999)).rejects.toThrow('Not found');
  });
});

describe('createJob', () => {
  const newJob = {
    title: 'Dev',
    company: 'Corp',
    location: 'NYC',
    category: 'Tech',
    type: 'Full-Time',
    description: 'Great opportunity for a developer',
  };

  it('sends POST to /api/jobs', async () => {
    mockFetch.mockReturnValue(mockResponse({ success: true, data: { id: 1, ...newJob } }, true, 201));
    await createJob(newJob);
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/jobs');
    expect((options as RequestInit).method).toBe('POST');
  });

  it('sends job data as JSON body', async () => {
    mockFetch.mockReturnValue(mockResponse({ success: true, data: { id: 1, ...newJob } }, true, 201));
    await createJob(newJob);
    const [, options] = mockFetch.mock.calls[0];
    const body = JSON.parse((options as RequestInit).body as string);
    expect(body.title).toBe('Dev');
  });
});

describe('deleteJob', () => {
  it('sends DELETE to /api/jobs/:id', async () => {
    mockFetch.mockReturnValue(mockResponse({ success: true, message: 'Deleted' }));
    await deleteJob(1);
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/jobs/1');
    expect((options as RequestInit).method).toBe('DELETE');
  });
});

describe('createApplication', () => {
  const appData = {
    jobId: 1,
    name: 'Alice',
    email: 'alice@example.com',
    resumeLink: 'https://example.com/cv.pdf',
  };

  it('sends POST to /api/applications', async () => {
    mockFetch.mockReturnValue(mockResponse({ success: true, data: { id: 1, ...appData } }, true, 201));
    await createApplication(appData);
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/applications');
    expect((options as RequestInit).method).toBe('POST');
  });

  it('throws on 400 error', async () => {
    mockFetch.mockReturnValue(mockResponse({ success: false, error: 'Validation failed' }, false, 400));
    await expect(createApplication(appData)).rejects.toThrow('Validation failed');
  });
});

describe('getApplications', () => {
  it('calls /api/applications', async () => {
    mockFetch.mockReturnValue(mockResponse({ success: true, data: [] }));
    await getApplications();
    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('/api/applications');
  });
});
