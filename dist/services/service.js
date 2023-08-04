import { getNotes, getNoteById, addNote, updateNote, deleteNote } from '../repositories/repository.js';
import { formatDate, generateId, summarizeCategories } from '../helpers/helper.js';
const getNoteStats = () => {
    const notes = getNotes();
    return summarizeCategories(notes);
};
const createNote = (noteData) => {
    const note = Object.assign({ id: generateId(getNotes()), created: formatDate(new Date()), isArchieved: false }, noteData);
    addNote(note);
    return note;
};
const updateNoteById = (id, updates) => {
    updateNote(id, updates);
};
const deleteNoteById = (id) => {
    deleteNote(id);
};
export default { getNoteStats, createNote, updateNoteById, deleteNoteById, getNoteById, getNotes };
