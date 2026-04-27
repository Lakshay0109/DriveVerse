import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Box, Cylinder, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// A Stylized abstract "Cyber Car" model since we don't have a GLTF
function AbstractCar(props: any) {
  const group = useRef<THREE.Group>(null);

  // Slight hover animation
  useFrame((state, delta) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      group.current.rotation.y += delta * 0.2; // Slow auto-rotation
    }
  });

  const cybertruckShape = React.useMemo(() => {
    const shape = new THREE.Shape();
    // Start at bottom rear
    shape.moveTo(-2.4, 0.4);
    shape.lineTo(-2.4, 0.9);
    // Tailgate
    shape.lineTo(-2.2, 1.0);
    // Peak roof
    shape.lineTo(-0.3, 1.5);
    // Windshield bottom
    shape.lineTo(1.5, 0.9);
    // Hood nose
    shape.lineTo(2.4, 0.7);
    // Front bumper
    shape.lineTo(2.4, 0.3);
    // Front underbody
    shape.lineTo(1.8, 0.3);
    // Front wheel well
    shape.lineTo(1.6, 0.7);
    shape.lineTo(0.9, 0.7);
    shape.lineTo(0.7, 0.3);
    // Mid underbody
    shape.lineTo(-0.8, 0.3);
    // Rear wheel well
    shape.lineTo(-1.0, 0.7);
    shape.lineTo(-1.7, 0.7);
    shape.lineTo(-1.9, 0.3);
    // Rear underbody
    shape.lineTo(-2.4, 0.3);
    // Close
    shape.lineTo(-2.4, 0.4);
    return shape;
  }, []);

  const extrudeSettings = {
    steps: 1,
    depth: 1.8, // width of the car
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelOffset: 0,
    bevelSegments: 2
  };

  return (
    <group ref={group} {...props}>
      {/* Main Body - Hollow Wireframe Cybertruck */}
      {/* We position z at -0.9 so the 1.8 depth centers the car */}
      <mesh position={[0, 0, -0.9]}>
        <extrudeGeometry args={[cybertruckShape, extrudeSettings]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          wireframe={true} 
          emissive="#3b82f6" 
          emissiveIntensity={0.8} 
          transparent 
          opacity={0.8} 
        />
      </mesh>

      {/* Solid inner core for partial visibility blocking */}
      <mesh position={[0, 0, -0.9]}>
        <extrudeGeometry args={[cybertruckShape, { ...extrudeSettings, depth: 1.78, bevelEnabled: false }]} />
        <meshStandardMaterial 
          color="#020617" 
          metalness={0.9} 
          roughness={0.1} 
          transparent 
          opacity={0.7}
        />
      </mesh>

      {/* Wheels */}
      {[-1.35, 1.25].map((x, i) => (
        <group key={i}>
          {[-1.05, 1.05].map((z, j) => (
            <mesh key={j} position={[x, 0.35, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.35, 0.35, 0.25, 24]} />
              <meshStandardMaterial color="#8b5cf6" wireframe={true} emissive="#8b5cf6" emissiveIntensity={0.8} />
              
              {/* Wheel glowing hub */}
              <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 0.26, 12]} />
                <meshBasicMaterial color="#ffffff" wireframe={true} />
              </mesh>
            </mesh>
          ))}
        </group>
      ))}

      {/* Central Glowing Core / Battery Pack */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[2.5, 0.1, 1.4]} />
        <meshStandardMaterial color="#ec4899" wireframe={true} emissive="#ec4899" emissiveIntensity={2} />
      </mesh>
      
      {/* Headlights Light Bar */}
      <mesh position={[2.42, 0.65, 0]}>
        <boxGeometry args={[0.05, 0.05, 1.6]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
        <pointLight color="#ffffff" intensity={2} distance={3} />
      </mesh>

      {/* Taillights Light Bar */}
      <mesh position={[-2.42, 0.95, 0]}>
        <boxGeometry args={[0.05, 0.05, 1.6]} />
        <meshBasicMaterial color="#ef4444" toneMapped={false} />
        <pointLight color="#ef4444" intensity={2} distance={3} />
      </mesh>

      {/* Underglow */}
      <rectAreaLight
        width={1.6}
        height={4}
        color="#8b5cf6"
        intensity={5}
        position={[0, 0.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

export const CarCanvas = ({ rotationY = 0 }: { rotationY?: number }) => {
  return (
    <Canvas
      shadows
      camera={{ position: [5, 2.5, 6], fov: 45 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      {/* <SoftShadows size={20} samples={16} focus={0.5} /> */}
      <ambientLight intensity={0.2} />
      <directionalLight 
        castShadow 
        position={[2, 8, 5]} 
        intensity={1.5} 
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      <Environment preset="city" />
      
      <group position={[1.5, -0.8, 0]}>
        <group rotation={[0, rotationY, 0]}>
          <AbstractCar position={[0, 0, 0]} />
        </group>
      </group>

      {/* Floor */}
      <mesh receiveShadow position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.8} />
      </mesh>
    </Canvas>
  );
};
