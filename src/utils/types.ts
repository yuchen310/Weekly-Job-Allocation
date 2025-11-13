export interface Staff {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  phone: string; // Now required, not optional
  skills: string[];
  preferences: string[];
  availability: Record<string, boolean[]>;
  workload: number;
  maxWorkload: number;
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