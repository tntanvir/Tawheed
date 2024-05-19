import { useEffect } from "react";
import { useState } from "react";
import CountdownTimer from "./CountdownTimer";
import DigitalClock from "./DigitalClock";
// import { MessageDialog } from "./MessageDialog";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Option,
    Checkbox,
    Input,
} from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import { Select } from "@material-tailwind/react";
import fack from '../fack.json'


const Hero = () => {
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





    const count = (data) => {
        const [hours, minutes] = data.split(':');
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = (hours % 12) || 12;
        return `${hours12}:${minutes} ${period}`

    }

    //popup---------------
    const [open, setOpen] = useState(false);
    const [location, setLocation] = useState('Dhaka');
    const [custom, setCustom] = useState('');
    const [location2, setLocation2] = useState('');

    const handleOpen = () => setOpen(!open);
    const selectvlue = (e) => {
        setLocation2(e)
    }
    const Update = () => {
        if (custom == "") {

            handleOpen();
            setLocation(location2);
            localStorage.setItem('sTime', location2);
        }
        else {
            handleOpen();
            setLocation(custom);
            localStorage.setItem('sTime', custom);
        }

    }



    useEffect(() => {
        const stored = localStorage.getItem('sTime');
        if (stored) {
            setLocation(stored);
        }
        fetch(`https://api.aladhan.com/v1/timingsByAddress/${localDate}?address=${location}`)
            .then(res => res.json())
            .then(data => setData(data.data.timings))
    }, [location]);
    useEffect(() => {
        const stored = localStorage.getItem('sTime');
        if (stored) {
            setLocation(stored);
        }
        fetch(`https://api.aladhan.com/v1/timingsByAddress/${localDate}?address=${location}`)

            .then(res => res.json())
            .then(data => setAllData(data.data))
    }, [location]);

    const [bool, setBool] = useState(false)


    return (
        <div className="min-h-screen md:px-5">
            <div className="bg-[#27272a] text-white mt-10 md:p-10 p-3 md:rounded-md ">

                <div className="flex flex-col md:flex-row justify-between ">
                    <h1 className="text-center md:text-2xl">Salat Times in {location.charAt(0).toUpperCase() + location.slice(1)}</h1>
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

                            <div className="bg-[#323232] hover:bg-[#27272a] hover:border-2 hover:border-[#1d4ed8] hover:duration-100 hover:shadow-lg hover:shadow-[#1d4ed8]   hover:bg[#7777] rounded-md text-center w-36 h-36 md:w-48 md:h-48   flex justify-center items-center flex-col md:p-3 cursor-pointer">
                                <h1 className="font-semibold text-2xl ">Fajr</h1>
                                <h1 className="text-2xl ">0{count(data.Fajr)}</h1>
                                <CountdownTimer time={count(data.Fajr)} id={1} />
                                {/* <CountdownTimer time="10:11 AM" /> */}
                            </div>
                            : <div></div>
                    }
                    {
                        data.Dhuhr ?

                            // console.log(data.Fajr)
                            <div className="bg-[#323232] hover:bg-[#27272a] hover:border-2 hover:border-[#1d4ed8] hover:duration-100 hover:shadow-lg hover:shadow-[#1d4ed8] shadow-sm rounded-md text-center w-36 h-36 md:w-48 md:h-48   flex justify-center items-center flex-col md:p-3 cursor-pointer">
                                <h1 className="font-semibold text-2xl">Dhuhr</h1>
                                <h1 className="text-2xl ">{count(data.Dhuhr)}</h1>
                                <CountdownTimer time={count(data.Dhuhr)} id={2} />

                            </div>
                            : <div></div>
                    }
                    {
                        data.Asr ?

                            // console.log(data.Asr)
                            <div className="bg-[#323232] hover:bg-[#27272a] hover:border-2 hover:border-[#1d4ed8] hover:duration-100 hover:shadow-lg hover:shadow-[#1d4ed8] shadow-sm   rounded-md text-center w-36 h-36 md:w-48 md:h-48   flex justify-center items-center flex-col md:p-3 cursor-pointer">
                                <h1 className="font-semibold text-2xl">Asr</h1>
                                <h1 className="text-2xl ">0{count(data.Asr)}</h1>
                                <CountdownTimer time={count(data.Asr)} id={3} />

                            </div>
                            : <div></div>
                    }
                    {
                        data.Maghrib ?

                            // console.log(data.Asr)
                            <div className="bg-[#323232] hover:bg-[#27272a] hover:border-2 hover:border-[#1d4ed8] hover:duration-100 hover:shadow-lg hover:shadow-[#1d4ed8] shadow-sm   rounded-md text-center w-36 h-36 md:w-48 md:h-48   flex justify-center items-center flex-col md:p-3 cursor-pointer">
                                <h1 className="font-semibold text-2xl">Maghrib</h1>
                                <h1 className="text-2xl "> 0{count(data.Maghrib)}</h1>
                                <CountdownTimer time={count(data.Maghrib)} id={4} />

                            </div>
                            : <div></div>
                    }
                    {
                        data.Isha ?

                            // console.log(data.Asr)
                            <div className="bg-[#323232] hover:bg-[#27272a] hover:border-2 hover:border-[#1d4ed8] hover:duration-100 hover:shadow-lg hover:shadow-[#1d4ed8] shadow-sm  hover:bg[#7777] rounded-md text-center w-36 h-36 md:w-48 md:h-48   flex justify-center items-center flex-col md:p-3 cursor-pointer">
                                <h1 className="font-semibold text-2xl">Isha</h1>
                                <h1 className="text-2xl ">0{count(data.Isha)}</h1>
                                <CountdownTimer time={count(data.Isha)} id={5} />

                            </div>
                            : <div></div>
                    }

                </div>
                <div>
                    <p>
                        {
                            alldata.meta ? <div className="flex justify-between ">

                                <div className="text-gray-500">
                                    <p>{alldata.meta.timezone}</p>
                                    <p className="font-bold">{alldata.meta.method.name}</p>
                                    <p>Fajr {alldata.meta.method.params.Fajr} degrees,Isha {alldata.meta.method.params.Isha} degrees</p>
                                </div>
                                <div className="flex items-end justify-end">

                                    <p className="text-sm  text-[#1d4ed8] hover:underline cursor-pointer" onClick={handleOpen}>Change location ?</p>
                                </div>

                            </div> : <div></div>
                        }
                        {/* <MessageDialog Open={open}></MessageDialog> */}
                        <>
                            {/* <Button onClick={handleOpen}>Message Dialog</Button> */}
                            <Dialog open={open} size="xs" handler={handleOpen} className="absolute top-0">
                                <div className="flex items-center justify-between">
                                    <DialogHeader className="flex flex-col items-start">
                                        {" "}
                                        <Typography className="mb-1" variant="h4">
                                            Select Location
                                        </Typography>
                                    </DialogHeader>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="mr-3 h-5 w-5 cursor-pointer"
                                        onClick={handleOpen}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <DialogBody>
                                    <Checkbox label="Custom location" defaultChecked={bool} onClick={() => setBool(!bool)} />
                                    {
                                        bool ? <div>
                                            <input type="text" placeholder="Enter Your Location" className="text-black border w-full px-2 py-2 rounded-md outline-none text-xl" value={custom} onChange={(e) => setCustom(e.target.value)} />
                                        </div>
                                            :

                                            <Select label="Select Location"
                                                onChange={selectvlue}
                                                required>
                                                {
                                                    fack.map((e) => <Option key={e.id} value={e.name}>{e.name}</Option>)
                                                }
                                            </Select>



                                    }
                                </DialogBody>
                                <DialogFooter className="space-x-2">
                                    <Button variant="text" color="gray" onClick={handleOpen}>
                                        cancel
                                    </Button>
                                    <Button className="bg-[#1d4ed8]" onClick={Update}>
                                        Update
                                    </Button>
                                </DialogFooter>
                            </Dialog>
                        </>
                    </p>
                </div>
            </div>
        </div>



    );
};

export default Hero;


















