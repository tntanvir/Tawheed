import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Singlehadis = () => {
    const { name, id } = useParams();
    const [arabi, setArabi] = useState('');
    const [bangla, setBangla] = useState('');
    const [english, setEnglish] = useState('');

    const [names, amni] = name.split("-");

    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${amni}/${id}.json`)
            .then(res => res.json())
            .then(data => setArabi(data));
    }, [id, name])
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ben-${amni}/${id}.json`)
            .then(res => res.json())
            .then(data => setBangla(data));
    }, [id, name])
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-${amni}/${id}.json`)
            .then(res => res.json())
            .then(data => setEnglish(data));
    }, [id, name])



    return (
        <div className='text-white min-h-screen'>
            {
                arabi && bangla && english ?
                    <div>
                        <div className=' text-center text-white h-full'>
                            <h1 className='text-3xl '>{arabi?.metadata.name}</h1>
                            <h1 className='text-xl'> Number : {arabi?.hadiths[0].hadithnumber}</h1>
                            {/* {
                                console.log(Object.keys(arabi?.metadata?.section))

                            } */}
                        </div>
                        <div className='grid md:p-10 p-5 gap-5 md:grid-cols-2 grid-cols-1'>
                            {arabi?.hadiths[0].text && <h1 className='text-2xl'>{arabi?.hadiths[0].text}</h1>}
                            {bangla?.hadiths[0].text && <h1 className='text-2xl'>{bangla?.hadiths[0].text}</h1>}
                            {english?.hadiths[0].text && <h1 className='text-2xl'>{english?.hadiths[0].text}</h1>}
                        </div>
                    </div>
                    :
                    <div className='  flex flex-col items-center'>
                        <div className=' h-10 w-96 animate-pulse flex flex-col gap-1 '>
                            <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                            <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                            <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                        </div>

                        <div className='grid grid-cols-2  gap-10'>
                            <div className='h-[70vh] w-[29rem] animate-pulse flex flex-col gap-3'>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                            </div>
                            <div className='h-[70vh] w-[29rem] animate-pulse flex flex-col gap-3'>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                            </div>
                            <div className='h-[70vh] w-[29rem] animate-pulse flex flex-col gap-3'>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                                <h1 className='h-2 w-1/2 rounded-full bg-blue-gray-300'></h1>
                            </div>

                        </div>
                    </div>
            }



        </div>
    )
}

export default Singlehadis