'use client'
import Link from 'next/link'
import { useState } from "react"

export default function Section3() {
	const [isTab, setIsTab] = useState(1)
	const handleTab = (i: number) => {
		setIsTab(i)
	}
	return (
		<>

			<div className="event1-section-area sp1">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="event-header heading2 space-margin60 text-center">
								<h5 data-aos="fade-left" data-aos-duration={800}>Activités</h5>
								<div className="space16" />
								<h2 className="text-anime-style-3">Calendrier de toutes les Activités</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<div data-aos="fade-up" data-aos-duration={900}>
								<ul className="nav nav-pills space-margin60" id="pills-tab" role="tablist">
									<li className="nav-item" onClick={() => handleTab(1)}>
										<button className={isTab == 1 ? "nav-link active" : "nav-link"} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
											<span className="day">Jour 01</span>
											<span className="vl-flex">
												<span className="cal">15</span>
												<span className="date">SEP <br />
													2025</span>
											</span>
										</button>
									</li>
									<li className="nav-item" onClick={() => handleTab(2)}>
										<button className={isTab == 2 ? "nav-link active" : "nav-link"} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
											<span className="day">Jour 02</span>
											<span className="vl-flex">
												<span className="cal">16</span>
												<span className="date">SEP <br />
													2025</span>
											</span>
										</button>
									</li>
									
									
									
								</ul>
							</div>
							<div className="tab-content" id="pills-tabContent">
								<div className={isTab == 1 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
									<div className="tabs-widget-boxarea" data-aos="fade-up" data-aos-duration={800}>
										<div className="row align-items-center">
											<div className="col-lg-4">
												<div className="img1">
													<img src="/assets/landing-page/img/all-images/event/event-img1.png" alt="" />
												</div>
											</div>
											<div className="col-lg-8">
												<div className="content-area">
													<ul>
														<li>
															<Link href="#"><img src="/assets/landing-page/img/icons/clock1.svg" alt="" /> 10:00
																AM -12:00 PM <span> | </span></Link>
														</li>
														<li>
															<Link href="#"><img src="/assets/landing-page/img/icons/location1.svg" alt="" /> Espace Event | Abidjan II Plateau </Link>
														</li>
													</ul>
													<div className="space20" />
													<Link href="/ActiviteDetail" className="head">Conférences plénières inspirantes</Link>
													<div className="space16" />
													
													<div style={{display: 'flex', flexDirection: "row", gap: '15px'}}>
														<div style={{maxWidth:  '10%', borderRadius: '50%', overflow: 'hidden' }}>
															<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img1.png" alt="" />
														</div>
														<div style={{maxWidth:  '10%', borderRadius: '50%', overflow: 'hidden' }}>
															<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img1.png" alt="" />
														</div>
													</div>

													<div className="space16" />
													
													<div className="btn-area1">
														<Link href="#" className="vl-btn1">Gratuit</Link>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="space30" />
									<div className="tabs-widget-boxarea" data-aos="fade-up" data-aos-duration={1000}>
										<div className="row align-items-center">
											<div className="col-lg-4">
												<div className="img1">
													<img src="/assets/landing-page/img/all-images/event/event-img2.png" alt="" />
												</div>
											</div>
											<div className="col-lg-8">
												<div className="content-area">
													<ul>
														<li>
															<Link href="#"><img src="/assets/landing-page/img/icons/clock1.svg" alt="" /> 10:00
																AM -12:00 PM <span> | </span></Link>
														</li>
														<li>
															<Link href="#"><img src="/assets/landing-page/img/icons/location1.svg" alt="" /> Espace Event | Abidjan II Plateau </Link>
														</li>
													</ul>
													<div className="space20" />
													<Link href="/landing-page/ActiviteDetail" className="head">Ateliers pratiques et interactifs</Link>
													<div className="space16" />
													<div style={{display: 'flex', flexDirection: "row", gap: '15px'}}>
														<div style={{maxWidth:  '10%', borderRadius: '50%', overflow: 'hidden' }}>
															<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img1.png" alt="" />
														</div>
														<div style={{maxWidth:  '10%', borderRadius: '50%', overflow: 'hidden' }}>
															<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img1.png" alt="" />
														</div>
													</div>

													<div className="space16" />
													<div className="btn-area1">
														<Link href="#" className="vl-btn1">Gratuit</Link>
													</div>
												</div>
											</div>
										</div>
									</div>
									
								</div>
								<div className={isTab == 2 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
									<div className="tabs-widget-boxarea">
										<div className="row align-items-center">
											<div className="col-lg-3">
												<div className="img1">
													<img src="/assets/landing-page/img/all-images/event/event-img1.png" alt="" />
												</div>
											</div>
											<div className="col-lg-9">
												<div className="content-area">
													<ul>
														<li>
															<Link href="#"><img src="/assets/landing-page/img/icons/clock1.svg" alt="" /> 10:00
																AM -12:00 PM <span> | </span></Link>
														</li>
														<li>
															<Link href="#"><img src="/assets/landing-page/img/icons/location1.svg" alt="" /> Espace Event | Abidjan II Plateau </Link>
														</li>
													</ul>
													<div className="space20" />
													<Link href="/landing-page/ActiviteDetail" className="head">Panel de discussion avec experts</Link>
													<div className="space16" />
													<div style={{display: 'flex', flexDirection: "row", gap: '15px'}}>
														<div style={{maxWidth:  '10%', borderRadius: '50%', overflow: 'hidden' }}>
															<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img1.png" alt="" />
														</div>
														<div style={{maxWidth:  '10%', borderRadius: '50%', overflow: 'hidden' }}>
															<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img1.png" alt="" />
														</div>
													</div>

													<div className="space16" />
													<div className="btn-area1">
														<Link href="#" className="vl-btn1">1000 FCFA</Link>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								
								
								
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
