export interface Transmission {
  id: string;
  fileSent: string;
  fileSize: string;
  transmissionHour: string;
  transmissionDate: string; // Added for history view
  zipped: boolean;
  status: 'Success' | 'Error';
}

export interface ScheduledTask {
  id: string;
  provider: string;
  description: string;
  taskType: string;
  localFile: string;
  textFilter: string;
  executionTime: string;
  status: boolean; // true for active, false for inactive
  recurrent?: boolean;
  recurrenceType?: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly' | null;
  recurrenceDetails?: {
    daysOfWeek?: string[]; // e.g., ['Mon', 'Wed']
    dayOfMonth?: number[]; // e.g., [15, 20] - changed to array
    dayOfYear?: string; // e.g., '01-15' for Jan 15th
  };
}

export interface EventShippingTask {
  id: string;
  provider: string;
  description: string;
  eventType: string; // Changed from taskType
  localFile: string;
  processFilter: string; // Changed from textFilter
  status: boolean;
}