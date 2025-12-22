import { Request, Response } from 'express';
import { cacheService } from '../services/CacheService';



export const getDeviceSessions = async (req: Request, res: Response): Promise<void> => {
    const CACHE_KEY = 'v1_device_sessions_stats';
    const CACHE_TTL = 3600; // Cache for 1 hour

    try {
        // Check if data exists in Redis cache
        const cachedData = await cacheService.get(CACHE_KEY);
        if (cachedData) {
            res.status(200).json(cachedData);
            return;
        }

        // Data modeled exactly after your "Sessions By Device" screenshot
        const devices= [
            { label: 'Mobile', value: 1754, color: '#f91d8e' },  // Pink
            { label: 'Tablet', value: 1234, color: '#8b5cf6' },  // Purple
            { label: 'Desktop', value: 878, color: '#f59e0b' }   // Orange
        ];

        const stats= {
            // Automatically calculate total sum
            totalAudience: devices.reduce((sum, d) => sum + d.value, 0),
            devices
        };

        // Store in cache and return
        await cacheService.set(CACHE_KEY, stats, CACHE_TTL);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: "Error fetching device analytics" });
    }
};