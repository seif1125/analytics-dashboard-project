import { Request, Response } from 'express';
import { cacheService } from '../services/CacheService';


const BASE_DATA = [
    { id: 1, name: 'Saudi Arabia', isoCode: 'sa', visitors: 45234 },
    { id: 2, name: 'Egypt', isoCode: 'eg', visitors: 12234 },
    { id: 3, name: 'Bahrain', isoCode: 'bh', visitors: 7234 },
    { id: 4, name: 'Jordan', isoCode: 'jo', visitors: 3543 },
    { id: 5, name: 'Spain', isoCode: 'es', visitors: 2463 },
    { id: 6, name: 'USA', isoCode: 'us', visitors: 1832 }
];

export const getCountryVisitors = async (req: Request, res: Response): Promise<void> => {
    const CACHE_KEY = 'v1_live_country_stats';

    try {
        // 1. Get previous state from cache
        const previousState = await cacheService.get(CACHE_KEY);

        const newData= BASE_DATA.map((base) => {
            // Find the previous record for this country
            const prev = previousState?.data.find((p:{id:string|number}) => p.id === base.id);
            const prevValue = prev ? prev.visitors : base.visitors;

            // 2. Simulate new visitor count (random change between -50 and +50)
            const change = Math.floor(Math.random() * 101) - 50;
            const newValue = Math.max(0, prevValue + change);

            // 3. Calculate growth based on the previous poll value
            // Formula: ((New - Old) / Old) * 100
            const growthDiff = newValue - prevValue;
            const growthPercent = prevValue !== 0 
                ? parseFloat(((growthDiff / prevValue) * 100).toFixed(2)) 
                : 0;

            return {
                ...base,
                visitors: newValue,
                growth: Math.abs(growthPercent),
                isUp: growthDiff >= 0
            };
        });

        const response = { data: newData };

        // 4. Update cache with the latest state for the next request
        await cacheService.set(CACHE_KEY, response, 3600);

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Error updating country metrics" });
    }
};