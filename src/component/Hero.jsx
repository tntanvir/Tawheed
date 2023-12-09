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
    const [location2, setLocation2] = useState('');

    const handleOpen = () => setOpen(!open);
    const selectvlue = (e) => {
        setLocation2(e)
    }
    const Update = () => {
        handleOpen();
        setLocation(location2);
        localStorage.setItem('sTime', location2);

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


    return (
        <div className="min-h-screen md:px-5">
            <div className="bg-[#27272a] text-white mt-10 md:p-10 p-3 md:rounded-md ">

                <div className="flex flex-col md:flex-row justify-between ">
                    <h1 className="text-center md:text-2xl">Salat Times in {location}</h1>
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

                                    <p className="text-sm  text-[#1d4ed8] hover:underline cursor-pointer" onClick={handleOpen}>wrong location?</p>
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

                                    <Select label="Select Location"
                                        onChange={selectvlue}
                                        required>
                                        {
                                            fack.map((e) => <Option key={e.id} value={e.name}>{e.name}</Option>)
                                        }
                                    </Select>
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


        // </div>
    );
};

export default Hero;




















// import Link from "next/link";

// const Hero = () => {
//     return (
//         <>
//             <section
//                 id="home"
//                 className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
//             >
//                 <div className="container">
//                     <div className="-mx-4 flex flex-wrap">
//                         <div className="w-full px-4">
//                             <div
//                                 className="wow fadeInUp mx-auto max-w-[800px] text-center"
//                                 data-wow-delay=".2s"
//                             >
//                                 <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
//                                     Free and Open-Source Next.js Template for Startup & SaaS
//                                 </h1>
//                                 <p className="dark:text-body-color-dark mb-12 text-base !leading-relaxed text-body-color sm:text-lg md:text-xl">
//                                     Startup is free Next.js template for startups and SaaS
//                                     business websites comes with all the essential pages,
//                                     components, and sections you need to launch a complete
//                                     business website, built-with Next 13.x and Tailwind CSS.
//                                 </p>
//                                 <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
//                                     <Link
//                                         href="https://nextjstemplates.com/templates/saas-starter-startup"
//                                         className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
//                                     >
//                                         🔥 Get Pro
//                                     </Link>
//                                     <Link
//                                         href="https://github.com/NextJSTemplates/startup-nextjs"
//                                         className="inline-block rounded-sm bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
//                                     >
//                                         Star on GitHub
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
//                     <svg
//                         width="450"
//                         height="556"
//                         viewBox="0 0 450 556"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <circle
//                             cx="277"
//                             cy="63"
//                             r="225"
//                             fill="url(#paint0_linear_25:217)"
//                         />
//                         <circle
//                             cx="17.9997"
//                             cy="182"
//                             r="18"
//                             fill="url(#paint1_radial_25:217)"
//                         />
//                         <circle
//                             cx="76.9997"
//                             cy="288"
//                             r="34"
//                             fill="url(#paint2_radial_25:217)"
//                         />
//                         <circle
//                             cx="325.486"
//                             cy="302.87"
//                             r="180"
//                             transform="rotate(-37.6852 325.486 302.87)"
//                             fill="url(#paint3_linear_25:217)"
//                         />
//                         <circle
//                             opacity="0.8"
//                             cx="184.521"
//                             cy="315.521"
//                             r="132.862"
//                             transform="rotate(114.874 184.521 315.521)"
//                             stroke="url(#paint4_linear_25:217)"
//                         />
//                         <circle
//                             opacity="0.8"
//                             cx="356"
//                             cy="290"
//                             r="179.5"
//                             transform="rotate(-30 356 290)"
//                             stroke="url(#paint5_linear_25:217)"
//                         />
//                         <circle
//                             opacity="0.8"
//                             cx="191.659"
//                             cy="302.659"
//                             r="133.362"
//                             transform="rotate(133.319 191.659 302.659)"
//                             fill="url(#paint6_linear_25:217)"
//                         />
//                         <defs>
//                             <linearGradient
//                                 id="paint0_linear_25:217"
//                                 x1="-54.5003"
//                                 y1="-178"
//                                 x2="222"
//                                 y2="288"
//                                 gradientUnits="userSpaceOnUse"
//                             >
//                                 <stop stopColor="#4A6CF7" />
//                                 <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
//                             </linearGradient>
//                             <radialGradient
//                                 id="paint1_radial_25:217"
//                                 cx="0"
//                                 cy="0"
//                                 r="1"
//                                 gradientUnits="userSpaceOnUse"
//                                 gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
//                             >
//                                 <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
//                                 <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
//                             </radialGradient>
//                             <radialGradient
//                                 id="paint2_radial_25:217"
//                                 cx="0"
//                                 cy="0"
//                                 r="1"
//                                 gradientUnits="userSpaceOnUse"
//                                 gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
//                             >
//                                 <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
//                                 <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
//                             </radialGradient>
//                             <linearGradient
//                                 id="paint3_linear_25:217"
//                                 x1="226.775"
//                                 y1="-66.1548"
//                                 x2="292.157"
//                                 y2="351.421"
//                                 gradientUnits="userSpaceOnUse"
//                             >
//                                 <stop stopColor="#4A6CF7" />
//                                 <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
//                             </linearGradient>
//                             <linearGradient
//                                 id="paint4_linear_25:217"
//                                 x1="184.521"
//                                 y1="182.159"
//                                 x2="184.521"
//                                 y2="448.882"
//                                 gradientUnits="userSpaceOnUse"
//                             >
//                                 <stop stopColor="#4A6CF7" />
//                                 <stop offset="1" stopColor="white" stopOpacity="0" />
//                             </linearGradient>
//                             <linearGradient
//                                 id="paint5_linear_25:217"
//                                 x1="356"
//                                 y1="110"
//                                 x2="356"
//                                 y2="470"
//                                 gradientUnits="userSpaceOnUse"
//                             >
//                                 <stop stopColor="#4A6CF7" />
//                                 <stop offset="1" stopColor="white" stopOpacity="0" />
//                             </linearGradient>
//                             <linearGradient
//                                 id="paint6_linear_25:217"
//                                 x1="118.524"
//                                 y1="29.2497"
//                                 x2="166.965"
//                                 y2="338.63"
//                                 gradientUnits="userSpaceOnUse"
//                             >
//                                 <stop stopColor="#4A6CF7" />
//                                 <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
//                             </linearGradient>
//                         </defs>
//                     </svg>
//                 </div>
//                 <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
//                     <svg
//                         width="364"
//                         height="201"
//                         viewBox="0 0 364 201"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
//                             stroke="url(#paint0_linear_25:218)"
//                         />
//                         <path
//                             d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
//                             stroke="url(#paint1_linear_25:218)"
//                         />
//                         <path
//                             d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
//                             stroke="url(#paint2_linear_25:218)"
//                         />
//                         <path
//                             d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
//                             stroke="url(#paint3_linear_25:218)"
//                         />
//                         <circle
//                             opacity="0.8"
//                             cx="214.505"
//                             cy="60.5054"
//                             r="49.7205"
//                             transform="rotate(-13.421 214.505 60.5054)"
//                             stroke="url(#paint4_linear_25:218)"
//                         />
//                         <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
//                         <defs>
//                             <linearGradient
//                                 id="paint0_linear_25:218"
//                                 x1="184.389"
//                                 y1="69.2405"
//                                 x2="184.389"
//                                 y2="212.24"
//                                 gradientUnits="userSpaceOnUse"
//                             >
//                                 <stop stopColor="#4A6CF7" stopOpacity="0" />
//                                 <stop offset="1" stopColor="#4A6CF7" />
//                             </linearGradient>
//                             <linearGradient
//                                 id="paint1_linear_25:218"
//                                 x1="156.389"
//                                 y1="69.2405"
//                                 x2="156.389"
//                                 y2="212.24"
//                                 gradientUnits="userSpaceOnUse"
//                             >
//                                 <stop stopColor="#4A6CF7" stopOpacity="0" />
//                                 <stop offset="1" stopColor="#4A6CF7" />
//                             </linearGradient>
//                             <linearGradient
//                                 id="paint2_linear_25:218"
//                                 x1="125.389"
//                                 y1="69.2405"
//                                 x2="125.389"
//                                 y2="212.24"
//                                 gradientUnits="userSpaceOnUse"
//                             >
//                                 <stop stopColor="#4A6CF7" stopOpacity="0" />
//                                 <stop offset="1" stopColor="#4A6CF7" />
//                             </linearGradient>
//                             <linearGradient
//                                 id="paint3_linear_25:218"
//                                 x1="93.8507"
//                                 y1="67.2674"
//                                 x2="89.9278"
//                                 y2="210.214"
//                                 gradientUnits="userSpaceOnUse"
//                             >
//                                 <stop stopColor="#4A6CF7" stopOpacity="0" />
//                                 <stop offset="1" stopColor="#4A6CF7" />
//                             </linearGradient>
//                             <linearGradient
//                                 id="paint4_linear_25:218"
//                                 x1="214.505"
//                                 y1="10.2849"
//                                 x2="212.684"
//                                 y2="99.5816"
//                                 gradientUnits="userSpaceOnUse"
//                             >
//                                 <stop stopColor="#4A6CF7" />
//                                 <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
//                             </linearGradient>
//                             <radialGradient
//                                 id="paint5_radial_25:218"
//                                 cx="0"
//                                 cy="0"
//                                 r="1"
//                                 gradientUnits="userSpaceOnUse"
//                                 gradientTransform="translate(220 63) rotate(90) scale(43)"
//                             >
//                                 <stop offset="0.145833" stopColor="white" stopOpacity="0" />
//                                 <stop offset="1" stopColor="white" stopOpacity="0.08" />
//                             </radialGradient>
//                         </defs>
//                     </svg>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default Hero;
