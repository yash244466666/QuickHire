// Mock Prisma Client for tests — no database connection required
const prismaMock = {
  job: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  application: {
    findMany: jest.fn(),
    create: jest.fn(),
    count: jest.fn(),
  },
  $connect: jest.fn(),
  $disconnect: jest.fn(),
};

export default prismaMock;
