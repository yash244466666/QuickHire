'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { createApplication } from '@/lib/api';
import { CreateApplicationInput } from '@/lib/types';
import { X, CheckCircle } from 'lucide-react';

interface ApplyFormProps {
  jobId: number;
  jobTitle: string;
  company: string;
  onClose: () => void;
}

export default function ApplyForm({ jobId, jobTitle, company, onClose }: ApplyFormProps) {
  const [form, setForm] = useState<CreateApplicationInput>({
    jobId,
    name: '',
    email: '',
    resumeLink: '',
    coverNote: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createApplication(form);
      setSuccess(true);
      toast.success('Application submitted successfully! Good luck! 🎉');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutrals-20">
          <div>
            <h2 className="text-h4 font-bold text-neutrals-100">Apply for this Job</h2>
            <p className="text-body-sm text-neutrals-60 mt-0.5">
              {jobTitle} · {company}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutrals-10 rounded-md transition-colors text-neutrals-60 hover:text-neutrals-100"
          >
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-success" />
            </div>
            <h3 className="text-h4 font-bold text-neutrals-100 mb-2">Application Submitted!</h3>
            <p className="text-body-md text-neutrals-60 mb-6">
              Your application for <strong>{jobTitle}</strong> at <strong>{company}</strong> has been
              submitted successfully. Good luck!
            </p>
            <button onClick={onClose} className="btn-primary w-full">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && (
              <div className="bg-error/10 text-error text-body-sm px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label className="block text-body-sm font-semibold text-neutrals-100 mb-2">
                Full Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-body-sm font-semibold text-neutrals-100 mb-2">
                Email Address <span className="text-error">*</span>
              </label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-body-sm font-semibold text-neutrals-100 mb-2">
                Resume Link <span className="text-error">*</span>
              </label>
              <input
                type="url"
                className="input-field"
                placeholder="https://drive.google.com/your-resume"
                value={form.resumeLink}
                onChange={(e) => setForm({ ...form, resumeLink: e.target.value })}
                required
              />
              <p className="text-body-sm text-neutrals-60 mt-1">
                Link to your resume (Google Drive, Dropbox, etc.)
              </p>
            </div>

            <div>
              <label className="block text-body-sm font-semibold text-neutrals-100 mb-2">
                Cover Note <span className="text-neutrals-60 font-normal">(Optional)</span>
              </label>
              <textarea
                className="input-field min-h-[120px] resize-none"
                placeholder="Tell us why you're a great fit for this role..."
                value={form.coverNote}
                onChange={(e) => setForm({ ...form, coverNote: e.target.value })}
                rows={4}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
