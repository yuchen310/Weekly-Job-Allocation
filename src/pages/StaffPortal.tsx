import React, { useState } from 'react';
import AvailabilityManager from '../components/AvailabilityManager';
import StaffScheduleView from '../components/StaffScheduleView';
import { staffMembers, rosters, weekDates } from '../utils/mockData';
import { Staff } from '../utils/types';
const StaffPortal: React.FC = () => {
  const [selectedStaffId, setSelectedStaffId] = useState<string>(staffMembers[0].id);
  const [currentStaff, setCurrentStaff] = useState<Staff>(staffMembers[0]);
  const handleStaffChange = (staffId: string) => {
    setSelectedStaffId(staffId);
    const staff = staffMembers.find(s => s.id === staffId);
    if (staff) {
      setCurrentStaff(staff);
    }
  };
  const handleAvailabilityUpdate = (updatedAvailability: Staff['availability']) => {
    const staffIndex = staffMembers.findIndex(s => s.id === selectedStaffId);
    if (staffIndex !== -1) {
      staffMembers[staffIndex].availability = updatedAvailability;
      setCurrentStaff({
        ...staffMembers[staffIndex]
      });
    }
  };
  const allJobs = rosters[weekDates[0]].jobs;
  return <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Staff Portal</h1>
        <p className="text-gray-600">
          Manage your availability and view your schedule
        </p>
      </header>
      {/* Staff Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Staff Member
        </label>
        <select value={selectedStaffId} onChange={e => handleStaffChange(e.target.value)} className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          {staffMembers.map(staff => <option key={staff.id} value={staff.id}>
              {staff.name}
            </option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AvailabilityManager staff={currentStaff} onUpdate={handleAvailabilityUpdate} />
        <StaffScheduleView staffId={selectedStaffId} allJobs={allJobs} />
      </div>
    </div>;
};
export default StaffPortal;