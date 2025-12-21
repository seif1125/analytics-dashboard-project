// controllers/heatmapController.ts
import { Request, Response } from 'express';
import { cacheService } from '../services/CacheService';

/**
 * Generates mock intensity data for the heatmap.
 * 0 = No activity (Slate-100)
 * 1 = Medium activity (Emerald-200)
 * 2 = High activity (Emerald-400)
 */
const getHeatmapAggregation = async () => {
    // Simulate heavy DB grouping query
    await new Promise(resolve => setTimeout(resolve, 10));

    return [
        { label: '12Am', data: [1, 0, 0, 1, 1, 2, 0, 1] },
        { label: '1Am',  data: [1, 1, 0, 2, 1, 1, 1, 1] },
        { label: '2Am',  data: [0, 1, 1, 1, 2, 1, 0, 1] },
        { label: '3Am',  data: [2, 1, 1, 0, 1, 1, 2, 1] },
        { label: '4Am',  data: [1, 0, 1, 1, 1, 0, 1, 2] },
        { label: '5Am', data: [0, 1, 2, 1, 0, 1, 1, 1] },
        { label: '6Am',  data: [1, 1, 0, 1, 1, 2, 1, 0] },
        { label: '7Am',  data: [1, 2, 1, 0, 1, 1, 0, 1] },
        { label: '8Am',  data: [0, 1, 1, 2, 1, 0, 1, 1] },
        { label: '9Am',  data: [1, 0, 1, 1, 0, 1, 2, 1] },
        { label: '10Am', data: [1, 1, 2, 1, 1, 0, 1, 0] },
        { label: '11Am', data: [0, 1, 1, 0, 1, 2, 1, 1] },  
        { label: '12Pm', data: [1, 0, 1, 1, 2, 1, 0, 1] },
        { label: '1Pm',  data: [2, 1, 0, 1, 1, 1, 1, 0] },
        { label: '2Pm',  data: [1, 1, 2, 1, 0, 1, 1, 1] },
        { label: '3Pm',  data: [0, 1, 1, 0, 1, 2, 1, 1] },
        { label: '4Pm',  data: [1, 0, 1, 1, 1, 0, 2, 1] },
        { label: '5Pm',  data: [1, 2, 1, 0, 1, 1, 0, 1] },
        { label: '6Pm',  data: [0, 1, 1, 2, 1, 0, 1, 1] },
        { label: '7Pm',  data: [1, 0, 1, 1, 0, 1, 2, 1] },
        { label: '8Pm',  data: [1, 1, 2, 1, 1, 0, 1, 0] },
        { label: '9Pm',  data: [0, 1, 1, 0, 1, 2, 1, 1] },
        { label: '10Pm', data: [1, 0, 1, 1, 2, 1, 0, 1] },
        { label: '11Pm', data: [2, 1, 0, 1, 1, 1, 1, 0] },
    ];
};

// controllers/heatmapController.ts
export const getHeatMapStats = async (req: Request, res: Response): Promise<void> => {
    // Change this key to something highly specific
    const CACHE_KEY = 'heatmap_V1_data_overview'; 
    const CACHE_TTL = 1800; // 30 minutes

    try {
        const cachedData = await cacheService.get(CACHE_KEY);
        if (cachedData) {
            console.log("Serving Heatmap from Cache");
            res.status(200).json(cachedData);
            return;
        }
        console.log("Serving Heatmap from Cache miss");
        const stats = await getHeatmapAggregation();
        await cacheService.set(CACHE_KEY, stats, CACHE_TTL);

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: "Error calculating heatmap data" });
    }
};