"use client";

import { useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import Image from "next/image";
import { useEffect, useRef } from "react"
import { motion } from "framer-motion";

export default function TextParallaxAnimation() {
    
    useEffect(() => {
        const lenis = new Lenis();

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }, [])

    const containerRef = useRef();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    })
    
    return (
        <main className="overflow-hidden">
            <div className="h-[100vh]" />

            <div ref={containerRef}>
                <Slider img="/images/1.jpg" left="-55%" progress={scrollYProgress} direction="left" />
                <Slider img="/images/2.jpg" left="-10%" progress={scrollYProgress} direction="right"/>
                <Slider img="/images/3.jpg" left="-15%" progress={scrollYProgress} direction="left"/>
            </div>

            <div className="h-[100vh]" />
        </main>
    )
}

const Slider = ({ img, left, progress, direction }) => {
    
    const dir = direction == 'left' ? -1 : 1;
    const x = useTransform(progress, [0, 1], [-150 * dir, 150 * dir])

    return (
        <motion.div className="relative flex whitespace-nowrap" style={{left, x}}>
            <Phrase img={img} />
            <Phrase img={img} />
            <Phrase img={img} />
            <Phrase img={img} />
        </motion.div>
    )
}

const Phrase = ({img}) => {
    return (
        <div className="flex gap-5 p-2 items-center">
            <p className="text-[7vw]">
                Frontend Development
            </p>
            <span className="relative h-[7vw] aspect-[4/2] rounded-full overflow-hidden">
                <Image className="object-cover" src={img} fill alt="image" />
            </span>
        </div>
    )
}