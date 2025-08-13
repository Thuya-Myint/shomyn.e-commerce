import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaPlane, FaHotel, FaBus, FaMapMarkedAlt } from "react-icons/fa"; // icons
import { bannerItems } from "../constants";

export default function Banner() {
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef(null);
    const [currentSection, setCurrentSection] = useState(0); // current active section

    // Preload all images
    useEffect(() => {
        const allImages = bannerItems.flatMap(item => item.img);
        let loadedCount = 0;

        allImages.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = img.onerror = () => {
                loadedCount++;
                if (loadedCount === allImages.length) setIsLoaded(true);
            };
        });
    }, []);

    // Track current section on scroll
    const handleScroll = (e) => {
        const index = Math.round(e.target.scrollTop / window.innerHeight);
        setCurrentSection(index);
    };

    const iconMap = {
        flight: <FaPlane className="w-6 h-6 text-white" />,
        hotel: <FaHotel className="w-6 h-6 text-white" />,
        bus: <FaBus className="w-6 h-6 text-white" />,
        tour: <FaMapMarkedAlt className="w-6 h-6 text-white" />,
    };

    if (!isLoaded) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-white text-black">
                <p>Loading banners...</p>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory scrollbar-hide"
            onScroll={handleScroll}
        >
            {bannerItems.map((item, i) => (
                <div
                    key={i}
                    className="h-screen snap-start relative flex items-center justify-center bg-black text-white"
                >
                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.img[0]})` }}
                    ></div>

                    {/* Overlay text */}
                    <div className="relative z-10 text-center px-4 flex flex-col gap-3 items-center justify-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-2">{item.textHeader}</h2>
                        <p className="text-base md:text-lg mb-1">{item.textBody}</p>
                        <p className="text-sm opacity-80 mb-4">{item.textSubBody}</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link
                                to={item.ctaPath}
                                className="bg-blue-500 hover:bg-blue-600 px-4 sm:px-5 py-2 rounded-full font-semibold text-sm sm:text-base"
                            >
                                {item.ctaButton1}
                            </Link>
                            <Link
                                to={item.ctaPath}
                                className="bg-white text-black hover:bg-gray-200 px-4 sm:px-5 py-2 rounded-full font-semibold text-sm sm:text-base"
                            >
                                {item.ctaButton2}
                            </Link>
                        </div>
                    </div>

                    {/* Section icon indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                        {iconMap[bannerItems[currentSection]?.type]}
                    </div>
                </div>
            ))}
        </div>
    );
}
