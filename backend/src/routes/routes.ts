
import { Router } from 'express';

import { getStats } from '../controller/StatsController';
import { getInsights } from '../controller/InsightsController';
import { getHeatMapStats } from '../controller/HeatMapController';

const router = Router();
router.get('/stats', getStats);
router.get('/insights',getInsights);
router.get('/heatmap',getHeatMapStats);
export default router;
