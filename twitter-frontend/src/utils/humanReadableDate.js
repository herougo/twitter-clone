import React from 'react';

const humanReadableDate = (dateString) => {
    const now = new Date(Date.now());
    const nowYear = now.toDateString().split(' ')[3];
    const date = new Date(dateString);
    const dateSplit = date.toDateString().split(' ');
    const day = parseInt(dateSplit[2]);
    const month = dateSplit[1];
    const year = dateSplit[3];

    if (year === nowYear) {
        return `${month} ${day}`;
    }
    
    return `${month} ${day}, ${year}`;
}

export default humanReadableDate;
