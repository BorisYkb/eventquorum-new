import Link from 'next/link'

export default function Header2({ scroll }: any) {
	return (
		<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scroll ? 'bg-white shadow-md' : 'bg-white'}`}>
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
					<nav className="hidden lg:flex items-center space-x-8">
						<Link 
							href="/landingpage/landingpage2"
							className="text-gray-700 hover:text-lime-400 font-medium transition-colors duration-200"
						>
							Accueil
						</Link>
						<Link 
							href="/landingpage/landingpage2/a_propos_de_levenement2"
							className="text-gray-700 hover:text-lime-400 font-medium transition-colors duration-200"
						>
							A propos de l'événement
						</Link>
						<Link 
							href="/landingpage/landingpage2/faq2"
							className="text-gray-700 hover:text-lime-400 font-medium transition-colors duration-200"
						>
							FAQ,s
						</Link>
					</nav>

					{/* Action Buttons */}
					<div className="hidden lg:flex items-center space-x-4">
						<Link 
							href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F"
							className="px-4 py-2 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 hover:text-lime-400 transition-colors duration-200"
						>
							CONNEXION
						</Link>
						<Link 
							href="/landingpage/landingpage2/inscription2"
							className="px-4 py-2 bg-lime-400 text-gray-900 font-semibold rounded hover:bg-lime-500 hover:text-white transition-colors duration-200"
						>
							INSCRIPTION
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}