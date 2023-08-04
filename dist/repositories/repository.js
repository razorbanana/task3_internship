let notes = [
    {
        id: 1,
        name: 'note1',
        created: 'April 20, 2021',
        category: 'Quote',
        content: 'I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021',
        isArchieved: false
    },
    {
        id: 2,
        name: 'note2',
        created: 'April 20, 2021',
        category: 'Idea',
        content: 'April 20, 2021 and April 21, 2021',
        isArchieved: false
    },
    {
        id: 3,
        name: 'note3',
        created: 'April 20, 2021',
        category: 'Idea',
        content: 'content3',
        isArchieved: true
    },
    {
        id: 4,
        name: 'note4',
        created: 'April 20, 2021',
        category: 'Task',
        content: 'content4',
        isArchieved: false
    },
    {
        id: 5,
        name: 'note5',
        created: 'April 20, 2021',
        category: 'Task',
        content: 'content5',
        isArchieved: true
    },
    {
        id: 6,
        name: 'note6',
        created: 'April 20, 2021',
        category: 'Random Thought',
        content: 'content6',
        isArchieved: false
    },
    {
        id: 7,
        name: 'note7',
        created: 'April 21, 2021',
        category: 'Quote',
        content: 'This is a new quote note.',
        isArchieved: false
    },
    {
        id: 8,
        name: 'note8',
        created: 'April 21, 2021',
        category: 'Idea',
        content: 'This is a new idea note.',
        isArchieved: false
    },
    {
        id: 9,
        name: 'note9',
        created: 'April 21, 2021',
        category: 'Task',
        content: 'This is a new task note.',
        isArchieved: true
    },
    {
        id: 10,
        name: 'note10',
        created: 'April 21, 2021',
        category: 'Random Thought',
        content: 'This is a new random thought note.',
        isArchieved: false
    },
    {
        id: 11,
        name: 'note11',
        created: 'April 22, 2021',
        category: 'Task',
        content: 'This is another task note.',
        isArchieved: false
    }
];
const getNotes = () => {
    return notes;
};
const getNoteById = (id) => {
    return notes.find(note => note.id === id);
};
const addNote = (note) => {
    notes = notes.concat(note);
};
const updateNote = (id, updates) => {
    const noteIndex = notes.findIndex(note => note.id === id);
    notes[noteIndex] = Object.assign(Object.assign({}, notes[noteIndex]), updates);
};
const deleteNote = (id) => {
    notes = notes.filter(person => person.id != id);
};
export { getNotes, getNoteById, addNote, updateNote, deleteNote };
