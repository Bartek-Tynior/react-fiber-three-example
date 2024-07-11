"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import useMouseHook from "../components/useMouseHook";
import { motion } from "framer-motion-3d";
import { animate, useMotionValue, useTransform } from "framer-motion";
import useDimension from "../components/useDimension";
import { fragment, vertex } from "../components/shader";
import { useAspect, useTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import ProjectList from "../components/ProjectList";

const projects = [
        {
            title: 'Project 1',
            img: '/images/1.jpg'
        },
        {
            title: 'Project 2',
            img: '/images/2.jpg'
        },
        {
            title: 'Project 3',
            img: '/images/3.jpg'
        },
        {
            title: 'Project 4',
            img: '/images/4.jpg'
        },
        {
            title: 'Project 5',
            img: '/images/5.jpg'
        },
    ]

const CurvedImageModel = ({ activeProject }) => {

    const mesh = useRef();

    const dimension = useDimension();
    const { viewport } = useThree();
    const textures = projects.map((project) => useTexture(project.img));
    const opacity = useMotionValue(0);
    const mouse = useMouseHook();
    const scale = useAspect(
        textures[0].image.width,
        textures[0].image.height,
        0.225
    )
    const smoothMouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    }

    const uniforms = useRef({
        uTexture: { value: textures[0] },
        uOffset: { value: { x: 0, y: 0 } },
        uOpacity: { value: 1 },
    })

    useEffect(() => {        
        if (activeProject != null) {
            mesh.current.material.uniforms.uTexture.value = textures[activeProject];
            animate(opacity, 1, { duration: 0.5, onUpdate: progress => mesh.current.material.uniforms.uOpacity.value = progress});
        } else {
            animate(opacity, 0, { duration: 0.5, onUpdate: progress => mesh.current.material.uniforms.uOpacity.value = progress});
        }
    }, [activeProject])

    const lerp = (x, y, a) => x * (1 - a) + y * a;
    useFrame(() => {
        const { x, y } = mouse;
        const smoothX = smoothMouse.x.get()
        const smoothY = smoothMouse.y.get()

        smoothMouse.x.set(lerp(smoothX, x.get(), 0.1));
        smoothMouse.y.set(lerp(smoothY, y.get(), 0.1));
        mesh.current.material.uniforms.uOffset.value = {
            x: x.get() - smoothX,
            y: -1 * (y.get() - smoothY),
        }
    })

    const x = useTransform(smoothMouse.x, [0, dimension.width], [-1 * viewport.width / 2, viewport.width / 2]);
    const y = useTransform(smoothMouse.y, [0, dimension.height], [viewport.height / 2, -1 * viewport.width / 2]);

    return (
        <motion.mesh scale={scale} ref={mesh} position-x={x} position-y={y}>
            <planeGeometry args={[1, 1, 15, 15]} />
            <shaderMaterial transparent={true} fragmentShader={fragment} vertexShader={vertex} uniforms={uniforms.current} />
        </motion.mesh>
    );
}

export default function CurvedImagePage() {

    useEffect(() => {
        const lenis = new Lenis();

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }, [])


    const [activeProject, setActiveProject] = useState(null);

    return (
        <main>
            <div className="fixed top-0 h-screen w-full">
                <Canvas>
                    <CurvedImageModel activeProject={activeProject} />
                </Canvas>
            </div>
            <div className="h-[50vh]"></div>
            <ProjectList setActiveProject={setActiveProject} />
            <div className="h-[50vh]"></div>
        </main>
    );
}