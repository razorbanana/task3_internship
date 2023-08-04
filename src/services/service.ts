import { getNotes, getNoteById, addNote, updateNote, deleteNote } from '../repositories/repository.js';
import { formatDate, generateId, summarizeCategories, isStrictNoteData, isNoteData } from '../helpers/helper.js';
import { Note, NoteData } from '../helpers/type.js';

const getNoteStats = () => {
    const notes = getNotes();
    return summarizeCategories(notes);
};

const createNote = (noteData: NoteData) => {
    if (isStrictNoteData(noteData)) {
        const note: Note = {
            id: generateId(getNotes()),
            created: formatDate(new Date()),
            isArchieved: false,
            ...noteData,
        };
        addNote(note)
        return note
    } else {
        throw new Error('Invalid data for creating note')
    }
};

const updateNoteById = (id: number, updates: Partial<NoteData>) => {
    
    if (isNoteData(updates)) {
        updateNote(id, updates);
    } else {
        throw new Error('Invalid data for updating note')
    }
};

const deleteNoteById = (id: number) => {
    deleteNote(id);
};

export default { getNoteStats, createNote, updateNoteById, deleteNoteById, getNoteById, getNotes };
