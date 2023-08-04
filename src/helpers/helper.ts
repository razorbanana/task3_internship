import { Note, NoteData, StatsObject } from "./type.js";

const generateId = (notes: Note[]) => {
    return 1 + notes.reduce((acc, currentValue) => currentValue.id > acc ? currentValue.id : acc, 1)
}

function formatDate(date: Date) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

const summarizeCategories = (allNotes: Note[]) => {
    return allNotes.reduce((accumulator: StatsObject[], currentValue) => {
        if (accumulator.find(obj => obj.category === currentValue.category)) {
            if (currentValue.isArchieved) {
                return accumulator.map(obj => {
                    if (obj.category === currentValue.category) {
                        return {
                            ...obj, archieved: obj.archieved + 1
                        }
                    } else {
                        return obj
                    }
                })
            } else {
                return accumulator.map(obj => {
                    if (obj.category === currentValue.category) {
                        return {
                            ...obj, active: obj.active + 1
                        }
                    } else {
                        return obj
                    }
                })
            }
        } else {
            if (currentValue.isArchieved) {
                accumulator.push({
                    id: currentValue.category,
                    category: currentValue.category,
                    archieved: 1,
                    active: 0
                })
            } else {
                accumulator.push({
                    id: currentValue.category,
                    category: currentValue.category,
                    active: 1,
                    archieved: 0
                })
            }
        }
        return accumulator
    }, [])
}

function isStrictNoteData(obj: any): obj is NoteData {
    return (
        typeof obj.name === 'string' &&
        typeof obj.category === 'string' &&
        typeof obj.content === 'string' && Object.keys(obj).length === 3
    );
}

function isNoteData(obj: any): obj is NoteData {
    const requiredProps = ['name', 'category', 'content'];
    const objKeys = Object.keys(obj);

    for (const prop of objKeys) {
        if (!requiredProps.includes(prop) || typeof obj[prop] !== 'string') {
            return false;
        }
    }

    return true;
}


export { generateId, formatDate, summarizeCategories, isStrictNoteData, isNoteData }