import Link from 'next/link'

export default function Header3({ scroll, isMobileMenu3, handleMobileMenu3 }: any) {
	return (
		<>
			<header>
				<div className={`header-area homepage3 header header-sticky d-none d-lg-block ${scroll ? 'sticky' : ''}`} id="header">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								
								<div className="header-elements">
									<div className="site-logo">
										<Link href="/landing-page/landingpage3"><img src="/assets/landing-page/img/logo/logo6.png" alt="" /></Link>
									</div>
									<div className='space12'/>
									<div className="main-menu">
										<ul>
											
											<li><Link href="/landing-page/landingpage3">Accueil </Link></li>
											<li><Link href="/landing-page/landingpage3/a_propos_de_levenement3">A Propos de l'évènement</Link></li>
											<li><Link href="/landing-page/landingpage3/faq3">FAQ,s</Link></li>
											
										</ul>
									</div>
									
									<div className='space12'/>
										<li>
											<Link href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F" className="event-btn6">
												<span>Connexion</span>
											</Link>
										</li>
										<li>
											<Link href="/landing-page/landingpage3/inscription3" className="event-btn5">
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
