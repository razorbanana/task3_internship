const generateId = (notes) => {
    return 1 + notes.reduce((acc, currentValue) => currentValue.id > acc ? currentValue.id : acc, 1);
};
function formatDate(date) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}
const summarizeCategories = (allNotes) => {
    return allNotes.reduce((accumulator, currentValue) => {
        if (accumulator.find(obj => obj.category === currentValue.category)) {
            if (currentValue.isArchieved) {
                return accumulator.map(obj => {
                    if (obj.category === currentValue.category) {
                        return Object.assign(Object.assign({}, obj), { archieved: obj.archieved + 1 });
                    }
                    else {
                        return obj;
                    }
                });
            }
            else {
                return accumulator.map(obj => {
                    if (obj.category === currentValue.category) {
                        return Object.assign(Object.assign({}, obj), { active: obj.active + 1 });
                    }
                    else {
                        return obj;
                    }
                });
            }
        }
        else {
            if (currentValue.isArchieved) {
                accumulator.push({
                    id: currentValue.category,
                    category: currentValue.category,
                    archieved: 1,
                    active: 0
                });
            }
            else {
                accumulator.push({
                    id: currentValue.category,
                    category: currentValue.category,
                    active: 1,
                    archieved: 0
                });
            }
        }
        return accumulator;
    }, []);
};
export { generateId, formatDate, summarizeCategories };