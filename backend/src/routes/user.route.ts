
import { Router } from 'express';

import { getUser } from '../controller/UserController';


const router = Router();

// GET /api/v1/analytics/daily_downloads
router.get('/user', getUser);
export default router;