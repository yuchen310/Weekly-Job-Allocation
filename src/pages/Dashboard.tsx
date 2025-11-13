import React, { useEffect, useState } from 'react';
import WorkloadOverview from '../components/WorkloadOverview';
import MissingAvailability from '../components/MissingAvailability';
import RejectedJobs from '../components/RejectedJobs';
import { getStaffWithOverload, getStaffWithLowestWorkload, getStaffMissingAvailability, getRejectedJobs } from '../utils/mockData';
const Dashboard: React.FC = () => {
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [overloadedStaff, setOverloadedStaff] = useState([]);
  const [lowestWorkloadStaff, setLowestWorkloadStaff] = useState([]);
  const [missingAvailabilityStaff, setMissingAvailabilityStaff] = useState([]);
  useEffect(() => {
    setRejectedJobs(getRejectedJobs());
    setOverloadedStaff(getStaffWithOverload());
    setLowestWorkloadStaff(getStaffWithLowestWorkload());
    setMissingAvailabilityStaff(getStaffMissingAvailability());
  }, []);
  return <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
        <p className="text-gray-600">Overview of staff workload and availability status</p>
      </header>

      <div className="space-y-6">
        <RejectedJobs rejectedJobs={rejectedJobs} />
        <WorkloadOverview overloadedStaff={overloadedStaff} lowestWorkloadStaff={lowestWorkloadStaff} />
        <MissingAvailability staffList={missingAvailabilityStaff} />
      </div>
    </div>;
};
export default Dashboard;