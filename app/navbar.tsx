"use client";
import React, { useState, useEffect } from "react";
import { navLinks } from "./constants/navLinks";
import Image from "next/image";

const logoImages = [
  "/logo.png",
  "/logo2.png",
  "/logo3.png",
  "/logo4.png",
  "/logo5.png",
];

const Navbar = () => {
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
    <nav>
      <div>
        <a
          href="#hero"
          className="relative w-40 h-40 block"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative w-full h-full">
            <Image
              src={logoImages[currentLogoIndex]}
              alt={`Logo ${currentLogoIndex + 1}`}
              width={160}
              height={160}
              className="absolute inset-0 transition-opacity duration-75"
              priority
            />
          </div>
        </a>
        {/* 
        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul> */}
      </div>
    </nav>
  );
};

export default Navbar;
