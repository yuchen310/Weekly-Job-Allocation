import React from 'react';
import { Job } from '../utils/types';
import { AlertTriangleIcon } from 'lucide-react';

interface RejectedJobsProps {
  rejectedJobs: {
    job: Job;
    rejectedByNames: string[];
    rejectedReasons: string[];
  }[];
}


const RejectedJobs: React.FC<RejectedJobsProps> = ({ rejectedJobs }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <AlertTriangleIcon className="h-6 w-6 text-red-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Rejected Jobs</h2>
      </div>

      {rejectedJobs.length === 0 ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <p className="text-green-800 font-medium">
            No jobs have been rejected by staff.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 mb-3">
            The following jobs have been rejected by staff members and need to be reassigned:
          </p>

          {rejectedJobs.map(({ job, rejectedByNames, rejectedReasons }) => (
            <div
              key={job.id}
              className="p-4 bg-red-50 border border-red-200 rounded-md"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900">{job.title}</p>
                  <p className="text-sm text-gray-600">{job.description}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">{job.day}</span> •{' '}
                    {job.startTime}:00 - {job.endTime}:00
                  </p>
                </div>

                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Rejected
                </span>
              </div>

              <div className="mt-2">
                <p className="text-sm font-medium text-red-800">
                  Rejected by: {rejectedByNames.join(', ')}
                </p>

                {/* ✅ Display rejection reasons */}
                <div className="mt-1">
                  <p className="text-sm text-red-700 font-medium">Reasons:</p>
                  <ul className="list-disc ml-5 text-sm text-red-700">
                    {rejectedReasons.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RejectedJobs;
