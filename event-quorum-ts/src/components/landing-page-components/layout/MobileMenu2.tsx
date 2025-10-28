'use client'

import Link from 'next/link'

export default function MobileMenu2({ isMobileMenu2, handleMobileMenu2 }: any) {
	return (
		<div className={`fixed inset-0 z-[100] transform transition-transform duration-300 ${isMobileMenu2 ? 'translate-x-0' : 'translate-x-full'}`}>
			{/* Overlay */}
			<div 
				className={`absolute inset-0 bg-black transition-opacity duration-300 ${isMobileMenu2 ? 'opacity-50' : 'opacity-0'}`}
				onClick={handleMobileMenu2}
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
							onClick={handleMobileMenu2}
							className="text-gray-700 hover:text-teal-600 focus:outline-none"
						>
							<i className="fa-solid fa-xmark text-2xl" />
						</button>
					</div>

					{/* Navigation Links */}
					<nav className="space-y-4">
						<Link 
							href="/landingpage/landingpage2"
							className="block text-gray-700 hover:text-teal-600 font-medium py-2 border-b border-gray-200 transition-colors duration-200"
							onClick={handleMobileMenu2}
						>
							Accueil
						</Link>
						<Link 
							href="/landingpage/landingpage2/a_propos_de_levenement2"
							className="block text-gray-700 hover:text-teal-600 font-medium py-2 border-b border-gray-200 transition-colors duration-200"
							onClick={handleMobileMenu2}
						>
							A propos de l'événement
						</Link>
						<Link 
							href="/landingpage/landingpage2/faq2"
							className="block text-gray-700 hover:text-teal-600 font-medium py-2 border-b border-gray-200 transition-colors duration-200"
							onClick={handleMobileMenu2}
						>
							FAQ,s
						</Link>

						{/* Action Buttons */}
						<div className="pt-6 space-y-3">
							<Link 
								href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F"
								className="block w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded text-center hover:bg-gray-800 transition-colors duration-200 uppercase tracking-wide"
								onClick={handleMobileMenu2}
							>
								Connexion
							</Link>
							<Link 
								href="/landingpage/landingpage2/inscription2"
								className="block w-full px-6 py-3 bg-lime-400 text-gray-900 font-semibold rounded text-center hover:bg-lime-500 transition-colors duration-200 uppercase tracking-wide"
								onClick={handleMobileMenu2}
							>
								Inscription
							</Link>
						</div>
					</nav>
				</div>
			</div>
		</div>
	)
}