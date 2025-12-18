  import type { LucideIcon } from 'lucide-react';

export interface DownloadsDataPoint {
  date: string; // e.g., '2024-01-01'
  count: number;
}

export interface RetentionDataPoint {
  cohort: string;
  initialUsers: number;
  retainedPercent: number;
}

export interface User {
  
    id: number|string,
    name: string,
    role: string,
    avatar: string // Replace with your image
  }



export interface MenuItem {
  icon: LucideIcon; // Store the class/type, not the <Icon /> element
  label: string;
  active?: boolean;
}