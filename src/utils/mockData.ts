import { Staff, Job, Roster } from './types';
// Generate dates for the current and next 3 weeks
const getWeekDates = () => {
  const weeks = [];
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  for (let i = 0; i < 4; i++) {
    const weekStart = new Date(now);
    weekStart.setDate(diff + 7 * i);
    weeks.push(weekStart.toISOString().split('T')[0]);
  }
  return weeks;
};
export const weekDates = getWeekDates();
export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const staffMembers: Staff[] = [{
  id: 'staff1',
  name: 'John Smith',
  skills: ['Driving', 'Customer Service'],
  preferences: ['Morning Shift', 'Driving'],
  availability: {
    Monday: Array(24).fill(true),
    Tuesday: Array(24).fill(true),
    Wednesday: Array(24).fill(false),
    Thursday: Array(24).fill(true),
    Friday: Array(24).fill(true),
    Saturday: Array(24).fill(false),
    Sunday: Array(24).fill(false)
  },
  workload: 20,
  maxWorkload: 40
}, {
  id: 'staff2',
  name: 'Emma Johnson',
  skills: ['Administration', 'Scheduling'],
  preferences: ['Afternoon Shift', 'Administration'],
  availability: {
    Monday: Array(24).fill(true),
    Tuesday: Array(24).fill(false),
    Wednesday: Array(24).fill(true),
    Thursday: Array(24).fill(true),
    Friday: Array(24).fill(false),
    Saturday: Array(24).fill(true),
    Sunday: Array(24).fill(false)
  },
  workload: 32,
  maxWorkload: 40
}, {
  id: 'staff3',
  name: 'Michael Brown',
  skills: ['Driving', 'Maintenance'],
  preferences: ['Night Shift', 'Maintenance'],
  availability: {
    Monday: Array(24).fill(false),
    Tuesday: Array(24).fill(true),
    Wednesday: Array(24).fill(true),
    Thursday: Array(24).fill(false),
    Friday: Array(24).fill(true),
    Saturday: Array(24).fill(true),
    Sunday: Array(24).fill(true)
  },
  workload: 15,
  maxWorkload: 40
}, {
  id: 'staff4',
  name: 'Sarah Davis',
  skills: ['Customer Service', 'Administration'],
  preferences: ['Morning Shift', 'Customer Service'],
  availability: {
    Monday: Array(24).fill(true),
    Tuesday: Array(24).fill(true),
    Wednesday: Array(24).fill(true),
    Thursday: Array(24).fill(false),
    Friday: Array(24).fill(false),
    Saturday: Array(24).fill(false),
    Sunday: Array(24).fill(true)
  },
  workload: 28,
  maxWorkload: 40
}, {
  id: 'staff5',
  name: 'David Wilson',
  skills: ['Driving', 'Maintenance', 'Customer Service'],
  preferences: ['Afternoon Shift', 'Driving'],
  availability: {
    Monday: Array(24).fill(false),
    Tuesday: Array(24).fill(false),
    Wednesday: Array(24).fill(true),
    Thursday: Array(24).fill(true),
    Friday: Array(24).fill(true),
    Saturday: Array(24).fill(true),
    Sunday: Array(24).fill(true)
  },
  workload: 35,
  maxWorkload: 40
}, {
  id: 'staff6',
  name: 'Lisa Anderson',
  skills: ['Customer Service'],
  preferences: ['Morning Shift', 'Customer Service'],
  availability: {
    Monday: Array(24).fill(true),
    Tuesday: Array(24).fill(true),
    Wednesday: Array(24).fill(true),
    Thursday: Array(24).fill(true),
    Friday: Array(24).fill(true),
    Saturday: Array(24).fill(false),
    Sunday: Array(24).fill(false)
  },
  workload: 42,
  maxWorkload: 40
}, {
  id: 'staff7',
  name: 'Tom Martinez',
  skills: ['Maintenance', 'Driving'],
  preferences: ['Night Shift', 'Maintenance'],
  availability: {},
  workload: 8,
  maxWorkload: 40
}];
export const jobs: Job[] = [{
  id: 'job1',
  title: 'Train Driver - Morning Route',
  description: 'Operate the morning commuter train on the main line',
  requirements: ['Driving'],
  day: 'Monday',
  startTime: 6,
  endTime: 14,
  assignedStaff: []
}, {
  id: 'job2',
  title: 'Station Manager',
  description: 'Oversee station operations and customer service',
  requirements: ['Administration', 'Customer Service'],
  day: 'Monday',
  startTime: 8,
  endTime: 16,
  assignedStaff: []
}, {
  id: 'job3',
  title: 'Train Maintenance',
  description: 'Perform routine maintenance checks on trains',
  requirements: ['Maintenance'],
  day: 'Tuesday',
  startTime: 20,
  endTime: 4,
  assignedStaff: []
}, {
  id: 'job4',
  title: 'Customer Service Representative',
  description: 'Assist passengers with inquiries and ticket purchases',
  requirements: ['Customer Service'],
  day: 'Wednesday',
  startTime: 10,
  endTime: 18,
  assignedStaff: []
}, {
  id: 'job5',
  title: 'Train Driver - Evening Route',
  description: 'Operate the evening commuter train on the main line',
  requirements: ['Driving'],
  day: 'Thursday',
  startTime: 14,
  endTime: 22,
  assignedStaff: []
}, {
  id: 'job6',
  title: 'Weekend Station Supervisor',
  description: 'Supervise station operations during weekend hours',
  requirements: ['Administration'],
  day: 'Saturday',
  startTime: 9,
  endTime: 17,
  assignedStaff: []
}];
export const rosters: Record<string, Roster> = {
  [weekDates[0]]: {
    weekStarting: weekDates[0],
    jobs: JSON.parse(JSON.stringify(jobs))
  },
  [weekDates[1]]: {
    weekStarting: weekDates[1],
    jobs: JSON.parse(JSON.stringify(jobs))
  },
  [weekDates[2]]: {
    weekStarting: weekDates[2],
    jobs: JSON.parse(JSON.stringify(jobs))
  },
  [weekDates[3]]: {
    weekStarting: weekDates[3],
    jobs: JSON.parse(JSON.stringify(jobs))
  }
};
export const getAvailableStaff = (job: Job): Staff[] => {
  return staffMembers.filter(staff => {
    const hasRequiredSkills = job.requirements.every(req => staff.skills.includes(req));
    const isAvailable = staff.availability[job.day] && staff.availability[job.day].slice(job.startTime, job.endTime).every(slot => slot);
    const jobHours = job.endTime - job.startTime;
    const hasCapacity = staff.workload + jobHours <= staff.maxWorkload;
    return hasRequiredSkills && isAvailable && hasCapacity;
  });
};
export const getStaffWithOverload = (): Staff[] => {
  return staffMembers.filter(staff => staff.workload > staff.maxWorkload);
};
export const getStaffWithLowestWorkload = (limit: number = 3): Staff[] => {
  return [...staffMembers].sort((a, b) => a.workload - b.workload).slice(0, limit);
};
export const getStaffMissingAvailability = (): Staff[] => {
  return staffMembers.filter(staff => Object.keys(staff.availability).length === 0);
};
export const getRejectedJobs = (): {
  job: Job;
  rejectedByNames: string[];
}[] => {
  const allJobs = Object.values(rosters).flatMap(roster => roster.jobs);
  const rejectedJobs = allJobs.filter(job => job.rejectedBy && job.rejectedBy.length > 0);
  return rejectedJobs.map(job => ({
    job,
    rejectedByNames: job.rejectedBy?.map(staffId => staffMembers.find(s => s.id === staffId)?.name || staffId) || []
  }));
};
// Helper function to reject a job
export const rejectJob = (jobId: string, staffId: string): boolean => {
  let jobFound = false;
  Object.keys(rosters).forEach(weekKey => {
    const roster = rosters[weekKey];
    const jobIndex = roster.jobs.findIndex(j => j.id === jobId);
    if (jobIndex !== -1) {
      jobFound = true;
      const job = roster.jobs[jobIndex];
      // Initialize rejectedBy array if it doesn't exist
      if (!job.rejectedBy) {
        job.rejectedBy = [];
      }
      // Add staff to rejectedBy if not already there
      if (!job.rejectedBy.includes(staffId)) {
        job.rejectedBy.push(staffId);
      }
      // Remove from assigned staff
      if (job.assignedStaff) {
        job.assignedStaff = job.assignedStaff.filter(id => id !== staffId);
      }
    }
  });
  return jobFound;
};