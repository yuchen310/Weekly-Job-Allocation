import React from 'react';
import { Roster, Job } from '../utils/types';
import { days, staffMembers } from '../utils/mockData';
interface RosterDisplayProps {
  roster: Roster;
  onJobSelect: (job: Job) => void;
  selectedJob: Job | null;
}
const RosterDisplay: React.FC<RosterDisplayProps> = ({
  roster,
  onJobSelect,
  selectedJob
}) => {
  // Group jobs by day
  const jobsByDay = days.reduce<Record<string, Job[]>>((acc, day) => {
    acc[day] = roster.jobs.filter(job => job.day === day);
    return acc;
  }, {});
  const getJobStatus = (job: Job) => {
    if (job.rejectedBy && job.rejectedBy.length > 0) {
      return {
        label: 'Rejected',
        className: 'bg-red-100 text-red-800'
      };
    }
    if (job.assignedStaff && job.assignedStaff.length > 0) {
      return {
        label: 'Assigned',
        className: 'bg-green-100 text-green-800'
      };
    }
    return {
      label: 'Unassigned',
      className: 'bg-yellow-100 text-yellow-800'
    };
  };
  return <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-2">Weekly Roster</h2>
      <div className="bg-white shadow overflow-hidden rounded-md">
        {days.map(day => <div key={day} className="border-b border-gray-200 last:border-b-0">
            <div className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
              {day}
            </div>
            {jobsByDay[day].length > 0 ? <ul className="divide-y divide-gray-200">
                {jobsByDay[day].map(job => {
            const status = getJobStatus(job);
            return <li key={job.id} className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${selectedJob?.id === job.id ? 'bg-blue-50' : ''}`} onClick={() => onJobSelect(job)}>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {job.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {job.startTime}:00 - {job.endTime}:00
                          </p>
                          {job.rejectedBy && job.rejectedBy.length > 0 && <p className="text-xs text-red-600 mt-1">
                              Rejected by:{' '}
                              {job.rejectedBy.map(id => staffMembers.find(s => s.id === id)?.name || id).join(', ')}
                            </p>}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.className}`}>
                            {status.label}
                          </span>
                        </div>
                      </div>
                    </li>;
          })}
              </ul> : <div className="px-4 py-3 text-sm text-gray-500 italic">
                No jobs scheduled
              </div>}
          </div>)}
      </div>
    </div>;
};
export default RosterDisplay;