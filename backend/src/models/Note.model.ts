import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface INote extends Document {
  note_id: string;
  note_title: string;
  note_content: string;
  user_id: string;
  last_update: Date;
  created_on: Date;
}

const NoteSchema: Schema = new Schema({
  note_id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  note_title: {
    type: String,
    required: [true, 'Note title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  note_content: {
    type: String,
    required: [true, 'Note content is required'],
    trim: true
  },
  user_id: {
    type: String,
    required: true,
    ref: 'User'
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

// Indexes for performance
NoteSchema.index({ user_id: 1, created_on: -1 });
NoteSchema.index({ note_id: 1 });

export default mongoose.model<INote>('Note', NoteSchema);

