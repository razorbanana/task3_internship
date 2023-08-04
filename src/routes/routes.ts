import express from "express"
import morgan from "morgan"
import { getNotes, getNoteById } from "../repositories/repository.js"
import NoteService from "../services/service.js"


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

app.get('/notes/stats', (request, response) => {
    try {
        const stats = NoteService.getNoteStats();
        response.json(stats);
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/notes', (request, response) => {
    response.json(getNotes())
})

app.get('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = getNoteById(id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/notes/:id', (request, response) => {
    try {
        const id = Number(request.params.id);
        NoteService.deleteNoteById(id);
        response.status(204).end();
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/notes', (request, response) => {
    try {
        const body = request.body
        if (!body.name || !body.category || !body.content) {
            response.status(400).json({
                error: 'content missing',
            });
        }
        const note = NoteService.createNote(body)
        response.json(note)
    } catch (error) {
        if (error instanceof Error && error.message === 'Invalid data for creating note') {
            response.status(400).json({
                error: 'Invalid data for note',
            });
        } else {
            response.status(500).json({ error: 'Internal server error' })
        }
    }
})

app.patch('/notes/:id', (request, response) => {
    try {
        const id = Number(request.params.id);
        const updates = request.body;
        NoteService.updateNoteById(id, updates);
        response.status(204).end();
    } catch (error) {
        if (error instanceof Error && error.message === 'Invalid data for updating note') {
            response.status(400).json({
                error: 'Invalid data for note',
            });
        } else {
            response.status(500).json({ error: 'Internal server error' })
        }
    }
})

export default app