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

export type StatIconKey = 'users' | 'sessions' | 'bounce' | 'duration';

export interface StatCardData {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: StatIconKey; 
  color: string;     
}
export interface BrowserData {
  id: string;
  name: string;      // e.g., "Google"
  company: string;   // e.g., "Google, Inc"
  value: number;     // e.g., 1215
  color: string;     // Tailwind background class: "bg-indigo-500"
}

export interface HeatmapRow {
  label: string;     // e.g., "12Pm"
  data: number[];    // Array of 7-8 intensity values [0, 1, 2]
}

export interface ReferralPage {
    id: number;
    label: string;
    value: number;
    color: string;
}

export interface ReferralStats {
    totalViews: number;
    growthRate: number;
    timeLabel: string;
    pages: ReferralPage[];
}