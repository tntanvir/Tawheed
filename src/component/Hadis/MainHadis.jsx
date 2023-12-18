import { useEffect } from 'react';
import h from '../../h.json';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const MainHadis = () => {
    // store
    const [last, setLast] = useState('');
    // const [bool, setBool] = useState(false);
    const updateNumber = (newNumber) => {
        setLast(newNumber)
        localStorage.setItem('storedHNumber', newNumber.toString());
    };
    useEffect(() => {
        let store = localStorage.getItem('storedHNumber');
        setLast(parseInt(store));
    }, [])

    return (
        <div className='min-h-screen'>

            <div className='flex flex-wrap justify-center gap-4 mt-3'>

                {
                    h.map((e) => (
                        <Link key={e.id} to={`${e.id}/${e.name2}`} >
                            <div onClick={() => updateNumber(e.number)} className={`flex text-white w-[22rem] lg:w-96 p-3 gap-3 bg-grayr  hover:bg-grayh rounded-md justify-between items-center cursor-pointer hover:scale-105 duration-200 `}>
                                <div className='flex items-center justify-between gap-2'>
                                    <div className='flex justify-center items-center w-11 h-11 p-1 rounded-full border-2'>
                                        <h1 className='text-2xl'>{e.id}</h1>
                                    </div>

                                    <div >
                                        <h1 className='text-2xl'>{e.name}</h1>
                                        {/* <h1 className=''>{e.englishNameTranslation}</h1> */}
                                    </div>
                                </div>
                                <div>
                                    {/* <h1 className='text-2xl'>{e.name}</h1> */}
                                    {
                                        last == e.number ? <h1 className='text-blueo font-poppins font-semibold'>Last Read</h1> : <h1></h1>
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