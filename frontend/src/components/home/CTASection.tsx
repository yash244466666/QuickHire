import Link from 'next/link';
import { ArrowRight, Briefcase, Users } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="bg-neutrals-10 py-16 lg:py-24">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Job Seeker CTA */}
          <div className="bg-primary rounded-lg p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center mb-6">
                <Briefcase className="text-white" size={24} />
              </div>
              <p className="text-white/70 text-body-sm font-semibold mb-2 uppercase tracking-wide">
                For Job Seekers
              </p>
              <h3 className="text-3xl font-bold text-white mb-3">Find your next opportunity</h3>
              <p className="text-white/70 text-body-md mb-8 leading-relaxed">
                Browse thousands of jobs from top companies. Filter by category, location, and job type
                to find the perfect fit.
              </p>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-sm hover:bg-neutrals-10 transition-colors group"
              >
                Search Jobs
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Employer CTA */}
          <div className="bg-neutrals-100 rounded-lg p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center mb-6">
                <Users className="text-white" size={24} />
              </div>
              <p className="text-white/50 text-body-sm font-semibold mb-2 uppercase tracking-wide">
                For Companies
              </p>
              <h3 className="text-3xl font-bold text-white mb-3">
                Hire the best talent
              </h3>
              <p className="text-white/60 text-body-md mb-8 leading-relaxed">
                Post job listings and connect with qualified candidates. Our platform makes hiring
                simple, fast, and effective.
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 bg-white text-neutrals-100 font-semibold px-6 py-3 rounded-sm hover:bg-neutrals-10 transition-colors group"
              >
                Post a Job
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
