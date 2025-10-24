import Link from 'next/link'



export default function Header1_3({ scroll, isMobileMenu3, handleMobileMenu3, isSearch, handleSearch }: any) {
	
	

	return (
		<>
			<header>
				<div className={`header-area homepage1 header header-sticky d-none d-lg-block ${scroll ? 'sticky' : ''}`} id="header">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="header-elements">
									<div className="site-logo">
										<Link href="/landing-page/landingpage3"><img src="/assets/landing-page/img/logo/logo6.png" alt="" /></Link>
									</div>
									<div className='space12' />
									<div className="main-menu">
										<ul>
											
											
											
											
											<li><Link href="/landing-page/landingpage3">Accueil </Link></li>
											<li><Link href="/landing-page/landingpage3/a_propos_de_levenement3">A propos de l'événement </Link></li>
											<li><Link href="/landing-page/landingpage3/faq3">FAQ,s</Link></li>
											
											
											
										</ul>
									</div>
									<div className='space12' />
									<li>
										<Link href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F" className="event-btn4">
											<span>Connexion</span>
										</Link>
									</li>
									<li>
										<Link href="/landing-page/landingpage3/inscription3" className="event-btn5">
											<span>Inscription</span>
										</Link>
									</li>
									{/*
									<div className="btn-area">
										
										<ul>
											<li>
												<Link href="/#"><i className="fa-brands fa-facebook-f" /></Link>
											</li>
											
											<li>
												<Link href="/#" className="m-0"><i className="fa-brands fa-pinterest-p" /></Link>
											</li>

											<li>
												<Link href="/#" className="m-2"><i className="fa-brands fa-instagram" /></Link>
											</li>
										</ul>
									</div>
									
									{isSearch && <div className="body-overlay active" onClick={handleSearch} />}*/}
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

		</>
	)
}
