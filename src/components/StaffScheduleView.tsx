import React, { useState } from 'react';
import { Job } from '../utils/types';
import { days, rejectJob } from '../utils/mockData';
import { CalendarIcon, XCircleIcon } from 'lucide-react';
interface StaffScheduleViewProps {
  staffId: string;
  allJobs: Job[];
}
const StaffScheduleView: React.FC<StaffScheduleViewProps> = ({
  staffId,
  allJobs
}) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const assignedJobs = allJobs.filter(job => job.assignedStaff && job.assignedStaff.includes(staffId) && (!job.rejectedBy || !job.rejectedBy.includes(staffId)));
  const jobsByDay = days.reduce<Record<string, Job[]>>((acc, day) => {
    acc[day] = assignedJobs.filter(job => job.day === day);
    return acc;
  }, {});
  const handleRejectJob = (job: Job) => {
    if (window.confirm(`Are you sure you want to reject "${job.title}"? This will notify the manager.`)) {
      const success = rejectJob(job.id, staffId);
      if (success) {
        // Force component refresh
        setRefreshKey(prev => prev + 1);
        // Show success message
        alert('Job rejected successfully. The manager will be notified.');
      } else {
        alert('Failed to reject job. Please try again.');
      }
    }
  };
  return <div className="bg-white rounded-lg shadow p-6" key={refreshKey}>
      <div className="flex items-center mb-4">
        <CalendarIcon className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">My Schedule</h2>
      </div>
      {assignedJobs.length === 0 ? <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <p className="text-gray-600">
            You have no assigned jobs for the upcoming week.
          </p>
        </div> : <div className="space-y-4">
          {days.map(day => <div key={day}>
              {jobsByDay[day].length > 0 && <div>
                  <h3 className="text-md font-medium text-gray-700 mb-2">
                    {day}
                  </h3>
                  <div className="space-y-2">
                    {jobsByDay[day].map(job => <div key={job.id} className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {job.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              {job.description}
                            </p>
                          </div>
                          <span className="text-sm font-medium text-blue-600 whitespace-nowrap ml-2">
                            {job.startTime}:00 - {job.endTime}:00
                          </span>
                        </div>
                        <button onClick={() => handleRejectJob(job)} className="mt-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 flex items-center transition-colors">
                          <XCircleIcon className="h-4 w-4 mr-1" />
                          Reject Job
                        </button>
                      </div>)}
                  </div>
                </div>}
            </div>)}
        </div>}
    </div>;
};
export default StaffScheduleView;