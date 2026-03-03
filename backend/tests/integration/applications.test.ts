import request from 'supertest';
import app from '../../src/server';
import prisma from '../../src/lib/prisma';

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

const sampleJob = {
  id: 1,
  title: 'Software Engineer',
  company: 'Acme',
  location: 'Remote',
  category: 'Technology',
  type: 'Full-Time',
  description: 'Great role',
  logo: null,
  salary: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const sampleApplication = {
  id: 1,
  jobId: 1,
  name: 'Alice Smith',
  email: 'alice@example.com',
  resumeLink: 'https://example.com/resume.pdf',
  coverNote: 'I am very interested in this role.',
  createdAt: new Date().toISOString(),
  job: { title: 'Software Engineer', company: 'Acme' },
};

beforeEach(() => {
  jest.clearAllMocks();
});

// ── POST /api/applications ────────────────────────────────────────────────────

describe('POST /api/applications', () => {
  const validPayload = {
    jobId: '1',
    name: 'Alice Smith',
    email: 'alice@example.com',
    resumeLink: 'https://example.com/resume.pdf',
    coverNote: 'I am very interested in this role.',
  };

  it('creates application and returns 201', async () => {
    (mockPrisma.job.findUnique as jest.Mock).mockResolvedValue(sampleJob);
    (mockPrisma.application.create as jest.Mock).mockResolvedValue(sampleApplication);

    const res = await request(app).post('/api/applications').send(validPayload);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe('alice@example.com');
  });

  it('returns 404 when job does not exist', async () => {
    (mockPrisma.job.findUnique as jest.Mock).mockResolvedValue(null);

    const res = await request(app).post('/api/applications').send(validPayload);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('returns 400 when name is missing', async () => {
    const { name, ...noName } = validPayload;
    const res = await request(app).post('/api/applications').send(noName);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('returns 400 when email is invalid', async () => {
    const res = await request(app)
      .post('/api/applications')
      .send({ ...validPayload, email: 'not-an-email' });
    expect(res.status).toBe(400);
  });

  it('returns 400 when resumeLink is not a URL', async () => {
    const res = await request(app)
      .post('/api/applications')
      .send({ ...validPayload, resumeLink: 'not-a-url' });
    expect(res.status).toBe(400);
  });

  it('returns 400 when jobId is missing', async () => {
    const { jobId, ...noJobId } = validPayload;
    const res = await request(app).post('/api/applications').send(noJobId);
    expect(res.status).toBe(400);
  });

  it('accepts application without coverNote', async () => {
    (mockPrisma.job.findUnique as jest.Mock).mockResolvedValue(sampleJob);
    (mockPrisma.application.create as jest.Mock).mockResolvedValue({
      ...sampleApplication,
      coverNote: null,
    });

    const { coverNote, ...noCover } = validPayload;
    const res = await request(app).post('/api/applications').send(noCover);
    expect(res.status).toBe(201);
  });
});

// ── GET /api/applications ─────────────────────────────────────────────────────

describe('GET /api/applications', () => {
  const appWithJob = {
    ...sampleApplication,
    job: { id: 1, title: 'Software Engineer', company: 'Acme' },
  };

  it('returns all applications', async () => {
    (mockPrisma.application.findMany as jest.Mock).mockResolvedValue([appWithJob]);

    const res = await request(app).get('/api/applications');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);
  });

  it('filters by jobId when provided', async () => {
    (mockPrisma.application.findMany as jest.Mock).mockResolvedValue([appWithJob]);

    await request(app).get('/api/applications?jobId=1');
    const callArgs = (mockPrisma.application.findMany as jest.Mock).mock.calls[0][0];
    expect(callArgs.where).toEqual({ jobId: 1 });
  });

  it('returns empty array when no applications exist', async () => {
    (mockPrisma.application.findMany as jest.Mock).mockResolvedValue([]);

    const res = await request(app).get('/api/applications');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(0);
  });
});
