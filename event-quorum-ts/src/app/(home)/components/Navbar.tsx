// components/Navbar.jsx
"use client";

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  const titleref = useRef(null);
  const linkref = useRef(null);
  const logoref = useRef(null);
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

  const handleLinkClick = () => {
    setIsPresentationOpen(false);
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

  // GSAP animation pour le titre
  useLayoutEffect(() => {
    if (titleref.current) {
      gsap.fromTo(titleref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3 }
      );
    }
    if (linkref.current) {
      gsap.fromTo(linkref.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1, delay: 0.3 }
      );
    }
    if (logoref.current) {
      gsap.fromTo(logoref.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, delay: 0.3 }
      );
    }
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
      isScrolled ? 'dark:bg-gray-900 bg-white shadow-md py-2' : 'bg-white py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center no-underline">
              <div ref={logoref} className="h-8 w-8 bg-blue-600 rounded-full mr-2 flex-shrink-0"></div>
              <span ref={titleref} className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                EventQuorum
              </span>
            </Link>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-8 flex-1 justify-center">
            <Link
              href="/"
              className="text-gray-900 dark:text-white hover:text-blue-600 px-3 py-2 text-sm font-medium no-underline transition-colors"
            >
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
                  className={`w-3 h-3 ml-1 text-gray-500 transition-transform duration-300 ${
                    isPresentationOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* ZONE TAMPON */}
              <div className="absolute left-1/2 -translate-x-1/2 w-24 h-3 z-10" />

              {/* MENU DÉROULANT */}
              <div className={`absolute left-1/2 z-20 mt-2 w-[600px] max-w-[90vw] bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 flex transition-all duration-300 ease-out transform
                ${isPresentationOpen
                  ? 'opacity-100 -translate-x-1/2 scale-100 translate-y-0 visible'
                  : 'opacity-0 scale-95 -translate-x-1/2 translate-y-4 pointer-events-none invisible'
                }`}
              >
                {/* LIENS */}
                <div className="w-3/5 grid grid-cols-1 gap-2 p-6">
                  {eventTypes.map((type) => (
                    <Link
                      key={type.id}
                      href={type.link}
                      onClick={handleLinkClick}
                      className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors py-2 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 no-underline"
                    >
                      {type.title}
                    </Link>
                  ))}
                </div>

                {/* IMAGE */}
                <div className="w-2/5 flex items-center justify-center p-6 border-l border-gray-200 dark:border-gray-700">
                  <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden flex items-center justify-center">
                    <Image
                      src="/presentation-menu1.avif"
                      alt="Illustration"
                      width={240}
                      height={192}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/Explorer/"
              className="text-gray-900 dark:text-white hover:text-blue-600 px-3 py-2 text-sm font-medium no-underline transition-colors"
            >
              Explorer
            </Link>
            <Link
              href="/Quinoussommes/"
              className="text-gray-900 dark:text-white hover:text-blue-600 px-3 py-2 text-sm font-medium no-underline transition-colors"
            >
              Qui sommes-nous ?
            </Link>
          </div>

          {/* Bouton CTA */}
          <div className="hidden md:flex flex-shrink-0">
            <Link
              ref={linkref}
              href="/DemoRequest"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors no-underline whitespace-nowrap"
            >
              Demander une démo
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-300 focus:outline-none"
            >
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
          <Link
            href="/"
            className="block text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium no-underline"
          >
            Accueil
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsPresentationOpen(!isPresentationOpen)}
              className="w-full flex justify-between items-center px-3 py-2 text-gray-800 dark:text-white hover:text-blue-600 text-left"
            >
              Prestations
              {isPresentationOpen ? (
                <svg className="w-3 h-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>

            {isPresentationOpen && (
              <div className="pl-4 bg-gray-50 dark:bg-gray-700 rounded-md mt-1">
                {eventTypes.map((type) => (
                  <Link
                    key={type.id}
                    href={type.link}
                    onClick={() => {
                      setIsPresentationOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 no-underline"
                  >
                    {type.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/Explorer/"
            className="block text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium no-underline"
          >
            Explorer
          </Link>
          <Link
            href="/Quinoussommes/"
            className="block text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium no-underline"
          >
            Qui sommes-nous ?
          </Link>
          <Link
            href="/DemoRequest"
            className="block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium no-underline"
          >
            Demander une démo
          </Link>
        </div>
      </div>
    </nav>
  );
}
