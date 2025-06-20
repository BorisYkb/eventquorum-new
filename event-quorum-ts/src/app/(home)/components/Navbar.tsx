// components/Navbar.jsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { link } from 'fs';


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const titleref = useRef(null);
  const linkref = useRef(null);
  const logoref = useRef(null);
  
  
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsPresentationOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsPresentationOpen(false);
    }, 280);
  };

  const eventTypes = [
    {
      id: 1,
      title: "Conventions",
      link: "/Prestation/conventions",
    },
    {
      id: 2,
      title: "Conférences",
      link: "/Prestation/conferences",
    },
    {
      id: 3,
      title: "Cérémonies et remises de prix",
      link: "/Prestation/ceremonies-et-remises-de-prix",
    },
    {
      id: 4,
      title: "Forums de recrutement et job datings",
      link: "/Prestation/forums",
    },
    {
      id: 5,
      title: "Assemblées générales",
      link: "/Prestation/assemblees-generales",
    },
    {
      id: 6,
      title: "Séminaires et Team Building",
      link: "/Prestation/seminaires",
    },
    {
      id: 7,
      title: "Soirées d'entreprises",
      link: "/Prestation/soirees-entreprises",
    },
  ];


  //GSAP animation pour le titre
  useLayoutEffect(() => {
    gsap.from(titleref.current, { opacity: 0, y: 30, duration: 1 , delay: 0.3});
    gsap.from(linkref.current, { opacity: 0, x: 30, duration: 1 , delay: 0.3});
    gsap.from(logoref.current, { opacity: 0, x: -30, duration: 1 , delay: 0.3});
  }, []);

  // Effet pour détecter le défilement et changer le style de la navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'dark:bg-gray-900 bg-white shadow-md py-2' : 'bg-transparent py-3'
    }`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              {/* Remplacez par votre propre logo */}
              <div ref={logoref} className="h-8 w-8 bg-blue-600 rounded-full mr-2"></div>
              <span ref={titleref} className="text-xl font-bold text-gray-900 dark:text-white">EventQuorum</span>
            </Link>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-gray-900 dark:text-white hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Accueil
            </Link>

            {/* === CONTAINER (Prestations + Menu + zone tampon) === */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center text-gray-800 dark:text-white hover:text-blue-600 px-3 py-2 text-sm font-medium transition cursor-pointer">
                Prestations
                <svg
                  className={`w-3 h-3 ml-1 text-gray-500 transition-transform duration-300 ${isPresentationOpen ? 'rotate-180 text-blue-600' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* ZONE TAMPON */}
              <div className="absolute left-1/2 -translate-x-[55%] w-[6vw] h-2.5 z-10" />

              {/* MENU DÉROULANT */}
              <div className={`absolute left-1/2 z-20 mt-2 w-[70vw] bg-[#f5fdff] dark:bg-gray-800 dark:border-gray-800 rounded-xl shadow-xl border border-gray-200 flex transition-all duration-450 ease-out transform
                ${isPresentationOpen
                ? 'opacity-100 translate-x-[-45%] scale-100 translate-y-0 visible'
                : 'opacity-0 scale-95 translate-x-[-45%] translate-y-4 pointer-events-none'
                }`}
              >
                {/* LIENS */}
                <div className="w-[60%] grid grid-cols-2 gap-6 p-6">
                  {eventTypes.map((type) => (
                    <Link
                      key={type.id}
                      href={type.link}
                      className="block text-sm text-gray-700 dark:text-white hover:text-blue-600 transition"
                    >
                      {type.title}
                    </Link>
                  ))}
                </div>

                {/* IMAGE */}
                <div className="w-[40%] flex items-center justify-center p-6 border-l border-gray-200">
                  <div className="w-[60%] h-[200px] bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                    <img
                      src="/presentation-menu1.avif"
                      alt="Illustration"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Link href="/Explorer/" className="text-gray-900 dark:text-white hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Explorer
            </Link>
            <Link href="/Quinoussommes/" className="text-gray-900 dark:text-white hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Qui sommes-nous ?
            </Link>
          </div>

          {/* Bouton CTA */}
          <div className="hidden md:flex">
            <Link ref={linkref} href="/DemoRequest" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Demander une démo
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-white hover:text-gray-900  dark:hover:text-gray-500 focus:outline-none">
              <svg className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white dark:bg-gray-800 shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className="block text-gray-900 dark:text-white hover:bg-gray-100 px-3 py-2  dark:hover:bg-gray-700 rounded-md text-base font-medium">
            Accueil
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsPresentationOpen(!isPresentationOpen)}
              className="w-full flex justify-between items-center px-3 py-2 text-gray-800 dark:text-white hover:text-blue-600"
            >
              Prestations
              {isPresentationOpen
                ? <svg className="w-3 h-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                : <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>}
            </button>

            {isPresentationOpen && (
              <div className="pl-4">
                {eventTypes.map((type) => (
                  <Link
                    key={type.id}
                    href={type.link}
                    className="block px-3 py-2 text-sm text-gray-700 dark:text-white hover:text-blue-600"
                  >
                    {type.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/Explorer/" className="block text-gray-900 dark:text-white hover:bg-gray-100 px-3  dark:hover:bg-gray-700 py-2 rounded-md text-base font-medium">
            Explorer
          </Link>
          <Link href="/Quinoussommes/" className="block text-gray-900 dark:text-white hover:bg-gray-100  dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
            Qui sommes-nous ?
          </Link>
          <Link href="/DemoRequest" className="block bg-blue-600 text-white dark:text-white dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
            Demander une démo
          </Link>
        </div>
      </div>
    </nav>
  );
}