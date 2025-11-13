import React from 'react';
import { Staff } from '../utils/types';
import { AlertCircleIcon, TrendingDownIcon } from 'lucide-react';
interface WorkloadOverviewProps {
  overloadedStaff: Staff[];
  lowestWorkloadStaff: Staff[];
}
const WorkloadOverview: React.FC<WorkloadOverviewProps> = ({
  overloadedStaff,
  lowestWorkloadStaff
}) => {
  return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Staff with Over 40 Hours */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <AlertCircleIcon className="h-6 w-6 text-red-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">
            Staff with Over 40 Hours
          </h2>
        </div>
        {overloadedStaff.length === 0 ? <p className="text-gray-500 italic">
            No staff members are overloaded
          </p> : <div className="space-y-3">
            {overloadedStaff.map(staff => <div key={staff.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-md">
                <div>
                  <p className="font-medium text-gray-900">{staff.name}</p>
                  <p className="text-sm text-gray-600">
                    Skills: {staff.skills.join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-600">
                    {staff.workload}h
                  </p>
                  <p className="text-xs text-gray-500">
                    {staff.workload - staff.maxWorkload}h over limit
                  </p>
                </div>
              </div>)}
          </div>}
      </div>
      {/* Staff with Lowest Workload */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <TrendingDownIcon className="h-6 w-6 text-green-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">
            Staff with Lowest Workload
          </h2>
        </div>
        {lowestWorkloadStaff.length === 0 ? <p className="text-gray-500 italic">No workload data available</p> : <div className="space-y-3">
            {lowestWorkloadStaff.map((staff, index) => <div key={staff.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                <div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold mr-2">
                      {index + 1}
                    </span>
                    <p className="font-medium text-gray-900">{staff.name}</p>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">
                    Skills: {staff.skills.join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    {staff.workload}h
                  </p>
                  <p className="text-xs text-gray-500">
                    {staff.maxWorkload - staff.workload}h available
                  </p>
                </div>
              </div>)}
            {lowestWorkloadStaff.length < 3 && <p className="text-sm text-gray-500 italic">
                Note: Only {lowestWorkloadStaff.length} staff member(s)
                available
              </p>}
          </div>}
      </div>
    </div>;
};
export default WorkloadOverview;