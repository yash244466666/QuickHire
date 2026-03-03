/**
 * Backend Unit Tests — Validators
 * Tests that express-validator chains validate correctly using supertest.
 */

import express from 'express';
import request from 'supertest';
import { createJobValidators } from '../../src/validators/jobValidators';
import { createApplicationValidators } from '../../src/validators/applicationValidators';
import { validate } from '../../src/middleware/validate';

// Build minimal test app (no DB needed)
function buildTestApp(
  validators: any[],
  handler: (req: any, res: any) => void
) {
  const app = express();
  app.use(express.json());
  app.post('/test', ...validators, validate, handler);
  return app;
}

// ─── Job Validators ─────────────────────────────────────────────────────────

describe('createJobValidators', () => {
  const successHandler = (req: any, res: any) => res.json({ success: true });
  const app = buildTestApp(createJobValidators, successHandler);

  const validJob = {
    title: 'Senior Engineer',
    company: 'Acme Corp',
    location: 'Remote',
    category: 'Engineering',
    description: 'We need a talented engineer with 5+ years experience.',
    type: 'Full-Time',
  };

  it('accepts a valid job payload', async () => {
    const res = await request(app).post('/test').send(validJob);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('rejects missing title', async () => {
    const res = await request(app)
      .post('/test')
      .send({ ...validJob, title: '' });
    expect(res.status).toBe(400);
    expect(res.body.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: 'Title is required' }),
      ])
    );
  });

  it('rejects missing company', async () => {
    const res = await request(app)
      .post('/test')
      .send({ ...validJob, company: '' });
    expect(res.status).toBe(400);
  });

  it('rejects missing location', async () => {
    const res = await request(app)
      .post('/test')
      .send({ ...validJob, location: '' });
    expect(res.status).toBe(400);
  });

  it('rejects description shorter than 20 chars', async () => {
    const res = await request(app)
      .post('/test')
      .send({ ...validJob, description: 'Too short' });
    expect(res.status).toBe(400);
    expect(res.body.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: 'Description must be at least 20 characters' }),
      ])
    );
  });

  it('rejects invalid job type', async () => {
    const res = await request(app)
      .post('/test')
      .send({ ...validJob, type: 'NotAType' });
    expect(res.status).toBe(400);
    expect(res.body.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: 'Invalid job type' }),
      ])
    );
  });

  it('accepts all valid job types', async () => {
    const validTypes = ['Full-Time', 'Part-Time', 'Remote', 'Contract', 'Internship'];
    for (const type of validTypes) {
      const res = await request(app).post('/test').send({ ...validJob, type });
      expect(res.status).toBe(200);
    }
  });

  it('rejects an invalid logo URL', async () => {
    const res = await request(app)
      .post('/test')
      .send({ ...validJob, logo: 'not-a-url' });
    expect(res.status).toBe(400);
    expect(res.body.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: 'Logo must be a valid URL' }),
      ])
    );
  });

  it('accepts a valid logo URL', async () => {
    const res = await request(app)
      .post('/test')
      .send({ ...validJob, logo: 'https://logo.clearbit.com/example.com' });
    expect(res.status).toBe(200);
  });

  it('accepts optional salary', async () => {
    const res = await request(app)
      .post('/test')
      .send({ ...validJob, salary: '80k-120k' });
    expect(res.status).toBe(200);
  });
});

// ─── Application Validators ──────────────────────────────────────────────────

describe('createApplicationValidators', () => {
  const successHandler = (req: any, res: any) => res.json({ success: true });
  const app = buildTestApp(createApplicationValidators, successHandler);

  const validApp = {
    jobId: 1,
    name: 'John Doe',
    email: 'john@example.com',
    resumeLink: 'https://drive.google.com/file/d/resume',
  };

  it('accepts a valid application payload', async () => {
    const res = await request(app).post('/test').send(validApp);
    expect(res.status).toBe(200);
  });

  it('rejects missing jobId', async () => {
    const { jobId, ...rest } = validApp;
    const res = await request(app).post('/test').send(rest);
    expect(res.status).toBe(400);
  });

  it('rejects jobId 0 (must be > 0)', async () => {
    const res = await request(app).post('/test').send({ ...validApp, jobId: 0 });
    expect(res.status).toBe(400);
  });

  it('rejects missing name', async () => {
    const res = await request(app).post('/test').send({ ...validApp, name: '' });
    expect(res.status).toBe(400);
  });

  it('rejects invalid email', async () => {
    const res = await request(app)
      .post('/test')
      .send({ ...validApp, email: 'not-an-email' });
    expect(res.status).toBe(400);
    expect(res.body.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: 'Email must be a valid email address' }),
      ])
    );
  });

  it('rejects invalid resumeLink URL', async () => {
    const res = await request(app)
      .post('/test')
      .send({ ...validApp, resumeLink: 'not-a-url' });
    expect(res.status).toBe(400);
    expect(res.body.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: 'Resume link must be a valid URL' }),
      ])
    );
  });

  it('accepts optional coverNote', async () => {
    const res = await request(app)
      .post('/test')
      .send({ ...validApp, coverNote: 'I am very interested in this role.' });
    expect(res.status).toBe(200);
  });

  it('accepts missing coverNote', async () => {
    const res = await request(app).post('/test').send(validApp);
    expect(res.status).toBe(200);
  });
});
