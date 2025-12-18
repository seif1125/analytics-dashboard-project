import { Request, Response } from 'express';
import { cacheService } from '../services/CacheService'; 

export const getUser = async (req: Request, res: Response) => {
  // Use Redis to cache user session details
  const cacheKey = 'user:profile:1'; // Hardcoded ID for demo
  const cachedUser = await cacheService.get(cacheKey);

  if (cachedUser) {
    return res.json(JSON.parse(cachedUser));
  }

  const user = {
    id: 1,
    name: 'Tom Phillip',
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/150?u=seif' // Replace with your image
  };

  await cacheService.set(cacheKey, JSON.stringify(user), 3600);
  res.json(user);
};