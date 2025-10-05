
import Link from 'next/link'

export default function Footer5() {
	return (
		<>
			<div className="footer5-sertion-area">
				<div className="container">
					<div className="row display-flex justify-content-around">
						<div className="col-lg-3 col-md-6">
							<div className="link-content">
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
						
						<div className="col-lg-3 col-md-6">
							<div className="link-content2">
								<h3>Contacts</h3>
								<ul>
									<li>
										<Link href="/tel:+2250749668962"><img src="/assets/img/icons/phn1.svg" alt="" />+225 0749668962</Link>
									</li>
									<li>
										<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Abidjan Plateau</Link>
									</li>
									<li>
										<Link href="/mailto:eventifyevent@gmail.com"><img src="/assets/img/icons/mail1.svg" alt="" />eventify@gmail.com</Link>
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
											<img src="/assets/img/all-images/footer/footer-img1.png" alt="" />
											<div className="icons">
												<Link href="/#"><i className="fa-brands fa-instagram" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-4 col-4">
										<div className="img1">
											<img src="/assets/img/all-images/footer/footer-img2.png" alt="" />
											<div className="icons">
												<Link href="/#"><i className="fa-brands fa-instagram" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-4 col-4">
										<div className="img1">
											<img src="/assets/img/all-images/footer/footer-img3.png" alt="" />
											<div className="icons">
												<Link href="/#"><i className="fa-brands fa-instagram" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-4 col-4">
										<div className="img1">
											<img src="/assets/img/all-images/footer/footer-img4.png" alt="" />
											<div className="icons">
												<Link href="/#"><i className="fa-brands fa-instagram" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-4 col-4">
										<div className="img1">
											<img src="/assets/img/all-images/footer/footer-img5.png" alt="" />
											<div className="icons">
												<Link href="/#"><i className="fa-brands fa-instagram" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-4 col-4">
										<div className="img1">
											<img src="/assets/img/all-images/footer/footer-img6.png" alt="" />
											<div className="icons">
												<Link href="/#"><i className="fa-brands fa-instagram" /></Link>
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
				<img src="/assets/img/elements/elements33.png" alt="" className="elements33" />
			</div>

		</>
	)
}
