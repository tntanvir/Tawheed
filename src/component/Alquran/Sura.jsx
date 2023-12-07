import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCopy } from "react-icons/fa";
import { Spinner } from '@material-tailwind/react';


const Sura = () => {
    const { id } = useParams()
    const [sura, Setsura] = useState();
    useEffect(() => {
        fetch(`https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`)
            .then(res => res.json())
            .then(ok => Setsura(ok.data));
    }, [id])
    const [isCopied, setIsCopied] = useState(false);
    const copyToClipboard = (textToCopy) => {

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000)

            })

            .catch(err => console.error('Unable to copy to clipboard', err));
    };


    return (
        <div className='text-white  min-h-screen'>
            {
                sura ?
                    <div>


                        <div className='text-center'>
                            <h1 className='text-3xl'>{sura.englishName}</h1>
                            <h1 className='text-2xl'>{sura.name}</h1>
                            <h1>{sura.revelationType} - {sura.numberOfAyahs}</h1>
                        </div>
                        <div className=' gap-7 flex flex-col p-4'>
                            {
                                sura.ayahs && sura.ayahs.map(({ text, numberInSurah }) => (
                                    <div key={numberInSurah} className='bg-[#27272a] rounded-md py-5 px-2 min-h-[10rem]  md:flex justify-between cursor-pointer '>
                                        <div className='flex items-center md:flex-col w-16 xs:bg-red-900 pb-6 gap-5'>
                                            <h1>{numberInSurah}</h1>
                                            <h1 className='hover:text-[#1d4ed8] duration-150' onClick={() => copyToClipboard(text)}><FaCopy /></h1>
                                        </div>
                                        <div className='pr-5 md:w-11/12'>
                                            <h1 className='text-end text-4xl  duration-300'>{text}</h1>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                    :
                    <div className='text-9xl flex justify-center items-center h-screen'>
                        <Spinner className="h-36 w-36" color="blue" />
                    </div>
            }


        </div>
    );
};

export default Sura;