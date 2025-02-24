import React from 'react';
import { useEffect } from 'react';

const Minicart = ({ data }) => {

    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString();
        console.log(formattedDate)
    }, [])
    return (
        <>
            {data.date && <div className='bg-red-300 h-full'>
                <div className='bg-green-600 flex gap-1 justify-between'>
                    <div>
                        <h1>Ayat</h1>
                        <p>{data?.quran?.ar}</p>
                        <p>{data?.quran?.bn}</p>
                    </div>
                    <div>
                        <h1>{data?.title}</h1>
                    </div>
                    <div>
                        <h1>Hadis</h1>
                        <p>{data?.hadis?.ar}</p>
                        <p>{data?.hadis?.bn}</p>
                    </div>
                </div>
                <div>
                    <h1>Duya</h1>
                    <p>{data?.doya?.ar}</p>
                    <p>{data?.doya?.bn}</p>
                </div>
                <div>
                    <h1>work</h1>
                    <p>{data?.work}</p>
                </div>
                <div className='bg-orange-500 flex justify-between'>
                    <div>
                        <h1>Slat Track</h1>
                        <p>1.Fazar</p>
                        <p>2.Dhuhr</p>
                        <p>3.Asr</p>
                        <p>4.Magrib</p>
                        <p>5.Isha</p>
                        <p>6.Tarabi</p>
                        <p>7.Salat at-Duha</p>
                        <p>8.Dukhulul Masjid</p>
                    </div>
                    <div>
                        <h1>Quran Track</h1>
                        <div>
                            <p>Ayat</p>
                            <p>Page</p>
                            <p>Para</p>
                        </div>
                        <div>
                            <h1>Name </h1>
                            <p>Tanvir</p>
                            <p>Tanvir</p>
                            <p>Tanvir</p>
                        </div>
                    </div>
                    <div>
                        <h1>Daily CheckList</h1>
                        <p>সকালের যিকির</p>
                        <p>সন্ধার যিকির</p>
                        <p>দান-সাদাকা</p>
                        <p>জামায়াতে সালাত আদায়</p>
                        <p>কমপক্ষে ৭০ বার ইস্তেগফার</p>
                        <p>কুরআন তিলাওয়াত</p>
                        <p>আল্লাহর নাম মুখস্ত</p>
                        <p>দিনের দু'আ মুখস্ত</p>
                        <p>দিনের আয়াত</p>
                        <p>দিনের হাদিস</p>
                        <p>নতুন কিছু শেখা</p>
                        <p>ঘুমের পূর্বের যিকির</p>

                    </div>
                </div>
            </div>}
        </>
    );
};

export default Minicart;