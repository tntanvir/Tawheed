import React, { useState } from 'react';

const NextDateComponent = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleGetNextDate = () => {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 1);
        setCurrentDate(nextDate);
    };

    return (
        <div>
            <p>Current Date: {currentDate.toDateString()}</p>
            <button onClick={handleGetNextDate}>Get Next Date</button>
        </div>
    );
};

export default NextDateComponent;
