import { Request, Response } from 'express';
import { Campaign } from '../models/campaign';

// 1. FETCH ALL CAMPAIGNS
export const getCampaigns = async (req: Request, res: Response) => {
  try {
    // We "populate" the provider field to get User name, role, and image
    const campaigns = await Campaign.find()
      .populate('provider', 'name role image')
      .sort({ createdAt: -1 });

    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch campaigns", error });
  }
};

// 2. UPDATE (EDIT) CAMPAIGN
export const updateCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      id, 
      updates, 
      { new: true, runValidators: true }
    ).populate('provider', 'name role image');

    if (!updatedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: "Failed to update campaign", error });
  }
};

// 3. DELETE CAMPAIGN
export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedCampaign = await Campaign.findByIdAndDelete(id);

    if (!deletedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete campaign", error });
  }
};