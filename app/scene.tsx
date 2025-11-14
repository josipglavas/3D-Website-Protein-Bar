"use client";
import { useRef } from "react";
import FloatingProteinBar from "./components/FloatingProteinBar";
import { Environment } from "@react-three/drei";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Group } from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "./hooks/useStore";

gsap.registerPlugin(ScrollTrigger);

type Props = {};

const Scene = (props: Props) => {
  const isReady = useStore((state) => state.isReady);

  const bar1Ref = useRef<Group>(null);
  const bar2Ref = useRef<Group>(null);
  const bar3Ref = useRef<Group>(null);
  const bar4Ref = useRef<Group>(null);
  const bar5Ref = useRef<Group>(null);

  const bar1GroupRef = useRef<Group>(null);
  const bar2GroupRef = useRef<Group>(null);

  const groupRef = useRef<Group>(null);

  const FLOAT_SPEED = 1.5;

  useGSAP(() => {
    if (
      !bar1Ref.current ||
      !bar2Ref.current ||
      !bar3Ref.current ||
      !bar4Ref.current ||
      !bar5Ref.current ||
      !bar1GroupRef.current ||
      !bar2GroupRef.current ||
      !groupRef.current
    )
      return;

    setTimeout(() => {
      isReady();
    }, 5);

    gsap.set(bar1Ref.current.position, { x: -1.9, y: 1.25 });
    gsap.set(bar1Ref.current.rotation, { z: -0.3 });

    gsap.set(bar2Ref.current.position, { x: 1.9, y: 1.25 });
    gsap.set(bar2Ref.current.rotation, { z: 0.3 });

    gsap.set(bar3Ref.current.position, { y: 5, z: 2 });
    gsap.set(bar4Ref.current.position, { x: 2, y: 4, z: 2 });
    gsap.set(bar5Ref.current.position, { y: -5 });

    const introTimeline = gsap.timeline({
      defaults: { duration: 3, ease: "back.out(1.4)" },
    });

    introTimeline
      .from(
        bar1GroupRef.current.position,
        {
          y: -5,
          x: 1,
        },
        0
      )
      .from(
        bar1GroupRef.current.rotation,
        {
          z: 3,
        },
        0
      )
      .from(
        bar2GroupRef.current.position,
        {
          y: 5,
          x: 1,
        },
        0
      )
      .from(
        bar2GroupRef.current.rotation,
        {
          z: 3,
        },
        0
      );

    const scrollTimeline = gsap.timeline({
      defaults: {
        duration: 2,
      },
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,

        invalidateOnRefresh: true, // This ensures the ScrollTrigger updates properly on refresh
      },
    });

    scrollTimeline
      .to(groupRef.current.rotation, { y: Math.PI * 2 })

      .to(bar1Ref.current.position, { x: -0.2, y: -2.4, z: -2 }, 0)
      .to(bar1Ref.current.rotation, { z: 0.3 }, 0)

      .to(bar2Ref.current.position, { x: 1, y: -1.6, z: -1 }, 0)
      .to(bar2Ref.current.rotation, { z: 0 }, 0)

      .to(bar3Ref.current.position, { x: -0.3, y: -1.7, z: -1 }, 0)
      .to(bar3Ref.current.rotation, { z: -0.1 }, 0)

      .to(bar4Ref.current.position, { x: 0, y: -1.4, z: 0.5 }, 0)
      .to(bar4Ref.current.rotation, { z: 0.3 }, 0)

      .to(bar5Ref.current.position, { x: 0.3, y: -1.3, z: -0.5 }, 0)
      .to(bar5Ref.current.rotation, { z: -0.25 }, 0)
      .to(
        groupRef.current.position,
        { x: 1, duration: 3, ease: "sine.inOut" },
        1.3
      );
  }, []);

  return (
    <group ref={groupRef}>
      <group ref={bar1GroupRef}>
        <FloatingProteinBar
          ref={bar1Ref}
          floatSpeed={FLOAT_SPEED}
          flavor="classic"
        />
      </group>
      <group ref={bar2GroupRef}>
        <FloatingProteinBar
          ref={bar2Ref}
          floatSpeed={FLOAT_SPEED}
          flavor="coconut"
        />
      </group>
      <FloatingProteinBar
        ref={bar3Ref}
        floatSpeed={FLOAT_SPEED}
        flavor="caramel"
      />
      <FloatingProteinBar
        ref={bar4Ref}
        floatSpeed={FLOAT_SPEED}
        flavor="hazelnut"
      />
      <FloatingProteinBar
        ref={bar5Ref}
        floatSpeed={FLOAT_SPEED}
        flavor="peanut"
      />

      <ambientLight intensity={1.67} />
      <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
    </group>
  );
};

export default Scene;
