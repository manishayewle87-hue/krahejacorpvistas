'use client';

import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

// Represents a single residential tower
function Tower({ position, scale, name, onHover, color = '#e5e7eb' }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        scale={scale}
        position={[0, scale[1] / 2, 0]} // elevate so base is on ground
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          onHover(name);
        }}
        onPointerOut={(e) => {
          setHover(false);
          onHover(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          alert(`You clicked ${name}. Requesting Floor Plans...`);
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={hovered ? '#d4af37' : color} 
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Label */}
      {hovered && (
        <Text
          position={[0, scale[1] + 1, 0]}
          fontSize={0.8}
          color="#d4af37"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000"
        >
          {name}
        </Text>
      )}
    </group>
  );
}

function Scene({ setActiveZone }: { setActiveZone: (zone: string | null) => void }) {
  return (
    <>
      <OrbitControls 
        enablePan={false} 
        minPolarAngle={Math.PI / 6} 
        maxPolarAngle={Math.PI / 2.5} 
        minDistance={20}
        maxDistance={50}
      />
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1} castShadow />

      {/* 7.5 Acre Base Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#2d3748" roughness={0.8} metalness={0.2} />
      </mesh>
      
      {/* Grid Helper for scale */}
      <gridHelper args={[40, 40, '#4a5568', '#1a202c']} position={[0, -0.09, 0]} />

      {/* Towers */}
      <Tower name="Tower A (The Crown)" position={[-10, 0, -10]} scale={[3, 15, 3]} onHover={setActiveZone} />
      <Tower name="Tower B" position={[-2, 0, -12]} scale={[3, 14, 3]} onHover={setActiveZone} />
      <Tower name="Tower C" position={[6, 0, -10]} scale={[3, 16, 3]} onHover={setActiveZone} />
      
      <Tower name="Tower D" position={[-12, 0, 2]} scale={[3, 12, 3]} onHover={setActiveZone} />
      <Tower name="Tower E" position={[12, 0, 0]} scale={[3, 14, 3]} onHover={setActiveZone} />

      <Tower name="Tower F" position={[-8, 0, 12]} scale={[3, 15, 3]} onHover={setActiveZone} />
      <Tower name="Tower G" position={[5, 0, 10]} scale={[3, 13, 3]} onHover={setActiveZone} />

      {/* Clubhouse */}
      <Tower name="The Grand Clubhouse" position={[0, 0, 0]} scale={[6, 3, 4]} color="#d4af37" onHover={setActiveZone} />

      <ContactShadows resolution={1024} scale={40} blur={2} opacity={0.5} far={20} />
    </>
  );
}

export default function Masterplan3D() {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[600px] md:h-[800px] rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-luxury-gold)]/20 cursor-move bg-gradient-to-b from-[#1a202c] to-[#2d3748]">
      
      {/* WebGL Canvas */}
      <Canvas shadows camera={{ position: [0, 25, 35], fov: 45 }}>
        <Scene setActiveZone={setActiveZone} />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
        <div>
          <span className="text-[var(--color-luxury-gold)] tracking-[0.2em] uppercase text-xs font-semibold block mb-2">
            Interactive 3D Masterplan
          </span>
          <h3 className="text-2xl font-serif text-white">Drag to orbit. Scroll to zoom.</h3>
        </div>
        <button 
          className="pointer-events-auto bg-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold shadow-lg hover:bg-white transition-colors flex items-center gap-2"
          onClick={() => alert('Requesting Camera Permissions for WebXR AR Projection...')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          View in AR
        </button>
      </div>

      {activeZone && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
          <p className="text-white text-sm font-medium">Inspecting: <span className="text-[var(--color-luxury-gold)]">{activeZone}</span></p>
        </div>
      )}
    </div>
  );
}
