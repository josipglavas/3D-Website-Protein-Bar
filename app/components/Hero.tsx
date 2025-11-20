"use client";
import { useGSAP } from "@gsap/react";
import { View } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import SplitType from "split-type";
import Scene from "../scene";
import { Chocolate } from "./Chocolate";
import { useStore } from "../hooks/useStore";
import { useMediaQuery } from "../hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  "No added sugar",
  "Palm oil free",
  "Gluten free",
  "High protein",
];

const Hero = () => {
  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!ready && isDesktop) return;

      const introTimeline = gsap.timeline();

      introTimeline
        .set("#hero", { opacity: 1 })
        .from("#hero span", {
          delay: 0.2,
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: "power4.out",
          stagger: 0.5,
        })
        .from(
          "#hero .hero-subheading",
          {
            scale: 6,
            opacity: 0,
            duration: 0.42,
            rotate: -16,
            ease: "power4.in",
            transformOrigin: "center center",
            transformPerspective: 600,
          },
          "-=0.3"
        )
        .from(
          "#hero .hero-description p",
          {
            y: 50,
            opacity: 0,
            duration: 0.42,
            ease: "power4.out",
            stagger: 0.15,
          },
          "+=0.3"
        )
        .from(
          "#hero button",
          {
            y: 50,
            opacity: 0,
            duration: 0.42,
            ease: "power4.out",
          },
          "+=0.1"
        );

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#details-text-heading",
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
        },
      });
      scrollTimeline.fromTo(
        "#hero",
        { backgroundColor: "#f4deb4" },
        { backgroundColor: "#ae8067", overwrite: "auto" }
      );

      // Split the heading text and animate
      if (headingRef.current) {
        const split = new SplitType(headingRef.current, {
          types: "lines,words,chars",
        });

        // Allow lines to wrap naturally
        gsap.set(split.lines, { display: "block", whiteSpace: "normal" });
        gsap.set(split.words, { display: "inline-block" });
        gsap.set(split.chars, { display: "inline-block" });

        const scrollTimeline2 = gsap.timeline({
          scrollTrigger: {
            trigger: "#products",
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        });

        scrollTimeline2
          .from(split.chars, {
            scale: 1.3,
            y: 40,
            opacity: 0,
            rotate: -25,
            stagger: 0.075,
            ease: "back.out(3)",
            duration: 0.6,
          })
          .from("#details-text-subheading", {
            y: 10,
            opacity: 0,
            duration: 0.3,
          });
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        })
        .fromTo(
          "#hero",
          { backgroundColor: "#f4deb4" },
          { backgroundColor: "#ae8067", overwrite: "auto" }
        );
    },
    { dependencies: [ready, isDesktop] }
  );

  return (
    <div id="hero" className="opacity-0 flex-col min-h-screen">
      {isDesktop && (
        <View className="pointer-events-none sticky hero-scene top-0 z-50 -mt-[200vh] hidden min-h-screen w-screen md:block h-[200vh]">
          <Scene />
          <Chocolate count={170} speed={0.2} repeat={true} />
        </View>
      )}
      <section className="md:h-screen h-fit flex items-start justify-start flex-col">
        <div className="container mx-auto text-center md:pt-2 pt-0">
          <h1 className="uppercase md:text-9xl text-6xl font-bold font-ainslie md:mb-7 mb-5 text-light-brown flex flex-col items-center justify-center -space-y-2">
            <span className="flex gap-x-4">
              Vanilla<p className="font-hello-honey">&</p>
            </span>
            <span>Crispies</span>
          </h1>

          <p className="md:text-6xl text-4xl hero-subheading mb-2 font-eveleth text-brown/80">
            PROTEIN 30%
          </p>

          <div className="flex items-center justify-center gap-2 hero-description mx-4 md:mx-0">
            {benefits.map((benefit, index) => (
              <p
                key={index}
                className="md:text-xl text-md my-4 text-brown/80 bg-amber-300/60 rounded-md w-fit py-1.5 px-4 font-birds font-bold"
              >
                {benefit}
              </p>
            ))}
          </div>

          <button className="bg-brown/80 text-white py-3 px-8 md:mt-8 mt-6 text-2xl rounded-md font-ainslie font-semibold hover:bg-brown transition-colors cursor-pointer">
            Buy Now
          </button>
        </div>
      </section>
      <section
        id="products"
        className="min-h-screen h-screen w-full flex justify-center container flex-col mx-auto md:px-0 px-2"
      >
        <h2
          ref={headingRef}
          id="details-text-heading"
          className="md:text-7xl text-5xl font-bold font-birds-bold text-white md:pb-1 pb-2 md:max-w-xl max-w-3xl text-left leading-tight uppercase whitespace-normal [word-break:break-word]"
        >
          Healthy products full of taste and benefits!
        </h2>
        <p
          id="details-text-subheading"
          className="text-2xl text-gray-100 max-w-xl font-ainslie"
        >
          Bombus are not only RAW fruit bars made from purely natural
          ingredients, but also other healthy products that we produce so that
          they do not contain gluten, added sugar or preservatives. We follow
          the motto “less ingredients, more taste”. Bombus is an ideal snack
          that will replenish much-needed energy during sports, on the road or
          at any time during your day.
        </p>
      </section>
    </div>
  );
};

export default Hero;
