'use client';

import { useEffect, useState } from 'react';
import { getApplications } from '@/lib/api';
import { Application } from '@/lib/types';
import { ExternalLink, Mail } from 'lucide-react';

export default function AdminApplicantsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApplications()
      .then((res) => setApplications(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h3 font-bold text-neutrals-100">Applicants</h1>
        <p className="text-body-md text-neutrals-60 mt-1">
          {applications.length} total applications
        </p>
      </div>

      <div className="bg-white border border-neutrals-20 rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutrals-20 bg-neutrals-10">
              <th className="text-left py-4 px-6 text-body-sm font-semibold text-neutrals-60">
                Applicant
              </th>
              <th className="text-left py-4 px-6 text-body-sm font-semibold text-neutrals-60 hidden md:table-cell">
                Applied For
              </th>
              <th className="text-left py-4 px-6 text-body-sm font-semibold text-neutrals-60 hidden lg:table-cell">
                Date
              </th>
              <th className="text-right py-4 px-6 text-body-sm font-semibold text-neutrals-60">
                Resume
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-b border-neutrals-20 last:border-0">
                    <td className="py-4 px-6">
                      <div className="space-y-1.5 animate-pulse">
                        <div className="h-3 w-32 bg-neutrals-20 rounded" />
                        <div className="h-2.5 w-40 bg-neutrals-20 rounded" />
                      </div>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <div className="h-3 w-28 bg-neutrals-20 rounded animate-pulse" />
                    </td>
                    <td className="py-4 px-6 hidden lg:table-cell">
                      <div className="h-3 w-20 bg-neutrals-20 rounded animate-pulse" />
                    </td>
                    <td className="py-4 px-6" />
                  </tr>
                ))
              : applications.length === 0
              ? (
                <tr>
                  <td colSpan={4} className="py-16 text-center text-neutrals-60">
                    No applications yet.
                  </td>
                </tr>
              )
              : applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-neutrals-20 last:border-0 hover:bg-neutrals-10 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <p className="font-semibold text-neutrals-100 text-body-md">{app.name}</p>
                      <p className="text-body-sm text-neutrals-60 flex items-center gap-1">
                        <Mail size={12} /> {app.email}
                      </p>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <p className="text-body-sm font-medium text-neutrals-100">
                        {app.job?.title || `Job #${app.jobId}`}
                      </p>
                      {app.job?.company && (
                        <p className="text-body-sm text-neutrals-60">{app.job.company}</p>
                      )}
                    </td>
                    <td className="py-4 px-6 text-body-sm text-neutrals-60 hidden lg:table-cell">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <a
                        href={app.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary text-body-sm font-semibold hover:underline"
                      >
                        View <ExternalLink size={13} />
                      </a>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
