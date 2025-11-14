"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/protein.gltf");

const flavorTextures = {
  classic: "/labels/classic.png",
  coconut: "/labels/coconut.png",
  caramel: "/labels/caramel.png",
  hazelnut: "/labels/hazelnut.png",
  peanut: "/labels/peanut.png",
};

export type ProteinBarProps = {
  flavor?: keyof typeof flavorTextures;
  scale?: number;
};

export function ProteinBar({
  flavor = "classic",
  scale = 15,
  ...props
}: ProteinBarProps) {
  const { nodes, materials } = useGLTF("/protein.gltf");

  const labels = useTexture(flavorTextures);
  labels.classic.flipY = false;
  labels.coconut.flipY = false;
  labels.caramel.flipY = false;
  labels.hazelnut.flipY = false;
  labels.peanut.flipY = false;

  const label = labels[flavor];

  const proteinNode = Object.values(nodes).find(
    (n: any) => n && (n as any).geometry
  );

  if (!proteinNode) {
    console.warn(
      "ProteinBar: couldn't find a mesh node with geometry in /protein.gltf",
      nodes
    );
    return null;
  }

  return (
    <group
      {...props}
      dispose={null}
      scale={scale}
      rotation={[Math.PI, -Math.PI * 0.5, 0.5 * Math.PI]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={(proteinNode as THREE.Mesh).geometry}
      >
        <meshStandardMaterial roughness={0.19} metalness={0.12} map={label} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/protein.gltf");
