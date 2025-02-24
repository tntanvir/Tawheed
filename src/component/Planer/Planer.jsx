import React from 'react';
import data from '../../data.json';
import Minicart from './Minicart';
const Planer = () => {
    return (
        <div className='text-white min-h-screen'>
            <div className='flex flex-col gap-10'>

                {data && data.map((e, i) =>
                    (<Minicart key={i} data={e} />)
                )}
            </div>
        </div>
    );
};

export default Planer;              
