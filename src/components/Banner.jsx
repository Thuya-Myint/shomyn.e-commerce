import React from 'react'
import ssscribe from '../assets/images/ssscribble-3.svg'
import { bannerImages } from '../constants'

const Banner = () => {
    return (
        <div className=' w-screen h-screen bg-banner quicksand flex flex-col items-center justify-center' >

            <div className='text-[2rem] tracking-widest p-4 md:text-[3rem]'>
                E-Commerce
            </div>
            <div className="overflow-hidden   bottom-36 py-6 lg:w-2/4 md:w-2/3 w-4/5 rounded-full px-18 border-x-8"
                style={{
                    boxShadow: "inset 0px 0px 10px rgba(0,0,0,0.4)"
                }}

            >
                <div className=" bottom-36 flex gap-4 z-0 animate-scroll">
                    {[...bannerImages, ...bannerImages].map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt="Item Image"
                            className="w-28 h-18 bg-white z-0 object-cover rounded-lg shadow-md shadow-black/20 "

                        />
                    ))}
                </div>
            </div>

        </div >
    )
}

export default Banner