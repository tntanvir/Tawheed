import React, { useState } from 'react';
import Qaris from '../../qari.json';
import { Link } from 'react-router-dom';

const Qari = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter the Qaris based on the search query
    const filteredQaris = Qaris.filter(qari =>
        qari.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='flex justify-center items-center flex-col gap-5'>
            <div className='flex justify-center w-full'>
                <div className='dark:bg-[#fffefe3a] bg-[#bab5b549] rounded-tl-full rounded-bl-full flex justify-between items-center p-2 px-4 md:w-1/2 w-2/3 gap-6'>
                    <div className='flex gap-4 items-center text-2xl overflow-hidden'>
                        <input
                            type="text"
                            className='w-screen bg-transparent border-none focus:outline-none text-white'
                            placeholder="Search Qari"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
                        />
                    </div>
                </div>
                <button className='bg-[#1d4ed8] text-white px-3 rounded-tr-full rounded-br-full'>
                    Search
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white gap-3 justify-items-center items-center w-full'>
                {filteredQaris?.map(item => (
                    <Link key={item.id} to={`${item.id}`}>
                        <div className={`flex text-white w-[22rem] lg:w-96 p-3 gap-3 bg-grayr hover:bg-grayh rounded-md justify-start items-center cursor-pointer hover:scale-105 duration-200`}>
                            <div className='flex justify-center items-center w-11 h-11 p-1 rounded-full border-2'>
                                <h1>{item.id}</h1>
                            </div>
                            <h2>{item.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Qari;
