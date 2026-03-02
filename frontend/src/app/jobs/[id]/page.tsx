import { notFound } from 'next/navigation';
import { MapPin, Briefcase, Clock, DollarSign, Users } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import CompanyLogo from '@/components/ui/CompanyLogo';
import ApplyButton from '@/components/jobs/ApplyButton';
import { getJob } from '@/lib/api';

interface Props {
  params: { id: string };
}

const typeVariantMap: Record<string, 'green' | 'yellow' | 'blue' | 'outline'> = {
  'Full-Time': 'green',
  'Part-Time': 'yellow',
  Remote: 'blue',
  Contract: 'outline',
  Internship: 'yellow',
};

export default async function JobDetailPage({ params }: Props) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();

  let job;
  try {
    const res = await getJob(id);
    job = res.data;
  } catch {
    notFound();
  }

  if (!job) notFound();

  return (
    <>
      <Navbar />

      {/* Breadcrumb / header */}
      <div className="bg-neutrals-10 border-b border-neutrals-20 py-8">
        <div className="container-main">
          <p className="text-body-sm text-neutrals-60 mb-1">
            <a href="/" className="hover:text-primary">Home</a>
            {' / '}
            <a href="/jobs" className="hover:text-primary">Jobs</a>
            {' / '}
            <span className="text-neutrals-100">{job.title}</span>
          </p>
          <div className="flex items-start gap-4 mt-4 flex-wrap">
            <CompanyLogo name={job.company} logo={job.logo} size={64} />
            <div className="flex-1">
              <h1 className="text-h3 font-bold text-neutrals-100">{job.title}</h1>
              <div className="flex items-center gap-4 mt-2 flex-wrap text-body-sm text-neutrals-60">
                <span className="flex items-center gap-1">
                  <Briefcase size={14} /> {job.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {new Date(job.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                {job._count && (
                  <span className="flex items-center gap-1">
                    <Users size={14} /> {job._count.applications} applicants
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container-main py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Tags */}
            <div className="flex items-center gap-3 flex-wrap mb-8">
              <Badge variant={typeVariantMap[job.type] || 'outline'}>{job.type}</Badge>
              <Badge variant="outline">{job.category}</Badge>
              {job.salary && (
                <span className="flex items-center gap-1 text-body-sm font-semibold text-neutrals-100">
                  <DollarSign size={14} className="text-primary" />
                  {job.salary}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="bg-white border border-neutrals-20 rounded-md p-8">
              <h2 className="text-h4 font-bold text-neutrals-100 mb-6">Job Description</h2>
              <div
                className="prose prose-sm max-w-none text-neutrals-80 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{
                  __html: job.description
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/\n/g, '<br />')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/^- (.+)$/gm, '<li>$1</li>')
                    .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc list-inside space-y-1">$1</ul>'),
                }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-72 xl:w-80 flex-shrink-0 space-y-5">
            {/* Company card */}
            <div className="bg-white border border-neutrals-20 rounded-md p-6">
              <h3 className="font-semibold text-neutrals-100 mb-4">About {job.company}</h3>
              <div className="flex items-center gap-3 mb-4">
                <CompanyLogo name={job.company} logo={job.logo} size={48} />
                <div>
                  <p className="font-semibold text-neutrals-100">{job.company}</p>
                  <p className="text-body-sm text-neutrals-60">{job.location}</p>
                </div>
              </div>
              <div className="space-y-3 text-body-sm">
                <div className="flex justify-between">
                  <span className="text-neutrals-60">Category</span>
                  <span className="font-medium text-neutrals-100">{job.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutrals-60">Job Type</span>
                  <span className="font-medium text-neutrals-100">{job.type}</span>
                </div>
                {job.salary && (
                  <div className="flex justify-between">
                    <span className="text-neutrals-60">Salary</span>
                    <span className="font-medium text-neutrals-100">${job.salary}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-neutrals-60">Posted</span>
                  <span className="font-medium text-neutrals-100">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Apply CTA */}
            <div className="bg-primary rounded-md p-6 text-center">
              <h3 className="font-bold text-white text-body-lg mb-2">Interested in this role?</h3>
              <p className="text-white/70 text-body-sm mb-5">
                Apply now and take the next step in your career!
              </p>
              <ApplyButton job={job} />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
