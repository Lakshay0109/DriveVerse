import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, useGLTF, ContactShadows, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-cyan-400 font-mono text-xl whitespace-nowrap bg-black/50 px-4 py-2 rounded-lg backdrop-blur-md">
        Loading Model {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

// Ensure you preload the GLTF model
useGLTF.preload('https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/ferrari.glb');

function CarModel({ rotationY }: { rotationY: number }) {
  const { scene } = useGLTF('https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/ferrari.glb');

  React.useMemo(() => {
    // Apply realistic materials, specific to the ferrari.glb structure found in three.js examples
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a, // Matte dark blue
      metalness: 0.2, // Low metalness for matte look
      roughness: 0.7, // High roughness for matte look
      clearcoat: 0.0, // No clearcoat
      sheen: 0.2
    });

    const interiorMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111, // Dark black interior
      metalness: 0.1,
      roughness: 0.8
    });

    const detailsMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.8,
      roughness: 0.2
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.25,
      roughness: 0,
      transmission: 1.0, // glass-like
      transparent: true,
      opacity: 0.9,
    });

    const rimsMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111, // Black alloy wheels
      metalness: 0.7,
      roughness: 0.5
    });

    const headlightsMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 5.0, // Glow
      toneMapped: false,
    });

    const rearLightsMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 5.0, // Glow
      toneMapped: false,
    });

    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        if (child.name === 'body') {
          child.material = bodyMaterial;
        } else if (child.name === 'glass') {
          child.material = glassMaterial;
        } else if (['rim_fl', 'rim_fr', 'rim_rr', 'rim_rl'].includes(child.name)) {
          child.material = rimsMaterial;
        } else if (child.name === 'trim') {
          child.material = detailsMaterial;
        } else if (['interior_dark', 'interior_light'].includes(child.name) || child.name.includes('interior')) {
          child.material = interiorMaterial;
        } else if (child.name === 'lights' || child.name === 'leds') {
          child.material = headlightsMaterial;
        } else if (child.name === 'lights_red' || child.name === 'steering_red_lights') {
          child.material = rearLightsMaterial;
        }
      }
    });
  }, [scene]);

  return (
    <group rotation={[0, rotationY, 0]} position={[2.5, -0.8, 0]}>
      {/* Tweak scale as necessary for the model */}
      <primitive object={scene} scale={[1, 1, 1]} />
    </group>
  );
}

export const CarScene = ({ rotationY = 0, cameraZ = 6 }: { rotationY?: number, cameraZ?: number }) => {
  return (
    <Canvas
      shadows
      camera={{ position: [5, 2, cameraZ], fov: 45 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={2.5}
        shadow-bias={-0.0001}
        shadow-mapSize={[2048, 2048]}
      />
      
      {/* Environment lighting for realistic reflections on the car */}
      <Environment preset="city" />

      <Suspense fallback={<Loader />}>
        {/* The 3D car model */}
        <CarModel rotationY={rotationY} />
        
        {/* Contact shadow for realistic grounding */}
        <ContactShadows position={[2.5, -0.8, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000000" />
      </Suspense>

      <EffectComposer>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
      </EffectComposer>
    </Canvas>
  );
};
