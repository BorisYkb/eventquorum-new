'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header4({ scroll }: any) {
	const [isMobileMenu, setIsMobileMenu] = useState(false)

	const handleMobileMenu = () => {
		setIsMobileMenu(!isMobileMenu)
	}

	return (
		<>
			{/* Desktop Header */}
			<header className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scroll ? 'bg-white shadow-md' : 'bg-white'}`}>
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-20">
						{/* Logo */}
						<div className="flex-shrink-0">
							<Link href="/landingpage/landingpage4">
								<img 
									src="/assets/landing-page/img/logo/logo6.png" 
									alt="SARA Logo" 
									className="h-12 w-auto"
								/>
							</Link>
						</div>

						{/* Navigation Menu */}
						<nav className="flex items-center space-x-8">
							<Link 
								href="/landingpage/landingpage4"
								className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
							>
								Accueil
							</Link>
							<Link 
								href="/landingpage/landingpage4/a_propos_de_levenement4"
								className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
							>
								A propos de l'événement
							</Link>
							<Link 
								href="/landingpage/landingpage4/faq4"
								className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
							>
								FAQ,s
							</Link>
						</nav>

						{/* Action Buttons */}
						<div className="flex items-center space-x-4">
							<Link 
								href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F"
								className="px-3 py-2 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition-colors duration-200 uppercase"
							>
								Connexion
							</Link>
							<Link 
								href="/landingpage/landingpage4/inscription4"
								className="px-3 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors duration-200 uppercase"
							>
								Inscription
							</Link>
						</div>
					</div>
				</div>
			</header>

			{/* Mobile Header */}
			<div className="lg:hidden block fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-16">
						<div className="flex-shrink-0">
							<Link href="/landingpage/landingpage4">
								<img 
									src="/assets/landing-page/img/event_img/SARA-2025-LOGO-2.jpg" 
									alt="SARA Logo" 
									className="h-12 w-auto"
								/>
							</Link>
						</div>
						<button 
							onClick={handleMobileMenu}
							aria-label="Menu"
							className="p-2 rounded-md bg-transparent hover:bg-transparent focus:outline-none border-none"
							style={{ cursor: 'pointer' }}
						>
							<i className="fa-solid fa-bars-staggered" style={{ fontSize: 30, color: 'black' }} />
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Sidebar */}
			<div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[100] transform transition-transform duration-300 ease-in-out ${isMobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
				<div className="flex items-start justify-between p-6 border-b">
					<img 
						src="/assets/landing-page/img/event_img/SARA-2025-LOGO-2.jpg" 
						alt="SARA Logo" 
						className="h-40 w-auto"
					/>
					<button 
						onClick={handleMobileMenu}
						aria-label="Fermer le menu"
						className="p-2 rounded-md bg-transparent hover:bg-transparent focus:outline-none border-none"
						style={{ cursor: 'pointer' }}
					>
						<i className="fa-solid fa-xmark" style={{ fontSize: 25, color: 'black' }}/>
					</button>
				</div>

				<nav className="p-6">
					<ul className="space-y-4">
						<li>
							<Link 
								href="/landingpage/landingpage4"
								className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
								onClick={handleMobileMenu}
							>
								Accueil
							</Link>
						</li>
						<li>
							<Link 
								href="/landingpage/landingpage4/a_propos_de_levenement4"
								className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
								onClick={handleMobileMenu}
							>
								A propos de l'événement
							</Link>
						</li>
						<li>
							<Link 
								href="/landingpage/landingpage4/faq4"
								className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
								onClick={handleMobileMenu}
							>
								FAQ,s
							</Link>
						</li>
						<li className="pt-4">
							<Link 
								href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F"
								className="block w-full text-center px-6 py-3 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition-colors uppercase"
								onClick={handleMobileMenu}
							>
								Connexion
							</Link>
						</li>
						<li>
							<Link 
								href="/landingpage/landingpage4/inscription4"
								className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors uppercase"
								onClick={handleMobileMenu}
							>
								Inscription
							</Link>
						</li>
					</ul>
				</nav>
			</div>

			{/* Overlay */}
			{isMobileMenu && (
				<div 
					className="fixed inset-0 bg-black bg-opacity-50 z-[90] lg:hidden"
					onClick={handleMobileMenu}
				/>
			)}
		</>
	)
}