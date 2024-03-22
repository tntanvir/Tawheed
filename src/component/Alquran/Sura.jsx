
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCopy } from "react-icons/fa";
import { Spinner, Tab, TabsHeader } from '@material-tailwind/react';
import MusicPlayer from './MusicPlayer';
import AudioPlayer from './AudioPlayer';
import { IoCaretBackOutline } from "react-icons/io5";
import { FaAnglesUp } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import { Tabs } from '@material-tailwind/react';

const Sura = () => {
    const { id } = useParams()
    const [sura, Setsura] = useState();
    useEffect(() => {
        fetch(`https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`)
            .then(res => res.json())
            .then(ok => Setsura(ok.data))
            .catch(error => {
                throw (error);
            })

    }, [id])
    const [bangla, setBangla] = useState();
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/bn/${id}.json`)
            .then(res => res.json())
            .then(ok => setBangla(ok.verses))
            .catch(error => {
                throw (error);
            })
    }, [id])
    const [english, setEnlish] = useState();
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/en/${id}.json`)
            .then(res => res.json())
            .then(ok => setEnlish(ok.verses))
            .catch(error => {
                throw (error);
            })
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
    const formatNumber = (number) => {
        if (number < 10) {
            return `00${number}`;
        } else if (number < 100) {
            return `0${number}`;
        } else {
            return `${number}`;
        }
    };

    const [show, setShow] = useState(true);
    // _________________________________________________
    const [activeTab, setActiveTab] = useState("Arabi");

    // ________________________________________________________
    return (
        <div className='text-white  min-h-screen px-4'>
            {
                sura ?
                    <div className='relative'>
                        <div className='text-center'>
                            <h1 className='text-3xl'>{sura.englishName}</h1>
                            <h1 className='text-2xl'>{sura.name}</h1>
                            <h1>{sura.revelationType} - {sura.numberOfAyahs}</h1>
                        </div>
                        <div className='flex justify-between items-center'>
                            <Link to="/alquran">
                                <div className='flex items-center text-2xl cursor-pointer'>
                                    <IoCaretBackOutline />
                                </div>
                            </Link>
                            <div className='flex items-center gap-3'>

                                <Tabs value={activeTab}>
                                    <TabsHeader
                                        className="rounded-none bg-transparent p-0"
                                        indicatorProps={{
                                            className:
                                                "bg-transparent border-b-2 border-[#1d4ed8] shadow-none rounded-none",
                                        }}
                                    >

                                        <Tab
                                            key={"Bangla"}
                                            value={"Bangla"}
                                            onClick={() => setActiveTab("Bangla")}
                                            className={activeTab === "Bangla" ? "text-white" : "text-gray-500"}
                                        >
                                            {"Bangla"}
                                        </Tab>
                                        <Tab
                                            key={"Arabi"}
                                            value={"Arabi"}
                                            onClick={() => setActiveTab("Arabi")}
                                            className={activeTab === "Arabi" ? "text-white" : "text-gray-500"}
                                        >
                                            {"Arabi"}
                                        </Tab>
                                        <Tab
                                            key={"English"}
                                            value={"English"}
                                            onClick={() => setActiveTab("English")}
                                            className={activeTab === "English" ? "text-white" : "text-gray-500"}
                                        >
                                            {"English"}
                                        </Tab>

                                    </TabsHeader>

                                </Tabs>
                            </div>
                            <div className={`flex items-center text-2xl cursor-pointer `}>
                                {

                                    show ? <div></div> : <FaAnglesUp onClick={() => setShow(!show)} />
                                }
                            </div>
                        </div>
                        <div className=' flex flex-col gap-7 justify-center mt-3 items-center '>

                            <div className={`h-fit flex justify-center items-center bg-[#2e2e40] gap-5 p-0 rounded-md fixed bottom-1 w-[90vw] ${show ? "block" : "hidden"} transition duration-1000`}>

                                {

                                    activeTab == "Arabi" && <AudioPlayer audioUrl={`https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/${sura.number}.mp3`} num={1} id={id} />


                                }
                                {

                                    activeTab == "Bangla" && <AudioPlayer audioUrl={`https://www.truemuslims.net/Quran/Bangla/${formatNumber(sura.number)}.mp3`} num={1} id={id} />

                                }
                                {
                                    activeTab == "English" && <AudioPlayer audioUrl={`https://download.quran.islamway.net/quran3/641/${formatNumber(sura.number)}.mp3`} num={1} id={id} />



                                }
                                {/* {console.log(formatNumber(sura.number))} */}
                                <div className='cursor-pointer hover:text-[#1d4ed9] absolute right-2 top-1 text-2xl duration-500'>
                                    <IoMdCloseCircle onClick={() => setShow(!show)} />
                                </div>
                            </div>
                        </div>


                        {/* {console.log(show)} */}
                        <div className=' gap-7 flex flex-col md:p-4'>
                            {
                                activeTab == "Arabi" && sura.ayahs && sura.ayahs.map(({ text, numberInSurah, audio }) => (
                                    <div key={numberInSurah} className='bg-[#27272a] rounded-md py-5 md:px-2  min-h-[10rem]  md:flex justify-between cursor-pointer '>
                                        <div className='flex items-center md:flex-col w-16 xs:bg-red-900 pb-6 gap-5'>
                                            <div className='flex justify-center items-center w-11 h-11 p-1 rounded-full border-2'>
                                                {/* <h1 className='text-2xl'>{e.number}</h1> */}
                                                <h1>{numberInSurah}</h1>
                                            </div>
                                            <h1 className='hover:text-[#1d4ed8] text-2xl duration-300' onClick={() => copyToClipboard(text)}><FaCopy /></h1>
                                            <MusicPlayer songs={audio} />
                                        </div>
                                        <div className='p-3 md:w-11/12'>
                                            <h1 className='text-end text-4xl  duration-300'>{text}</h1>
                                        </div>
                                    </div>
                                ))


                            }
                            {
                                activeTab == "Bangla" && bangla && bangla.map(({ text, id, translation }) => (
                                    <div key={id} className='bg-[#27272a] rounded-md py-5 md:px-2  min-h-[10rem]  md:flex justify-between cursor-pointer '>
                                        <div className='flex items-center md:flex-col w-16 xs:bg-red-900 pb-6 gap-5'>
                                            <div className='flex justify-center items-center w-11 h-11 p-1 rounded-full border-2'>
                                                {/* <h1 className='text-2xl'>{e.number}</h1> */}
                                                <h1>{id}</h1>
                                            </div>
                                            <h1 className='hover:text-[#1d4ed8] text-2xl duration-300' onClick={() => copyToClipboard(text)}><FaCopy /></h1>
                                            {/* <MusicPlayer songs={audio} /> */}
                                        </div>
                                        <div className='p-3 md:w-11/12 flex flex-col gap-3'>
                                            <h1 className='text-end text-4xl  duration-300'>{text}</h1>
                                            <h1 className='text-start text-2xl  duration-300'>{translation}</h1>
                                        </div>
                                    </div>
                                    // console.log(e)
                                ))

                            }
                            {
                                activeTab == "English" && english && english.map(({ text, id, translation }) => (
                                    <div key={id} className='bg-[#27272a] rounded-md py-5 md:px-2  min-h-[10rem]  md:flex justify-between cursor-pointer '>
                                        <div className='flex items-center md:flex-col w-16 xs:bg-red-900 pb-6 gap-5'>
                                            <div className='flex justify-center items-center w-11 h-11 p-1 rounded-full border-2'>
                                                {/* <h1 className='text-2xl'>{e.number}</h1> */}
                                                <h1>{id}</h1>
                                            </div>
                                            <h1 className='hover:text-[#1d4ed8] text-2xl duration-300' onClick={() => copyToClipboard(text)}><FaCopy /></h1>
                                            {/* <MusicPlayer songs={audio} /> */}
                                        </div>
                                        <div className='p-3 md:w-11/12 flex flex-col gap-3'>
                                            <h1 className='text-end text-4xl  duration-300'>{text}</h1>
                                            <h1 className='text-start text-2xl  duration-300'>{translation}</h1>
                                        </div>
                                    </div>
                                    // console.log(e)
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