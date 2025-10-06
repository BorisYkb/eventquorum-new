import Link from 'next/link'

export default function Footer2() {
	return (
		<>
			<div className="footer2-sertion-area">
				<div className="container">
					<div className="row display-flex justify-content-around">
						<div className="col-lg-3 col-md-6">
							<div className="link-content2">
								<h3>Réseaux Sociaux</h3>
								
								
							</div>

							
							<div className="footer-logo-area">
								
								<div className="space24" />
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
									
								</ul>
							</div>
						</div>
						{/* <div className="col-lg-2 col-md-6">
							<div className="link-content">
								<h3>Lien Rapide</h3>
								<ul>
									<li><Link href="/landing-page/a_propos_de_levenement">A propos des événements</Link></li>
									
									<li><Link href="/landing-page/faq">FAQ's</Link></li>
									<li><Link href="/connexion">Se connecter</Link></li>
									<li><Link href="/landing-page/inscription">S'inscrire</Link></li>
								</ul>
							</div>
						</div> */}
						<div className="col-lg-3 col-md-6">
							<div className="link-content2">
								<h3>Contacts</h3>
								<ul>
									<li>
										<Link href="#"><img src="/assets/landing-page/img/icons/phn1.svg" alt="" />+225 0749668962</Link>
									</li>
									<li>
										<Link href="#"><img src="/assets/landing-page/img/icons/location1.svg" alt="" />Abidjan Plateau</Link>
									</li>
									<li>
										<Link href="#"><img src="/assets/landing-page/img/icons/mail1.svg" alt="" />eventify@gmail.com</Link>
									</li>
									
								</ul>
							</div>
						</div>
						<div className="col-lg-4 col-md-6">
							<div className="footer-social-box">
								<h3>Evènements récents</h3>
								<div className="space12" />
								<div className="row">
									<div className="col-lg-4 col-md-4 col-4">
										<div className="img1">
											<img src="/assets/landing-page/img/all-images/footer/footer-img1.png" alt="" />
											<div className="icons">
												<Link href="/landing-page/landingpage2/a_propos_de_levenement2#evenement_recent"><i className="fa-brands fa-instagram" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-4 col-4">
										<div className="img1">
											<img src="/assets/landing-page/img/all-images/footer/footer-img2.png" alt="" />
											<div className="icons">
												<Link href="/landing-page/landingpage2/a_propos_de_levenement2#evenement_recent"><i className="fa-brands fa-instagram" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-4 col-4">
										<div className="img1">
											<img src="/assets/landing-page/img/all-images/footer/footer-img3.png" alt="" />
											<div className="icons">
												<Link href="/landing-page/landingpage2/a_propos_de_levenement2#evenement_recent"><i className="fa-brands fa-instagram" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-4 col-4">
										<div className="img1">
											<img src="/assets/landing-page/img/all-images/footer/footer-img4.png" alt="" />
											<div className="icons">
												<Link href="/landing-page/landingpage2/a_propos_de_levenement2#evenement_recent"><i className="fa-brands fa-instagram" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-4 col-4">
										<div className="img1">
											<img src="/assets/landing-page/img/all-images/footer/footer-img5.png" alt="" />
											<div className="icons">
												<Link href="/landing-page/landingpage2/a_propos_de_levenement2#evenement_recent"><i className="fa-brands fa-instagram" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-4 col-4">
										<div className="img1">
											<img src="/assets/landing-page/img/all-images/footer/footer-img6.png" alt="" />
											<div className="icons">
												<Link href="/landing-page/landingpage2/a_propos_de_levenement2#evenement_recent"><i className="fa-brands fa-instagram" /></Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="space60" />
					<div className="row">
						<div className="col-lg-12">
							<div className="copyright">
								<p>© Copyright {new Date().getFullYear()} -Eventify. All Right Reserved</p>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
