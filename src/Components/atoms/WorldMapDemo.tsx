"use client";
import { motion } from "motion/react";
import { WorldMap } from "../ui/world-map";

export function WorldMapDemo() {
    return (
        <div className=" py-20 bg-black  w-full">
            <div className="max-w-7xl mx-auto text-center">
                <p className="font-bold text-xl md:text-4xl text-white ">
                    Your Global {" "}
                    <span className="text-neutral-400">
                        {"Parking Solution Awaits".split("").map((word, idx) => (
                            <motion.span
                                key={idx}
                                className="inline-block"
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.04 }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </span>
                </p>
                <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
                    Unlock a global network of parking spaces designed to simplify your journey. From bustling city centers to remote destinations, we connect you to reliable spaces, making travel smarter, stress-free, and more efficient worldwide.
                </p>
            </div>
            <div className="mx-10">
                <WorldMap
                    dots={[
                        {
                            start: {
                                lat: 64.2008,
                                lng: -149.4937,
                            }, // Alaska (Fairbanks)
                            end: {
                                lat: 34.0522,
                                lng: -118.2437,
                            }, // Los Angeles
                        },
                        {
                            start: { lat: 64.2008, lng: -149.4937 }, 
                            end: { lat: -15.7975, lng: -47.8919 }, 
                        },
                        {
                            start: { lat: -15.7975, lng: -47.8919 }, 
                            end: { lat: 38.7223, lng: -9.1393 }, 
                        },
                        {
                            start: { lat: 51.5074, lng: -0.1278 }, // London
                            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
                        },
                        {
                            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
                        },
                        {
                            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
                        },
                        {
                            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                            end: { lat: 20.2961, lng:  85.8245 }, // Nairobi
                        },
                    ]}
                />
            </div>

        </div>
    );
}
