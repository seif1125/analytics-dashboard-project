import { useQuery } from '@tanstack/react-query';
import { getUser } from '../utils';

export const useUserData = () => {
 
  return useQuery({
    queryKey: ['user-data'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 60 * 6, 
  });
};