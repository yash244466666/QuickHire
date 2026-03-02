import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

// POST /api/applications
export const createApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobId, name, email, resumeLink, coverNote } = req.body;

    // Check job exists
    const job = await prisma.job.findUnique({ where: { id: parseInt(jobId, 10) } });
    if (!job) {
      res.status(404).json({ success: false, error: 'Job not found' });
      return;
    }

    const application = await prisma.application.create({
      data: {
        jobId: parseInt(jobId, 10),
        name,
        email,
        resumeLink,
        coverNote,
      },
      include: { job: { select: { title: true, company: true } } },
    });

    res.status(201).json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
};

// GET /api/applications (admin)
export const getApplications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobId } = req.query;

    const where = jobId ? { jobId: parseInt(jobId as string, 10) } : {};

    const applications = await prisma.application.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { job: { select: { id: true, title: true, company: true } } },
    });

    res.json({ success: true, data: applications });
  } catch (err) {
    next(err);
  }
};
