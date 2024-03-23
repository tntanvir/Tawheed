import { useEffect } from 'react';
import { useState } from 'react'
import SurahSearchFiller from '../testcom/SurahSearchFiller';
import { Typography } from '@material-tailwind/react';

const Alquran = () => {
    const [data, setData] = useState();
    useEffect(() => {
        fetch("https://api.alquran.cloud/v1/surah")
            .then(res => res.json())
            .then(ok => setData(ok.data))
            .catch(error => {
                throw (error);
            })
    }, [])
    const myArray = Array.from({ length: 114 }, (_, index) => index + 1);
    return (
        <>
            {data ? <SurahSearchFiller surahs={data} />

                :
                <div className='flex justify-around items-center flex-wrap'>
                    {
                        myArray && myArray.map((e, i) => (
                            <div key={i} className="w-[22rem] lg:w-96  animate-pulse flex flex-col justify-center items-center">
                                <Typography
                                    as="div"
                                    variant="h1"
                                    className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                                >
                                </Typography>
                                <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                                >
                                </Typography>
                                <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                                >
                                </Typography>
                                <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                                >
                                </Typography>
                                <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                                >
                                </Typography>
                            </div>
                        ))
                    }
                </div>
            }
        </>

    )
}

export default Alquran