import { useEffect } from 'react';
import { useState } from 'react'
import SurahSearchFiller from '../testcom/SurahSearchFiller';

const Alquran = () => {
    const [data, setData] = useState();
    useEffect(() => {
        fetch("https://api.alquran.cloud/v1/surah")
            .then(res => res.json())
            .then(ok => setData(ok.data))
            .catch(error => {
                throw (error);
            })
    }, [])
    return (
        <>
            {data && <SurahSearchFiller surahs={data} />}
        </>

    )
}

export default Alquran