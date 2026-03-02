import { body } from 'express-validator';

export const createJobValidators = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 20 })
    .withMessage('Description must be at least 20 characters'),
  body('type')
    .optional()
    .isIn(['Full-Time', 'Part-Time', 'Remote', 'Contract', 'Internship'])
    .withMessage('Invalid job type'),
  body('salary').optional().trim(),
  body('logo').optional().isURL().withMessage('Logo must be a valid URL'),
];
