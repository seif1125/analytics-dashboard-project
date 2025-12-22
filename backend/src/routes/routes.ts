
import { Router } from 'express';

import { getStats } from '../controller/StatsController';
import { getInsights } from '../controller/InsightsController';
import { getHeatMapStats } from '../controller/HeatMapController';
import { getTopReferrals } from '../controller/ReferralController';
import { getDeviceSessions } from '../controller/DeviceController';
import {getCountryVisitors} from '../controller/CountryVisitorsController';
import { getAudienceMetrics } from '../controller/AudienceMetricsController';
import { login } from '../controller/AuthController';

const router = Router();
router.get('/stats', getStats);
router.get('/insights',getInsights);
router.get('/heatmap',getHeatMapStats);
router.get('/referrals',getTopReferrals);
router.get('/devices',getDeviceSessions);
router.get('/visitors',getCountryVisitors);
router.get('/audience-metrics',getAudienceMetrics);
router.post('/login', login);
export default router;
