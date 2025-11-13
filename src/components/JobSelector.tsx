import React from 'react';
import { Job } from '../utils/types';
interface JobSelectorProps {
  selectedJob: Job | null;
}
const JobSelector: React.FC<JobSelectorProps> = ({
  selectedJob
}) => {
  if (!selectedJob) {
    return <div className="bg-white shadow rounded-md p-4 mb-6">
        <p className="text-gray-500 italic">
          Select a job from the roster to view details
        </p>
      </div>;
  }
  return <div className="bg-white shadow rounded-md p-4 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-2">Job Details</h2>
      <div className="space-y-3">
        <div>
          <h3 className="text-md font-medium text-gray-700">
            {selectedJob.title}
          </h3>
          <p className="text-sm text-gray-500">{selectedJob.description}</p>
        </div>
        <div className="flex space-x-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Day</p>
            <p className="text-sm text-gray-500">{selectedJob.day}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Time</p>
            <p className="text-sm text-gray-500">
              {selectedJob.startTime}:00 - {selectedJob.endTime}:00
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Requirements</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {selectedJob.requirements.map((req, index) => <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                {req}
              </span>)}
          </div>
        </div>
        {selectedJob.assignedStaff && selectedJob.assignedStaff.length > 0 && <div>
            <p className="text-sm font-medium text-gray-700">Assigned Staff</p>
            <div className="mt-1">
              {selectedJob.assignedStaff.map((staffId, index) => <p key={index} className="text-sm text-gray-500">
                  {staffId}
                </p>)}
            </div>
          </div>}
      </div>
    </div>;
};
export default JobSelector;