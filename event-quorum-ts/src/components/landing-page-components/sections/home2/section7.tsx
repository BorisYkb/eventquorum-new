
import Link from 'next/link'

export default function Section7() {
	return (
		<div className="pricing-plan-section-area sp2">
				<div className="container">
					<div className="row">
						<div className="col-lg-5 m-auto">
							<div className="pricingplan heading4 text-center space-margin60">
								<h5>Plan Tarifaire</h5>
								<div className="space18" />
								<h2 className="text-anime-style-3">Choisissez votre Type d'Accès</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration={800}>
							<div className="pricing-boxarea">
								<div className="ticket-box">
									<p>Standard</p>
									<div className="space16" />
									<h3>5000 F</h3>
									<div className="space24" />
									<div className="progress">
										<div className="progress-inner" style={{ width: '96%' }} />
									</div>
									<div className="space14" />
									<p>470/500</p>
									<div className="space24" />
									<div className="btn-area1">
										<Link href="/landingpage/landingpage2/inscription2" className="vl-btn2"><span className="demo">Acheter</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span></Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration={1000}>
							<div className="pricing-boxarea box2">
								<div className="ticket-box">
									<p>VIP</p>
									<div className="space16" />
									<h3>7500 F</h3>
									<div className="space24" />
									<div className="progress">
										<div className="progress-inner" style={{ width: '96%' }} />
									</div>
									<div className="space14" />
									<p>470/500</p>
									<div className="space24" />
									<div className="btn-area1">
										<Link href="/landingpage/landingpage2/inscription2" className="vl-btn2"><span className="demo">Acheter</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span></Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration={1200}>
							<div className="pricing-boxarea">
								<div className="ticket-box">
									<p>VVIP</p>
									<div className="space16" />
									<h3>10 000 F</h3>
									<div className="space24" />
									<div className="progress">
										<div className="progress-inner" style={{ width: '96%' }} />
									</div>
									<div className="space14" />
									<p>470/500</p>
									<div className="space24" />
									<div className="btn-area1">
										<Link href="/landingpage/landingpage2/inscription2" className="vl-btn2"><span className="demo">Acheter</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	)
}
