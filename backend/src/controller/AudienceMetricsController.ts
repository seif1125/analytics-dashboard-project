import { Request, Response } from 'express';
import { cacheService } from '../services/CacheService';

export const getAudienceAnalytics = async (): Promise<{ date: string; visitors: number; sessions: number }[]> => {
 await new Promise(resolve => setTimeout(resolve, 800)); // Simulate a slow database query (e.g., 800ms) 
    try {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        const data = months.map(month => ({
            date: month,
            visitors: Math.floor(Math.random() * 5000) + 2000,
            sessions: Math.floor(Math.random() * 4000) + 1500,
        }));

        return data;
    } catch (error) {
        console.log(error, "Error fetching analytics" );
        return [];
    }

};

export const getAudienceMetrics = async (req: Request, res: Response): Promise<void> => {
    const CACHE_KEY = 'audience-metrics'; // Unique key for this data
    const CACHE_TTL = 60; // Cache for 60 seconds

    // 1. Check Cache
    const cachedData = await cacheService.get(CACHE_KEY);
    if (cachedData) {
        console.log('Cache Hit: Serving daily downloads from Redis.',cachedData);
        res.status(200).json(cachedData);
        return;
    }

    // 2. Cache Miss: Fetch Data from "Database"
    console.log('Cache Miss: Fetching daily downloads from DB.');
    const data = await getAudienceAnalytics(); 

    // 3. Store Data in Cache
    await cacheService.set(CACHE_KEY, data, CACHE_TTL);

    // 4. Respond to Client
    res.status(200).json(data);
}