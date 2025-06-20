'use client';
import { useState } from 'react';
import Link from 'next/link';
import { eventTypes } from '@/lib/navLinks';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <div
      className={`md:hidden fixed top-16 left-0 w-full bg-white dark:bg-gray-900 z-40 shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}
    >
      <div className="flex flex-col px-6 py-4 space-y-2">
        <Link href="/" onClick={onClose} className="text-gray-800 dark:text-white text-base hover:text-blue-600 transition">
          Accueil
        </Link>

        <button
          className="flex items-center justify-between text-gray-800 dark:text-white text-base hover:text-blue-600 transition"
          onClick={() => setShowSubMenu(!showSubMenu)}
        >
          <span>Prestations</span>
          <svg
            className={`w-4 h-4 ml-2 transform transition-transform ${showSubMenu ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {showSubMenu && (
          <div className="ml-4 mt-2 flex flex-col space-y-1">
            {eventTypes.map((type) => (
              <Link
                key={type.id}
                href={type.link}
                onClick={onClose}
                className="text-sm text-gray-700 dark:text-white hover:text-blue-600 transition"
              >
                {type.title}
              </Link>
            ))}
          </div>
        )}

        <Link href="/Explorer/" onClick={onClose} className="text-gray-800 dark:text-white text-base hover:text-blue-600 transition">
          Explorer
        </Link>
        <Link href="/Quinoussommes/" onClick={onClose} className="text-gray-800 dark:text-white text-base hover:text-blue-600 transition">
          Qui sommes-nous ?
        </Link>

        <Link
          href="/inscription"
          onClick={onClose}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Demander une démo
        </Link>
      </div>
    </div>
  );
}
