import { Tab, Tabs, TabsHeader } from '@material-tailwind/react';
import { Spinner } from '@material-tailwind/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaCopy } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import lenguse from './lenguse.json';
import { RiArrowDropDownLine, RiExternalLinkLine } from "react-icons/ri";
import {
    Accordion,

    AccordionBody,
} from "@material-tailwind/react";
const HadisSection = () => {
    const { key, name } = useParams()
    const [section, Setsection] = useState("");
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${name}/sections/${key}.json`)
            .then(res => res.json())
            .then(ok => Setsection(ok));
    }, [])
    const [isCopied, setIsCopied] = useState(false);
    const copyToClipboard = (textToCopy) => {

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000)

            })

            .catch(err => console.error('Unable to copy to clipboard', err));
    };
    const [activeTab, setActiveTab] = useState("Arabic");
    const [sortlg, setSortlg] = useState("ara-");
    const lengusef = (full, sort) => {
        setActiveTab(full);
        setSortlg(sort);
        Setsection("");
    }
    const splits = (name) => {
        const [fast, sec] = name.split("-");
        return sec;
    }

    // const [selectLg, setSelectLg] = useState('ara-');
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${sortlg}${splits(name)}/sections/${key}.json`)
            .then(res => res.json())
            .then(ok => Setsection(ok));
    }, [sortlg])
    const [open, setOpen] = useState(0);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    // hadis_tag
    const tag = (data) => {
        const [fast, last] = data.split(' ');
        return last;
    }

    return (
        <div className='min-h-screen text-white '>
            {
                section ?
                    <div className='p-3 flex flex-col items-center'>
                        <div className='text-center '>
                            <h1 className='text-4xl'>{section.metadata.name}</h1>
                            <h1>{section.metadata.section[key]}</h1>
                            <h1>{section.metadata.section_detail[key].hadithnumber_first}-{section.metadata.section_detail[key].hadithnumber_last}</h1>

                        </div>
                        <div className='flex items-center gap-3 pb-4'>

                            <Tabs value={activeTab}>
                                <TabsHeader
                                    className="rounded-none bg-transparent p-0"
                                    indicatorProps={{
                                        className:
                                            "bg-transparent border-b-2 border-[#1d4ed8] shadow-none rounded-none",
                                    }}
                                >


                                    {lenguse && lenguse.map((e) => (
                                        <Tab
                                            key={e.language}
                                            value={e.language}
                                            onClick={() => lengusef(e.language, e.name)}
                                            className={activeTab === e.language ? "text-white" : "text-gray-500"}
                                        >
                                            {e.language}
                                        </Tab>
                                    ))
                                    }

                                </TabsHeader>

                            </Tabs>
                        </div>
                        <div className='gap-2 flex flex-col '>
                            {
                                section && section.hadiths.map(e => (
                                    <div key={e.hadithnumber} className='bg-[#27272a] rounded-md py-5 md:px-2  min-h-[10rem]  md:flex justify-between cursor-pointer duration-1000'>
                                        <div className='flex items-center md:flex-col w-16 xs:bg-red-900 pb-6 gap-4'>
                                            <div className='flex justify-center items-center w-11 h-11 p-1 rounded-full border-2'>

                                                <h1>{e.hadithnumber}</h1>
                                            </div>
                                            <h1 className='hover:text-[#1d4ed8] text-2xl duration-300' onClick={() => copyToClipboard(e.text)}><FaCopy /></h1>
                                            <h1 onClick={() => handleOpen(e.hadithnumber)} className='hover:text-[#1d4ed8] text-5xl duration-300' ><RiArrowDropDownLine /></h1>
                                            <Link to={`/hadis/${name}/${e.hadithnumber}`}>
                                                <h1 className='text-2xl font-bold'><RiExternalLinkLine /> </h1>
                                            </Link>
                                        </div>
                                        <div className='p-3 md:w-11/12'>
                                            <h1 className={`${sortlg === "ara-" ? "text-end" : "text-justify"} text-4xl  duration-300 `}>{e.text}</h1>


                                            <Accordion open={open === e.hadithnumber} >

                                                <AccordionBody className='text-white'>
                                                    {
                                                        e.grades && e.grades.map((m) => (
                                                            <div className='flex justify-between p-2 hover:bg-grayh rounded-md' key={e.name}>

                                                                <h1>{m.name}</h1>

                                                                <h1 className={`${m.grade == "Daif" ? "bg-Daif" : m.grade == "Hasan" ? "bg-Hasan" : m.grade == "Sahih" ? "bg-Sahih" : m.grade == "Shadh" ?
                                                                    "bg-Shadh" : m.grade == "Munkar" ? "bg-Munkar" : tag(m.grade) == "Daif" ? "bg-Daif" : tag(m.grade) == "Hasan" ? "bg-Hasan" : tag(m.grade) == "Sahih" ? "bg-Sahih" : tag(m.grade) == "Shadh" ?
                                                                        "bg-Shadh" : tag(m.grade) == "Munkar" ? "bg-Munkar" :
                                                                            m.grade == "Mawdu" ? "bg-Mawdu" :
                                                                                tag(m.grade) == "Mawdu" ? "bg-Mawdu" : tag(m.grade) == "Lighairihi" ? "bg-gray-700" :
                                                                                    "bg-transparent"
                                                                    } 
                                                                 px-2 rounded-full`
                                                                }>{m.grade}</h1>

                                                            </div>

                                                        )
                                                        )


                                                    }
                                                </AccordionBody>
                                            </Accordion>


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

export default HadisSection;