import { Request, Response } from 'express';
import { cacheService } from '../services/CacheService';
const calculateChange = (current:number, previous:number) => {
    if (previous === 0) return "0%";
    const change = ((current - previous) / previous) * 100;
    return `${Math.abs(change).toFixed(2)}%`;
  };
  
  // Formatting: Convert seconds to "2m 27s"
  const formatDuration = (totalSeconds:number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);
    return `${minutes}m ${seconds}s`;
  };
  
  // Formatting: Convert 143000 to "143K"
  const formatK = (num:number) => {
    return num >= 1000 ? (num / 1000).toFixed(0) + 'K' : num;
  };
  // Utility to format large numbers with commas (e.g., 42,643)
const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  
  // Mock function to simulate database fetching
  const getMetricsForRange = async (start: Date, end: Date) => {
    // We simulate different data for different years to show trends
    const isCurrentYear = start.getFullYear() === new Date().getFullYear();
    
    // Base values (slightly higher for the current year to simulate growth)
    const multiplier = isCurrentYear ? 1.05 : 1.0;
  
    return {
      userCount: Math.floor((40000 + Math.random() * 5000) * multiplier),
      sessionCount: Math.floor((140000 + Math.random() * 10000) * multiplier),
      bounceRate: parseFloat((90 + Math.random() * 5).toFixed(1)), // e.g., 91.6%
      avgDuration: Math.floor((140 + Math.random() * 20) * multiplier) // seconds
    };
  };
// Simulate complex aggregation for Dashboard Stats
const mockStatsAggregation = async () => {
    // Simulating heavy DB operations like COUNT(DISTINCT), AVG, and comparison logic
    await new Promise(resolve => setTimeout(resolve, 500)); 

    try {
        await new Promise(resolve => setTimeout(resolve, 500)); 

        const now = new Date();
        const startOfThisYear = new Date(now.getFullYear(), 0, 1);
        const startOfLastYear = new Date(now.getFullYear() - 1, 0, 1);
    
        // 1. Fetch Metrics (using our new utils)
        const currentMetrics = await getMetricsForRange(startOfThisYear, now);
        const prevMetrics = await getMetricsForRange(startOfLastYear, startOfThisYear);
    
        // 2. Format and Return the array
        return [
          {
            id: 'total-users',
            label: 'Total Users',
            value: formatNumber(currentMetrics.userCount),
            change: calculateChange(currentMetrics.userCount, prevMetrics.userCount),
            isPositive: currentMetrics.userCount >= prevMetrics.userCount,
            icon: 'users',
            color: 'bg-purple-500'
          },
          {
            id: 'total-sessions',
            label: 'Total Sessions',
            value: formatK(currentMetrics.sessionCount),
            change: calculateChange(currentMetrics.sessionCount, prevMetrics.sessionCount),
            isPositive: currentMetrics.sessionCount >= prevMetrics.sessionCount,
            icon: 'sessions',
            color: 'bg-pink-500'
          },
          {
            id: 'bounce-rate',
            label: 'Bounce Rate',
            value: `${currentMetrics.bounceRate}%`,
            change: calculateChange(currentMetrics.bounceRate, prevMetrics.bounceRate),
            isPositive: currentMetrics.bounceRate <= prevMetrics.bounceRate, // Lower is better
            icon: 'bounce',
            color: 'bg-emerald-500'
          },
          {
            id: 'session-duration',
            label: 'Avg Session Duration',
            value: formatDuration(currentMetrics.avgDuration),
            change: calculateChange(currentMetrics.avgDuration, prevMetrics.avgDuration),
            isPositive: currentMetrics.avgDuration >= prevMetrics.avgDuration,
            icon: 'duration',
            color: 'bg-amber-500'
          }
        ]
    } catch (error) {
        console.error('Error in mockStatsAggregation:', error);
        throw error;
    }
}

export const getStats = async (req: Request, res: Response): Promise<void> => {
    const CACHE_KEY = 'dashboard_stats_overview';
    const CACHE_TTL = 900; // Cache for 15 minutes (stats update more frequently than retention)

    try {
        const cachedData = await cacheService.get(CACHE_KEY);
        if (cachedData) {
            console.log('Cache Hit: Serving dashboard stats from Redis.');
            res.status(200).json(cachedData);
            return;
        }

        console.log('Cache Miss: Aggregating dashboard stats...');
        const data = await mockStatsAggregation();
        
        // Store in Redis
        await cacheService.set(CACHE_KEY, data, CACHE_TTL);

        res.status(200).json(data);
    } catch (error) {
        console.error('Stats Controller Error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
};