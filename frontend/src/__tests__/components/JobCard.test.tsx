import React from 'react';
import { render, screen } from '@testing-library/react';
import JobCard from '@/components/jobs/JobCard';
import { Job } from '@/lib/types';

const mockJob: Job = {
  id: 1,
  title: 'Senior Frontend Engineer',
  company: 'Acme Corp',
  location: 'New York, USA',
  category: 'Technology',
  type: 'Full-Time',
  description: 'Build amazing UIs',
  logo: null,
  salary: '120k',
  createdAt: '2024-01-15T00:00:00.000Z',
  _count: { applications: 5 },
};

describe('JobCard component', () => {
  describe('grid variant (default)', () => {
    beforeEach(() => {
      render(<JobCard job={mockJob} />);
    });

    it('renders job title', () => {
      expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument();
    });

    it('renders company name', () => {
      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    });

    it('renders location', () => {
      expect(screen.getByText('New York, USA')).toBeInTheDocument();
    });

    it('renders job type badge', () => {
      expect(screen.getByText('Full-Time')).toBeInTheDocument();
    });

    it('renders category badge', () => {
      expect(screen.getByText('Technology')).toBeInTheDocument();
    });

    it('renders salary when provided', () => {
      expect(screen.getByText(/120k/)).toBeInTheDocument();
    });

    it('renders a link to job detail', () => {
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/jobs/1');
    });
  });

  describe('list variant', () => {
    beforeEach(() => {
      render(<JobCard job={mockJob} variant="list" />);
    });

    it('renders job title in list view', () => {
      expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument();
    });

    it('renders company in list view', () => {
      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    });

    it('renders location in list view', () => {
      expect(screen.getByText('New York, USA')).toBeInTheDocument();
    });

    it('renders salary in list view', () => {
      expect(screen.getByText(/120k/)).toBeInTheDocument();
    });
  });

  describe('when salary is not provided', () => {
    it('does not render salary section', () => {
      const jobNoSalary = { ...mockJob, salary: null };
      render(<JobCard job={jobNoSalary} />);
      expect(screen.queryByText(/year/)).not.toBeInTheDocument();
    });
  });

  describe('job type badge color mapping', () => {
    it('renders Part-Time job', () => {
      render(<JobCard job={{ ...mockJob, type: 'Part-Time' }} />);
      expect(screen.getByText('Part-Time')).toBeInTheDocument();
    });

    it('renders Remote job', () => {
      render(<JobCard job={{ ...mockJob, type: 'Remote' }} />);
      expect(screen.getByText('Remote')).toBeInTheDocument();
    });

    it('renders Contract job', () => {
      render(<JobCard job={{ ...mockJob, type: 'Contract' }} />);
      expect(screen.getByText('Contract')).toBeInTheDocument();
    });

    it('renders Internship job', () => {
      render(<JobCard job={{ ...mockJob, type: 'Internship' }} />);
      expect(screen.getByText('Internship')).toBeInTheDocument();
    });
  });
});
