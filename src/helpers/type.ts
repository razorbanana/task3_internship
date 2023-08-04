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

export {Note, StatsObject}