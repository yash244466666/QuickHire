'use client';

import { useState } from 'react';
import { Job } from '@/lib/types';
import ApplyForm from './ApplyForm';

interface ApplyButtonProps {
  job: Job;
}

export default function ApplyButton({ job }: ApplyButtonProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="w-full bg-white text-primary font-bold py-3 rounded-sm hover:bg-neutrals-10 transition-colors"
      >
        Apply Now →
      </button>
      {showForm && (
        <ApplyForm
          jobId={job.id}
          jobTitle={job.title}
          company={job.company}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}
