import mongoose, { Schema, Document } from 'mongoose';

export interface ICampaign extends Document {
  provider: mongoose.Types.ObjectId;
  sales: number;
  goal: number;
  status: 'On process' | 'Achieved';
}

const campaignSchema = new Schema({
  provider: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sales: { type: Number, required: true },
  goal: { type: Number, required: true },
  status: { type: String, enum: ['On process', 'Achieved'], default: 'On process' }
}, { timestamps: true });

export const Campaign = mongoose.model<ICampaign>('Campaign', campaignSchema);