'use client'

import Link from 'next/link'

export default function MobileMenu2({ isMobileMenu2, handleMobileMenu2 }: any) {
	


	return (
		<>
			<div className="mobile-header mobile-haeder1 d-block d-lg-none">
				<div className="container-fluid">
					<div className="col-12">
						<div className="mobile-header-elements">
							<div className="mobile-logo">
								<Link href="//"><img src="/assets/img/event_img/SARA-2025-LOGO-2.jpg" alt="" /></Link>
							</div>
							<div className="mobile-nav-icon dots-menu" onClick={handleMobileMenu2}>
								<i className="fa-solid fa-bars-staggered" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={`mobile-sidebar mobile-sidebar1 ${isMobileMenu2 ? 'mobile-menu-active' : ''}`}>
				<div className="logosicon-area">
					<div className="logos">
						<img src="/assets/img/event_img/SARA-2025-LOGO-2.jpg" alt="" />
					</div>
					<div className="menu-close" onClick={handleMobileMenu2}>
						<i className="fa-solid fa-xmark" />
					</div>
				</div>
				<div className="mobile-nav mobile-nav1">
					<ul className="mobile-nav-list nav-list1">
						<li className="has-sub hash-has-sub">
							<Link href="/landingpage2" className="hash-nav">Accueil </Link>
							
						</li>
						<li className="hash-has-sub"><Link href="/a_propos_de_levenement2" className="hash-nav">A propos de l'événement</Link></li>
						<li className="hash-has-sub"><Link href="/faq2" className="hash-nav">FAQ,s</Link></li>
						
						<li>
							<Link href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F" className="event-btn4">
								<span>Connexion</span>
							</Link>
						</li>
						<li>
							<Link href="/inscription2" className="event-btn1">
								<span>Inscription</span>
							</Link>
						</li>
					</ul>

					
				</div>
			</div>
		</>
	)
}
