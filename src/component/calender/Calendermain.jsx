

import { ButtonGroup } from '@material-tailwind/react';
import { Select, Option } from "@material-tailwind/react";
import { Button } from '@material-tailwind/react';
const TABLE_HEAD = ["Date", "Fajar", "Sunrise", "Dhore", "Asr", "Megrib", "Isha"];
// import fack from '../../fack.json';
import year from '../../year.json';
import months from '../../months.json';
import { useState } from 'react';
import { Typography } from '@material-tailwind/react';

// -------------
import { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { useEffect } from 'react';

const Calendermain = () => {
    const [vlu, setVlu] = useState(2);
    const [bool, setBool] = useState(true);
    const [bool2, setBool2] = useState(false);

    const [yer, setYer] = useState(new Date().getFullYear());
    const [mont, setMont] = useState(new Date().getMonth() + 1);

    const month = () => {
        setVlu(2);

        // --------------------month

        if (bool == true) {
            setBool(true);
        } else {
            setBool(true);
        }

        // ------------yeaar
        if (bool2 == false) {
            setBool2(false);
        } else {
            setBool2(false);
        }


    }
    // const years = () => {
    //     setVlu(1);
    //     // --------------------month
    //     if (bool == true) {
    //         setBool(false);
    //     } else {
    //         setBool(false);
    //     }
    //     // ------------yeaar

    //     if (bool2 == false) {
    //         setBool2(true);
    //     } else {
    //         setBool2(true);
    //     }


    // }

    const selectYear = (e) => {
        setYer(e);
    }
    const selectMonth = (e) => {
        setMont(e);
    }
    const [area, setArea] = useState();
    useEffect(() => {
        setArea(localStorage.getItem('sTime') ? localStorage.getItem('sTime') : "Dhaka");
    }, [])

    const [clgdata, setClgdata] = useState(null);
    const ganarate = () => {
        setArea(localStorage.getItem('sTime') ? localStorage.getItem('sTime') : "Dhaka");
        if (vlu == 2) {
            // console.log(yer, mont);
            fetch(`https://api.aladhan.com/v1/calendarByAddress/${yer}/${mont}?address=${area}`)
                .then(res => res.json())
                .then(data => setClgdata(data.data))
                .catch(error => {
                    throw (error);
                })
            // console.log(clgdata);


        } else {
            console.log(yer);

        }
        // console.log(clgdata);
    }
    const count = (data) => {
        const [y, m] = data.split(' ');
        const [hours, minutes] = y.split(':');
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = (hours % 12) || 12;
        return `${hours12}:${minutes} ${period}`

    }
    const contentRef = useRef(null);

    const downloadPdf = () => {
        const content = contentRef.current;

        if (content) {
            // Use html2pdf to generate PDF from the HTML content
            html2pdf(content);
        }
    };
    const [show, setShow] = useState(false);

    return (
        <div className=" min-h-screen md:px-5 ">
            <div className="h-fit bg-[#27272a] text-white  mt-10 md:p-10 p-3 md:rounded-md">

                <h1 className='text-2xl font-semibold'>Salat Timetable</h1>
                <div className="flex flex-col justify-center mt-4 items-center">

                    <div>
                        {/* <ButtonGroup variant="outlined" className='border-white border'>
                            <Button onClick={month} className='text-white'>Monthly</Button>
                            <Button onClick={years} disabled className='text-white'>Yearly</Button>
                        </ButtonGroup> */}
                        <ButtonGroup color="blue">
                            <Button onClick={month} className='text-white'>Monthly</Button>
                            {/* <Button onClick={years} className='text-white'>Yearly</Button> */}
                        </ButtonGroup>
                    </div>
                    <div className='flex flex-col justify-cente gap-2'>
                        {
                            bool && <div className='flex flex-col md:flex-row justify-center items-center mt-4 gap-4 '>
                                <Select label="Select Year" onChange={selectYear} required color="blue">
                                    {
                                        year.map((e) => <Option value={e.id} key={e.id}>{e.id} </Option>)
                                    }

                                </Select>
                                <Select label="Select Month" onChange={selectMonth} required color="blue">
                                    {
                                        months.map((e) => <Option value={e.id} key={e.name}>{e.name} </Option>)
                                    }

                                </Select>

                            </div>
                        }
                        {
                            bool2 && <div className='flex justify-center items-center mt-4 gap-4'>
                                <Select label="Select Year" onChange={selectYear} required>
                                    {
                                        year.map((e) => <Option value={e.id} key={e.id}>{e.id} </Option>)
                                    }

                                </Select>

                            </div>
                        }
                        <div className='flex items-center justify-center mt-5 gap-3'>
                            <Button variant='gradient' onClick={ganarate}>Ganarate</Button>
                            {clgdata && <Button variant='gradient' onClick={downloadPdf}>download</Button>}
                        </div>
                        <div className='flex justify-center items-center mb-3'>

                            {clgdata && <Button color='green' size='sm' className='w-fit text-white' onClick={() => setShow(!show)}>{show ? "hidden" : "show"}</Button>}
                        </div>
                    </div>

                </div>
                <div className={`pt-3 bg-white rounded-md  overflow-scroll md:overflow-hidden  ${show ? "block" : "hidden"}`} >
                    {
                        clgdata && <div ref={contentRef} className='bg-white text-black  p-1 pt-12'>
                            <h1 className='text-center text-2xl'>Salat Timetable</h1>
                            <h1 className='text-center text-4xl'>{area}</h1>
                            <h1 className='text-center text-2xl'>{yer}/{mont}</h1>
                            <table className="w-full min-w-max table-auto text-left border border-gray-500 mt-4">
                                {/* {console.log(e.date.readable)} */}

                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal leading-none opacity-70"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        clgdata.map((e) => (
                                            <tr key={e.date.readable} className="even:bg-blue-gray-50/50">
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {e.date.readable}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {
                                                            count(e.timings.Fajr)
                                                        }
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {
                                                            count(e.timings.Sunrise)
                                                        }
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {count(e.timings.Dhuhr)}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {count(e.timings.Asr)}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {count(e.timings.Maghrib)}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {count(e.timings.Isha)}
                                                    </Typography>
                                                </td>
                                                {/* <td className="p-4">
                                                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                                
                                                </Typography>
                                            </td> */}
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    }

                </div>

            </div>
        </div >
    );
};

export default Calendermain;