import { useQuery } from '@tanstack/react-query';
import { getUser } from '../utils';

export const useUserData = () => {
  // Retention data is very stale, cache for longer (e.g., 6 hours)
  return useQuery({
    queryKey: ['user-data'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 60 * 6, 
  });
};