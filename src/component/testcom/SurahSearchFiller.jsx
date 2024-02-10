import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SurahSearchFiller = ({ surahs }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        const results = surahs.filter((surah) =>
            surah.name.toLowerCase().includes(term) ||
            surah.englishName.toLowerCase().includes(term) ||
            surah.englishNameTranslation.toLowerCase().includes(term)
        );

        setSearchResults(results);
    };

    // store
    const [last, setLast] = useState('');
    // const [bool, setBool] = useState(false);
    const updateNumber = (newNumber) => {
        setLast(newNumber)
        localStorage.setItem('storedNumber', newNumber.toString());
    };
    useEffect(() => {
        let store = localStorage.getItem('storedNumber');
        setLast(parseInt(store));
    }, [])

    const renderSurahs = () => {
        if (searchTerm === '') {
            return surahs.map((e) => (

                <Link key={e.number} to={`${e.englishName}/${e.number}/${e.name}`}>
                    <div onClick={() => updateNumber(e.number)} className={`flex text-white w-[22rem] lg:w-96 p-3 gap-3 bg-grayr  hover:bg-grayh rounded-md justify-between items-center cursor-pointer hover:scale-105 duration-200 `}>
                        <div className='flex items-center justify-between gap-2'>
                            <div className='flex justify-center items-center w-11 h-11 p-1 rounded-full border-2'>
                                <h1 className='text-2xl'>{e.number}</h1>
                            </div>

                            <div >
                                <h1 className='text-2xl'>{e.englishName}</h1>

                                <p className='text-[15px]'>{e.englishNameTranslation}</p>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-2xl'>{e.name}</h1>
                            {
                                last == e.number ? <h1 className='text-blueo font-poppins font-semibold text-end'>Last Read</h1  > : <h1 className='text-end font-poppins'>{e.numberOfAyahs} Ayah</h1>
                            }
                        </div>
                    </div>
                </Link>

            ));
        }

        return searchResults.map((e) => (

            <Link key={e.number} to={`${e.englishName}/${e.number}/${e.name}`}>
                <div onClick={() => updateNumber(e.number)} className={`flex text-white w-[22rem] lg:w-96 p-3 gap-3 bg-grayr  hover:bg-grayh rounded-md justify-between items-center cursor-pointer hover:scale-105 duration-200 `}>
                    <div className='flex items-center justify-between gap-2'>
                        <div className='flex justify-center items-center w-11 h-11 p-1 rounded-full border-2'>
                            <h1 className='text-2xl'>{e.number}</h1>
                        </div>

                        <div >
                            <h1 className='text-2xl'>{e.englishName}</h1>

                            <p className='text-[15px]'>{e.englishNameTranslation}</p>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-2xl'>{e.name}</h1>
                        {
                            last == e.number ? <h1 className='text-blueo font-poppins font-semibold text-end'>Last Read</h1  > : <h1 className='text-end font-poppins'>{e.numberOfAyahs} Ayah</h1>
                        }
                    </div>
                </div>
            </Link>


        ));
    };

    return (
        <div className='min-h-screen flex flex-col items-center '>
            <input
                type="text"
                placeholder="Search Surahs"
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className='flex p-2 flex-wrap gap-2 justify-around min-h-screen'>
                {renderSurahs()}
            </div>
        </div>
    );
};

export default SurahSearchFiller;
