// import { Button } from '@material-tailwind/react';
// import React from 'react';
// import { Link } from "react-router-dom";
// import { IoLogoGithub } from "react-icons/io5";
// import { TypeAnimation } from 'react-type-animation';
// const MainHome = () => {
//     return (
//         <div className='h-screen flex justify-center items-center flex-col max-w-2xl m-auto text-center text-white '>


//             <TypeAnimation
//                 sequence={[
//                     'TAWHEED',
//                     1000,
//                 ]}
//                 speed={15}

//                 className='text-7xl text-white font-bold text-center tracking-[0.2rem] md:tracking-[0.4rem]'
//                 repeat={1}
//                 cursor={false}
//             />

//             <p className='text-gray-400 text-3xl tracking-[0.2rem] md:tracking-[0.4rem]'>Digital home for all things Muslim</p>
//             <div className='mt-5'>

//                 <Link to="https://github.com/tntanvir/muslimpro" target='__blank'><Button className="bg-[#1d4ed8] flex justify-center items-center gap-2 hover:shadow-[#1d4ed8] duration-700" size="sm">
//                     <IoLogoGithub className='text-2xl' />
//                     github
//                 </Button></Link>


//             </div>
//         </div>
//     );
// };

// export default MainHome;


import { Button } from '@material-tailwind/react';
import React from 'react';
import { Link } from "react-router-dom";
import { IoLogoGithub } from "react-icons/io5";
import { TypeAnimation } from 'react-type-animation';
import { FaTelegramPlane } from 'react-icons/fa';

const MainHome = () => {
    return (
        <div className="relative h-screen flex flex-col justify-center items-center  mx-auto text-center text-white px-4">

            {/* Blurred Blue Background Effect */}
            <div className="absolute inset-0 flex items-end justify-end -z-50">
                <div className="blurred-bg animate-bounce-slow "></div>
            </div>
            {/* <div className="absolute inset-0 flex items-start justify-start -z-50">
                <div className="blurred-bg  "></div>
            </div> */}

            {/* Animated Title */}
            <TypeAnimation
                sequence={['TAWHEED', 1000]}
                speed={15}
                className="text-5xl sm:text-7xl font-bold tracking-[0.2rem] md:tracking-[0.4rem] "
                repeat={1}
                cursor={false}
            />

            {/* Subtitle */}
            <p className="text-gray-400 text-xl sm:text-3xl tracking-[0.2rem] md:tracking-[0.4rem] mt-2">
                Digital home for all things Muslim
            </p>

            {/* GitHub Button */}
            <div className="mt-5 flex gap-3 justify-center items-center">
                <Link to="https://github.com/tntanvir/muslimpro" target="__blank">
                    <Button className="bg-[#1d4ed8] flex items-center gap-2 px-4 py-2 rounded-lg transition duration-300 hover:shadow-lg hover:bg-[#1e40af]" size="sm">
                        <IoLogoGithub className="text-2xl" />
                        GitHub
                    </Button>
                </Link>
                <Link to="https://t.me/tawheed_by_tanvir_bot" target="__blank">
                    <Button className="bg-[#1d4ed8] flex items-center gap-2 px-4 py-2 rounded-lg transition duration-300 hover:shadow-lg hover:bg-[#1e40af]" size="sm">
                        <FaTelegramPlane className="text-2xl" />
                        Telegram
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default MainHome;
