import Link from 'next/link'

export default function Header4({ scroll, isMobileMenu4, handleMobileMenu4 }: any) {
	return (
		<>
			<header>
				<div className={`header-area homepage4 header header-sticky d-none d-lg-block ${scroll ? 'sticky' : ''}`} id="header">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="header-elements">
									<div className="site-logo">
										<Link href="/landing-page/landingpage4"><img src="/assets/img/logo/logo6.png" alt="" /></Link>
									</div>
									<div className="main-menu">
										<ul>
											<li><Link href="/landing-page/landingpage4">Accueil</Link></li>
											<li><Link href="/landing-page/a_propos_de_levenement4">A Propos de l'évènement</Link></li>
											<li><Link href="/landing-page/faq4">FAQ,s</Link></li>
											
										</ul>
									</div>
									
									<div className='space12'/>
									<li>
										<Link href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F" className="event-btn6">
											<span>Connexion</span>
										</Link>
									</li>
									<li>
										<Link href="/landing-page/inscription4" className="event-btn7">
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
