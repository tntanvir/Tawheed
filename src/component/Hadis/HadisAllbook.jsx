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
    return (
        <div className='min-h-screen'>

            <h1 className="text-2xl text-white items-center"> {name}</h1>
            <div className='flex p-2 flex-wrap gap-2 justify-around min-h-screen'>
                {/* {console.log(section[0])} */}
                {
                    metadata ? Object.entries(metadata).map(([key, e]) =>
                    (
                        key != 0 &&
                        <Link key={key} to={`section-hadis/${key}`}>
                            <div key={key} className={`flex text-white w-[22rem] lg:w-96 p-3 gap-3 bg-grayr  hover:bg-grayh rounded-md justify-between items-center cursor-pointer hover:scale-105 duration-200 `}>
                                <div className='flex items-center justify-between gap-2'>
                                    <div className='flex justify-center items-center w-11 h-11 p-1 rounded-full border-2'>
                                        <h1 className='text-2xl'>{key}</h1>
                                    </div>

                                    <div >
                                        <h1 className='text-2xl'>{e}</h1>

                                    </div>

                                </div>
                                <div>
                                    <h1 className=''>{section[key].hadithnumber_first} - {section[key].hadithnumber_last}</h1>
                                    {/* {
                                last == e.number ? <h1 className='text-blueo font-poppins font-semibold'>Last Read</h1> : <h1></h1>
                            } */}
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