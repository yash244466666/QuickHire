import request from 'supertest';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validate } from '../../src/middleware/validate';
import { errorHandler } from '../../src/middleware/errorHandler';

// ── helpers ──────────────────────────────────────────────────────────────────

function makeApp(validations: ReturnType<typeof body>[]) {
  const app = express();
  app.use(express.json());
  app.post('/test', ...validations, validate, (_req: Request, res: Response) => {
    res.json({ success: true });
  });
  app.use(errorHandler);
  return app;
}

// ── validate middleware ───────────────────────────────────────────────────────

describe('validate middleware', () => {
  describe('when validation passes', () => {
    const app = makeApp([body('name').notEmpty()]);

    it('calls next and returns 200', async () => {
      const res = await request(app).post('/test').send({ name: 'Alice' });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('when validation fails', () => {
    const app = makeApp([body('name').notEmpty().withMessage('Name is required')]);

    it('returns 400', async () => {
      const res = await request(app).post('/test').send({});
      expect(res.status).toBe(400);
    });

    it('returns success: false', async () => {
      const res = await request(app).post('/test').send({});
      expect(res.body.success).toBe(false);
    });

    it('returns error message', async () => {
      const res = await request(app).post('/test').send({});
      expect(res.body.error).toBe('Validation failed');
    });

    it('returns details array', async () => {
      const res = await request(app).post('/test').send({});
      expect(Array.isArray(res.body.details)).toBe(true);
      expect(res.body.details.length).toBeGreaterThan(0);
    });

    it('details contain the field error message', async () => {
      const res = await request(app).post('/test').send({});
      expect(res.body.details[0]).toEqual(
        expect.objectContaining({ msg: 'Name is required' })
      );
    });
  });

  describe('multiple validation errors', () => {
    const app = makeApp([
      body('title').notEmpty().withMessage('Title required'),
      body('email').isEmail().withMessage('Valid email required'),
    ]);

    it('returns all errors in details', async () => {
      const res = await request(app).post('/test').send({});
      expect(res.body.details.length).toBeGreaterThanOrEqual(2);
    });
  });
});

// ── errorHandler middleware ───────────────────────────────────────────────────

describe('errorHandler middleware', () => {
  function makeErrorApp(statusCode?: number, message?: string) {
    const app = express();
    app.get('/throw', (_req, _res, next) => {
      const err: Error & { statusCode?: number } = new Error(message || 'Oops');
      if (statusCode) err.statusCode = statusCode;
      next(err);
    });
    app.use(errorHandler);
    return app;
  }

  it('returns 500 for generic errors', async () => {
    const res = await request(makeErrorApp()).get('/throw');
    expect(res.status).toBe(500);
  });

  it('returns custom statusCode when set on error', async () => {
    const res = await request(makeErrorApp(422)).get('/throw');
    expect(res.status).toBe(422);
  });

  it('returns success: false', async () => {
    const res = await request(makeErrorApp()).get('/throw');
    expect(res.body.success).toBe(false);
  });

  it('returns the error message', async () => {
    const res = await request(makeErrorApp(400, 'Bad input')).get('/throw');
    expect(res.body.error).toBe('Bad input');
  });
});
