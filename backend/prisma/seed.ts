import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const jobs = [
  {
    title: 'Social Media Assistant',
    company: 'Nomad',
    location: 'Paris, France',
    category: 'Marketing',
    type: 'Full-Time',
    description:
      'We are looking for a Social Media Assistant to join our marketing team. You will be responsible for managing our social media presence, creating engaging content, and monitoring analytics.\n\n**Responsibilities:**\n- Create and schedule social media content across platforms\n- Monitor and respond to comments and messages\n- Track analytics and prepare weekly reports\n- Collaborate with the design team for visual content\n\n**Requirements:**\n- 1-2 years of social media experience\n- Strong written communication skills\n- Familiarity with tools like Buffer, Hootsuite, or Sprout Social\n- Eye for design and branding consistency',
    logo: 'https://logo.clearbit.com/nomad.com',
    salary: '35k-45k',
  },
  {
    title: 'Brand Designer',
    company: 'Dropbox',
    location: 'San Francisco, USA',
    category: 'Design',
    type: 'Full-Time',
    description:
      'Dropbox is looking for a Brand Designer to help shape our visual identity. You will work closely with the marketing and product teams to ensure consistent branding across all touchpoints.\n\n**Responsibilities:**\n- Create visual assets for campaigns, presentations, and social media\n- Maintain and evolve brand guidelines\n- Collaborate with cross-functional teams\n- Deliver high-quality work under tight deadlines\n\n**Requirements:**\n- 3+ years of brand design experience\n- Proficiency in Figma, Adobe Illustrator, Photoshop\n- Strong portfolio showing branding work\n- Excellent attention to detail',
    logo: 'https://logo.clearbit.com/dropbox.com',
    salary: '90k-120k',
  },
  {
    title: 'Interactive Developer',
    company: 'Terraform',
    location: 'Hamburg, Germany',
    category: 'Engineering',
    type: 'Full-Time',
    description:
      'Join Terraform as an Interactive Developer and build immersive digital experiences. You will bridge the gap between design and development, creating rich interactive content.\n\n**Responsibilities:**\n- Develop interactive web experiences using WebGL, Three.js, or similar\n- Collaborate with designers and UX teams\n- Optimize for performance across devices\n- Write clean, maintainable code\n\n**Requirements:**\n- 2+ years of interactive development experience\n- Strong JavaScript/TypeScript skills\n- Experience with animation libraries (GSAP, Framer Motion)\n- Understanding of 3D rendering and shaders is a plus',
    logo: 'https://logo.clearbit.com/terraform.io',
    salary: '80k-110k',
  },
  {
    title: 'HR Manager',
    company: 'Revolut',
    location: 'London, UK',
    category: 'HR',
    type: 'Full-Time',
    description:
      'Revolut is hiring an HR Manager to oversee our people operations. You will play a key role in talent acquisition, employee engagement, and culture building.\n\n**Responsibilities:**\n- Lead end-to-end recruitment processes\n- Implement HR policies and procedures\n- Manage onboarding and offboarding\n- Drive employee engagement initiatives\n\n**Requirements:**\n- 4+ years of HR experience\n- CIPD qualification preferred\n- Experience in a fast-growing tech company\n- Strong interpersonal and communication skills',
    logo: 'https://logo.clearbit.com/revolut.com',
    salary: '65k-85k',
  },
  {
    title: 'Product Designer',
    company: 'Canva',
    location: 'Sydney, Australia',
    category: 'Design',
    type: 'Part-Time',
    description:
      'Canva is looking for a Product Designer to design intuitive and beautiful products that millions of people use daily.\n\n**Responsibilities:**\n- Design user flows, wireframes, and high-fidelity mockups\n- Conduct user research and usability testing\n- Collaborate with product managers and engineers\n- Iterate based on feedback and data\n\n**Requirements:**\n- 3+ years of product design experience\n- Expert in Figma\n- Strong user-centered design thinking\n- Familiarity with design systems',
    logo: 'https://logo.clearbit.com/canva.com',
    salary: '75k-100k',
  },
  {
    title: 'Lead Engineer',
    company: 'ClassPass',
    location: 'New York, USA',
    category: 'Engineering',
    type: 'Full-Time',
    description:
      'ClassPass is seeking a Lead Engineer to guide a team of talented engineers building our next-generation fitness platform.\n\n**Responsibilities:**\n- Lead technical architecture decisions\n- Mentor junior engineers\n- Drive engineering best practices\n- Collaborate with product to deliver features\n\n**Requirements:**\n- 5+ years of software engineering experience\n- Experience with React, Node.js, PostgreSQL\n- Strong leadership and communication skills\n- Experience with cloud platforms (AWS/GCP)',
    logo: 'https://logo.clearbit.com/classpass.com',
    salary: '140k-180k',
  },
  {
    title: 'Pitch Copywriter',
    company: 'Pitch',
    location: 'Berlin, Germany',
    category: 'Marketing',
    type: 'Remote',
    description:
      'Pitch is looking for a talented Copywriter to craft compelling narratives for our marketing campaigns, product pages, and pitch decks.\n\n**Responsibilities:**\n- Write clear, engaging copy for digital channels\n- Develop brand voice and tone guidelines\n- Create content for email campaigns and landing pages\n- Work with designers on creative campaigns\n\n**Requirements:**\n- 2+ years of copywriting experience\n- Strong portfolio of marketing copy\n- Ability to translate complex ideas into simple language\n- Experience writing for B2B SaaS products',
    logo: 'https://logo.clearbit.com/pitch.com',
    salary: '55k-75k',
  },
  {
    title: 'Financial Analyst',
    company: 'Blinkist',
    location: 'Berlin, Germany',
    category: 'Finance',
    type: 'Full-Time',
    description:
      'Blinkist is seeking a Financial Analyst to support our finance team with budgeting, forecasting, and reporting.\n\n**Responsibilities:**\n- Prepare monthly financial reports\n- Build and maintain financial models\n- Support budget planning and variance analysis\n- Present findings to leadership\n\n**Requirements:**\n- 2+ years of financial analysis experience\n- Advanced Excel and financial modeling skills\n- CFA certification is a plus\n- Strong analytical and communication skills',
    logo: 'https://logo.clearbit.com/blinkist.com',
    salary: '60k-80k',
  },
  {
    title: 'Sales Executive',
    company: 'Webflow',
    location: 'Remote',
    category: 'Sales',
    type: 'Remote',
    description:
      'Webflow is hiring a Sales Executive to drive new business and grow our enterprise customer base.\n\n**Responsibilities:**\n- Identify and qualify new business opportunities\n- Manage full sales cycle from prospecting to close\n- Meet and exceed quarterly sales quotas\n- Build long-term customer relationships\n\n**Requirements:**\n- 3+ years of B2B SaaS sales experience\n- Proven track record of hitting quota\n- Excellent negotiation and presentation skills\n- Experience with Salesforce or similar CRM',
    logo: 'https://logo.clearbit.com/webflow.com',
    salary: '70k-100k + commission',
  },
  {
    title: 'Backend Developer',
    company: 'Netlify',
    location: 'Remote',
    category: 'Engineering',
    type: 'Remote',
    description:
      'Netlify is hiring a Backend Developer to build and maintain our platform infrastructure.\n\n**Responsibilities:**\n- Design and implement RESTful APIs\n- Work with PostgreSQL and Redis\n- Write thorough tests and documentation\n- Collaborate with frontend teams on integrations\n\n**Requirements:**\n- 3+ years of backend development experience\n- Proficiency in Node.js or Go\n- Strong understanding of database design\n- Experience with CI/CD pipelines',
    logo: 'https://logo.clearbit.com/netlify.com',
    salary: '100k-130k',
  },
  {
    title: 'Business Development Rep',
    company: 'Maze',
    location: 'Toronto, Canada',
    category: 'Business',
    type: 'Full-Time',
    description:
      'Maze is looking for a Business Development Representative to help expand our market presence.\n\n**Responsibilities:**\n- Prospect and qualify new business leads\n- Conduct discovery calls with potential customers\n- Collaborate with the sales team on pipeline management\n- Maintain accurate records in Salesforce\n\n**Requirements:**\n- 1-2 years of BDR/SDR experience\n- Excellent communication and listening skills\n- Self-motivated with a competitive drive\n- Familiarity with UX research tools is a plus',
    logo: 'https://logo.clearbit.com/maze.co',
    salary: '45k-60k + OTE',
  },
  {
    title: 'Tech Support Specialist',
    company: 'GoDaddy',
    location: 'Tempe, USA',
    category: 'Tech',
    type: 'Full-Time',
    description:
      'GoDaddy is seeking a Tech Support Specialist to help our customers succeed with their online businesses.\n\n**Responsibilities:**\n- Provide technical support via phone, chat, and email\n- Diagnose and resolve customer issues\n- Document support cases accurately\n- Escalate complex issues to senior engineers\n\n**Requirements:**\n- 1+ year of technical support experience\n- Familiarity with web hosting, DNS, and SSL\n- Excellent customer service skills\n- Ability to explain technical concepts clearly',
    logo: 'https://logo.clearbit.com/godaddy.com',
    salary: '40k-55k',
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();

  // Insert jobs
  for (const job of jobs) {
    await prisma.job.create({ data: job });
  }

  console.log(`✅ Seeded ${jobs.length} jobs`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
