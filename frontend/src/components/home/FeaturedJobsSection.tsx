import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getJobs } from '@/lib/api';
import JobCard from '@/components/jobs/JobCard';

export default async function FeaturedJobsSection() {
  let jobs = [];
  try {
    const res = await getJobs({ limit: 8 });
    jobs = res.data;
  } catch {}

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-main">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <h2 className="section-title">
            Featured <span className="text-primary">jobs</span>
          </h2>
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-body-md font-semibold text-primary hover:gap-3 transition-all"
          >
            Show all jobs <ArrowRight size={18} />
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-12 text-neutrals-60">
            <p>No jobs available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} variant="grid" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
