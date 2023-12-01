import { useEffect } from "react";
import { useState } from "react";
import CountdownTimer from "./CountdownTimer";
import DigitalClock from "./DigitalClock";


const Hero = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [data, setData] = useState([]);
    const [alldata, setAllData] = useState([]);
    // ________________________________
    const [localDate, setLocalDate] = useState(getFormattedDate());

    function getFormattedDate() {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = currentDate.getFullYear();
        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setLocalDate(getFormattedDate());
        }, 1000 * 60); // Update every minute (adjust as needed)

        return () => clearInterval(intervalId);
    }, []);
    // --------------------------------------

    useEffect(() => {

        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);


        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        fetch(`https://api.aladhan.com/v1/timingsByAddress/${localDate}?address=Rangpur`)
            .then(res => res.json())
            .then(data => setData(data.data.timings))
    }, []);
    useEffect(() => {
        fetch(`https://api.aladhan.com/v1/timingsByAddress/${localDate}?address=Rangpur`)

            .then(res => res.json())
            .then(data => setAllData(data.data))
    }, []);


    const hours = currentTime.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = currentTime.getMinutes();
    const ampm = currentTime.getHours() >= 12 ? 'PM' : 'AM';
    const sec = currentTime.getSeconds();

    const count = (data) => {
        // console.log(data);
        const [hours, minutes] = data.split(':');
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = (hours % 12) || 12;
        // console.log(hours12, period, data);
        return `${hours12}:${minutes} ${period}`

    }




    // console.log(alldata);


    return (
        <div className="h-screen md:mx-10">
            <div className="h-fit bg-white mt-10 md:p-10 p-3 md:rounded-md">
                <div className="flex flex-col md:flex-row justify-between ">
                    <h1 className="text-center md:text-2xl">Prayer Times in Dhaka</h1>
                    {/* <p>{`${hours}:${minutes}:${sec}${ampm}`}</p> */}
                    <DigitalClock />

                    <div className="">
                        <h1 className="md:text-end text-center">
                            {
                                alldata.date ?
                                    <h1 className="text-2xl">{alldata.date.readable}</h1>
                                    :
                                    <div></div>
                            }
                        </h1>
                        <h1>
                            {
                                alldata.date ?
                                    <div className="flex gap-2 items-center justify-center font-semibold">
                                        <h1>{alldata.date.hijri.day}</h1>
                                        <h1>{alldata.date.hijri.month.en}</h1>
                                        <h1>{alldata.date.hijri.year}</h1>
                                    </div>
                                    :
                                    <div></div>
                            }
                        </h1>
                    </div>

                </div>
                <div className="flex items-center justify-center my-5  gap-3 flex-wrap">
                    {
                        data.Fajr ?

                            <div className="bg-gray-100 rounded-md text-center w-36 h-36 md:w-48 md:h-48   flex justify-center items-center flex-col md:p-3 cursor-pointer">
                                <h1 className="font-semibold text-2xl ">Fajr</h1>
                                <h1 className="text-2xl ">0{count(data.Fajr)}</h1>
                                <CountdownTimer time={count(data.Fajr)} />
                                {/* <CountdownTimer time="10:11 AM" /> */}
                            </div>
                            : <div></div>
                    }
                    {
                        data.Dhuhr ?

                            // console.log(data.Fajr)
                            <div className="bg-gray-100 rounded-md text-center w-36 h-36 md:w-48 md:h-48   flex justify-center items-center flex-col md:p-3 cursor-pointer">
                                <h1 className="font-semibold text-2xl">Dhuhr</h1>
                                <h1 className="text-2xl ">{count(data.Dhuhr)}</h1>
                                <CountdownTimer time={count(data.Dhuhr)} />

                            </div>
                            : <div></div>
                    }
                    {
                        data.Asr ?

                            // console.log(data.Asr)
                            <div className="bg-gray-100 rounded-md text-center w-36 h-36 md:w-48 md:h-48   flex justify-center items-center flex-col md:p-3 cursor-pointer">
                                <h1 className="font-semibold text-2xl">Asr</h1>
                                <h1 className="text-2xl ">0{count(data.Asr)}</h1>
                                <CountdownTimer time={count(data.Asr)} />

                            </div>
                            : <div></div>
                    }
                    {
                        data.Maghrib ?

                            // console.log(data.Asr)
                            <div className="bg-gray-100 rounded-md text-center w-36 h-36 md:w-48 md:h-48   flex justify-center items-center flex-col md:p-3 cursor-pointer ">
                                <h1 className="font-semibold text-2xl">Maghrib</h1>
                                <h1 className="text-2xl "> 0{count(data.Maghrib)}</h1>
                                <CountdownTimer time={count(data.Maghrib)} />

                            </div>
                            : <div></div>
                    }
                    {
                        data.Isha ?

                            // console.log(data.Asr)
                            <div className="bg-gray-100 rounded-md text-center w-36 h-36 md:w-48 md:h-48   flex justify-center items-center flex-col md:p-3 cursor-pointer">
                                <h1 className="font-semibold text-2xl">Isha</h1>
                                <h1 className="text-2xl ">0{count(data.Isha)}</h1>
                                <CountdownTimer time={count(data.Isha)} />

                            </div>
                            : <div></div>
                    }

                </div>
                <div>
                    <p>
                        {
                            alldata.meta ? <div className="text-gray-500">
                                <p>{alldata.meta.timezone}</p>
                                <p className="font-bold">{alldata.meta.method.name}</p>
                                <p>Fajr {alldata.meta.method.params.Fajr} degrees,Isha {alldata.meta.method.params.Isha} degrees</p>
                            </div> : <div></div>
                        }
                    </p>
                </div>
            </div>
        </div>


        // </div>
    );
};

export default Hero;