"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return isMobile;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

function Book() {
  const group = useRef<THREE.Group>(null);
  const cover = useRef<THREE.Group>(null);
  const openTarget = -Math.PI * 0.55;

  useFrame((state, delta) => {
    if (cover.current) {
      cover.current.rotation.y = THREE.MathUtils.damp(
        cover.current.rotation.y,
        openTarget,
        0.9,
        delta,
      );
    }
    if (group.current) {
      const mx = state.pointer.x;
      const my = state.pointer.y;
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        mx * 0.25 + Math.PI * 0.06,
        3,
        delta,
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        -my * 0.15 - 0.04,
        3,
        delta,
      );
      group.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 0.06 - 0.05;
    }
  });

  return (
    <group ref={group} position={[0, -0.05, 0]}>
      {/* Tapa trasera */}
      <mesh position={[0, 0, -0.12]} castShadow>
        <boxGeometry args={[1.5, 2.1, 0.04]} />
        <meshStandardMaterial
          color="#14110C"
          roughness={0.75}
          metalness={0.15}
        />
      </mesh>

      {/* Bloque de páginas */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.42, 2.02, 0.2]} />
        <meshStandardMaterial color="#EDE5D0" roughness={0.95} />
      </mesh>

      {/* Lomo */}
      <mesh position={[-0.75, 0, 0]}>
        <boxGeometry args={[0.05, 2.1, 0.28]} />
        <meshStandardMaterial
          color="#14110C"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Tapa delantera con bisagra en el lomo */}
      <group ref={cover} position={[-0.75, 0, 0.12]}>
        <mesh position={[0.75, 0, 0]}>
          <boxGeometry args={[1.5, 2.1, 0.04]} />
          <meshStandardMaterial
            color="#1E1C18"
            roughness={0.65}
            metalness={0.25}
          />
        </mesh>

        {/* Ornamento dorado central en la tapa */}
        <mesh position={[0.75, 0.15, 0.022]}>
          <planeGeometry args={[0.7, 0.9]} />
          <meshStandardMaterial
            color="#C9A84C"
            emissive="#9A7A2E"
            emissiveIntensity={0.25}
            roughness={0.35}
            metalness={0.85}
          />
        </mesh>

        {/* Línea dorada vertical decorativa */}
        <mesh position={[0.75, -0.72, 0.022]}>
          <planeGeometry args={[0.35, 0.02]} />
          <meshStandardMaterial
            color="#E8C97A"
            emissive="#9A7A2E"
            emissiveIntensity={0.3}
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* Página derecha que asoma al abrirse */}
      <mesh position={[0.35, 0, 0.115]}>
        <planeGeometry args={[1.25, 1.9]} />
        <meshStandardMaterial
          color="#F5EFE0"
          roughness={0.95}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

interface FloatingBookProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  phase: number;
  color: string;
}

function FloatingBook({
  position,
  rotation,
  scale,
  phase,
  color,
}: FloatingBookProps) {
  const ref = useRef<THREE.Group>(null);
  const baseY = position[1];

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.position.y =
      baseY + Math.sin(state.clock.elapsedTime * 0.45 + phase) * 0.18;
    ref.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <mesh>
        <boxGeometry args={[1.2, 1.8, 0.32]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.15} />
      </mesh>
      <mesh position={[-0.6, 0, 0]}>
        <boxGeometry args={[0.04, 1.8, 0.32]} />
        <meshStandardMaterial
          color="#C9A84C"
          emissive="#9A7A2E"
          emissiveIntensity={0.2}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    const points = ref.current;
    if (!points) return;
    const attr = points.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += delta * 0.12;
      arr[i * 3] += Math.sin(i + arr[i * 3 + 1]) * delta * 0.02;
      if (arr[i * 3 + 1] > 4) {
        arr[i * 3 + 1] = -4;
        arr[i * 3] = (Math.random() - 0.5) * 10;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#E8C97A"
        size={0.035}
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function CameraRig() {
  const scrollY = useScrollY();

  useFrame((state, delta) => {
    const target = 5 + Math.min(scrollY * 0.0025, 1.8);
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      target,
      3,
      delta,
    );
  });

  return null;
}

export default function BookScene() {
  const isMobile = useIsMobile();
  const particleCount = isMobile ? 60 : 150;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      shadows={!isMobile}
    >
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[4, 5, 3]}
        intensity={1.2}
        color="#E8C97A"
        castShadow={!isMobile}
      />
      <pointLight position={[0, 0, 4]} intensity={0.65} color="#ffffff" />
      <pointLight position={[-3, -2, 2]} intensity={0.35} color="#C9A84C" />

      <Book />
      <FloatingBook
        position={[-3.1, 0.6, -1.4]}
        rotation={[0.25, -0.5, 0.25]}
        scale={0.55}
        phase={0}
        color="#1E1C18"
      />
      <FloatingBook
        position={[3.1, -0.35, -1.6]}
        rotation={[-0.15, 0.55, -0.18]}
        scale={0.5}
        phase={1.4}
        color="#14110C"
      />
      <Particles count={particleCount} />
      <CameraRig />
    </Canvas>
  );
}
