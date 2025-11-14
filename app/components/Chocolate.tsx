"use client";

import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";

// Temporary object for matrix updates
const o = new THREE.Object3D();

export function Chocolate({
  count = 150,
  speed = 5,
  scale = 3,
  repeat = true,
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Load chocolate model
  const { nodes, materials } = useGLTF("/chocolate.gltf") as any;

  // Find first mesh node that has geometry
  const chocolateNode = Object.values(nodes).find(
    (n: any) => n && n.geometry
  ) as THREE.Mesh | undefined;

  if (!chocolateNode) {
    console.warn(
      "Chocolate: Couldn't find a mesh node with geometry in /chocolate.gltf",
      nodes
    );
    return null;
  }

  const geometry = chocolateNode.geometry;
  const material = (materials["chocolate dark"] ||
    new THREE.MeshStandardMaterial({ color: "#5a3a2e" })) as THREE.Material;

  const chocolateSpeed = useRef(new Float32Array(count));
  const minSpeed = speed * 0.001;
  const maxSpeed = speed * 0.005;

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < count; i++) {
      o.position.set(
        gsap.utils.random(-4, 4),
        gsap.utils.random(-4, 4),
        gsap.utils.random(-4, 4)
      );
      o.rotation.set(
        gsap.utils.random(0, Math.PI),
        gsap.utils.random(0, Math.PI),
        gsap.utils.random(0, Math.PI)
      );
      o.scale.set(scale, scale, scale);
      o.updateMatrix();
      mesh.setMatrixAt(i, o.matrix);
      chocolateSpeed.current[i] = gsap.utils.random(minSpeed, maxSpeed);
    }

    mesh.instanceMatrix.needsUpdate = true;

    return () => {
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    };
  }, [count, scale, minSpeed, maxSpeed]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < count; i++) {
      mesh.getMatrixAt(i, o.matrix);
      o.position.setFromMatrixPosition(o.matrix);
      o.position.y += chocolateSpeed.current[i];

      if (o.position.y > 4 && repeat) {
        o.position.y = -2;
        o.position.x = gsap.utils.random(-4, 4);
        o.position.z = gsap.utils.random(0, 8);
      }

      o.rotation.x += 0.00006;
      o.rotation.y += 0.00002;

      o.updateMatrix();
      mesh.setMatrixAt(i, o.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      position={[0, 0, 0.2]}
    />
  );
}

useGLTF.preload("/chocolate.gltf");
