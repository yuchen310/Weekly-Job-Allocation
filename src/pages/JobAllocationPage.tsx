import React, { useEffect, useState } from 'react';
import WeekSelector from '../components/WeekSelector';
import RosterDisplay from '../components/RosterDisplay';
import JobSelector from '../components/JobSelector';
import StaffSelector from '../components/StaffSelector';
import AssignmentForm from '../components/AssignmentForm';
import { weekDates, rosters, staffMembers, getAvailableStaff } from '../utils/mockData';
import { Job, Staff, Roster } from '../utils/types';
const JobAllocationPage: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<string>(weekDates[0]);
  const [roster, setRoster] = useState<Roster>(rosters[selectedWeek]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [availableStaff, setAvailableStaff] = useState<Staff[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<Staff[]>([]);
  const [error, setError] = useState<string | null>(null);
  // Update roster when selected week changes
  useEffect(() => {
    setRoster(rosters[selectedWeek]);
    setSelectedJob(null);
    setSelectedStaff([]);
    setError(null);
  }, [selectedWeek]);
  // Update available staff when selected job changes
  useEffect(() => {
    if (selectedJob) {
      const staff = getAvailableStaff(selectedJob);
      setAvailableStaff(staff);
      setSelectedStaff([]);
      if (staff.length === 0) {
        setError('No staff members are available for this job based on skills, availability, and workload constraints.');
      } else {
        setError(null);
      }
    } else {
      setAvailableStaff([]);
      setSelectedStaff([]);
      setError(null);
    }
  }, [selectedJob]);
  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
  };
  const handleStaffSelect = (staff: Staff) => {
    setSelectedStaff(prev => {
      // If staff is already selected, remove them
      if (prev.some(s => s.id === staff.id)) {
        return prev.filter(s => s.id !== staff.id);
      }
      // If already have 3 staff selected, don't add more
      if (prev.length >= 3) {
        return prev;
      }
      // Add the staff
      return [...prev, staff];
    });
  };
  const handleAssign = () => {
    if (!selectedJob) return;
    // Update the roster with assigned staff
    const updatedRoster = {
      ...roster,
      jobs: roster.jobs.map(job => job.id === selectedJob.id ? {
        ...job,
        assignedStaff: selectedStaff.map(staff => staff.id)
      } : job)
    };
    // Update the rosters object (simulating database save)
    rosters[selectedWeek] = updatedRoster;
    // Update state
    setRoster(updatedRoster);
    setSelectedJob(null);
    setSelectedStaff([]);
  };
  const handleCancel = () => {
    setSelectedStaff([]);
  };
  return <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Job Allocation System
        </h1>
        <p className="text-gray-600">
          Assign staff to jobs for the selected week
        </p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <WeekSelector selectedWeek={selectedWeek} onWeekChange={setSelectedWeek} />
          <RosterDisplay roster={roster} onJobSelect={handleJobSelect} selectedJob={selectedJob} />
        </div>
        <div className="lg:col-span-2">
          <JobSelector selectedJob={selectedJob} />
          <StaffSelector availableStaff={availableStaff} selectedStaff={selectedStaff} onStaffSelect={handleStaffSelect} selectedJob={selectedJob} error={error} />
          <AssignmentForm selectedJob={selectedJob} selectedStaff={selectedStaff} onAssign={handleAssign} onCancel={handleCancel} />
        </div>
      </div>
    </div>;
};
export default JobAllocationPage;