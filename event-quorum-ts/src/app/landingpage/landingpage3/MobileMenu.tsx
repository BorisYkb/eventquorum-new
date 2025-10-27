'use client'
import { useState } from 'react';
import Link from 'next/link'

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
	const [isAccordion, setIsAccordion] = useState(1)

const handleAccordion = (key: any) => {
    setIsAccordion(prevState => prevState === key ? null : key)
}
	return (
		<>
			<div className="mobile-header mobile-haeder1 d-block d-lg-none">
				<div className="container-fluid">
					<div className="col-12">
						<div className="mobile-header-elements">
							<div className="mobile-logo">
								<Link href="//"><img src="/assets/landing-page/img/event_img/SARA-2025-LOGO-2.jpg" alt="" /></Link>
							</div>
							<div className="mobile-nav-icon dots-menu" onClick={handleMobileMenu}>
								<i className="fa-solid fa-bars-staggered" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={`mobile-sidebar mobile-sidebar1 ${isMobileMenu ? 'mobile-menu-active' : ''}`}>
				<div className="logosicon-area">
					<div className="logos">
						<img src="/assets/landing-page/img/event_img/SARA-2025-LOGO-2.jpg" alt="" />
					</div>
					<div className="menu-close" onClick={handleMobileMenu}>
						<i className="fa-solid fa-xmark" />
					</div>
				</div>
				<div className="mobile-nav mobile-nav1">
					<ul className="mobile-nav-list nav-list1">
						<li className="has-sub hash-has-sub">
							<Link href="/#" className="hash-nav">Accueil </Link>
							
						</li>
						<li className="hash-has-sub"><Link href="/landingpage/a_propos_de_levenement" className="hash-nav">A propos de l'événement</Link></li>
						<li className="hash-has-sub"><Link href="/landingpage/faq" className="hash-nav">FAQ,s</Link></li>
						
						<li>
							<Link href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F" className="event-btn4">
								<span className='color-white'>Connexion</span>
							</Link>
						</li>
						<li>
							<Link href="/landingpage/inscription" className="event-btn1">
								<span>Inscription</span>
							</Link>
						</li>
					</ul>

					
				</div>
			</div>
		</>
	)
}
