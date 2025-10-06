import Link from 'next/link'

export default function Header5({ scroll, isMobileMenu, handleMobileMenu, isSearch, handleSearch }: any) {
	return (
		<>
			<header>
				<div className={`header-area homepage5 header header-sticky d-none d-lg-block ${scroll ? 'sticky' : ''}`} id="header">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="header-elements">
									<div className="site-logo">
										<Link href="/landing-page/landingpage5"><img src="/assets/landing-page/img/logo/logo6.png" alt="" /></Link>
									</div>
									<div className="main-menu">
										<ul>
											<li><Link href="/landing-page/landingpage5">Accueil </Link></li>
											<li><Link href="/landing-page/landingpage5/a_propos_de_levenement5">A Propos de l'évènement</Link></li>
											<li><Link href="/landing-page/landingpage5/faq5">FAQ,s</Link></li>
											
											
										</ul>
									</div>
									
									<div className='space12' />
									<li>
										<Link href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F" className="event-btn4">
											<span>Connexion</span>
										</Link>
									</li>
									<li>
										<Link href="/landing-page/landingpage5/inscription5" className="vl-btn4-header4">
											<span>Inscription</span>
										</Link>
									</li>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header >

		</>
	)
}
