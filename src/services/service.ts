import { getNotes, getNoteById, addNote, updateNote, deleteNote } from '../repositories/repository.js';
import { formatDate, generateId, summarizeCategories } from '../helpers/helper.js';
import { Note } from '../helpers/type.js';
import * as yup from 'yup';

const getNoteStats = () => {
    const notes = getNotes();
    return summarizeCategories(notes);
};

const createNote = (noteData: Omit<Note, 'id' | 'created' | 'isArchieved'>) => {
    const schema = yup.object().shape({
        name: yup.string().required(),
        category: yup.string().required(),
        content: yup.string().required(),
    });

    try {
        schema.validateSync(noteData, { abortEarly: false });
        const note: Note = {
            id: generateId(getNotes()),
            created: formatDate(new Date()),
            isArchieved: false,
            ...noteData,
        };
        addNote(note);
        return note;
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            throw new Error('Validation error: ' + error.message);
        }
        throw new Error('An unknown error occurred');
    }
};

const updateNoteById = (id: number, updates: any) => {
    const schema = yup.object().shape({
        name: yup.string(),
        category: yup.string(),
        content: yup.string(),
    });

    try {
        schema.validateSync(updates, { abortEarly: false }); // Validate the updates
        updateNote(id, updates);
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            throw new Error('Validation error: ' + error.message);
        }
        throw new Error('An unknown error occurred');
    }
};

const deleteNoteById = (id: number) => {
    deleteNote(id);
};

export default { getNoteStats, createNote, updateNoteById, deleteNoteById, getNoteById, getNotes };
