import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { bannerItems } from "../constants"; // Your array

export default function Banner() {
    const [outerIndex, setOuterIndex] = useState(0); // Which object (Flights, Hotels...)
    const [innerIndex, setInnerIndex] = useState(0); // Which image inside object
    const [isLoaded, setIsLoaded] = useState(false); // Wait until all images are loaded

    // Preload ALL images from all bannerItems
    useEffect(() => {
        const allImages = bannerItems.flatMap(item => item.img); // Flatten into single array
        let loadedCount = 0;

        allImages.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === allImages.length) {
                    setIsLoaded(true); // All images are ready
                }
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === allImages.length) {
                    setIsLoaded(true);
                }
            };
        });
    }, []);

    // Carousel logic
    useEffect(() => {
        if (!isLoaded) return; // Don't start until all loaded

        const interval = setInterval(() => {
            if (innerIndex < bannerItems[outerIndex].img.length - 1) {
                setInnerIndex(innerIndex + 1); // Move to next image in same object
            } else {
                setInnerIndex(0); // Reset images
                setOuterIndex((outerIndex + 1) % bannerItems.length); // Move to next object
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [outerIndex, innerIndex, isLoaded]);

    if (!isLoaded) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-white text-black">
                <p>Loading banners...</p>
            </div>
        );
    }

    const currentBanner = bannerItems[outerIndex];

    return (
        <div className="relative w-full h-screen  quicksand overflow-hidden bg-black text-white">
            {/* Inner image carousel */}
            <img
                src={currentBanner.img[innerIndex]}
                alt={currentBanner.textHeader}
                className="w-full h-full object-cover transition-all duration-700"
            />

            {/* Overlay text */}
            <div className="absolute inset-0 bg-black/40 flex flex-col gap-3 justify-center items-center text-center px-4">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2">
                    {currentBanner.textHeader}
                </h2>
                <p className="text-sm sm:text-base md:text-lg mb-1">{currentBanner.textBody}</p>
                <p className="text-xs sm:text-sm opacity-80 mb-4">{currentBanner.textSubBody}</p>
                <div className="flex flex-wrap gap-3 justify-center">
                    <Link
                        to={currentBanner.ctaPath}
                        className="bg-blue-500 hover:bg-blue-600 px-4 sm:px-5 py-2 rounded-full font-semibold text-sm sm:text-base"
                    >
                        {currentBanner.ctaButton1}
                    </Link>
                    <Link
                        to={currentBanner.ctaPath}
                        className="bg-white text-black hover:bg-gray-200 px-4 sm:px-5 py-2 rounded-full font-semibold text-sm sm:text-base"
                    >
                        {currentBanner.ctaButton2}
                    </Link>
                </div>
            </div>

            {/* Outer carousel indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {bannerItems.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${i === outerIndex ? "bg-white" : "bg-gray-400"}`}
                    />
                ))}
            </div>
        </div>
    );
}
