import { useQuery } from '@tanstack/react-query';
import { getHeatmapStats, getInsights, getStats , getHeatmapStats as getTopReferrals} from '../utils';
import type { ReferralStats } from '../types';

export const useUserData = () => {
 
  return useQuery({
    queryKey: ['general-stats'],
    queryFn: getStats,
    staleTime: 1000 * 60 * 60 * 6, 
  });
};

export const useInsightsData = () => {
  return useQuery({
    queryKey: ['insights-data'],
    queryFn: getInsights,
    staleTime: 1000 * 60 * 5, 
  });
}
export const useHeatmapData = () => {
    return useQuery({
      queryKey: ['heatmap-data'],
      queryFn: getHeatmapStats,
      staleTime: 1000 * 60 * 5, 
    });
  }

export const useReferralsData = () => {
  // Explicitly tell useQuery to expect ReferralStats
  return useQuery<ReferralStats, Error>({
    queryKey: ['referralsData'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}referrals`);
      if (!response.ok) throw new Error('Failed to fetch referrals');
      return response.json();
    },
  });
};