import { useQuery } from '@tanstack/react-query';
import { fetchTotalDownloads,fetchMonthlyRetention } from '../utils/index';


// Mock type for the response data



export const useDailyDownloads = () => {
  // TanStack Query handles the fetching, caching, retries, and background updates.
  // 'daily-downloads' is the unique query key used for client-side caching.

  return useQuery({
    queryKey: ['daily-downloads'],
    queryFn: fetchTotalDownloads,
    // The data fetched here is now cached by the client! 
    // Any other component calling this hook will get the cached data instantly.
  });
};

export const useMonthlyRetention = () => {
  // Retention data is very stale, cache for longer (e.g., 6 hours)
  return useQuery({
    queryKey: ['monthly-retention'],
    queryFn: fetchMonthlyRetention,
    staleTime: 1000 * 60 * 60 * 6, 
  });
};


