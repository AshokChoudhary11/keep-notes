import apiClient from '@/lib/axios';

export interface Note {
  _id: string;
  note_id: string;
  note_title: string;
  note_content: string;
  user_id: string;
  created_on: string;
  last_update: string;
}

export interface NotesResponse {
  success: boolean;
  message?: string;
  data?: {
    notes: Note[];
    count: number;
  };
}

export interface NoteResponse {
  success: boolean;
  message?: string;
  data?: {
    note: Note;
  };
}

export interface CreateNoteData {
  note_title: string;
  note_content: string;
}

export interface UpdateNoteData {
  note_title: string;
  note_content: string;
}

export const notesAPI = {
  createNote: async (data: CreateNoteData): Promise<NoteResponse> => {
    const response = await apiClient.post('/notes', data);
    return response.data;
  },

  getNotes: async (): Promise<NotesResponse> => {
    const response = await apiClient.get('/notes');
    return response.data;
  },

  getNoteById: async (id: string): Promise<NoteResponse> => {
    const response = await apiClient.get(`/notes/${id}`);
    return response.data;
  },

  updateNote: async (id: string, data: UpdateNoteData): Promise<NoteResponse> => {
    const response = await apiClient.put(`/notes/${id}`, data);
    return response.data;
  },

  deleteNote: async (id: string): Promise<any> => {
    const response = await apiClient.delete(`/notes/${id}`);
    return response.data;
  },
};

