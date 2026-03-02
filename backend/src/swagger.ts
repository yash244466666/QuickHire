import swaggerJSDoc from 'swagger-jsdoc';
import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'QuickHire API',
      version: '1.0.0',
      description:
        'REST API for the QuickHire job board — manage job listings and applications.',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 4001}`,
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Job: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Senior Frontend Engineer' },
            company: { type: 'string', example: 'Netlify' },
            location: { type: 'string', example: 'Remote' },
            category: { type: 'string', example: 'Engineering' },
            type: {
              type: 'string',
              enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Remote'],
              example: 'Full-Time',
            },
            description: { type: 'string' },
            logo: { type: 'string', nullable: true, example: 'https://logo.clearbit.com/netlify.com' },
            salary: { type: 'string', nullable: true, example: '100k-130k' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateJobInput: {
          type: 'object',
          required: ['title', 'company', 'location', 'category', 'description'],
          properties: {
            title: { type: 'string', example: 'Senior Frontend Engineer' },
            company: { type: 'string', example: 'Netlify' },
            location: { type: 'string', example: 'Remote' },
            category: {
              type: 'string',
              enum: ['Design', 'Sales', 'Marketing', 'Finance', 'Engineering', 'Business', 'HR', 'Tech'],
              example: 'Engineering',
            },
            type: {
              type: 'string',
              enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Remote'],
              example: 'Full-Time',
            },
            description: { type: 'string', minLength: 20 },
            logo: { type: 'string', example: 'https://logo.clearbit.com/netlify.com' },
            salary: { type: 'string', example: '100k-130k' },
          },
        },
        Application: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            jobId: { type: 'integer', example: 3 },
            name: { type: 'string', example: 'Jane Doe' },
            email: { type: 'string', format: 'email', example: 'jane@example.com' },
            resumeLink: { type: 'string', format: 'uri', example: 'https://resume.io/jane' },
            coverNote: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
            job: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                company: { type: 'string' },
              },
            },
          },
        },
        CreateApplicationInput: {
          type: 'object',
          required: ['jobId', 'name', 'email', 'resumeLink'],
          properties: {
            jobId: { type: 'integer', example: 3 },
            name: { type: 'string', example: 'Jane Doe' },
            email: { type: 'string', format: 'email', example: 'jane@example.com' },
            resumeLink: { type: 'string', format: 'uri', example: 'https://resume.io/jane' },
            coverNote: { type: 'string', example: 'I am very excited about this role...' },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: { type: 'object' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string', example: 'Resource not found' },
          },
        },
        PaginatedMeta: {
          type: 'object',
          properties: {
            total: { type: 'integer', example: 42 },
            page: { type: 'integer', example: 1 },
            limit: { type: 'integer', example: 10 },
            totalPages: { type: 'integer', example: 5 },
          },
        },
      },
    },
  },
  // Glob — any new route file in src/routes/ is automatically picked up
  apis: [path.join(__dirname, 'routes/**/*.{ts,js}')],
};

export const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Application): void {
  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: 'QuickHire API Docs',
      customCss: '.swagger-ui .topbar { background-color: #4640DE; }',
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
      },
    })
  );

  // Raw JSON spec endpoint
  app.get('/api/docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
