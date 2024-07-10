"use client";

import { Canvas, useThree } from "@react-three/fiber";
import useMouseHook from "../components/useMouseHook";
import { motion } from "framer-motion-3d";
import { useTransform } from "framer-motion";
import useDimension from "../components/useDimension";

const CurvedImageModel = () => {

    const dimension = useDimension();
    const { viewport } = useThree();
    const mouse = useMouseHook();
    const x = useTransform(mouse.x, [0, dimension.width], [-1 * viewport.width / 2, viewport.width / 2]);
    const y = useTransform(mouse.y, [0, dimension.height], [viewport.height / 2, -1 * viewport.width / 2]);

    return (
        <motion.mesh position-x={x} position-y={y}>
            <planeGeometry args={[5, 5, 15, 15]} />
            <meshBasicMaterial wireframe={true} color="red" />
        </motion.mesh>
    );
}

export default function CurvedImagePage() {
    return (
        <div className="relative h-screen">
            <Canvas>
                <CurvedImageModel />
            </Canvas>
        </div>
    );
}