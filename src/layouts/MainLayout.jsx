import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
const MainLayout = () => {
    return (
        <div className="">

            <header className="relative z-10">
                <Navbar />
            </header>
            <main className="relative  ">
                <Outlet />
            </main>

        </div>
    )
}

export default MainLayout