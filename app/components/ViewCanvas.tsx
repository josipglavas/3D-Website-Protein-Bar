"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Loader = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Loader),
  { ssr: false }
);

type Props = {};

const ViewCanvas = (props: Props) => {
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 30,
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{
          fov: 60,
        }}
      >
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </Canvas>
      <Loader
        initialState={(active) => active}
        dataInterpolation={(p) => `Protein Boost: ${p.toFixed(0)}%`}
        containerStyles={{
          background: "linear-gradient(135deg, #fefcf8 0%, #f4deb4 100%)",
          fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        }}
        barStyles={{
          height: "12px",
          borderRadius: "6px",
          background: "linear-gradient(90deg, #f4deb4 0%, #ae8067 100%)",
          boxShadow: "0 2px 8px rgba(174, 128, 103, 0.3)",
        }}
        innerStyles={{
          background: "#fffaf3",
          borderRadius: "10px",
          padding: "16px 24px",
          boxShadow: "0 0 12px rgba(0,0,0,0.08)",
        }}
        dataStyles={{
          color: "#6a4636",
          fontWeight: 600,
          letterSpacing: "0.4px",
          marginTop: "12px",
        }}
        // containerStyles={{
        //   transition: "opacity 0.5s ease",
        //   background: "linear-gradient(135deg, #f5f6fa 0%, #ffffff 100%)",
        // }}
      />
    </>
  );
};

export default ViewCanvas;
