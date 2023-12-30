import React from 'react'
import ree from '../../public/404.png';

export default function Notfound() {
    return (
        <div className='text-6xl text-white justify-center items-center flex h-screen '>
            <img loading='lazy' className='w-96' src={ree} alt="" />
        </div>
    )
}
