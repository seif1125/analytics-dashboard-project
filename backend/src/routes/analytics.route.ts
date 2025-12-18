import { Router } from 'express';
import { getDailyDownloads } from '../controller/AnalyticsController';
import { getMonthlyRetention } from '../controller/UserRetentionController';
const router = Router();

// GET /api/v1/analytics/daily_downloads
router.get('/daily_downloads', getDailyDownloads);
router.get('/monthly_retention', getMonthlyRetention);

export default router;