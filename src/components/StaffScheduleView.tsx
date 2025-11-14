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

  // Modal states
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [reason, setReason] = useState("");
  const [jobToReject, setJobToReject] = useState<Job | null>(null);

  const assignedJobs = allJobs.filter(
    job =>
      job.assignedStaff &&
      job.assignedStaff.includes(staffId) &&
      (!job.rejectedBy || !job.rejectedBy.includes(staffId))
  );

  const jobsByDay = days.reduce<Record<string, Job[]>>((acc, day) => {
    acc[day] = assignedJobs.filter(job => job.day === day);
    return acc;
  }, {});

  // Open rejection modal
  const openRejectModal = (job: Job) => {
    setJobToReject(job);
    setReason("");
    setShowRejectModal(true);
  };

  // Submit rejection with reason
  const submitRejection = () => {
    if (!reason.trim()) {
      alert("A reason is required.");
      return;
    }

    if (jobToReject) {
      const success = rejectJob(jobToReject.id, staffId, reason.trim());

      if (success) {
        setRefreshKey(prev => prev + 1);
        alert("Job rejected successfully. The manager will be notified.");
      } else {
        alert("Failed to reject job. Please try again.");
      }
    }

    setShowRejectModal(false);
    setJobToReject(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6" key={refreshKey}>
      <div className="flex items-center mb-4">
        <CalendarIcon className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">My Schedule</h2>
      </div>

      {assignedJobs.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <p className="text-gray-600">
            You have no assigned jobs for the upcoming week.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {days.map(day => (
            <div key={day}>
              {jobsByDay[day].length > 0 && (
                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-2">{day}</h3>

                  <div className="space-y-2">
                    {jobsByDay[day].map(job => (
                      <div
                        key={job.id}
                        className="p-3 bg-blue-50 border border-blue-200 rounded-md"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{job.title}</p>
                            <p className="text-sm text-gray-600">{job.description}</p>
                          </div>
                          <span className="text-sm font-medium text-blue-600 whitespace-nowrap ml-2">
                            {job.startTime}:00 - {job.endTime}:00
                          </span>
                        </div>

                        <button
                          onClick={() => openRejectModal(job)}
                          className="mt-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 flex items-center transition-colors"
                        >
                          <XCircleIcon className="h-4 w-4 mr-1" />
                          Reject Job
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* REJECTION MODAL */}
      {showRejectModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Reject Job</h3>

            <p className="text-sm text-gray-700 mb-3">
              Provide a reason for rejecting:
              <span className="font-medium"> {jobToReject?.title}</span>
            </p>

            <textarea
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Enter your reason here..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md"
                onClick={() => setShowRejectModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 text-white bg-red-600 rounded-md"
                onClick={submitRejection}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffScheduleView;
