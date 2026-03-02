import { Briefcase, Users, TrendingUp, Eye } from 'lucide-react';
import Link from 'next/link';
import { getJobs, getApplications } from '@/lib/api';

export default async function AdminDashboard() {
  let totalJobs = 0;
  let totalApplications = 0;

  try {
    const [jobsRes, appsRes] = await Promise.all([
      getJobs({ limit: 1 }),
      getApplications(),
    ]);
    totalJobs = jobsRes.meta.total;
    totalApplications = appsRes.data.length;
  } catch {}

  const stats = [
    {
      label: 'Total Jobs',
      value: totalJobs,
      icon: Briefcase,
      color: 'bg-primary-25 text-primary',
      href: '/admin/jobs',
    },
    {
      label: 'Applications',
      value: totalApplications,
      icon: Users,
      color: 'bg-success/10 text-success',
      href: '/admin/applicants',
    },
    {
      label: 'Active Jobs',
      value: totalJobs,
      icon: TrendingUp,
      color: 'bg-warning/10 text-warning',
      href: '/admin/jobs',
    },
    {
      label: 'Views (Demo)',
      value: '1,249',
      icon: Eye,
      color: 'bg-label-purple/10 text-label-purple',
      href: '#',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h3 font-bold text-neutrals-100">Dashboard</h1>
        <p className="text-body-md text-neutrals-60 mt-1">
          Welcome back! Here's what's happening.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div className="bg-white border border-neutrals-20 rounded-md p-6 hover:shadow-card-hover hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-md flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={22} />
                </div>
              </div>
              <p className="text-3xl font-bold text-neutrals-100 mb-1">{stat.value}</p>
              <p className="text-body-sm text-neutrals-60">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white border border-neutrals-20 rounded-md p-6">
        <h2 className="text-h4 font-bold text-neutrals-100 mb-5">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/jobs" className="btn-primary text-sm">
            Manage Jobs
          </Link>
          <Link href="/admin/applicants" className="btn-secondary text-sm">
            View Applications
          </Link>
          <Link href="/" className="btn-ghost text-sm">
            View Public Site →
          </Link>
        </div>
      </div>
    </div>
  );
}
