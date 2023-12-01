import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const formatWithLeadingZero = (value) => {
        return value < 10 ? `0${value}` : value;
    };

    const get12HourFormat = (hours) => {
        return formatWithLeadingZero(hours % 12 || 12);
    };

    const hours = get12HourFormat(currentTime.getHours());
    const minutes = formatWithLeadingZero(currentTime.getMinutes());
    const seconds = formatWithLeadingZero(currentTime.getSeconds());
    const period = currentTime.getHours() >= 12 ? 'PM' : 'AM';

    return (
        <div className='text-center'>
            <h1>Digital Clock</h1>
            <p className='text-2xl'>{`${hours}:${minutes}:${seconds} ${period}`}</p>
        </div>
    );
};

export default DigitalClock;
