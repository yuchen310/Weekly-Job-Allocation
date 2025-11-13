import React from 'react';
import { Staff, Job } from '../utils/types';
interface StaffSelectorProps {
  availableStaff: Staff[];
  selectedStaff: Staff[];
  onStaffSelect: (staff: Staff) => void;
  selectedJob: Job | null;
  error: string | null;
}
const StaffSelector: React.FC<StaffSelectorProps> = ({
  availableStaff,
  selectedStaff,
  onStaffSelect,
  selectedJob,
  error
}) => {
  if (!selectedJob) {
    return null;
  }
  if (error) {
    return <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>;
  }
  return <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-2">
        Available Staff
      </h2>
      <p className="text-sm text-gray-500 mb-2">
        Select up to 3 staff members to view their details and assign to the
        job.
      </p>
      {availableStaff.length === 0 ? <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                No Available Staff
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  There are no staff members available for this job based on
                  skills, availability, and workload constraints.
                </p>
              </div>
            </div>
          </div>
        </div> : <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {availableStaff.map(staff => <div key={staff.id} className={`border rounded-md cursor-pointer transition-colors ${selectedStaff.some(s => s.id === staff.id) ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200 hover:bg-gray-50'}`} onClick={() => onStaffSelect(staff)}>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  {staff.name}
                </h3>
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                  <p>
                    <span className="font-medium">Workload:</span>{' '}
                    {staff.workload}/{staff.maxWorkload} hours
                  </p>
                  <div>
                    <span className="font-medium">Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {staff.skills.map((skill, index) => <span key={index} className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${selectedJob.requirements.includes(skill) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {skill}
                        </span>)}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Preferences:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {staff.preferences.map((pref, index) => <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                          {pref}
                        </span>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
        </div>}
      {selectedStaff.length > 0 && <div className="mt-4">
          <h3 className="text-md font-medium text-gray-900 mb-2">
            Selected Staff
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedStaff.map(staff => <span key={staff.id} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {staff.name}
              </span>)}
          </div>
        </div>}
    </div>;
};
export default StaffSelector;