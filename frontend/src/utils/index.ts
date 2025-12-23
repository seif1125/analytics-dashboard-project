import type { BrowserData, ChartStats, CountriesStats, DownloadsDataPoint,HeatmapRow,ReferralStats,RetentionDataPoint,SessionsByDeviceData,StatCardData,User ,CampaignData} from '../types/index';


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

export const getIntensityClass = (value: number) => {
    switch (value) {
      case 2: return 'bg-emerald-400'; 
      case 1: return 'bg-emerald-200'; 
      default: return 'bg-slate-100';  
    }
  };

 export const getTopReferrals=async ():Promise<ReferralStats>=>{

  const response=await fetch(`${import.meta.env.VITE_API_BASE_URL}referrals`)  
  if (!response.ok) {
    throw new Error('Failed to fetch  data');
  }
  return response.json();}

export const getDevicesData=async ():Promise<SessionsByDeviceData>=>{     
  const response=await fetch(`${import.meta.env.VITE_API_BASE_URL}devices`);
  if (!response.ok) {
    throw new Error('Failed to fetch  data');
  }
  return response.json();  
}

export const getCountryVisitorsData=async ():Promise<CountriesStats>=>{     
  const response=await fetch(`${import.meta.env.VITE_API_BASE_URL}visitors`);
  if (!response.ok) {
    throw new Error('Failed to fetch  data');
  }
  return response.json();  
}

export const getAudienceMetricsData=async ():Promise<ChartStats[]>=>{     
  const response=await fetch(`${import.meta.env.VITE_API_BASE_URL}audience-metrics`);
  if (!response.ok) {
    throw new Error('Failed to fetch audience metrics data');
  }
  return response.json();  
}

export const getCampaigns=async ():Promise<CampaignData[]>=>{

  const response=await fetch(`${import.meta.env.VITE_API_BASE_URL}campaigns`);
  if (!response.ok) {
    throw new Error('Failed to fetch campaigns data');
  }
  return response.json();
}