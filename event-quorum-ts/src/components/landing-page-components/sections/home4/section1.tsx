
import Link from 'next/link'

export default function Section1() {
	return (
		<div className="hero4-section-area">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-5">
							<div className="hero4-header">
								<h5 data-aos="fade-left" data-aos-duration={800}> Le SARA, l'évènement à ne pas rater</h5>
								<div className="space20" />
								<h1 className="text-anime-style-3">Thème : <br /> Innover et Réussir en 2025</h1>
								<div className="space20" />
								{/* <p data-aos="fade-left" data-aos-duration={900}>
									Welcome to Innovate 2024: Shaping the Future of <br className="d-lg-block d-none" />
									Business, where industry leaders, innovators.
								</p> */}
								<div className="space32" />
								<div className="btn-area1"  data-aos-duration={1000}>
									<Link href="/landing-page/landingpage4/inscription4" className="vl-btn4" style={{marginRight: '10px'}}>S'inscrire</Link>
									
									<Link href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F" className="vl-btn4" style={{backgroundColor: 'white', color: 'blue'}}>Se Connecter</Link>
								</div>
							</div>
						</div>
						<div className="col-lg-2" />
						<div className="col-lg-5">
							<div className="hero-content-images">
								<div className="img1 reveal image-anime">
									<img src="/assets/landing-page/img/all-images/hero/hero-img5.png" alt="" />
								</div>
								<div className="content-area aniamtion-key-1">
									<div className="img2 image-anime reveal">
										<img src="/assets/landing-page/img/all-images/hero/hero-img6.png" alt="" />
									</div>
									<div className="space16" />
									<Link href="#" className="date">25 Jan, 2025</Link>
									<ul>
										<li>
											<Link href="#"><img src="/assets/landing-page/img/icons/clock1.svg" alt="" />10.00 - 12.00</Link>
										</li>
										<li>
											<Link href="#"><img src="/assets/landing-page/img/icons/location1.svg" alt="" />C26 Palais de la Culture</Link>
										</li>
									</ul>
									{/* <div className="space24" />
									<div className="btn-area1">
										<Link href="/pricing-plan" className="vl-btn4">buy tickets</Link>
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	)
}
