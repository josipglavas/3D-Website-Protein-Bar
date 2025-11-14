"use client";

import { Environment, View } from "@react-three/drei";
import clsx from "clsx";
import FloatingProteinBar from "./FloatingProteinBar";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useEffect, useRef } from "react";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROTEIN_BAR_DETAILS: {
  title: string;
  description: string;
}[] = [
  {
    title: "30% Protein Power",
    description:
      "Fuel your day and support muscle growth with 30% high-quality protein packed into every bar. It's the ideal choice for post-workout recovery, helping repair tissue, or simply keeping you feeling full and satisfied longer between meals.",
  },
  {
    title: "Naturally Simple",
    description:
      'We believe in "less ingredients, more taste." Our bars are packed with just the good stuff and are completely gluten-free, palm oil-free, and contain no added sugar. It\'s clean-label snacking you can feel great about, with no artificial additives.',
  },
  {
    title: "Your Daily Energy Boost",
    description:
      "This is the perfect on-the-go snack to recharge your body and power through your day. Keep one in your gym bag, desk drawer, or hiking pack for a quick, reliable, and nutritious energy lift whenever you hit that afternoon slump.",
  },
  {
    title: "Deliciously Healthy",
    description:
      "Satisfy your cravings with a high-protein snack that truly tastes as good as it feels. We've balanced rich flavors and satisfying textures with a powerful nutritional profile, proving that healthy choices don't have to mean compromise.",
  },
];

const AlternatingText = () => {
  const barRef = useRef<Group>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  const bgColors = ["#f8af60", "#FFA6B5", "#E9CFF6", "#CBEF9A"];

  const initGsap = () => {
    if (!barRef.current) return;

    const sections = gsap.utils.toArray(".alternating-section");

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".alternating-text-view",
        endTrigger: ".alternating-text-container",
        pin: true,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    sections.forEach((_, index) => {
      if (!barRef.current) return;
      if (index === 0) return;

      const isOdd = index % 2 !== 0;

      const xPosition = isDesktop ? (isOdd ? "-2.5" : "2.5") : 0;
      const yRotation = isDesktop ? (isOdd ? ".4" : "-.4") : 0;
      scrollTl
        .to(barRef.current.position, {
          x: xPosition,
          ease: "circ.inOut",
          delay: 0.4,
        })
        .to(
          barRef.current.rotation,
          {
            y: yRotation,
            ease: "back.inOut",
          },
          "<"
        )
        .to(".alternating-text-container", {
          backgroundColor: gsap.utils.wrap(bgColors, index),
        });
    });
  };
  // Wait for refs to exist before initializing GSAP
  useEffect(() => {
    const interval = setInterval(() => {
      if (barRef.current) {
        clearInterval(interval);
        initGsap();
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="alternating-text-container relative bg-[#f8af60] text-sky-950">
      <div className="relative z-50 grid">
        <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
          <group
            ref={barRef}
            position-x={isDesktop ? 2.5 : 0}
            rotation-y={isDesktop ? -0.3 : 0}
          >
            <FloatingProteinBar flavor="classic" scale={27} />
            <ambientLight intensity={1.9} />

            <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
          </group>
        </View>

        {PROTEIN_BAR_DETAILS.map((details, index) => (
          <div
            key={index}
            className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
          >
            <div
              className={clsx(
                index % 2 === 0 ? "col-start-1 pl-20" : "ml-20 md:col-start-2",

                "rounded-lg p-4 backdrop-blur-lg max-md:bg-white/30 font-ainslie"
              )}
            >
              <h2 className="text-balance text-6xl font-bold">
                {details.title}
              </h2>
              <div className="mt-5 text-2xl max-w-3/4">
                <p>{details.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlternatingText;
