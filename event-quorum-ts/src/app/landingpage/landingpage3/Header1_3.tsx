import Link from 'next/link'

export default function Header1_3({ scroll, isMobileMenu, handleMobileMenu }: any) {
	return (
		<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scroll ? 'bg-gray-900 shadow-md' : 'bg-gray-900'}`}>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-20">
					{/* Logo */}
					<div className="flex-shrink-0">
						<Link href="/landingpage/landingpage3">
							<img 
								src="/assets/landing-page/img/logo/logo6.png" 
								alt="SARA Logo" 
								className="h-12 w-auto"
							/>
						</Link>
					</div>

					{/* Navigation Menu */}
					<nav className="hidden lg:flex items-center space-x-8">
						<Link 
							href="/landingpage/landingpage3"
							className="text-white hover:text-red-600 font-medium transition-colors duration-200"
						>
							Accueil
						</Link>
						<Link 
							href="/landingpage/landingpage3/a_propos_de_levenement3"
							className="text-white hover:text-red-600 font-medium transition-colors duration-200"
						>
							A Propos de l'évènement
						</Link>
						<Link 
							href="/landingpage/landingpage3/faq3"
							className="text-white hover:text-red-600 font-medium transition-colors duration-200"
						>
							FAQ,s
						</Link>
					</nav>

					{/* Action Buttons */}
					<div className="hidden lg:flex items-center space-x-4">
						<Link 
							href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F"
							className="px-3 py-2 bg-white text-black font-semibold rounded hover:bg-slate-200 transition-colors duration-200 uppercase tracking-wide"
						>
							Connexion
						</Link>
						<Link 
							href="/landingpage/landingpage3/inscription3"
							className="px-3 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors duration-200 uppercase tracking-wide"
						>
							Inscription
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}