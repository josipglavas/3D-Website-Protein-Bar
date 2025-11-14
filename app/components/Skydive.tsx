"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import FloatingProteinBar from "./FloatingProteinBar";
import { Cloud, Clouds, Environment, Text, View } from "@react-three/drei";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { ProteinBarProps } from "./ProteinBar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SkyDiveProps = {
  sentence: string | null;
  flavor?: ProteinBarProps["flavor"];
};

const Skydive = ({ sentence, flavor }: SkyDiveProps) => {
  // Refs for 3D objects
  const groupRef = useRef<THREE.Group>(null);
  const barRef = useRef<THREE.Group>(null);
  const cloud1Ref = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);

  const ANGLE = 75 * (Math.PI / 180);
  const getXPosition = (distance: number) => distance * Math.cos(ANGLE);
  const getYPosition = (distance: number) => distance * Math.sin(ANGLE);
  const getXYPositions = (distance: number) => ({
    x: getXPosition(distance),
    y: getYPosition(-1 * distance),
  });

  // GSAP initialization function
  const initGsap = () => {
    if (
      !barRef.current ||
      !cloudsRef.current ||
      !wordsRef.current ||
      !cloud1Ref.current ||
      !cloud2Ref.current
    )
      return;

    // Initial positions
    gsap.set(cloudsRef.current.position, { z: 10 });
    gsap.set(barRef.current.position, getXYPositions(-10));
    gsap.set(
      wordsRef.current.children.map((word) => word.position),
      { ...getXYPositions(7), z: 2 }
    );

    // Spinning bar
    gsap.to(barRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.7,
      repeat: -1,
      ease: "none",
    });

    // Infinite cloud movement
    const DISTANCE = 15;
    const DURATION = 6;
    gsap.set(
      [cloud1Ref.current.position, cloud2Ref.current.position],
      getXYPositions(DISTANCE)
    );

    gsap.to(cloud1Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      duration: DURATION,
    });

    gsap.to(cloud2Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      delay: DURATION / 2,
      duration: DURATION,
    });

    // Scroll-triggered timeline
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#skydive",
        pin: true,
        start: "top top",
        end: "+=2000",
        scrub: 1.5,
      },
    });

    scrollTl
      .to("#skydive", { backgroundColor: "#C0F0F5", duration: 0.1 })
      .to(cloudsRef.current.position, { z: 0, duration: 0.3 }, 0)
      .to(barRef.current.position, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "back.out(1.7)",
      })
      .to(
        wordsRef.current.children.map((word) => word.position),
        {
          keyframes: [
            { x: 0, y: 0, z: -1 },
            { ...getXYPositions(-9), z: -7 },
          ],
          stagger: 0.3,
        },
        0
      )
      .to(barRef.current.position, {
        ...getXYPositions(10),
        duration: 0.5,
        ease: "back.in(1.7)",
      })
      .to(cloudsRef.current.position, { z: 7, duration: 0.5 });
  };

  // Wait for refs to exist before initializing GSAP
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        barRef.current &&
        cloudsRef.current &&
        wordsRef.current &&
        cloud1Ref.current &&
        cloud2Ref.current
      ) {
        clearInterval(interval);
        initGsap();
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="skydive" className="h-screen w-screen">
      <View className="h-full w-full bg-[#b5dcff] pointer-events-none">
        <group ref={groupRef}>
          <group rotation={[0, 0, 0.65]}>
            <FloatingProteinBar
              ref={barRef}
              scale={35}
              flavor={flavor}
              rotationIntensity={0}
              floatIntensity={3}
              floatSpeed={3}
            >
              <pointLight intensity={30} color="#612800" decay={0.6} />
            </FloatingProteinBar>
          </group>

          <Clouds ref={cloudsRef}>
            <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} />
            <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} />
          </Clouds>

          <group ref={wordsRef}>
            {sentence && <ThreeText sentence={sentence} color="#F97315" />}
          </group>

          <ambientLight intensity={1.78} color={"#d1f2ff"} />
          <Environment files={"/hdr/field.hdr"} environmentIntensity={13} />
        </group>
      </View>
    </div>
  );
};

function ThreeText({
  sentence,
  color = "white",
}: {
  sentence: string;
  color?: string;
}) {
  const words = sentence.toUpperCase().split(" ");
  const material = new THREE.MeshLambertMaterial();
  const isDesktop = useMediaQuery("(min-width: 950px)", true);

  return words.map((word, index) => (
    <Text
      key={`${index}-${word}`}
      scale={isDesktop ? 1 : 0.5}
      color={color}
      material={material}
      font="/fonts/Eveleth Regular.otf"
      fontWeight={900}
      anchorX="center"
      anchorY="middle"
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?'"
    >
      {word}
    </Text>
  ));
}

export default Skydive;
