import { useQuery } from '@tanstack/react-query';
import { getInsights, getStats , getHeatmapStats} from '../utils';

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