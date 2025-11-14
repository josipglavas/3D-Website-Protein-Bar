"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const logoImages = [
  "/logo.png",
  "/logo2.png",
  "/logo3.png",
  "/logo4.png",
  "/logo5.png",
];

type Props = {
  className?: string;
  height?: number;
  width?: number;
};

const BombusLogo = ({
  className = "w-40 h-40",
  height = 160,
  width = 160,
}: Props) => {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isReversing, setIsReversing] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    setIsReversing(false);
    if (isHovering && !isReversing) {
      interval = setInterval(() => {
        setCurrentLogoIndex((prev) => {
          if (prev === logoImages.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 270);
    } else if (!isHovering && currentLogoIndex > 0) {
      setIsReversing(true);
      interval = setInterval(() => {
        setCurrentLogoIndex((prev) => {
          if (prev === 0) {
            setIsReversing(false);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 270);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isHovering, currentLogoIndex]);
  return (
    <a
      href="#hero"
      className={`relative block ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image
        src={logoImages[currentLogoIndex]}
        alt={`Logo ${currentLogoIndex + 1}`}
        width={width}
        height={height}
        className=" inset-0 transition-opacity duration-75"
        priority
      />
    </a>
  );
};

export default BombusLogo;
