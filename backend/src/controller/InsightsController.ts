import { Request, Response } from 'express';
import { cacheService } from '../services/CacheService';

export const fetchInsightsFromDB= async () => {
    // Simulating database aggregation delay
    await new Promise(resolve => setTimeout(resolve, 0)); 

    return [
            { id: '1', name: 'Google', company: 'Google,Inc', value: 1215, color: 'bg-indigo-500' },
            { id: '2', name: 'Edge', company: 'Microsoft Corp,Inc', value: 978, color: 'bg-pink-500' },
            { id: '3', name: 'Firefox', company: 'Mozilla,Inc', value: 815, color: 'bg-orange-400' },
            { id: '4', name: 'Opera', company: 'Opera,Inc', value: 1347, color: 'bg-sky-400' },
            { id: '5', name: 'Safari', company: 'Apple Corp,Inc', value: 1123, color: 'bg-emerald-400' },
            { id: '6', name: 'Uc Browser', company: 'Uc Browser,Inc', value: 1189, color: 'bg-rose-400' },
        ];
      
    
};

export const getInsights = async (req: Request, res: Response): Promise<void> => {
    const CACHE_KEY = 'insights_overview';
    const CACHE_TTL = 100; // Cache for 15 minutes (stats update more frequently than retention)

    try {
        const cachedData = await cacheService.get(CACHE_KEY);
        if (cachedData) {
            console.log('Cache Hit: Serving dashboard stats indightd from Redis.',cachedData);
            res.status(200).json(cachedData);
            return;
        }

        console.log('Cache Miss: Aggregating insights stats...');
        const data = await fetchInsightsFromDB();
        console.log(data);
        // Store in Redis
        await cacheService.set(CACHE_KEY, data, CACHE_TTL);

        res.status(200).json(data);
    } catch (error) {
        console.error('insights Controller Error:', error);
        res.status(500).json({ error: 'Failed to fetch insights' });
    }
};