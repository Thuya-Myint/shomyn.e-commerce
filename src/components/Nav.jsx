import React, { useState } from 'react'
import { navItems } from '../constants'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import logo from '../assets/images/dddynamite.svg'
const Nav = () => {
    const [isSideBarOpen, setisSideBarOpen] = useState(false)
    const currentScreenWidth = window.innerWidth

    const toggleSideBar = () => setisSideBarOpen(!isSideBarOpen)
    return (
        currentScreenWidth > 768
            ?
            <nav className='w-screen flex  p-4 gap-8 bg-slate-200 justify-between items-center'>

                <img src={logo} alt="" className='w-20 ' />
                <div className='flex  gap-8'>
                    {
                        [...navItems, ...navItems].map((nav) => {
                            return <div>
                                {nav.title}
                            </div>
                        })
                    }
                </div>
            </nav>
            :
            <div className=' p-4 relative'>
                <HiOutlineMenuAlt3 className='absolute text-3xl cursor-pointer active:opacity-50 z-[100]'
                    onClick={toggleSideBar}
                />

                {/* sidebar content */}
                <nav className={`transition-all duration-700  absolute w-1/2 z-50 bg-slate-300 h-screen top-0 flex flex-col  py-12 px-8 
                ${isSideBarOpen ? 'left-0 ' : '-left-[100%]'
                    }`}>
                    {
                        navItems.map((nav, index) => (
                            <div className={`transition-all ${isSideBarOpen ? 'opacity-100' : 'opacity-0'}`}
                                style={{
                                    transitionDuration: `${1000 * index}ms`
                                }}

                            >
                                {nav.title}
                            </div>
                        ))
                    }
                </nav>
                <div className={`absolute w-screen h-screen z-20 bg-black/20 inset-0 ${isSideBarOpen ? 'block' : 'hidden'}`}>

                </div>
            </div>


    )
}

export default Nav