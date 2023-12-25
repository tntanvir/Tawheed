import { Spinner } from "@material-tailwind/react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const HadisAllbook = () => {
    const { name } = useParams()
    const [metadata, Setmetadata] = useState();
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${name}.json`)
            .then(res => res.json())
            .then(ok => Setmetadata(ok.metadata.sections));
    }, [name])
    const [section, Setsection] = useState();
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${name}.json`)
            .then(res => res.json())
            .then(ok => Setsection(ok.metadata.section_details));
    }, [name])
    const [hname, setHname] = useState();
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${name}.json`)
            .then(res => res.json())
            .then(ok => setHname(ok.metadata.name));
    }, [name])



    // store
    const [last, setLast] = useState('');
    const updateNumber = (newNumber) => {
        setLast(newNumber)
        localStorage.setItem(`storedSNumber-${name}`, newNumber.toString());
    };
    useEffect(() => {
        let store = localStorage.getItem(`storedSNumber-${name}`);
        setLast(parseInt(store));
    }, [])

    return (
        <div className='min-h-screen '>

            {hname && <h1 className="text-5xl text-white text-center"> {hname}</h1>}
            <div className='flex flex-col p-2 md:p-10 flex-wrap gap-2 justify-around min-h-screen'>

                {
                    metadata ? Object.entries(metadata).map(([key, e]) =>
                    (
                        key != 0 &&
                        <Link onClick={() => updateNumber(key)} key={key} to={`section-hadis/${key}`}>

                            <div key={key} className={`md:flex text-white  p-3 gap-3 bg-grayr  hover:bg-grayh rounded-md justify-between items-center cursor-pointer  duration-200 `}>
                                <div className='flex items-center gap-2'>
                                    <div className={`flex justify-center items-center w-11 h-11 p-1 rounded-full border-2 ${last == key && " shadow-md shadow-white"}`} >
                                        <h1 className='text-2xl'>{key}</h1>
                                    </div>

                                    <div >
                                        <h1 className='md:text-2xl text-[19px]'>{e}</h1>

                                    </div>

                                </div>
                                <div className='text-end flex md:flex-col-reverse justify-between'>
                                    {
                                        last == key ? <h1 className='text-blueo font-poppins font-semibold'>Last Read</h1> : <h1></h1>
                                    }
                                    <h1>{section[key].hadithnumber_first} - {section[key].hadithnumber_last}</h1>
                                </div>
                            </div>
                        </Link>
                    )

                    )
                        :
                        <div className='text-9xl flex justify-center items-center h-screen'>
                            <Spinner className="h-36 w-36" color="blue" />
                        </div>
                }
            </div>
        </div>
    );
};

export default HadisAllbook;