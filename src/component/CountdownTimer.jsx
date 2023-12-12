//time pass----------
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ time, id }) => {
  const [timeDifference, setTimeDifference] = useState(0);

  // Update time difference whenever time prop changes
  useEffect(() => {
    // Assuming time is in the format 'hh:mm AM/PM'
    const [inputTime, period] = time.split(' ');
    const [hours, minutes] = inputTime.split(':');
    const userTime = new Date();
    userTime.setHours(
      parseInt(hours, 10) + (period.toUpperCase() === 'PM' && hours !== '12' ? 12 : 0)
    );
    userTime.setMinutes(minutes);

    const localTime = new Date();
    // if (id == 5) {
    //   // console.log(id);
    //   if (userTime < localTime) {
    //     userTime.setDate(localTime.getDate() + 1);
    //   }
    // }
    const difference = userTime - localTime;

    // If the calculated difference is negative, set it to 0 to prevent displaying negative values
    setTimeDifference(difference >= 0 ? difference : 0);
  }, [time]);

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDifference(prevTimeDifference =>
        prevTimeDifference > 1000 ? prevTimeDifference - 1000 : 0
      );
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const formatTime = milliseconds => {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <p>
        {/* {id} */}

        {timeDifference === 0
          ? 'Time has passed'
          : <div className='flex justify-center items-center flex-col'>
            <h1 className='text-1xl mt-3'>

              Upcomeing Time
            </h1>
            <h2 className=' text-2xl'>

              {formatTime(timeDifference)}
            </h2>
          </div>
        }
      </p>
    </div>
  );
};

export default CountdownTimer;
