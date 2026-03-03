import request from 'supertest';
import app from '../../src/server';
import prisma from '../../src/lib/prisma';

// The prisma import is auto-mocked via moduleNameMapper → tests/__mocks__/prisma.ts
const mockPrisma = prisma as jest.Mocked<typeof prisma>;

const sampleJob = {
  id: 1,
  title: 'Frontend Engineer',
  company: 'Acme Corp',
  location: 'Remote',
  category: 'Technology',
  type: 'Full-Time',
  description: 'Build awesome UIs',
  logo: null,
  salary: '$100k',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  _count: { applications: 3 },
};

beforeEach(() => {
  jest.clearAllMocks();
});

// ── GET /api/health ───────────────────────────────────────────────────────────

describe('GET /api/health', () => {
  it('returns 200 with success true', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

// ── GET /api/jobs ─────────────────────────────────────────────────────────────

describe('GET /api/jobs', () => {
  it('returns paginated jobs list', async () => {
    (mockPrisma.job.findMany as jest.Mock).mockResolvedValue([sampleJob]);
    (mockPrisma.job.count as jest.Mock).mockResolvedValue(1);

    const res = await request(app).get('/api/jobs');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.meta).toMatchObject({ total: 1, page: 1 });
  });

  it('passes search query to prisma', async () => {
    (mockPrisma.job.findMany as jest.Mock).mockResolvedValue([]);
    (mockPrisma.job.count as jest.Mock).mockResolvedValue(0);

    await request(app).get('/api/jobs?search=engineer');
    const callArgs = (mockPrisma.job.findMany as jest.Mock).mock.calls[0][0];
    expect(callArgs.where).toHaveProperty('OR');
  });

  it('passes category filter to prisma', async () => {
    (mockPrisma.job.findMany as jest.Mock).mockResolvedValue([]);
    (mockPrisma.job.count as jest.Mock).mockResolvedValue(0);

    await request(app).get('/api/jobs?category=Technology');
    const callArgs = (mockPrisma.job.findMany as jest.Mock).mock.calls[0][0];
    expect(callArgs.where.category).toEqual({ equals: 'Technology', mode: 'insensitive' });
  });

  it('passes type filter to prisma', async () => {
    (mockPrisma.job.findMany as jest.Mock).mockResolvedValue([]);
    (mockPrisma.job.count as jest.Mock).mockResolvedValue(0);

    await request(app).get('/api/jobs?type=Full-Time');
    const callArgs = (mockPrisma.job.findMany as jest.Mock).mock.calls[0][0];
    expect(callArgs.where.type).toEqual({ equals: 'Full-Time', mode: 'insensitive' });
  });

  it('respects page and limit query params', async () => {
    (mockPrisma.job.findMany as jest.Mock).mockResolvedValue([]);
    (mockPrisma.job.count as jest.Mock).mockResolvedValue(0);

    const res = await request(app).get('/api/jobs?page=2&limit=5');
    expect(res.body.meta.page).toBe(2);
    expect(res.body.meta.limit).toBe(5);
    const callArgs = (mockPrisma.job.findMany as jest.Mock).mock.calls[0][0];
    expect(callArgs.skip).toBe(5);
    expect(callArgs.take).toBe(5);
  });
});

// ── GET /api/jobs/:id ─────────────────────────────────────────────────────────

describe('GET /api/jobs/:id', () => {
  it('returns job when found', async () => {
    (mockPrisma.job.findUnique as jest.Mock).mockResolvedValue(sampleJob);

    const res = await request(app).get('/api/jobs/1');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(1);
  });

  it('returns 404 when job not found', async () => {
    (mockPrisma.job.findUnique as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get('/api/jobs/999');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('returns 400 for non-numeric id', async () => {
    const res = await request(app).get('/api/jobs/abc');
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

// ── POST /api/jobs ────────────────────────────────────────────────────────────

describe('POST /api/jobs', () => {
  const validPayload = {
    title: 'Backend Engineer',
    company: 'TechCo',
    location: 'New York',
    category: 'Technology',
    type: 'Full-Time',
    description: 'Build robust APIs and backend systems for our platform',
  };

  it('creates and returns new job', async () => {
    const created = { id: 2, ...validPayload, logo: null, salary: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    (mockPrisma.job.create as jest.Mock).mockResolvedValue(created);

    const res = await request(app).post('/api/jobs').send(validPayload);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Backend Engineer');
  });

  it('returns 400 when title is missing', async () => {
    const { title, ...noTitle } = validPayload;
    const res = await request(app).post('/api/jobs').send(noTitle);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('returns 400 when company is missing', async () => {
    const { company, ...noCompany } = validPayload;
    const res = await request(app).post('/api/jobs').send(noCompany);
    expect(res.status).toBe(400);
  });

  it('returns 400 when description is missing', async () => {
    const { description, ...noDesc } = validPayload;
    const res = await request(app).post('/api/jobs').send(noDesc);
    expect(res.status).toBe(400);
  });
});

// ── DELETE /api/jobs/:id ──────────────────────────────────────────────────────

describe('DELETE /api/jobs/:id', () => {
  it('deletes job and returns success', async () => {
    (mockPrisma.job.findUnique as jest.Mock).mockResolvedValue(sampleJob);
    (mockPrisma.job.delete as jest.Mock).mockResolvedValue(sampleJob);

    const res = await request(app).delete('/api/jobs/1');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('returns 404 when job not found', async () => {
    (mockPrisma.job.findUnique as jest.Mock).mockResolvedValue(null);

    const res = await request(app).delete('/api/jobs/999');
    expect(res.status).toBe(404);
  });

  it('returns 400 for non-numeric id', async () => {
    const res = await request(app).delete('/api/jobs/abc');
    expect(res.status).toBe(400);
  });
});
