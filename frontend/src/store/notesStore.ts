import { create } from 'zustand';
import { Note } from '@/api/notes';

interface NotesState {
  notes: Note[];
  selectedNote: Note | null;
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (noteId: string) => void;
  setSelectedNote: (note: Note | null) => void;
  openAddModal: () => void;
  closeAddModal: () => void;
  openEditModal: (note: Note) => void;
  closeEditModal: () => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  selectedNote: null,
  isAddModalOpen: false,
  isEditModalOpen: false,
  setNotes: (notes) => set({ notes }),
  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
  updateNote: (updatedNote) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.note_id === updatedNote.note_id ? updatedNote : note
      ),
    })),
  deleteNote: (noteId) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.note_id !== noteId),
    })),
  setSelectedNote: (note) => set({ selectedNote: note }),
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),
  openEditModal: (note) => set({ selectedNote: note, isEditModalOpen: true }),
  closeEditModal: () => set({ isEditModalOpen: false, selectedNote: null }),
}));

