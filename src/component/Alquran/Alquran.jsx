import { Spinner } from '@material-tailwind/react';
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';

const Alquran = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://api.alquran.cloud/v1/surah")
            .then(res => res.json())
            .then(ok => setData(ok.data))
    }, [])

    // store
    const [last, setLast] = useState('');
    // const [bool, setBool] = useState(false);
    const updateNumber = (newNumber) => {
        setLast(newNumber)
        localStorage.setItem('storedNumber', newNumber.toString());
    };
    useEffect(() => {
        let store = localStorage.getItem('storedNumber');
        setLast(parseInt(store));
    }, [])

    return (
        <div className='min-h-screen'>

            <div className='flex p-2 flex-wrap gap-2 justify-around min-h-screen'>

                {
                    data ? data.map((e) => (
                        <Link key={e.number} to={`${e.englishName}/${e.number}/${e.name}`}>
                            <div onClick={() => updateNumber(e.number)} className={`flex text-white w-[22rem] lg:w-96 p-3 gap-3 bg-grayr  hover:bg-grayh rounded-md justify-between items-center cursor-pointer hover:scale-105 duration-200 `}>
                                <div className='flex items-center justify-between gap-2'>
                                    <div className='flex justify-center items-center w-11 h-11 p-1 rounded-full border-2'>
                                        <h1 className='text-2xl'>{e.number}</h1>
                                    </div>

                                    <div >
                                        <h1 className='text-2xl'>{e.englishName}</h1>
                                        <h1 className=''>{e.englishNameTranslation}</h1>
                                    </div>
                                </div>
                                <div>
                                    <h1 className='text-2xl'>{e.name}</h1>
                                    {
                                        last == e.number ? <h1 className='text-blueo font-poppins font-semibold'>Last Read</h1> : <h1></h1>
                                    }
                                </div>
                            </div>
                        </Link>
                    ))
                        :
                        <div className='text-9xl flex justify-center items-center h-screen'>
                            <Spinner className="h-36 w-36" color="blue" />
                        </div>

                }

            </div>

        </div>
    )
}

export default Alquran