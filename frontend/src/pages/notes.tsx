import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import NoteCard from '@/components/ui/NoteCard';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { useNotesStore } from '@/store/notesStore';
import { notesAPI, Note } from '@/api/notes';

const NotesPage: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const {
    notes,
    setNotes,
    addNote,
    updateNote,
    deleteNote,
    isAddModalOpen,
    isEditModalOpen,
    selectedNote,
    openAddModal,
    closeAddModal,
    closeEditModal,
    openEditModal,
  } = useNotesStore();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Add note form
  const [newNote, setNewNote] = useState({ note_title: '', note_content: '' });
  const [addErrors, setAddErrors] = useState<any>({});

  // Edit note form
  const [editedNote, setEditedNote] = useState({ note_title: '', note_content: '' });
  const [editErrors, setEditErrors] = useState<any>({});

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    fetchNotes();
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedNote) {
      setEditedNote({
        note_title: selectedNote.note_title,
        note_content: selectedNote.note_content,
      });
    }
  }, [selectedNote]);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const response = await notesAPI.getNotes();
      if (response.success && response.data) {
        setNotes(response.data.notes);
      }
    } catch (error: any) {
      setError('Failed to fetch notes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async () => {
    const newErrors: any = {};
    
    if (!newNote.note_title.trim()) {
      newErrors.note_title = 'Title is required';
    }
    
    if (!newNote.note_content.trim()) {
      newErrors.note_content = 'Content is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setAddErrors(newErrors);
      return;
    }

    try {
      const response = await notesAPI.createNote(newNote);
      if (response.success && response.data) {
        addNote(response.data.note);
        setNewNote({ note_title: '', note_content: '' });
        setAddErrors({});
        closeAddModal();
      }
    } catch (error: any) {
      setAddErrors({ submit: 'Failed to create note. Please try again.' });
    }
  };

  const handleUpdateNote = async () => {
    if (!selectedNote) return;

    const newErrors: any = {};
    
    if (!editedNote.note_title.trim()) {
      newErrors.note_title = 'Title is required';
    }
    
    if (!editedNote.note_content.trim()) {
      newErrors.note_content = 'Content is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setEditErrors(newErrors);
      return;
    }

    try {
      const response = await notesAPI.updateNote(selectedNote.note_id, editedNote);
      if (response.success && response.data) {
        updateNote(response.data.note);
        setEditErrors({});
        closeEditModal();
      }
    } catch (error: any) {
      setEditErrors({ submit: 'Failed to update note. Please try again.' });
    }
  };

  const handleDeleteNote = async () => {
    if (!selectedNote) return;

    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesAPI.deleteNote(selectedNote.note_id);
        deleteNote(selectedNote.note_id);
        closeEditModal();
      } catch (error: any) {
        setEditErrors({ submit: 'Failed to delete note. Please try again.' });
      }
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout
      title="Your Notes"
      description="Manage your notes - create, edit, and organize your thoughts"
      keywords="notes, note management, keep notes, organize"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-text-primary">
            {getGreeting()} {user?.user_name}!
          </h1>
          <p className="text-text-secondary mt-2">
            {notes.length === 0
              ? 'Start by creating your first note'
              : `You have ${notes.length} note${notes.length === 1 ? '' : 's'}`}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-text-secondary">Loading your notes...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-accent-red">{error}</p>
            <Button onClick={fetchNotes} className="mt-4">
              Try Again
            </Button>
          </div>
        ) : notes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <svg
              className="mx-auto h-24 w-24 text-text-light"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-6 text-xl font-medium text-text-primary">No notes yet</h3>
            <p className="mt-2 text-text-secondary">Get started by creating your first note!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {notes.map((note, index) => (
              <motion.div
                key={note.note_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NoteCard
                  title={note.note_title}
                  content={note.note_content}
                  lastModified={note.last_update}
                  onClick={() => openEditModal(note)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Floating Add Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={openAddModal}
          className="fixed bottom-8 right-8 bg-accent-salmon text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Add new note"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 4v16m8-8H4" />
          </svg>
        </motion.button>

        {/* Add Note Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          title="Add Notes"
        >
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Title"
              value={newNote.note_title}
              onChange={(e) => {
                setNewNote({ ...newNote, note_title: e.target.value });
                setAddErrors({ ...addErrors, note_title: '' });
              }}
              error={addErrors.note_title}
            />

            <Textarea
              placeholder="Write your note here..."
              rows={8}
              value={newNote.note_content}
              onChange={(e) => {
                setNewNote({ ...newNote, note_content: e.target.value });
                setAddErrors({ ...addErrors, note_content: '' });
              }}
              error={addErrors.note_content}
            />

            {addErrors.submit && (
              <div className="p-3 bg-red-100 border border-accent-red rounded-md text-accent-red text-sm">
                {addErrors.submit}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button onClick={handleAddNote} variant="success" className="flex-1">
                Add
              </Button>
              <Button onClick={closeAddModal} variant="danger" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </Modal>

        {/* Edit Note Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          title={selectedNote?.note_title || 'Edit Note'}
        >
          <div className="space-y-4">
            <Textarea
              rows={10}
              value={editedNote.note_content}
              onChange={(e) => {
                setEditedNote({ ...editedNote, note_content: e.target.value });
                setEditErrors({ ...editErrors, note_content: '' });
              }}
              error={editErrors.note_content}
            />

            {editErrors.submit && (
              <div className="p-3 bg-red-100 border border-accent-red rounded-md text-accent-red text-sm">
                {editErrors.submit}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button onClick={handleUpdateNote} variant="success" className="flex-1">
                Save
              </Button>
              <Button onClick={handleDeleteNote} variant="danger" className="flex-1">
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default NotesPage;

