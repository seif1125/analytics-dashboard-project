import type { BrowserData, DownloadsDataPoint,HeatmapRow,RetentionDataPoint,StatCardData,User } from '../types/index';


export const fetchTotalDownloads = async (): Promise<DownloadsDataPoint[]> => {
  // NOTE: Ensure your backend is running on port 3000
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}analytics/daily_downloads`);

  if (!response.ok) {
    throw new Error('Failed to fetch daily downloads data');
  }
  return response.json();
};

export const fetchMonthlyRetention = async (): Promise<RetentionDataPoint[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}analytics/monthly_retention`);
  if (!response.ok) {
    throw new Error('Failed to fetch retention data');
  }
  return response.json();
};

export const getUser=async ():Promise<User>=>{

  const response=await fetch(`${import.meta.env.VITE_API_BASE_URL}user`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
}


export const getStats=async ():Promise<StatCardData[]>=>{

  const response=await fetch(`${import.meta.env.VITE_API_BASE_URL}stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
}

export const getInsights=async ():Promise<BrowserData[]>=>{

  const response=await fetch(`${import.meta.env.VITE_API_BASE_URL}insights`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
}

export const getHeatmapStats=async ():Promise<HeatmapRow[]>=>{

  const response=await fetch(`${import.meta.env.VITE_API_BASE_URL}heatmap`);
  if (!response.ok) {
    throw new Error('Failed to fetch  data');
  }
  return response.json();
}