import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import Note from '../models/Note.model';
import { AuthRequest } from '../middleware/auth.middleware';

// Validation middleware
export const noteValidation = [
  body('note_title')
    .trim()
    .notEmpty()
    .withMessage('Note title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('note_content')
    .trim()
    .notEmpty()
    .withMessage('Note content is required')
];

// Create a new note
export const createNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
      return;
    }

    const { note_title, note_content } = req.body;
    const userId = req.user?.userId;

    const note = new Note({
      note_title,
      note_content,
      user_id: userId
    });

    await note.save();

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: { note }
    });
  } catch (error: any) {
    console.error('Create note error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating note',
      error: error.message 
    });
  }
};

// Get all notes for the authenticated user
export const getNotes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const notes = await Note.find({ user_id: userId })
      .sort({ last_update: -1 });

    res.status(200).json({
      success: true,
      data: { 
        notes,
        count: notes.length 
      }
    });
  } catch (error: any) {
    console.error('Get notes error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching notes',
      error: error.message 
    });
  }
};

// Get a single note by ID
export const getNoteById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const note = await Note.findOne({ note_id: id, user_id: userId });

    if (!note) {
      res.status(404).json({ 
        success: false, 
        message: 'Note not found' 
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { note }
    });
  } catch (error: any) {
    console.error('Get note error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching note',
      error: error.message 
    });
  }
};

// Update a note
export const updateNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
      return;
    }

    const { id } = req.params;
    const { note_title, note_content } = req.body;
    const userId = req.user?.userId;

    const note = await Note.findOne({ note_id: id, user_id: userId });

    if (!note) {
      res.status(404).json({ 
        success: false, 
        message: 'Note not found' 
      });
      return;
    }

    note.note_title = note_title;
    note.note_content = note_content;
    note.last_update = new Date();

    await note.save();

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: { note }
    });
  } catch (error: any) {
    console.error('Update note error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating note',
      error: error.message 
    });
  }
};

// Delete a note
export const deleteNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const note = await Note.findOneAndDelete({ note_id: id, user_id: userId });

    if (!note) {
      res.status(404).json({ 
        success: false, 
        message: 'Note not found' 
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete note error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting note',
      error: error.message 
    });
  }
};

