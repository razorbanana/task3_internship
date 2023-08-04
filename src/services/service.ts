import { getNotes, getNoteById, addNote, updateNote, deleteNote } from '../repositories/repository.js';
import { formatDate, generateId, summarizeCategories } from '../helpers/helper.js';
import { Note } from '../helpers/type.js';

const getNoteStats = () => {
    const notes = getNotes();
    return summarizeCategories(notes);
};

const createNote = (noteData: Omit<Note, 'id' | 'created' | 'isArchieved'>) => {
    const note: Note = {
      id: generateId(getNotes()),
      created: formatDate(new Date()), 
      isArchieved: false,
      ...noteData,
    };
    addNote(note);
    return note;
  };

const updateNoteById = (id: number, updates: any) => {
    updateNote(id, updates);
};

const deleteNoteById = (id: number) => {
    deleteNote(id);
};

export default { getNoteStats, createNote, updateNoteById, deleteNoteById, getNoteById, getNotes };
