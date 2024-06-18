import getDatesInRange from "./dateRange";

function addToIdsByDate(idsByDate, id, startDate, endDate) {
    // add to idsByDate
    if (endDate) {
        for (const date of getDatesInRange(startDate, endDate)) {
            let ids = idsByDate[date] ?? [];
            ids.push(id);
            idsByDate[date] = ids;
        }
    } else {
        // no deadline, so put it in every idsByDate entry after start date
        for (const date in idsByDate) {
            if (date > startDate) {
                let ids = idsByDate[date] ?? [];
                ids.push(id);
                idsByDate[date] = ids; 
            }                 
        }
    }
}

function removeFromIdsByDate(idsByDate, id, startDate, endDate) {
    const removeAtDate = (date) => {
        idsByDate[date]?.remove( idToCheck => id === idToCheck );
    }
    if (endDate) {
        for (const date of getDatesInRange(startDate, endDate)) {
            removeAtDate(date);
        }
    } else {
        //remove from every date
        for (const date in idsByDate) {
            removeAtDate(date);                
        }
    }
}

export { addToIdsByDate, removeFromIdsByDate };