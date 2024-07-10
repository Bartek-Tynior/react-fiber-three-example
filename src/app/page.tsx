"use client";

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react';

const Mesh = () => {
  const myMesh = useRef()

  useFrame(({ clock }) => {
    myMesh.current.rotation.y = clock.getElapsedTime()
    myMesh.current.rotation.x = clock.getElapsedTime()
  })
  return (
    <mesh ref={myMesh}>
      <boxGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}


export default function Home() {
  return (
    <div id="canvas-container">
      <Canvas>
        <ambientLight intensity={0.9} />
        <pointLight position={[10, 10, 10]} />
        <Mesh />
      </Canvas>
    </div>
  );
}
