'use client';

import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function ParallaxZoomPage() {

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offste: ['start start', 'end end']
    });

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const pictures = [
        {src: '/images/6.jpg', scale: scale4},
        {src: '/images/7.jpg', scale: scale5},
        {src: '/images/8.jpg', scale: scale6},
        {src: '/images/9.jpg', scale: scale8},
        {src: '/images/10.jpg', scale: scale9},
    ]

    return (
        <main className="mt-[50vh] mb-[100vh]">
            <div ref={containerRef} className="h-[300vh] relative">
                <div className="sticky bg-orange-500 top-0 h-[100vh]">

                    {pictures.map(({src, scale}, index) => (
                        <div className="w-full h-full absolute top-0 flex justify-center items-center">
                            <motion.div style={{scale: scale}} className="w-[25vw] h-[25vh] relative">
                                <Image src={src} fill alt="image" className="object-cover"/>
                            </motion.div>
                        </div>
                    ))}

                </div>
            </div>
        </main>
    );
}