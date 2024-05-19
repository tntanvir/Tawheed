import { useEffect } from 'react';
import h from '../../h.json';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button, Option, Select } from '@material-tailwind/react';

const MainHadis = () => {
    // store
    const [last, setLast] = useState('');
    const updateNumber = (newNumber) => {
        setLast(newNumber)
        localStorage.setItem('storedHNumber', newNumber.toString());
    };
    useEffect(() => {
        let store = localStorage.getItem('storedHNumber');
        setLast(parseInt(store));
    }, [])


    const [selectedValue, setSelectedValue] = useState('ara-abudawud');
    const [num, setNum] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div className='min-h-screen p-1'>

            {/* search */}
            <div className='flex justify-center'>

                <div className='flex gap-1 items-center justify-center border border-blueo rounded-md overflow-hidden  w-fit'>

                    <div className="md:w-72 w-1/2 z-10">
                        <select
                            onChange={handleChange}
                            value={selectedValue}
                            className='py-2 outline-none rounded-l-md w-full duration-500 text-white bg-transparent '>

                            {h.map((e) => (
                                <option value={e.name2} className='text-black ' key={e.id}>{e.name}</option>
                            ))}
                        </select>
                    </div>
                    <input
                        value={num}
                        onChange={(e) => setNum(e.target.value)}

                        type="text" name="" id="" className='bg-transparent outline-none w-1/2  text-white  py-1.5 ' placeholder='Enter Number' />
                    <Link to={`${selectedValue}/${num}`}>
                        <Button className='bg-blueo rounded-none'>Search</Button>
                    </Link>
                </div>
            </div>
            <div className='flex flex-col  items-center justify-center md:gap-4 gap-2 mt-10 md:mt-3 '>
                {
                    h.map((e) => (
                        <Link key={e.id} to={`${e.name2}`} >
                            <div onClick={() => updateNumber(e.id)} className={`flex text-white  w-[22rem]  md:w-[80vw] p-3 gap-3 bg-grayr  hover:bg-grayh rounded-md justify-between items-center cursor-pointer duration-200 `}>
                                <div className='flex items-center justify-between gap-2'>
                                    <div className='flex justify-center items-center w-11 h-11 p-1 rounded-full border-2'>
                                        <h1 className='text-2xl'>{e.id}</h1>
                                    </div>

                                    <div >
                                        <h1 className='text-2xl'>{e.name}</h1>

                                    </div>
                                </div>
                                <div>
                                    {
                                        last == e.id ? <h1 className='text-blueo font-poppins font-semibold'>Last Read</h1> : <h1></h1>
                                    }
                                </div>
                            </div>


                        </Link>
                    ))


                }

            </div>

        </div>
    );
};

export default MainHadis;