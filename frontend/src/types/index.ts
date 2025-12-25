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
    image: string // Replace with your image
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

// Define the structure for individual device data
export interface DeviceSession {
  label: string;
  value: number;
  color: string;
}

// Define the overall API response structure
export interface SessionsByDeviceData {
  totalAudience: number;
  devices: DeviceSession[];
}

export interface CountryVisitor {
  id: number;
  name: string;
  isoCode: string; // Used to match file name in assets/flags folder
  visitors: number;
  growth: number;
  isUp: boolean;
}

export interface CountriesStats {
  data: CountryVisitor[];
}

export interface AnalyticsDataPoint {
  date: string;     // ISO Date or Month Name
  visitors: number; // For the Bars
  sessions: number; // For the Curved Line
}

export interface ChartStats {
  data: AnalyticsDataPoint[];
}
export interface CampaignData {
  _id: string;
  provider: {
    _id: string;
    name: string;
    role: string;
    image: string;
  };
  sales: number;
  goal: number;
  status: 'On process' | 'Achieved';
  createdAt: string;
}