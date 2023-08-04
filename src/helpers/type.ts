interface Note {
    id: number,
    name: string,
    created: string,
    category: string,
    content: string,
    isArchieved: boolean
}

interface StatsObject {
    id: string,
    category: string,
    active: number,
    archieved: number
}

interface NoteData {
    name: string,
    category: string,
    content: string,
}

export {Note, StatsObject, NoteData}