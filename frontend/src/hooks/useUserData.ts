import type { User } from '../types/index';

export const useUserData = () => {
 
  return JSON.parse(localStorage.getItem('user')!) as User;
};