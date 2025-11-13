import React from 'react';
import { weekDates } from '../utils/mockData';
interface WeekSelectorProps {
  selectedWeek: string;
  onWeekChange: (week: string) => void;
}
const WeekSelector: React.FC<WeekSelectorProps> = ({
  selectedWeek,
  onWeekChange
}) => {
  return <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Week
      </label>
      <select value={selectedWeek} onChange={e => onWeekChange(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        {weekDates.map(date => <option key={date} value={date}>
            Week starting {new Date(date).toLocaleDateString()}
          </option>)}
      </select>
    </div>;
};
export default WeekSelector;