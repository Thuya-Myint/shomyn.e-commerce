import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { bannerItems } from "../constants";

export default function Banner() {
    const [isLoaded, setIsLoaded] = useState(false); // Wait until all images are loaded
    const containerRef = useRef(null);
    const currentIndexRef = useRef(0); // Track current vertical section

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

    // Auto-scroll per screen height
    useEffect(() => {
        if (!isLoaded) return;
        const total = bannerItems.length;

        const interval = setInterval(() => {
            currentIndexRef.current = (currentIndexRef.current + 1) % total;
            containerRef.current.scrollTo({
                top: currentIndexRef.current * window.innerHeight,
                behavior: "smooth",
            });
        }, 5000); // change every 5s

        return () => clearInterval(interval);
    }, [isLoaded]);

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
            className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory"
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

                    {/* Optional section indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {bannerItems.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${idx === i ? "bg-white" : "bg-gray-400"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
