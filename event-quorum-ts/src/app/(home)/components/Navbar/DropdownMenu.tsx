'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';
// Update the import path below if navLinks.ts is located elsewhere in your project structure
import { eventTypes } from 'src/lib/navLinks';

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 280);
  };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <div className="flex items-center text-gray-800 dark:text-white hover:text-blue-600 px-3 py-2 text-sm font-medium cursor-pointer">
        Prestations
        <svg className={`w-3 h-3 ml-1 transition-transform duration-300 ${open ? 'rotate-180 text-blue-600' : ''}`} viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 9l-7 7-7-7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Zone tampon pour maintenir l'ouverture */}
      <div className="absolute left-1/2 -translate-x-[55%] w-[6vw] h-2.5 z-10" />

      {/* Menu déroulant */}
      <div className={`absolute left-1/2 z-20 mt-2 w-[70vw] bg-[#f5fdff] dark:bg-gray-800 border rounded-xl shadow-xl flex transition-all duration-450 ease-out transform ${
        open ? 'opacity-100 scale-100 translate-x-[-45%] visible' : 'opacity-0 scale-95 translate-x-[-45%] pointer-events-none'
      }`}>
        <div className="w-[60%] grid grid-cols-2 gap-6 p-6">
          {eventTypes.map((type) => (
            <Link key={type.id} href={type.link} className="block text-sm text-gray-700 dark:text-white hover:text-blue-600 transition">
              {type.title}
            </Link>
          ))}
        </div>
        <div className="w-[40%] flex items-center justify-center p-6 border-l border-gray-200">
          <div className="w-[60%] h-[200px] bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
            <img src="/presentation-menu.avif" alt="Illustration" className="object-contain w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
