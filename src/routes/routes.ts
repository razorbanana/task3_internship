import express from "express"
import morgan from "morgan"
import { generateId, formatDate, summarizeCategories } from "../helpers/helper.js"



const app = express()
app.use(morgan(function (tokens, req, res) {
    let str = ''
    if (tokens.method(req, res) == 'POST') {
        str = JSON.stringify(req.body)
    }
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        str
    ].join(' ')
}))
app.use(express.json());


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

app.get('/notes/stats', (request, response) => {
    const stats = summarizeCategories(notes);
    response.json(stats);
})

app.get('/notes', (request, response) => {
    response.json(notes)
})

app.get('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(person => person.id != id)
    response.status(204).end()
})

app.post('/notes', (request, response) => {
    const body = request.body
    console.log(request.body)

    if (!body.name || !body.category || !body.content) {
        response.status(400).json({
            error: 'content missing'
        })
    }

    if (notes.find(note => note.name == body.name)) {
        response.status(400).json({
            error: 'name is already in use'
        })
    }

    const note = {
        id: generateId(notes),
        name: body.name,
        created: formatDate(new Date()),
        category: body.category,
        content: body.content,
        isArchieved: false
    }

    notes = notes.concat(note)
    response.json(note)
})

app.patch('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const updates = request.body
    console.log(request.body)

    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex !== -1) {
        notes[noteIndex] = { ...notes[noteIndex], ...updates };
        response.status(200).json(notes[noteIndex]);
    } else {
        response.status(404).json({ message: 'User not found' });
    }
})

export default app