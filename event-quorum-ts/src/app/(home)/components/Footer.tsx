'use client';

import React, { useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Linkedin, ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import footerData from '../data/footer.json'; // Import des données JSON

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const columnRefs = useRef([]);
  const logoRef = useRef(null);
  const copyrightRef = useRef(null);
  const gsapRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsapRef.current = gsap;
      initAnimations();
    }
  }, []);

  const initAnimations = () => {
    const gsap = gsapRef.current;
    if (!gsap || !footerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.fromTo(
      columnRefs.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.3 }
    );

    tl.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6 },
      '-=1'
    );

    tl.fromTo(
      copyrightRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.5'
    );

    const links = footerRef.current.querySelectorAll('a');
    links.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          x: 4,
          color: '#60a5fa', // text-blue-400
          duration: 0.3,
        });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          x: 0,
          color: '#f3f4f6', // text-gray-100
          duration: 0.3,
        });
      });
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { logo, services, useful_links, contact, social_media } = footerData;

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-br from-gray-900 via-blue-950 to-black text-gray-100 px-6 pt-10 pb-10 overflow-hidden"
      id='Footer'
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo + description */}
        <div ref={(el) => { columnRefs.current[0] = el; }} className="space-y-4">
          <div ref={logoRef} className="flex items-center space-x-3">
            <div className="bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {logo.icon}
            </div>
            <span className="text-xl font-bold">{logo.name}</span>
          </div>
          <p className="text-gray-400 text-sm">{logo.description}</p>
        </div>

        {/* Services */}
        <div ref={(el) => { columnRefs.current[1] = el; }} className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-blue-500 pb-2 inline-block">Nos Services</h3>
          <ul className="space-y-2 text-sm">
            {services.map((service, idx) => (
              <li key={idx}>
                <a
                  href={service.url}
                  className="hover:text-blue-400 transition-all duration-300 no-underline"
                >
                  {service.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Liens utiles */}
        <div ref={(el) => { columnRefs.current[2] = el; }} className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-blue-500 pb-2 inline-block">Liens utiles</h3>
          <ul className="space-y-2 text-sm">
            {useful_links.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.url}
                  className="hover:text-blue-400 transition-all duration-300 no-underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div ref={(el) => { columnRefs.current[3] = el; }} className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-blue-500 pb-2 inline-block">Contact</h3>
          <div className="text-sm space-y-3">
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-blue-400" />
              <span>{contact.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-blue-400" />
              <span>{contact.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-blue-400" />
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-blue-400 transition-all no-underline"
              >
                {contact.email}
              </a>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex space-x-3 mt-6">
            {social_media.facebook && (
              <a
                href={social_media.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Facebook className="h-5 w-5" />
              </a>
            )}
            {social_media.twitter && (
              <a
                href={social_media.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {social_media.instagram && (
              <a
                href={social_media.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {social_media.linkedin && (
              <a
                href={social_media.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Ligne séparatrice */}
      <div className="border-t border-gray-700 my-10"></div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 gap-4">
        <div ref={copyrightRef}>
          © {new Date().getFullYear()} {logo.name}. Tous droits réservés.
        </div>
        <div className="flex space-x-6">
          {useful_links
            .filter((link) =>
              ['confidentialite', 'conditions-utilisation', 'mentions-legales'].some((slug) =>
                link.url.includes(slug)
              )
            )
            .map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                className="hover:text-blue-400 transition-all no-underline"
              >
                {link.label}
              </a>
            ))}
        </div>
      </div>

      {/* Ligne lumineuse décorative */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-700 animate-pulse"></div>

      {/* Styles utilitaires supplémentaires */}
      <style jsx>{`
        .social-icon {
          @apply bg-gray-800 hover:bg-blue-600 text-white p-2 rounded-full transition-all no-underline;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
