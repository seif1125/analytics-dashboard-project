import mongoose from 'mongoose';
import { User } from '../models/user';
import connectDB from '../config/db';

const seed = async () => {
  await connectDB();

  try {
    // Clear existing users so we start fresh with known IDs
    await User.deleteMany({});
    console.log('Database cleared. Seeding expanded user list...');

    const users = [
      // ADMINS
      {
        name: "Seif Ammar",
        email: "seif@admin.com",
        password: "AdminPassword123",
        role: "admin",
        image: "seif.png"
      },
      {
        name: "Sarah Chen",
        email: "sarah@admin.com",
        password: "AdminPassword123",
        role: "admin",
        image: "sarah.png"
      },
      // EMPLOYEES
      {
        name: "Omar Khaled",
        email: "omar@company.com",
        password: "UserPassword123",
        role: "employee",
        image: "omar.png"
      },
      {
        name: "Layla Hassan",
        email: "layla@company.com",
        password: "UserPassword123",
        role: "employee",
        image: "layla.png"
      },
      {
        name: "James Wilson",
        email: "james@company.com",
        password: "UserPassword123",
        role: "employee",
        image: "james.png"
      },
      {
        name: "Maria Garcia",
        email: "maria@company.com",
        password: "UserPassword123",
        role: "employee",
        image: "maria.png"
      }
    ];

    await User.create(users);
    
    console.log('✅ Success: 6 users (2 Admins, 4 Employees) added to MongoDB.');
    console.log('You can now use these emails to test login and relational data.');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

seed();