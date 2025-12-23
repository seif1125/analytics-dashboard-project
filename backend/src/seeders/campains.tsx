import mongoose from 'mongoose';
import { User } from '../models/user';
import { Campaign } from '../models/campaign';
import connectDB from '../config/db';

const seedCampaigns = async () => {
  await connectDB();

  try {
    // 1. Fetch existing users to use as references
    const users = await User.find({});
    
    if (users.length === 0) {
      console.log("❌ No users found. Please seed users first!");
      process.exit(1);
    }

    // 2. Clear old campaigns
    await Campaign.deleteMany({});
    console.log('Old campaigns cleared...');

    // 3. Create campaigns using real User IDs
    // We map through users or pick specific ones to assign campaigns to
    const campaignData = [
      {
        provider: users[0]._id, // Links to Seif Ammar
        sales: 12465,
        goal: 23.3,
        status: 'On process'
      },
      {
        provider: users[1]._id, // Links to Sarah Chen
        sales: 3576,
        goal: 19.4,
        status: 'Achieved'
      },
      {
        provider: users[2]._id, // Links to Omar Khaled
        sales: 12764,
        goal: 12.76,
        status: 'On process'
      },
      {
        provider: users[3]._id, // Links to Layla Hassan
        sales: 13864,
        goal: 16.78,
        status: 'Achieved'
      }
    ];

    await Campaign.create(campaignData);
    
    console.log('✅ Success: Campaigns seeded with User foreign keys!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedCampaigns();