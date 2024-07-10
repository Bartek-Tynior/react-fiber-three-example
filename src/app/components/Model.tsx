import { Text, useGLTF, MeshTransmissionMaterial } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react";

export default function Model() {

    const finalMaterialProps = {
        thickness: 0.2,
        roughness: 0.0,
        transmission: 1,
        ior: 1.2,
        chromaticAberration: 0.025,
        backside: false
    }

    const mesh = useRef();
    const { nodes } = useGLTF('/torus.glb');
    const { viewport } = useThree();

    useFrame(() => {
        mesh.current.rotation.x += 0.02;
        mesh.current.rotation.z += 0.01;
    })

    return (
        <group scale={viewport.width / 8}>
            <Text fontSize={1.5} position={[0, 0, -5]}>
                Hello, World!
            </Text>
            <mesh ref={mesh} {...nodes.Torus} >
                <MeshTransmissionMaterial {...finalMaterialProps} />
            </mesh>
        </group>
    )
}