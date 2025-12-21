
import { Router } from 'express';

import { getStats } from '../controller/StatsController';
import { getInsights } from '../controller/InsightsController';
import { getHeatMapStats } from '../controller/HeatMapController';
import { getTopReferrals } from '../controller/ReferralController';

const router = Router();
router.get('/stats', getStats);
router.get('/insights',getInsights);
router.get('/heatmap',getHeatMapStats);
router.get('/referrals',getTopReferrals)
export default router;
