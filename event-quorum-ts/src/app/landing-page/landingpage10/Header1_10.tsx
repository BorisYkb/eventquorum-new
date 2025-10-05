import Link from 'next/link'



export default function Header1_10({ scroll, isMobileMenu, handleMobileMenu, isSearch, handleSearch }: any) {
	
	

	return (
		<>
			<header>
				<div className={`header-area homepage1 header header-sticky d-none d-lg-block ${scroll ? 'sticky' : ''}`} id="header">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="header-elements">
									<div className="site-logo">
										<Link href="/landingpage10"><img src="/assets/img/logo/logo6.png" alt="" /></Link>
									</div>
									<div className='space12' />
									<div className="main-menu">
										<ul>
											
											
											
											
											<li><Link href="/landingpage10">Accueil </Link></li>
											<li><Link href="/a_propos_de_levenement10">A propos de l'événement </Link></li>
											<li><Link href="/faq10">FAQ,s</Link></li>
											
											
											
										</ul>
									</div>
									<div className='space12' />
									<li>
										<Link href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F" className="event-btn4">
											<span>Connexion</span>
										</Link>
									</li>
									<li>
										<Link href="/inscription" className="event-btn1">
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
