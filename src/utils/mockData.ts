import { Staff, Job, Roster } from './types';

// ---------- Week Date Generator ----------
const getWeekDates = () => {
  const weeks = [];
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

  for (let i = 0; i < 4; i++) {
    const weekStart = new Date(now);
    weekStart.setDate(diff + 7 * i);
    weeks.push(weekStart.toISOString().split("T")[0]);
  }

  return weeks;
};

export const weekDates = getWeekDates();
export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// ---------- STAFF ----------
export let staffMembers: Staff[] = [
  {
    id: "staff1",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Manager",
    department: "Product",
    phone: "81234567",
    skills: ["Driving", "Customer Service"],
    preferences: ["Morning Shift", "Driving"],
    availability: {
      Monday: Array(24).fill(true),
      Tuesday: Array(24).fill(true),
      Wednesday: Array(24).fill(false),
      Thursday: Array(24).fill(true),
      Friday: Array(24).fill(true),
      Saturday: Array(24).fill(false),
      Sunday: Array(24).fill(false),
    },
    workload: 20,
    maxWorkload: 40,
  },
  {
    id: "staff2",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Designer",
    department: "Design",
    phone: "81234567",
    skills: ["Administration", "Scheduling"],
    preferences: ["Afternoon Shift", "Administration"],
    availability: {
      Monday: Array(24).fill(true),
      Tuesday: Array(24).fill(false),
      Wednesday: Array(24).fill(true),
      Thursday: Array(24).fill(true),
      Friday: Array(24).fill(false),
      Saturday: Array(24).fill(true),
      Sunday: Array(24).fill(false),
    },
    workload: 32,
    maxWorkload: 40,
  },
];

// ---------- Staff CRUD ----------
export const addStaff = (staff: Omit<Staff, "id">): void => {
  const newStaff: Staff = {
    ...staff,
    id: `staff${Date.now()}`,
  };
  staffMembers.push(newStaff);
};

export const updateStaff = (id: string, updates: Partial<Staff>): void => {
  const index = staffMembers.findIndex((s) => s.id === id);
  if (index !== -1) {
    staffMembers[index] = { ...staffMembers[index], ...updates };
  }
};

export const deleteStaff = (id: string): void => {
  const index = staffMembers.findIndex((s) => s.id === id);
  if (index !== -1) {
    staffMembers.splice(index, 1);
  }
};

export const getStaffMembers = (): Staff[] => staffMembers;

// ---------- JOBS (WITH REQUIRED FIELDS) ----------
export const jobs: Job[] = [
  {
    id: "job1",
    title: "Train Driver - Morning Route",
    description: "Operate the morning commuter train on the main line",
    requirements: ["Driving"],
    day: "Monday",
    startTime: 6,
    endTime: 14,
    assignedStaff: [],
    rejectedBy: [],
    rejectedReasons: [],
  },
  {
    id: "job2",
    title: "Station Manager",
    description: "Oversee station operations and customer service",
    requirements: ["Administration", "Customer Service"],
    day: "Monday",
    startTime: 8,
    endTime: 16,
    assignedStaff: [],
    rejectedBy: [],
    rejectedReasons: [],
  },
  {
    id: "job3",
    title: "Train Maintenance",
    description: "Perform routine maintenance checks on trains",
    requirements: ["Maintenance"],
    day: "Tuesday",
    startTime: 20,
    endTime: 4,
    assignedStaff: [],
    rejectedBy: [],
    rejectedReasons: [],
  },
  {
    id: "job4",
    title: "Customer Service Representative",
    description: "Assist passengers with inquiries and ticket purchases",
    requirements: ["Customer Service"],
    day: "Wednesday",
    startTime: 10,
    endTime: 18,
    assignedStaff: [],
    rejectedBy: [],
    rejectedReasons: [],
  },
  {
    id: "job5",
    title: "Train Driver - Evening Route",
    description: "Operate the evening commuter train on the main line",
    requirements: ["Driving"],
    day: "Thursday",
    startTime: 14,
    endTime: 22,
    assignedStaff: [],
    rejectedBy: [],
    rejectedReasons: [],
  },
  {
    id: "job6",
    title: "Weekend Station Supervisor",
    description: "Supervise station operations during weekend hours",
    requirements: ["Administration"],
    day: "Saturday",
    startTime: 9,
    endTime: 17,
    assignedStaff: [],
    rejectedBy: [],
    rejectedReasons: [],
  },
];

// ---------- WEEKLY ROSTERS ----------
export const rosters: Record<string, Roster> = {
  [weekDates[0]]: {
    weekStarting: weekDates[0],
    jobs: JSON.parse(JSON.stringify(jobs)),
  },
  [weekDates[1]]: {
    weekStarting: weekDates[1],
    jobs: JSON.parse(JSON.stringify(jobs)),
  },
  [weekDates[2]]: {
    weekStarting: weekDates[2],
    jobs: JSON.parse(JSON.stringify(jobs)),
  },
  [weekDates[3]]: {
    weekStarting: weekDates[3],
    jobs: JSON.parse(JSON.stringify(jobs)),
  },
};

// ---------- Availability Filters ----------
export const getAvailableStaff = (job: Job): Staff[] => {
  return staffMembers.filter((staff) => {
    const hasRequiredSkills = job.requirements.every((req) => staff.skills.includes(req));
    const isAvailable =
      staff.availability[job.day] &&
      staff.availability[job.day].slice(job.startTime, job.endTime).every((slot) => slot);
    const jobHours = job.endTime - job.startTime;
    const hasCapacity = staff.workload + jobHours <= staff.maxWorkload;
    return hasRequiredSkills && isAvailable && hasCapacity;
  });
};

export const getStaffWithOverload = (): Staff[] =>
  staffMembers.filter((staff) => staff.workload > staff.maxWorkload);

export const getStaffWithLowestWorkload = (limit: number = 3): Staff[] =>
  [...staffMembers].sort((a, b) => a.workload - b.workload).slice(0, limit);

export const getStaffMissingAvailability = (): Staff[] =>
  staffMembers.filter((staff) => Object.keys(staff.availability).length === 0);

// ---------- Rejected Jobs List ----------
export const getRejectedJobs = () => {
  const allJobs = Object.values(rosters).flatMap((roster) => roster.jobs);

  const rejectedJobs = allJobs.filter((job) => job.rejectedBy && job.rejectedBy.length > 0);

  return rejectedJobs.map((job) => ({
    job,
    rejectedByNames:
      job.rejectedBy?.map((id) => staffMembers.find((s) => s.id === id)?.name || id) || [],
    rejectedReasons: job.rejectedReasons || [],
  }));
};

// ---------- Reject Job Handler (NOW WITH REASON) ----------
export const rejectJob = (jobId: string, staffId: string, reason: string): boolean => {
  let jobFound = false;

  Object.keys(rosters).forEach((weekKey) => {
    const roster = rosters[weekKey];
    const jobIndex = roster.jobs.findIndex((j) => j.id === jobId);

    if (jobIndex !== -1) {
      jobFound = true;
      const job = roster.jobs[jobIndex];

      // Ensure arrays exist
      if (!job.rejectedBy) job.rejectedBy = [];
      if (!job.rejectedReasons) job.rejectedReasons = [];

      // Store rejecting staff
      if (!job.rejectedBy.includes(staffId)) {
        job.rejectedBy.push(staffId);
        job.rejectedReasons.push(reason);
      }

      // Remove staff from assignment
      if (job.assignedStaff) {
        job.assignedStaff = job.assignedStaff.filter((id) => id !== staffId);
      }
    }
  });

  return jobFound;
};
