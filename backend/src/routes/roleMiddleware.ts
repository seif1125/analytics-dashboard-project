// middleware/roleMiddleware.ts
import { Router } from 'express';

import { deleteCampaign, updateCampaign } from '../controller/CampaignController';

const router = Router();


export const isAdmin = (req: any, res: any, next: any) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: "Access denied. Admins only." });
    }
  };
  
