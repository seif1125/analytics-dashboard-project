import { Request, Response } from 'express';
import { cacheService } from '../services/CacheService'; 

// Simulate complex calculation for Month 1 (M1) Retention
const mockRetentionCalculation = async () => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulating a heavy 800ms query

    return [
        { cohort: 'Jan 2025', initialUsers: 5000, retainedPercent: 45.2 },
        { cohort: 'Feb 2025', initialUsers: 6200, retainedPercent: 38.9 },
        { cohort: 'Mar 2025', initialUsers: 7100, retainedPercent: 41.5 }
    ];
};

export const getMonthlyRetention = async (req: Request, res: Response): Promise<void> => {
    const CACHE_KEY = 'monthly_retention_data';
    const CACHE_TTL = 3600 * 6; // Cache for 6 hours (retention changes slowly)

    const cachedData = await cacheService.get(CACHE_KEY);
    if (cachedData) {
        console.log('Cache Hit: Serving retention data from Redis.');
        res.status(200).json(cachedData);
        return;
    }

    console.log('Cache Miss: Calculating monthly retention...');
    const data = await mockRetentionCalculation(); 
    await cacheService.set(CACHE_KEY, data, CACHE_TTL);

    res.status(200).json(data);
};