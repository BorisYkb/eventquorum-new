import Link from 'next/link'

export default function Header9({ scroll, isMobileMenu, handleMobileMenu, isSearch, handleSearch }: any) {
	return (
		<>
			<header>
				<div className={`header-area homepage8 header header-sticky d-none d-lg-block ${scroll ? 'sticky' : ''}`} id="header">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="menu-top-area">
									<div className="top-menu-area">
										<p>Are you Ready to Enenify Conferences?<Link href="/#">Buy Ticket</Link></p>
										<ul>
											<li>
												<Link href="/mailto:eventifyconference@.com"><img src="/assets/landing-page/img/icons/mail1.svg" alt="" />eventifyconference@.com <span> | </span></Link>
											</li>
											<li>
												<Link href="/tel:(234)345-4574"><img src="/assets/landing-page/img/icons/phn1.svg" alt="" />(234)
													345-4574</Link>
											</li>
										</ul>
									</div>
								</div>
								<div className="header-elements">
									<div className="site-logo">
										<Link href="/landing-page/landingpage8"><img src="/assets/landing-page/img/logo/logo1.png" alt="" /></Link>
									</div>
									<div className="main-menu">
										<ul>
											<li><Link href="/landing-page/landingpage8">Accueil </Link></li>
											<li><Link href="/about">About Event</Link></li>
											<li><Link href="/landing-page/landingpage8/faq8">FAQ,s</Link></li>

											
										</ul>
									</div>
									<div className="btn-area">
										<div className="search-icon header__search header-search-btn" onClick={handleSearch}>
											<a><img src="/assets/landing-page/img/icons/search1.svg" alt="" /></a>
										</div>
										<div className="btn-area1">
											<Link className="vl-btn8" href="/pricing-plan"><span className="demo">Buy
												Ticket</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span>
											</Link>
										</div>
									</div>
									<div className={`header-search-form-wrapper ${isSearch ? 'open' : ''}`}>
										<div className="tx-search-close tx-close" onClick={handleSearch}><i className="fa-solid fa-xmark" /></div>
										<div className="header-search-container">
											<form role="search" className="search-form">
												<input type="search" className="search-field" placeholder="Search …" name="s" />
												<button type="submit" className="search-submit"><img src="/assets/landing-page/img/icons/search1.svg" alt="" /></button>
											</form>
										</div>
									</div>
									{isSearch && <div className="body-overlay active" onClick={handleSearch} />}
								</div>
							</div>
						</div>
					</div>
				</div>
			</header >

		</>
	)
}
