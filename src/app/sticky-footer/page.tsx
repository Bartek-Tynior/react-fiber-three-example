"use client";

import Lenis from "lenis";
import FooterContent from "../components/FooterContent";
import { useEffect } from "react";

export default function Footer() {

useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

    return (
        <main>
            <div className='h-screen flex text-[2vw] items-center justify-center'>
                <h2 className='max-w-[45%] text-center leading-none'>This is an example of a sticky footer made with CSS.</h2>
            </div>
            <div className='relative h-[500px]' style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
                <div className='relative h-[calc(100vh+500px)] -top-[100vh]'>
                    <div className="h-[500px] sticky top-[calc(100vh-500px)]">
                        <FooterContent />
                    </div>
                </div>
            </div>
        </main>
    );
}