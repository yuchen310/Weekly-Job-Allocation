import React, { useState } from 'react';
import { Staff } from '../utils/types';
import { days } from '../utils/mockData';
import { PlusIcon, TrashIcon } from 'lucide-react';
interface AvailabilityManagerProps {
  staff: Staff;
  onUpdate: (updatedAvailability: Staff['availability']) => void;
}
const AvailabilityManager: React.FC<AvailabilityManagerProps> = ({
  staff,
  onUpdate
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [startTime, setStartTime] = useState<number>(9);
  const [endTime, setEndTime] = useState<number>(17);
  const [error, setError] = useState<string>('');
  const handleAddAvailability = () => {
    setError('');
    if (!selectedDay) {
      setError('Please select a day');
      return;
    }
    if (endTime <= startTime) {
      setError('End time must be after start time');
      return;
    }
    const newAvailability = {
      ...staff.availability
    };
    if (!newAvailability[selectedDay]) {
      newAvailability[selectedDay] = Array(24).fill(false);
    }
    for (let i = startTime; i < endTime; i++) {
      newAvailability[selectedDay][i] = true;
    }
    onUpdate(newAvailability);
    setSelectedDay('');
    setStartTime(9);
    setEndTime(17);
  };
  const handleDeleteDay = (day: string) => {
    const newAvailability = {
      ...staff.availability
    };
    delete newAvailability[day];
    onUpdate(newAvailability);
  };
  const getAvailableTimeRanges = (day: string): string[] => {
    const availability = staff.availability[day];
    if (!availability) return [];
    const ranges: string[] = [];
    let start = -1;
    for (let i = 0; i < availability.length; i++) {
      if (availability[i] && start === -1) {
        start = i;
      } else if (!availability[i] && start !== -1) {
        ranges.push(`${start}:00 - ${i}:00`);
        start = -1;
      }
    }
    if (start !== -1) {
      ranges.push(`${start}:00 - 24:00`);
    }
    return ranges;
  };
  return <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Manage Availability
      </h2>
      {/* Add Availability Form */}
      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-md font-medium text-gray-700 mb-3">
          Add Availability
        </h3>
        {error && <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            {error}
          </div>}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Day
            </label>
            <select value={selectedDay} onChange={e => setSelectedDay(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select day</option>
              {days.map(day => <option key={day} value={day}>
                  {day}
                </option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <select value={startTime} onChange={e => setStartTime(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              {Array.from({
              length: 24
            }, (_, i) => <option key={i} value={i}>
                    {i}:00
                  </option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <select value={endTime} onChange={e => setEndTime(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              {Array.from({
              length: 24
            }, (_, i) => <option key={i + 1} value={i + 1}>
                    {i + 1}:00
                  </option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={handleAddAvailability} className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center">
              <PlusIcon className="h-4 w-4 mr-1" />
              Add
            </button>
          </div>
        </div>
      </div>
      {/* Current Availability */}
      <div>
        <h3 className="text-md font-medium text-gray-700 mb-3">
          Current Availability
        </h3>
        {Object.keys(staff.availability).length === 0 ? <p className="text-gray-500 italic">No availability submitted yet</p> : <div className="space-y-2">
            {Object.keys(staff.availability).map(day => <div key={day} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-md">
                <div>
                  <p className="font-medium text-gray-900">{day}</p>
                  <p className="text-sm text-gray-600">
                    {getAvailableTimeRanges(day).join(', ')}
                  </p>
                </div>
                <button onClick={() => handleDeleteDay(day)} className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors" title="Delete availability">
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>)}
          </div>}
      </div>
    </div>;
};
export default AvailabilityManager;