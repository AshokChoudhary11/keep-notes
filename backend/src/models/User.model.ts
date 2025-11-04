import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends Document {
  user_id: string;
  user_name: string;
  user_email: string;
  password: string;
  last_update: Date;
  created_on: Date;
}

const UserSchema: Schema = new Schema({
  user_id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  user_name: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [50, 'Username cannot exceed 50 characters']
  },
  user_email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  last_update: {
    type: Date,
    default: Date.now
  },
  created_on: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'created_on', updatedAt: 'last_update' }
});

// Index for performance
UserSchema.index({ user_email: 1 });
UserSchema.index({ user_id: 1 });

export default mongoose.model<IUser>('User', UserSchema);

