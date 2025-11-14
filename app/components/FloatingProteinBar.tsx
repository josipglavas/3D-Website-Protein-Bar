"use client";
import { Float } from "@react-three/drei";
import { ProteinBar, ProteinBarProps } from "./ProteinBar";
import { forwardRef } from "react";
import { Group } from "three";

type FloatingProteinBarProps = {
  flavor?: ProteinBarProps["flavor"];
  floatSpeed?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  rotationIntensity?: number;
  scale?: number;
  children?: React.ReactNode;
};

const FloatingProteinBar = forwardRef<Group, FloatingProteinBarProps>(
  (
    {
      flavor = "classic",
      floatSpeed = 1.5,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      rotationIntensity = 1,
      children,
      scale,
      ...props
    },
    ref
  ) => {
    return (
      <group ref={ref} {...props}>
        <Float
          floatingRange={floatingRange}
          floatIntensity={floatIntensity}
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
        >
          {children}
          <ProteinBar flavor={flavor} scale={scale} />
        </Float>
      </group>
    );
  }
);

FloatingProteinBar.displayName = "FloatingProteinBar";

export default FloatingProteinBar;
