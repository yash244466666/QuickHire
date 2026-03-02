import { Router } from 'express';
import { createApplication, getApplications } from '../controllers/applicationController';
import { createApplicationValidators } from '../validators/applicationValidators';
import { validate } from '../middleware/validate';

const router = Router();

/**
 * @openapi
 * /api/applications:
 *   get:
 *     tags: [Applications]
 *     summary: List all applications (admin)
 *     parameters:
 *       - in: query
 *         name: jobId
 *         schema: { type: integer }
 *         description: Filter applications by job ID
 *     responses:
 *       200:
 *         description: List of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Application' }
 */
router.get('/', getApplications);

/**
 * @openapi
 * /api/applications:
 *   post:
 *     tags: [Applications]
 *     summary: Submit a job application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreateApplicationInput' }
 *     responses:
 *       201:
 *         description: Application submitted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { $ref: '#/components/schemas/Application' }
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       404:
 *         description: Job not found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
router.post('/', createApplicationValidators, validate, createApplication);

export default router;
