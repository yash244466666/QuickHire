import Link from 'next/link';
import { MapPin, Briefcase, Clock } from 'lucide-react';
import { Job } from '@/lib/types';
import Badge from '@/components/ui/Badge';
import CompanyLogo from '@/components/ui/CompanyLogo';

interface JobCardProps {
  job: Job;
  variant?: 'list' | 'grid';
}

const typeVariantMap: Record<string, 'green' | 'yellow' | 'blue' | 'outline'> = {
  'Full-Time': 'green',
  'Part-Time': 'yellow',
  Remote: 'blue',
  Contract: 'outline',
  Internship: 'yellow',
};

export default function JobCard({ job, variant = 'grid' }: JobCardProps) {
  if (variant === 'list') {
    return (
      <Link href={`/jobs/${job.id}`}>
        <div className="job-card flex items-center gap-4">
          <CompanyLogo name={job.company} logo={job.logo} size={56} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h3 className="font-semibold text-neutrals-100 text-body-lg hover:text-primary transition-colors">
                  {job.title}
                </h3>
                <div className="flex items-center gap-4 mt-1 flex-wrap">
                  <span className="text-body-sm text-neutrals-60 flex items-center gap-1">
                    <Briefcase size={14} />
                    {job.company}
                  </span>
                  <span className="text-body-sm text-neutrals-60 flex items-center gap-1">
                    <MapPin size={14} />
                    {job.location}
                  </span>
                  {job.salary && (
                    <span className="text-body-sm text-neutrals-60">{job.salary}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant={typeVariantMap[job.type] || 'outline'}>
                  {job.type}
                </Badge>
                <Badge variant="outline">{job.category}</Badge>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="job-card h-full flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <CompanyLogo name={job.company} logo={job.logo} size={48} />
          <Badge variant={typeVariantMap[job.type] || 'outline'}>{job.type}</Badge>
        </div>

        <div>
          <h3 className="font-semibold text-neutrals-100 text-body-lg mb-1 hover:text-primary transition-colors">
            {job.title}
          </h3>
          <p className="text-body-sm text-neutrals-60 flex items-center gap-1">
            <Briefcase size={13} />
            {job.company}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline">{job.category}</Badge>
          <span className="text-neutrals-20">·</span>
          <span className="text-body-sm text-neutrals-60 flex items-center gap-1">
            <MapPin size={13} />
            {job.location}
          </span>
        </div>

        {job.salary && (
          <p className="text-body-sm font-semibold text-neutrals-100 mt-auto">
            ${job.salary} <span className="font-normal text-neutrals-60">/year</span>
          </p>
        )}

        <div className="flex items-center gap-1 text-neutrals-60 text-body-sm mt-auto">
          <Clock size={13} />
          <span>
            {new Date(job.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}
