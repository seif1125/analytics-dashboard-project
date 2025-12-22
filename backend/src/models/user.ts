import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'employee';
  image?: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'employee'], 
    default: 'employee' 
  },
  image: { type: String, required: false },
}, { timestamps: true });

/**
 * FIXED MIDDLEWARE: Modern Async Style
 * We remove 'next' from parameters. If the function is async, 
 * Mongoose waits for it to finish before saving.
 */
userSchema.pre('save', async function(this: IUser) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return; 
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error: any) {
    throw new Error(error);
  }
});

export const User = mongoose.model<IUser>('User', userSchema);