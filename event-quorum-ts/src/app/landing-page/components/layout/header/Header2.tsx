import Link from 'next/link'
import  '/public/assets/css/EventVariables.css';


export default function Header2({ scroll, isMobileMenu2, handleMobileMenu2, isSearch, handleSearch }: any) {
	return (
		<>
			<header>
				<div className={`header-area homepage2 header header-sticky d-none d-lg-block ${scroll ? 'sticky' : ''}`} id="header">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								
								<div className="header-elements">
									<div className="site-logo">
										<Link href="/landing-page/landingpage2"><img src="/assets/img/logo/logo6.png" alt="" /></Link>
									</div>
									<div className='space12'/>
									
									<div className="main-menu">
										<ul>
											
											<li><Link href="/landing-page/landingpage2">Accueil </Link></li>
											<li><Link href="/landing-page/a_propos_de_levenement2">A propos de l'événement</Link></li>
											<li><Link href="/landing-page/faq2">FAQ,s</Link></li>
											
											
										</ul>
									</div>
									<div className='space12'/>
									<li>
										<Link href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F" className="event-btn4">
											<span>Connexion</span>
										</Link>
									</li>
									<li>
										<Link href="/landing-page/inscription2" className="event-btn1">
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
