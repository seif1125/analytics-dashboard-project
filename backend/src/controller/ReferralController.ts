// controllers/referralController.ts
import { Request, Response } from 'express';
import { cacheService } from '../services/CacheService';

/**
 * Mock data generator for Top Referral Pages
 * Includes total count, growth, and specific page breakdown
 */
const getReferralAggregation = async () => {
    // Simulate DB query delay
    await new Promise(resolve => setTimeout(resolve, 250));

    return {
        totalViews: 4289,
        growthRate: 1.02,
        timeLabel: "compared to last week",
        pages: [
            { id: 1, label: 'blog/how-to-improve-seo', value: 1250, color: '#8b5cf6' }, // Purple
            { id: 2, label: 'products/new-launch', value: 1100, color: '#0ea5e9' },    // Blue
            { id: 3, label: 'services/digital-marketing', value: 950, color: '#f59e0b' }, // Orange
            { id: 4, label: 'pricing', value: 890, color: '#10b981' }                 // Green
        ]
    };
};

export const getTopReferrals = async (req: Request, res: Response): Promise<void> => {
    const CACHE_KEY = 'analytics_top_referralss_V1';
    const CACHE_TTL = 3600; // 1 hour

    try {
        const cachedData = await cacheService.get(CACHE_KEY);
        if (cachedData) {
            res.status(200).json(cachedData);
            return;
        }

        const data = await getReferralAggregation();
        await cacheService.set(CACHE_KEY, data, CACHE_TTL);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching referral data" });
    }
};