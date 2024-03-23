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

    const tag = (data) => {
        const [fast, last] = data.split(' ');
        return last;
    }

    return (
        <div className='text-white min-h-screen'>
            {
                arabi && bangla && english ?
                    <div>
                        <div className=' text-center text-white h-full'>
                            <h1 className='text-3xl '>{arabi?.metadata.name}</h1>
                            <h1 className='text-xl'> Number : {arabi?.hadiths[0].hadithnumber}</h1>
                            <div className=' flex justify-around flex-col md:flex-row p-4 gap-3'>

                                {
                                    arabi?.hadiths[0].grades?.map((m, i) => (
                                        <div key={i} className='flex md:flex-col flex-row justify-between gap-1 items-center'>
                                            <h1 className='hover:bg-gray-700/25 duration-100 px-1.5 cursor-pointer rounded-full'>

                                                {m.name}
                                            </h1>
                                            <h1 className={`${m.grade == "Daif" ? "bg-Daif" : m.grade == "Hasan" ? "bg-Hasan" : m.grade == "Sahih" ? "bg-Sahih" : m.grade == "Shadh" ?
                                                "bg-Shadh" : m.grade == "Munkar" ? "bg-Munkar" : tag(m.grade) == "Daif" ? "bg-Daif" : tag(m.grade) == "Hasan" ? "bg-Hasan" : tag(m.grade) == "Sahih" ? "bg-Sahih" : tag(m.grade) == "Shadh" ?
                                                    "bg-Shadh" : tag(m.grade) == "Munkar" ? "bg-Munkar" :
                                                        m.grade == "Mawdu" ? "bg-Mawdu" :
                                                            tag(m.grade) == "Mawdu" ? "bg-Mawdu" : tag(m.grade) == "Lighairihi" ? "bg-gray-700" :
                                                                "bg-transparent"
                                                } 
                                                                 px-2 rounded-full w-fit h-fit`
                                            }>{m.grade}</h1>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                        <div className='grid md:p-10 p-5 gap-5 md:grid-cols-2 grid-cols-1'>
                            {arabi?.hadiths[0].text && <h1 className='text-2xl'>{arabi?.hadiths[0].text}</h1>}
                            {bangla?.hadiths[0].text && <h1 className='text-2xl'>{bangla?.hadiths[0].text}</h1>}
                            {english?.hadiths[0].text && <h1 className='text-2xl'>{english?.hadiths[0].text}</h1>}
                        </div>
                    </div>
                    :
                    <div className='  flex flex-col items-center w-full p-2 gap-10'>
                        <div className=' h-10 w-full md:w-96  animate-pulse flex flex-col gap-1 '>
                            <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                            <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                            <h1 className='h-2 w-full rounded-full bg-blue-gray-300'></h1>
                        </div>

                        {/* <div className='grid md:grid-cols-2 grid-cols-1 gap-10 w-full  '> */}
                        <div className='flex flex-wrap justify-around   w-full  gap-10'>
                            <div className='md:h-[70vh] h-fit  md:w-[29rem] w-full animate-pulse flex flex-col gap-3'>
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
                            <div className='md:h-[70vh] h-fit md:w-[29rem] w-full animate-pulse flex flex-col gap-3'>
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
                            <div className='md:h-[70vh] h-fit md:w-[29rem] w-full animate-pulse flex flex-col gap-3'>
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



        </div >
    )
}

export default Singlehadis