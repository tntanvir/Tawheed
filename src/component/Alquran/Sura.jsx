import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Sura = () => {
    const { id } = useParams()
    const [sura, Setsura] = useState();
    useEffect(() => {
        fetch(`https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`)
            .then(res => res.json())
            .then(ok => Setsura(ok.data));
    }, [])

    return (
        <div className='text-white  min-h-screen'>
            {
                sura && <div>
                    <div className='text-center'>
                        <h1 className='text-3xl'>{sura.englishName}</h1>
                        <h1 className='text-2xl'>{sura.name}</h1>
                        <h1>{sura.revelationType} - {sura.numberOfAyahs}</h1>
                    </div>
                    <div className=' gap-7 flex flex-col p-4'>
                        {
                            sura.ayahs && sura.ayahs.map(({ text, numberInSurah }) => (
                                <div key={numberInSurah} className='bg-[#27272a] py-5 px-2'>
                                    <h1 className='text-end text-2xl '>{text}</h1>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Sura;