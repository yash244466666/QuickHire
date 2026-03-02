import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

// GET /api/jobs
export const getJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, category, location, type, page = '1', limit = '10' } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { company: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { location: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = { equals: category as string, mode: 'insensitive' };
    }

    if (location) {
      where.location = { contains: location as string, mode: 'insensitive' };
    }

    if (type) {
      where.type = { equals: type as string, mode: 'insensitive' };
    }

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
        include: { _count: { select: { applications: true } } },
      }),
      prisma.job.count({ where }),
    ]);

    res.json({
      success: true,
      data: jobs,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/jobs/:id
export const getJobById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ success: false, error: 'Invalid job ID' });
      return;
    }

    const job = await prisma.job.findUnique({
      where: { id },
      include: { _count: { select: { applications: true } } },
    });

    if (!job) {
      res.status(404).json({ success: false, error: 'Job not found' });
      return;
    }

    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};

// POST /api/jobs
export const createJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, company, location, category, type, description, logo, salary } = req.body;

    const job = await prisma.job.create({
      data: { title, company, location, category, type: type || 'Full-Time', description, logo, salary },
    });

    res.status(201).json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/jobs/:id
export const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ success: false, error: 'Invalid job ID' });
      return;
    }

    const existing = await prisma.job.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, error: 'Job not found' });
      return;
    }

    await prisma.job.delete({ where: { id } });

    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (err) {
    next(err);
  }
};
