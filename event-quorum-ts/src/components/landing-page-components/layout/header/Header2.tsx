'use client'

import Link from 'next/link'
import { useState } from 'react'

import MobileMenu2 from 'src/components/landing-page-components/layout/MobileMenu2'

export default function Header2({ scroll }: any) {
	const [isMobileMenu2, setMobileMenu2] = useState(false)
	const handleMobileMenu2 = () => setMobileMenu2(!isMobileMenu2)

	return (
		<>
			{/* Desktop Header */}
			<header className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scroll ? 'bg-white shadow-md' : 'bg-white'}`}>
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-20">
						{/* Logo */}
						<div className="flex-shrink-0">
							<Link href="/landingpage/landingpage2">
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
								href="/landingpage/landingpage2"
								className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200"
							>
								Accueil
							</Link>
							<Link 
								href="/landingpage/landingpage2/a_propos_de_levenement2"
								className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200"
							>
								A propos de l'événement
							</Link>
							<Link 
								href="/landingpage/landingpage2/faq2"
								className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200"
							>
								FAQ,s
							</Link>
						</nav>

						{/* Action Buttons */}
						<div className="flex items-center space-x-4">
							<Link 
								href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F"
								className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition-colors duration-200"
							>
								CONNEXION
							</Link>
							<Link 
								href="/landingpage/landingpage2/inscription2"
								className="px-6 py-2.5 bg-lime-400 text-gray-900 font-semibold rounded hover:bg-lime-500 transition-colors duration-200"
							>
								INSCRIPTION
							</Link>
						</div>
					</div>
				</div>
			</header>

			{/* Mobile Menu */}
			<MobileMenu2 isMobileMenu2={isMobileMenu2} handleMobileMenu2={handleMobileMenu2} />
		</>
	)
}