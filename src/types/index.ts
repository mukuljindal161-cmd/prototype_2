export type Department = 'Engineering' | 'S&T' | 'OHE/Traction';
export type Criticality = 'Critical' | 'High' | 'Medium' | 'Low';
export type Urgency = 'Immediate' | 'High' | 'Routine' | 'Deferrable';
export type TaskStatus = 'Pending' | 'Recommended' | 'Scheduled' | 'Deferred';

export interface MaintenanceTask {
  id: string;
  department: Department;
  section: string;
  taskType: string;
  criticality: Criticality;
  urgency: Urgency;
  durationMinutes: number;
  status: TaskStatus;
  description: string;
}

export interface Train {
  id: string;
  trainNumber: string;
  name: string;
  trainType: 'Superfast Express' | 'Passenger' | 'Freight';
  section: string;
  startTime: string; // HH:MM
  endTime: string;   // HH:MM
}

export interface AvailableBlock {
  id: string;
  section: string;
  startTime: string; // HH:MM
  endTime: string;   // HH:MM
  durationMinutes: number;
  blockType: string;
  status?: string;
  description?: string;
}

export interface ConflictDetails {
  conflictingTrainId?: string;
  trainName?: string;
  trainNumber?: string;
  overlapWindow?: string;
}

export interface Recommendation {
  id: string;
  linkedTaskIds: string[];
  tasks?: MaintenanceTask[];
  priorityScore: number;
  recommendedBlockId: string | null;
  recommendedBlock?: AvailableBlock | null;
  section: string;
  conflictStatus: 'Clear' | 'Train Conflict Detected' | 'Capacity Exceeded' | 'No Block Available';
  conflictDetails?: ConflictDetails;
  combinationFlag: boolean;
  combinedDepartments: Department[];
  explanationText: string;
}

export type ApprovalStatus = 'Pending Review' | 'Approved' | 'Modified' | 'Rejected';

export interface ScheduleEntry {
  id: string;
  blockId: string;
  section: string;
  startTime: string;
  endTime: string;
  assignedTaskIds: string[];
  departments: Department[];
  conflictStatus: 'Clear' | 'Warning' | 'Conflict';
  approvalStatus: ApprovalStatus;
  officerNotes: string;
  updatedAt?: string;
}
