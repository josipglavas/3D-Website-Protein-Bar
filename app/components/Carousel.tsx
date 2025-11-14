"use client";

import { ProteinBarProps } from "./ProteinBar";
import { Center, Environment, View } from "@react-three/drei";
import { useRef, useState } from "react";
import { Group } from "three";
import gsap from "gsap";
import { WavyCircles } from "./WavyCircles";
import FloatingProteinBar from "./FloatingProteinBar";
import { ArrowIcon } from "./ArrowIcon";
import clsx from "clsx";

const SPINS_ON_CHANGE = 4;

const FLAVORS: {
  flavor: ProteinBarProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "coconut", color: "#217cb5", name: "Coconut" },
  { flavor: "classic", color: "#9e978e", name: "Classic" },
  { flavor: "caramel", color: "#a31c25", name: "Caramel" },
  {
    flavor: "hazelnut",
    color: "#0c6600",
    name: "Hazelnut",
  },
  { flavor: "peanut", color: "#b37b02", name: "Peanut" },
];

const Carousel = () => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const sodaCanRef = useRef<Group>(null);

  function changeFlavor(index: number) {
    if (!sodaCanRef.current) return;

    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const tl = gsap.timeline();

    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavorIndex
            ? `-=${Math.PI * SPINS_ON_CHANGE}`
            : `+=${Math.PI * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0
    )
      .to(
        ".background, .wavy-circles-outer, .wavy-circles-inner",
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0
      )
      .to(".text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0)
      .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
      .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7);
  }

  return (
    <section
      //   data-slice-type={slice.type}
      //   data-slice-variation={slice.variation}
      className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#217cb5] opacity-50" />

      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#217cb5]" />

      <h2 className="relative text-center text-6xl font-bold font-birds">
        Choose Your Flavor
      </h2>

      <div className="flex-center">
        {/* Left */}
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
          direction="left"
          label="Previous Flavor"
        />
        {/* Can */}
        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 3.1]}>
            <FloatingProteinBar
              ref={sodaCanRef}
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavorIndex].flavor}
            />
          </Center>

          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>

        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
          direction="right"
          label="Next Flavor"
        />
      </div>

      <div className="text-area relative mx-auto text-center">
        <div className="text-wrapper font-eveleth-light text-5xl font-medium pb-2">
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>
        <div className="text-3xl opacity-90 flex-center space-x-2">
          <span className="font-eveleth-clean transition-all">1,80 €</span>{" "}
          <span className="font-birds font-semibold text-2xl">INC. VAT</span>
        </div>
      </div>
    </section>
  );
};

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
};

function ArrowButton({
  label,
  onClick,
  direction = "right",
}: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="hover:cursor-pointer size-12 rounded-full border-2 border-white bg-white/10 p-3 hover:brightness-95 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
    >
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
      <span className="sr-only">{label}</span>
    </button>
  );
}
export default Carousel;
