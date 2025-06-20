'use client';
import { useRef, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import NavItem from './NavItem';
import DropdownMenu from './DropdownMenu';
import useScroll from '@/hooks/useScroll';
import MobileMenu from './MobileMenu';

export default function Navbar() {
    const isScrolled = useScroll(10);
    const titleRef = useRef(null);
    const linkRef = useRef(null);
    const logoRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useLayoutEffect(() => {
        gsap.from(titleRef.current, { opacity: 0, y: 30, duration: 1, delay: 0.3 });
        gsap.from(linkRef.current, { opacity: 0, x: 30, duration: 1, delay: 0.3 });
        gsap.from(logoRef.current, { opacity: 0, x: -30, duration: 1, delay: 0.3 });
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'dark:bg-gray-900 bg-white shadow-md py-5' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <div ref={logoRef} className="h-8 w-8 bg-blue-600 rounded-full mr-2" />
                        <span ref={titleRef} className="text-xl font-bold text-gray-900 dark:text-white">EventQuorum</span>
                    </Link>

                    {/* Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <NavItem href="/" label="Accueil" />
                        <DropdownMenu />
                        <NavItem href="/Explorer/" label="Explorer" />
                        <NavItem href="/Quinoussommes/" label="Qui sommes-nous ?" />
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex">
                        <Link ref={linkRef} href="/inscription" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            Demander une démo
                        </Link>
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-800 dark:text-white focus:outline-none">
                            {isMobileMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Ici tu pourras ajouter un composant <MobileMenu /> si tu veux aussi le modulariser */}
            {/* Mobile */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-gray-800 dark:text-white focus:outline-none"
                >
                    {isMobileMenuOpen ? (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </nav>
    );
}
