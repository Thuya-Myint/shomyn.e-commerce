import React, { useEffect, useState } from 'react'
import ddynamite from '../assets/images/dddynamite.svg'
import { navItems } from '../constants'
import { NavLink, useNavigate } from 'react-router-dom'
import { CiMenuFries } from "react-icons/ci";
import { SiOnlyoffice } from "react-icons/si";
import RippleButton from './RippleButton';
const Navbar = () => {
    const [hasScrolled100vh, setHasScrolled100vh] = useState(false)
    const [hasScrolled200vh, setHasScrolled200vh] = useState(false)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)


    const navigate = useNavigate()



    useEffect(() => {


        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);


        return () => window.removeEventListener("resize", handleResize);


    }, []);


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
        <nav className={`transition-all duration-700 quicksand w-full fixed z-[100] flex items-center justify-between



            ${hasScrolled100vh || location.pathname !== "/" ? 'md:px-6 px-2' : 'md:px-10 px-4'}
             ${hasScrolled200vh ? 'justify-between' : "justify-center"}
            `}
            style={{
                boxShadow: hasScrolled100vh
                    ?
                    "inset 0px -10px 15px -10px rgba(0,0,0,0.2)" : location.pathname !== "/" && "inset 0px -10px 15px -10px rgba(0,0,0,0.2)"
            }}
        >
            <div className={`flex items-center  transition-all duration-700  overflow-hidden    ${hasScrolled200vh ? 'md:w-0 w-full' : 'md:w-1/2 w-full'}`}>
                <img src={ddynamite} alt="" className={`transition-all duration-300 
                    ${hasScrolled100vh || location.pathname !== "/" ? 'w-[80px] h-[80px]' : 'w-[100px] h-[100px]'}`} />
                <h1 className={`transition-all duration-300 ${hasScrolled100vh ? 'text-md ' : 'text-xl'}`}>SHOMYN.Inc</h1>
            </div>
            <div className={`transition-all md:flex hidden
                 duration-300  gap-4 items-center overflow-hidden text-nowrap 
                 ${hasScrolled100vh ?
                    hasScrolled200vh ?
                        'w-fit m-auto  p-2 justify-center rounded-full'
                        :
                        'w-96 justify-end'
                    :
                    location.pathname !== "/"
                        ? 'w-96 justify-end' :
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
                                ${isActive ? hasScrolled200vh
                                    ? 'bg-black/10 rounded-full p-2 shadow-md shadow-black/20'
                                    : 'text-black' : 'text-black/20'}
                                ${hasScrolled100vh || location.pathname !== "/" ? 'opacity-100' : ' opacity-0'}
                            `}
                        >
                            {nav.title}
                        </NavLink>
                    ))
                }
            </div>

            {/* for mobile */}
            {
                screenWidth < 768 &&
                <CiMenuFries className='transition-all z-[9999] duration-300 text-[3rem] p-2 cursor-pointer rounded-xl active:opacity-50 active:bg-black/20 '
                    onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                />
            }
            {
                screenWidth < 768 && (
                    <div className={`absolute transition-all duration-700 top-0 right-0 h-screen overflow-hidden  ${isSideBarOpen ? 'w-[80%] p-4 ' : 'w-[0%]'}  bg-white z-[100] shadow-md shadow-black/20`}
                        style={{
                            boxShadow: "inset 0px 0px 15px rgba(0,0,0,0.2)"
                        }}
                    >
                        <h1 className={`transition-all text-2xl mt-4 flex items-baseline gap-2 ${isSideBarOpen ? 'opacity-100 duration-[2000ms] ' : 'opacity-0 duration-150'}`}>
                            <SiOnlyoffice className='text-gray-200' />Shomyn
                        </h1>

                        <div className='flex flex-col gap-2 mt-10'>
                            {navItems.map((nav, index) => (
                                <RippleButton
                                    key={nav.path}
                                    className={`transition-all text-nowrap ${isSideBarOpen ? 'opacity-100' : 'opacity-0'} ${location.pathname === nav.path ? 'border-l-4 border-black/50 pl-4 bg-black/30' : ''} text-left text-lg  w-full rounded-md hover:bg-black/10 p-2 transition-all`}
                                    onClick={() => {

                                        setTimeout(() => {
                                            setIsSideBarOpen(false);
                                            navigate(nav.path)
                                        }, 300);
                                    }}

                                    style={{
                                        transitionDuration: `${1000 * index}ms`
                                    }}
                                >
                                    {nav.title}

                                </RippleButton>
                            ))}
                        </div>
                    </div>
                )
            }
            {
                screenWidth < 768 && isSideBarOpen && (
                    <div className={`absolute h-screen w-full inset-0 bg-black/20`}
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsSideBarOpen(false)
                        }}
                    >

                    </div>
                )
            }



        </nav >
    )
}

export default Navbar