import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getJobs } from '@/lib/api';
import JobCard from '@/components/jobs/JobCard';

export default async function LatestJobsSection() {
  let jobs = [];
  try {
    const res = await getJobs({ limit: 6 });
    jobs = res.data;
  } catch {}

  return (
    <section className="bg-neutrals-10 py-16 lg:py-24">
      <div className="container-main">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <h2 className="section-title">
            Latest <span className="text-primary">job open</span>
          </h2>
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-body-md font-semibold text-primary hover:gap-3 transition-all"
          >
            Show all jobs <ArrowRight size={18} />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} variant="list" />
          ))}
        </div>

        {jobs.length > 0 && (
          <div className="text-center mt-8">
            <Link href="/jobs" className="btn-secondary inline-flex items-center gap-2">
              Show more jobs <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
