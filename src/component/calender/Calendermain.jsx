import React from 'react';
import { ButtonGroup } from '@material-tailwind/react';
import { Select, Option } from "@material-tailwind/react";
import { Button } from '@material-tailwind/react';

// import fack from '../../fack.json';
import year from '../../year.json';
import months from '../../months.json';
import { useState } from 'react';

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
    const years = () => {
        setVlu(1);
        // --------------------month
        if (bool == true) {
            setBool(false);
        } else {
            setBool(false);
        }
        // ------------yeaar

        if (bool2 == false) {
            setBool2(true);
        } else {
            setBool2(true);
        }


    }

    const selectYear = (e) => {
        setYer(e);
    }
    const selectMonth = (e) => {
        setMont(e);
    }
    const ganarate = () => {
        if (vlu == 2) {
            // console.log(yer, mont);
            fetch(`https://api.aladhan.com/v1/calendarByAddress/${yer}/${mont}?address=${localStorage.getItem('sTime')}`)
                .then(res => res.json())
                .then(data => console.log(data.data))

        } else {
            console.log(yer);

        }
    }


    return (
        <div className="h-screen md:mx-10">
            <div className="h-fit bg-white mt-10 md:p-10 p-3 md:rounded-md">

                <h1 className='text-2xl font-semibold'>Salat Timetable</h1>
                <div className="flex flex-col justify-center mt-4 items-center">

                    <div>
                        <ButtonGroup variant="outlined">
                            <Button onClick={month}>Monthly</Button>
                            <Button onClick={years} disabled>Yearly</Button>
                        </ButtonGroup>
                    </div>
                    <div>
                        {
                            bool && <div className='flex justify-center items-center mt-4 gap-4'>
                                <Select label="Select Year" onChange={selectYear} required>
                                    {
                                        year.map((e) => <Option value={e.id} key={e.id}>{e.id} </Option>)
                                    }

                                </Select>
                                <Select label="Select Month" onChange={selectMonth} required>
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
                        <div className='flex items-center justify-center mt-5'>
                            <Button variant='gradient' onClick={ganarate}>Ganarate</Button>
                        </div>
                    </div>

                </div>

            </div>
        </div >
    );
};

export default Calendermain;