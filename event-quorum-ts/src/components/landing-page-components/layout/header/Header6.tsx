import Link from 'next/link'

export default function Header6({ scroll, isMobileMenu, handleMobileMenu, isSearch, handleSearch }: any) {
	return (
		<header>
				<div className={`header-area homepage6 header header-sticky d-none d-lg-block ${scroll ? 'sticky' : ''}`} id="header">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="header-elements">
									<div className="site-logo">
										<Link href="/landingpage/landingpage6"><img src="/assets/landing-page/img/logo/logo6.png" alt="" /></Link>
									</div>
									<div className="main-menu">
										<ul>
											

											<li><Link href="/landingpage/landingpage6">Accueil </Link></li>
											<li><Link href="/landingpage/landingpage6/a_propos_de_levenement6">About Event</Link></li>
											<li><Link href="/landingpage/landingpage6/faq6">FAQ,s</Link></li>
											
										</ul>
									</div>
									<div className="btn-area">
										<div className="search-icon header__search header-search-btn" onClick={handleSearch}>
											<a><img src="/assets/landing-page/img/icons/search1.svg" alt="" /></a>
										</div>
										<ul>
											<li>
												<Link href="/#"><i className="fa-brands fa-facebook-f" /></Link>
											</li>
											<li>
												<Link href="/#"><i className="fa-brands fa-instagram" /></Link>
											</li>
											<li>
												<Link href="/#"><i className="fa-brands fa-linkedin-in" /></Link>
											</li>
											<li>
												<Link href="/#" className="m-0"><i className="fa-brands fa-pinterest-p" /></Link>
											</li>
										</ul>
									</div>
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</header >
	)
}
