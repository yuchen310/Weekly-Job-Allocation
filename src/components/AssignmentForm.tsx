import React from 'react';
import { Staff, Job, Roster } from '../utils/types';
interface AssignmentFormProps {
  selectedJob: Job | null;
  selectedStaff: Staff[];
  onAssign: () => void;
  onCancel: () => void;
}
const AssignmentForm: React.FC<AssignmentFormProps> = ({
  selectedJob,
  selectedStaff,
  onAssign,
  onCancel
}) => {
  if (!selectedJob || selectedStaff.length === 0) {
    return null;
  }
  return <div className="bg-white shadow rounded-md p-4 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Assign Staff to Job
      </h2>
      <div className="mb-4">
        <h3 className="text-md font-medium text-gray-700">Job</h3>
        <p className="text-sm text-gray-600">{selectedJob.title}</p>
        <p className="text-sm text-gray-500">
          {selectedJob.day}, {selectedJob.startTime}:00 - {selectedJob.endTime}
          :00
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700">Staff to Assign</h3>
        <ul className="mt-2 space-y-2">
          {selectedStaff.map(staff => <li key={staff.id} className="text-sm text-gray-600 flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {staff.name}
            </li>)}
        </ul>
      </div>
      <div className="flex justify-end space-x-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Cancel
        </button>
        <button type="button" onClick={onAssign} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Confirm Assignment
        </button>
      </div>
    </div>;
};
export default AssignmentForm;