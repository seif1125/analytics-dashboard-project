import { Request, Response } from 'express';
import { cacheService } from '../services/CacheService';

// Simulation of data retrieval (normally this calls the DB)
const mockDatabaseFetch = async () => {
    // Simulate a slow database query (e.g., 500ms)
    await new Promise(resolve => setTimeout(resolve, 500)); 

    // Mock data structure matching the frontend expectation
    return [
        { date: '2025-12-11', count: 1200 },
        { date: '2025-12-12', count: 1550 },
        { date: '2025-12-13', count: 1800 },
        { date: '2025-12-14', count: 901 },
        { date: '2025-12-15', count: 2100 }
    ];
};

export const getDailyDownloads = async (req: Request, res: Response): Promise<void> => {
    const CACHE_KEY = 'daily_downloads_data'; // Unique key for this data
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
    const data = await mockDatabaseFetch(); 

    // 3. Store Data in Cache
    await cacheService.set(CACHE_KEY, data, CACHE_TTL);

    // 4. Respond to Client
    res.status(200).json(data);
};