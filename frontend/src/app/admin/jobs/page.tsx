'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, Search } from 'lucide-react';
import Link from 'next/link';
import { getJobs, createJob, deleteJob } from '@/lib/api';
import { Job, CreateJobInput, JOB_CATEGORIES, JOB_TYPES } from '@/lib/types';
import Badge from '@/components/ui/Badge';
import CompanyLogo from '@/components/ui/CompanyLogo';

const typeVariantMap: Record<string, 'green' | 'yellow' | 'blue' | 'outline'> = {
  'Full-Time': 'green',
  'Part-Time': 'yellow',
  Remote: 'blue',
  Contract: 'outline',
  Internship: 'yellow',
};

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const [form, setForm] = useState<CreateJobInput>({
    title: '',
    company: '',
    location: '',
    category: 'Engineering',
    type: 'Full-Time',
    description: '',
    logo: '',
    salary: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await getJobs({ search, limit: 50 });
      setJobs(res.data);
      setTotal(res.meta.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    try {
      await createJob(form);
      setShowForm(false);
      setForm({
        title: '',
        company: '',
        location: '',
        category: 'Engineering',
        type: 'Full-Time',
        description: '',
        logo: '',
        salary: '',
      });
      fetchJobs();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to create job');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteJob(id);
      setDeleteConfirm(null);
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-h3 font-bold text-neutrals-100">Job Listings</h1>
          <p className="text-body-md text-neutrals-60 mt-1">
            {total} jobs total
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} /> Post New Job
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border border-neutrals-20 rounded-md p-4 mb-6 flex items-center gap-3">
        <Search size={18} className="text-neutrals-60 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search jobs..."
          className="flex-1 bg-transparent outline-none text-body-md text-neutrals-100 placeholder:text-neutrals-60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-neutrals-20 rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutrals-20 bg-neutrals-10">
              <th className="text-left py-4 px-6 text-body-sm font-semibold text-neutrals-60">
                Job
              </th>
              <th className="text-left py-4 px-6 text-body-sm font-semibold text-neutrals-60 hidden md:table-cell">
                Location
              </th>
              <th className="text-left py-4 px-6 text-body-sm font-semibold text-neutrals-60 hidden lg:table-cell">
                Type
              </th>
              <th className="text-left py-4 px-6 text-body-sm font-semibold text-neutrals-60 hidden lg:table-cell">
                Category
              </th>
              <th className="text-left py-4 px-6 text-body-sm font-semibold text-neutrals-60 hidden xl:table-cell">
                Posted
              </th>
              <th className="text-right py-4 px-6 text-body-sm font-semibold text-neutrals-60">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-neutrals-20 last:border-0">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3 animate-pulse">
                      <div className="w-10 h-10 bg-neutrals-20 rounded-md" />
                      <div className="space-y-1.5">
                        <div className="h-3 w-32 bg-neutrals-20 rounded" />
                        <div className="h-2.5 w-20 bg-neutrals-20 rounded" />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 hidden md:table-cell">
                    <div className="h-3 w-24 bg-neutrals-20 rounded animate-pulse" />
                  </td>
                  <td className="py-4 px-6 hidden lg:table-cell">
                    <div className="h-5 w-16 bg-neutrals-20 rounded-full animate-pulse" />
                  </td>
                  <td className="py-4 px-6 hidden lg:table-cell">
                    <div className="h-5 w-20 bg-neutrals-20 rounded-full animate-pulse" />
                  </td>
                  <td className="py-4 px-6 hidden xl:table-cell">
                    <div className="h-3 w-20 bg-neutrals-20 rounded animate-pulse" />
                  </td>
                  <td className="py-4 px-6" />
                </tr>
              ))
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center text-neutrals-60">
                  No jobs found. Click "Post New Job" to add one.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-neutrals-20 last:border-0 hover:bg-neutrals-10 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <CompanyLogo name={job.company} logo={job.logo} size={40} />
                      <div>
                        <p className="font-semibold text-neutrals-100 text-body-md">{job.title}</p>
                        <p className="text-body-sm text-neutrals-60">{job.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-body-sm text-neutrals-80 hidden md:table-cell">
                    {job.location}
                  </td>
                  <td className="py-4 px-6 hidden lg:table-cell">
                    <Badge variant={typeVariantMap[job.type] || 'outline'}>{job.type}</Badge>
                  </td>
                  <td className="py-4 px-6 hidden lg:table-cell">
                    <Badge variant="outline">{job.category}</Badge>
                  </td>
                  <td className="py-4 px-6 text-body-sm text-neutrals-60 hidden xl:table-cell">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/jobs/${job.id}`}
                        target="_blank"
                        className="p-2 text-neutrals-60 hover:text-primary hover:bg-primary-25 rounded transition-colors"
                      >
                        <Eye size={16} />
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(job.id)}
                        className="p-2 text-neutrals-60 hover:text-error hover:bg-error/10 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Job Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-neutrals-20">
              <h2 className="text-h4 font-bold text-neutrals-100">Post New Job</h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-neutrals-10 rounded-md text-neutrals-60">
                ✕
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-5">
              {formError && (
                <div className="bg-error/10 text-error text-body-sm px-4 py-3 rounded-md">
                  {formError}
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-body-sm font-semibold text-neutrals-100 mb-2">
                    Job Title <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Senior React Developer"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-semibold text-neutrals-100 mb-2">
                    Company <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Acme Corp"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-semibold text-neutrals-100 mb-2">
                    Location <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. New York, USA or Remote"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-semibold text-neutrals-100 mb-2">
                    Category <span className="text-error">*</span>
                  </label>
                  <select
                    className="input-field"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    required
                  >
                    {JOB_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-body-sm font-semibold text-neutrals-100 mb-2">
                    Job Type
                  </label>
                  <select
                    className="input-field"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    {JOB_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-body-sm font-semibold text-neutrals-100 mb-2">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. 80k-120k"
                    value={form.salary}
                    onChange={(e) => setForm({ ...form, salary: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-body-sm font-semibold text-neutrals-100 mb-2">
                  Company Logo URL
                </label>
                <input
                  type="url"
                  className="input-field"
                  placeholder="https://logo.clearbit.com/company.com"
                  value={form.logo}
                  onChange={(e) => setForm({ ...form, logo: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-body-sm font-semibold text-neutrals-100 mb-2">
                  Job Description <span className="text-error">*</span>
                </label>
                <textarea
                  className="input-field min-h-[160px] resize-none"
                  placeholder="Describe the role, responsibilities, and requirements..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  rows={6}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1" disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1" disabled={submitting}>
                  {submitting ? 'Posting...' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg w-full max-w-sm p-6 shadow-2xl text-center">
            <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-error" />
            </div>
            <h3 className="font-bold text-neutrals-100 text-body-lg mb-2">Delete Job?</h3>
            <p className="text-body-sm text-neutrals-60 mb-6">
              This will permanently delete the job listing and all associated applications.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-error text-white font-semibold py-3 px-6 rounded-sm hover:bg-error/90 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
