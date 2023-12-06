import { Button } from '@material-tailwind/react';
import React from 'react';
import { Link } from "react-router-dom";
import { IoLogoGithub } from "react-icons/io5";
import { TypeAnimation } from 'react-type-animation';
const MainHome = () => {
    return (
        <div className='h-screen flex justify-center items-center flex-col max-w-2xl m-auto text-center text-white'>
            <TypeAnimation
                sequence={[
                    // Same substring at the start will only be typed once, initially
                    'Muslim Pro',
                    1000,

                ]}
                speed={25}
                // style={{ fontSize: '4rem', color: "white" }}
                className='text-6xl text-white font-bold text-center'
                repeat={1}
                cursor={false}
            />
            {/* <h1 className='text-6xl text-white font-bold text-center'>Muslim Pro</h1> */}
            <p className='text-gray-400 text-3xl tracking-[0.2rem] md:tracking-[0.4rem]'>Digital home for all things Muslim</p>
            <div className='mt-5'>
                {/* <Link hrefLang=www.google.com> */}

                {/* </Link> */}
                <Link to="https://github.com/tntanvir/muslimpro" target='__blank'><Button className="bg-[#1d4ed8] flex justify-center items-center gap-2 hover:shadow-[#1d4ed8] duration-700" size="sm">
                    <IoLogoGithub className='text-2xl' />
                    github
                </Button></Link>
                {/* shadow-[0px_6px_126px_0px_#1d4ed8] */}

            </div>
        </div>
    );
};

export default MainHome;     