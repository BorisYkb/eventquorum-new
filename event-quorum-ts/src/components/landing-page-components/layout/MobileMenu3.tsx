'use client'

import Link from 'next/link'
// import  '/public/assets/landing-page/css/EventVariables.css';

export default function MobileMenu3({ isMobileMenu3, handleMobileMenu3 }: any) {
	


	return (
		<>
			<div className="mobile-header mobile-haeder1 d-block d-lg-none">
				<div className="container-fluid">
					<div className="col-12">
						<div className="mobile-header-elements">
							<div className="mobile-logo">
								<Link href="//"><img src="/assets/landing-page/img/event_img/SARA-2025-LOGO-2.jpg" alt="" /></Link>
							</div>
							<div className="mobile-nav-icon dots-menu" onClick={handleMobileMenu3}>
								<i className="fa-solid fa-bars-staggered" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={`mobile-sidebar mobile-sidebar1 ${isMobileMenu3 ? 'mobile-menu-active' : ''}`}>
				<div className="logosicon-area">
					<div className="logos">
						<img src="/assets/landing-page/img/event_img/SARA-2025-LOGO-2.jpg" alt="" />
					</div>
					<div className="menu-close" onClick={handleMobileMenu3}>
						<i className="fa-solid fa-xmark" />
					</div>
				</div>
				<div className="mobile-nav mobile-nav1">
					<ul className="mobile-nav-list nav-list1">
						<li className="has-sub hash-has-sub">
							<Link href="/landing-page/landingpage3" className="hash-nav">Accueil </Link>
							
						</li>
						<li className="hash-has-sub"><Link href="/landing-page/landingpage3/a_propos_de_levenement3" className="hash-nav">A propos de l'événement</Link></li>
						<li className="hash-has-sub"><Link href="/landing-page/landingpage3/faq3" className="hash-nav">FAQ,s</Link></li>
						
						<li>
							<Link href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F" className="event-btn4">
								<span className='color-white'>Connexion</span>
							</Link>
						</li>
						<li>
							<Link href="/landing-page/landingpage3/inscription3" className="event-btn5">
								<span>Inscription</span>
							</Link>
						</li>
					</ul>

					
				</div>
			</div>
		</>
	)
}
