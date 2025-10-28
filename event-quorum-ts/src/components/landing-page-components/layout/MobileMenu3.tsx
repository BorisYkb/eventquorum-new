'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function MobileMenu3({ isMobileMenu3, handleMobileMenu3 }: any) {
	return (
		<>
			{/* Mobile Header */}
			<div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-16">
						<div className="flex-shrink-0">
							<Link href="/landingpage/landingpage3">
								<img 
									src="/assets/landing-page/img/logo/logo6.png" 
									alt="SARA Logo" 
									className="h-10 w-auto"
								/>
							</Link>
						</div>
						<button 
							onClick={handleMobileMenu3}
							className="text-gray-700 hover:text-purple-600 focus:outline-none"
						>
							<i className="fa-solid fa-bars text-2xl" />
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Sidebar */}
			<div className={`fixed inset-0 z-[100] transform transition-transform duration-300 ${isMobileMenu3 ? 'translate-x-0' : 'translate-x-full'}`}>
				{/* Overlay */}
				<div 
					className={`absolute inset-0 bg-black transition-opacity duration-300 ${isMobileMenu3 ? 'opacity-50' : 'opacity-0'}`}
					onClick={handleMobileMenu3}
				/>
				
				{/* Sidebar */}
				<div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white shadow-2xl overflow-y-auto">
					<div className="p-6">
						{/* Logo and Close Button */}
						<div className="flex items-center justify-between mb-8">
							<img 
								src="/assets/landing-page/img/logo/logo6.png" 
								alt="SARA Logo" 
								className="h-10 w-auto"
							/>
							<button 
								onClick={handleMobileMenu3}
								className="text-gray-700 hover:text-purple-600 focus:outline-none"
							>
								<i className="fa-solid fa-xmark text-2xl" />
							</button>
						</div>

						{/* Navigation Links */}
						<nav className="space-y-4">
							<Link 
								href="/landingpage/landingpage3"
								className="block text-gray-700 hover:text-purple-600 font-medium py-2 border-b border-gray-200 transition-colors duration-200"
								onClick={handleMobileMenu3}
							>
								Accueil
							</Link>
							<Link 
								href="/landingpage/landingpage3/a_propos_de_levenement3"
								className="block text-gray-700 hover:text-purple-600 font-medium py-2 border-b border-gray-200 transition-colors duration-200"
								onClick={handleMobileMenu3}
							>
								A Propos de l'évènement
							</Link>
							<Link 
								href="/landingpage/landingpage3/faq3"
								className="block text-gray-700 hover:text-purple-600 font-medium py-2 border-b border-gray-200 transition-colors duration-200"
								onClick={handleMobileMenu3}
							>
								FAQ,s
							</Link>

							{/* Action Buttons */}
							<div className="pt-6 space-y-3">
								<Link 
									href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F"
									className="block w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded text-center hover:bg-gray-800 transition-colors duration-200 uppercase tracking-wide"
									onClick={handleMobileMenu3}
								>
									Connexion
								</Link>
								<Link 
									href="/landingpage/landingpage3/inscription3"
									className="block w-full px-6 py-3 bg-red-600 text-white font-semibold rounded text-center hover:bg-red-700 transition-colors duration-200 uppercase tracking-wide"
									onClick={handleMobileMenu3}
								>
									Inscription
								</Link>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</>
	)
}