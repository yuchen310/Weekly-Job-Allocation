export interface Staff {
  id: string;
  name: string;
  skills: string[];
  preferences: string[];
  availability: {
    [key: string]: boolean[]; // day -> hours (true = available)
  };
  workload: number; // current assigned hours
  maxWorkload: number; // maximum allowed hours
}
export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  day: string;
  startTime: number;
  endTime: number;
  assignedStaff?: string[];
  rejectedBy?: string[]; // staff IDs who rejected this job
}
export interface Roster {
  weekStarting: string;
  jobs: Job[];
}