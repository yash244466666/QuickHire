import { body } from 'express-validator';

export const createApplicationValidators = [
  body('jobId')
    .notEmpty()
    .withMessage('Job ID is required')
    .isInt({ gt: 0 })
    .withMessage('Job ID must be a positive integer'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email address')
    .normalizeEmail(),
  body('resumeLink')
    .trim()
    .notEmpty()
    .withMessage('Resume link is required')
    .isURL()
    .withMessage('Resume link must be a valid URL'),
  body('coverNote').optional().trim(),
];
