"use client";

import AlternatingText from "./components/AlternatingText";
import BigText from "./components/BigText";
import Carousel from "./components/Carousel";
import Hero from "./components/Hero";
import Skydive from "./components/Skydive";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Skydive sentence="Fuel Your Best Self" />
      <Carousel />
      <AlternatingText />
      <BigText />
    </main>
  );
}
