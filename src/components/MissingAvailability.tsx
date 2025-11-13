import React from 'react';
import { Staff } from '../utils/types';
import { UserXIcon } from 'lucide-react';
interface MissingAvailabilityProps {
  staffList: Staff[];
}
const MissingAvailability: React.FC<MissingAvailabilityProps> = ({
  staffList
}) => {
  return <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <UserXIcon className="h-6 w-6 text-yellow-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">
          Missing Availability Submissions
        </h2>
      </div>
      {staffList.length === 0 ? <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <p className="text-green-800 font-medium">
            All staff have submitted their availability!
          </p>
        </div> : <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-3">
            The following staff members have not submitted their availability
            for the upcoming week:
          </p>
          {staffList.map(staff => <div key={staff.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <div>
                <p className="font-medium text-gray-900">{staff.name}</p>
                <p className="text-sm text-gray-600">
                  Skills: {staff.skills.join(', ')}
                </p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Pending
              </span>
            </div>)}
        </div>}
    </div>;
};
export default MissingAvailability;