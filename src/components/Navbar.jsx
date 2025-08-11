import React, { useEffect, useState } from 'react'
import shomynLogo from '../assets/images/logos/shomynLogo.png'
import { navItems } from '../constants'
import { NavLink } from 'react-router-dom'
import { CiMenuFries } from "react-icons/ci";
const Navbar = () => {
    const [hasScrolled100vh, setHasScrolled100vh] = useState(false)
    const [hasScrolled200vh, setHasScrolled200vh] = useState(false)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)


    useEffect(() => {
        const handleScroll = () => {
            const scrolledPosition = window.scrollY;
            const viewportHeight = window.innerHeight
            setHasScrolled100vh(scrolledPosition >= viewportHeight)
            setHasScrolled200vh(scrolledPosition >= viewportHeight * 2)
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav className={`transition-all duration-700 quicksand  w-full fixed z-[100]  flex items-center justify-between
            ${hasScrolled100vh ? 'md:px-6 px-2' : 'md:px-10 px-4'}
             ${hasScrolled200vh ? 'justify-between' : "justify-center"}
            `}
            style={{
                boxShadow: hasScrolled100vh && !hasScrolled200vh && "inset 0px -10px 15px -10px rgba(0,0,0,0.2)"
            }}
        >
            <div className={`flex items-center  transition-all duration-700  overflow-hidden  ${hasScrolled200vh ? 'md:w-0 w-full' : 'md:w-full w-full'}`}>
                <img src={shomynLogo} alt="" className={`transition-all  duration-300 
                    ${hasScrolled100vh ? 'w-[60px] h-[60px]' : 'w-[60px] h-[60px]'}`} />
                <h1 className={`transition-all duration-300 font-bold  ${hasScrolled100vh ? 'text-md ' : 'text-xl text-white'}`}>
                    <div>Shomyn</div>
                    <div className='text-sm text-end'>horizon</div>
                </h1>
            </div>
            <div className={`transition-all md:flex hidden
                 duration-500  gap-4  items-center overflow-hidden text-nowrap 
                 ${hasScrolled100vh ?
                    hasScrolled200vh ?
                        'w-fit m-auto  p-2 justify-center rounded-full'
                        :
                        'w-[40%] justify-end'
                    :
                    'w-0'
                } 
                 `}
                style={{
                    boxShadow: hasScrolled200vh && "inset 0px 0px 15px rgba(0,0,0,0.2)"
                }}>
                {
                    navItems.map((nav) => (
                        <NavLink
                            key={nav.path}
                            to={nav.path}
                            className={({ isActive }) => `
                            transition-all duration-1000 
                                ${isActive ? hasScrolled200vh ? 'bg-black/10 rounded-full p-2 shadow-md shadow-black/20' : 'text-black' : 'text-black/20'}
                                ${hasScrolled100vh ? 'opacity-100' : ' opacity-0'}
                            `}

                        >
                            {nav.title}
                        </NavLink>
                    ))
                }
            </div>

            {/* for mobile */}
            {
                window.innerWidth < 768 &&
                <CiMenuFries className='transition-all bg-white/50 blurr z-[9999] duration-300 text-5xl p-2 cursor-pointer rounded-xl active:opacity-50 active:bg-black/20 '
                    onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                />
            }
            {window.innerWidth < 768 && (
                <div className={`absolute transition-all duration-700 top-0 right-0 h-screen overflow-hidden  ${isSideBarOpen ? 'w-[80%] p-4 ' : 'w-[0%]'}  bg-white z-[100] shadow-md shadow-black/20`}>

                    <div className={`transition-all  mt-10 flex items-center text-lg  gap-2 ${isSideBarOpen ? 'opacity-100 duration-[2000ms] ' : 'opacity-0 duration-150'}`}>
                        <img src={shomynLogo} alt="" className='w-10' />
                        <h1>Shomyn Horizon</h1>
                    </div>
                    <div className='flex flex-col gap-2 mt-10'>
                        {
                            navItems.map((nav, index) =>
                                <div className='text-lg flex flex-col'>
                                    <NavLink
                                        to={nav.path}
                                        key={nav.path}
                                        className={({ isActive }) =>
                                            `transition-all  ${isActive ? ' border-l-4 p-2 border-black bg-black/20' : ''}
                                            ${isSideBarOpen ? 'opacity-100 ' : 'opacity-0 '}
                                            `

                                        }
                                        style={{
                                            transitionDuration: `${isSideBarOpen ? 1000 * index : 200 * index}ms`
                                        }}
                                    >
                                        {nav.title}
                                    </NavLink>
                                </div>


                            )
                        }
                    </div>

                </div>
            )
            }
            {
                window.innerWidth < 768 && isSideBarOpen && (
                    <div className={`absolute h-screen w-full inset-0 bg-black/20`}>

                    </div>
                )
            }



        </nav >
    )
}

export default Navbar