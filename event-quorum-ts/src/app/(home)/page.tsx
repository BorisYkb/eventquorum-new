'use client'

import Hero from "./components/Hero";
import EventsSection from "./components/EventsSection";
import PartenersSection from "./components/PartenersSection";
import Fonctionnalite from "./components/Fonctionnalite"
import FeaturedCategories from './components/FeaturedCategories'; // ajuste le chemin selon ton projet
import Invitation from "./components/Invitation"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { se } from "date-fns/locale";
import EventCarousel from "./components/EventCarousel";

export default function Home() {

  const headingRef = useRef(null);
  const heading2Ref = useRef(null);
  const sectionRef = useRef(null);
  const buttonref = useRef(null);

  //GSAP animation pour le titre
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      tl.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          heading2Ref.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          sectionRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          buttonref.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        );
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 py-20 sm:px-5">
      <Hero />
      <Fonctionnalite />
      {/* Tes autres sections */}
      <FeaturedCategories />
      <EventsSection />
      <PartenersSection />
      <EventCarousel />
      <Invitation />
    </main>

  );
}
