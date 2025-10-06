'use client'
import Link from 'next/link'
import { useState } from "react"

export default function Section5() {
	const [isTab, setIsTab] = useState(1)
	const handleTab = (i: number) => {
		setIsTab(i)
	}
	return (
		<>

			<div className="event2-section-area sp1">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="event2-header heading4 text-center space-margin60">
								<h5>Activités</h5>
								<div className="space18" />
								<h2 className="text-anime-style-3">Calendrier de toutes les Activités</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12" data-aos="fade-up" data-aos-duration={1000}>
							<div className="tabs-button space-margin60">
								<ul className="nav nav-pills" id="pills-tab" role="tablist">
									<li className="nav-item" onClick={() => handleTab(1)}>
										<button className={isTab == 1 ? "nav-link active" : "nav-link"} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
											<span className="calender"><img src="/assets/landing-page/img/icons/calender1.svg" alt="" /></span>
											<span className="pl-8">
												<span className="day">Jour 1</span>
												<span className="date">23 Mai, 2025</span>
											</span>
										</button>
									</li>
									<li className="nav-item" onClick={() => handleTab(2)}>
										<button className={isTab == 2 ? "nav-link active" : "nav-link"} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
											<span className="calender"><img src="/assets/landing-page/img/icons/calender1.svg" alt="" /></span>
											<span className="pl-8">
												<span className="day">Jour 2</span>
												<span className="date">24 Mai, 2025</span>
											</span>
										</button>
									</li>
									<li className="nav-item" onClick={() => handleTab(3)}>
										<button className={isTab == 3 ? "nav-link m-0 active" : "nav-link m-0"} id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
											<span className="calender"><img src="/assets/landing-page/img/icons/calender1.svg" alt="" /></span>
											<span className="pl-8">
												<span className="day">Jour 3</span>
												<span className="date">25 Mai, 2025</span>
											</span>
										</button>
									</li>
								</ul>
							</div>
							<div className="tab-content" id="pills-tabContent">
								<div className={isTab == 1 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
									<div className="event-widget-area">
										<div className="row">
											<div className="col-lg-9 m-auto">
												<div className="event2-boxarea box1">
													<h1 className="active">01</h1>
													<div className="row align-items-center">
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/landing-page/img/event_img/1.jpg" alt="" />
															</div>
														</div>
														<div className="col-lg-7">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="#"><img src="/assets/landing-page/img/icons/clock1.svg" alt="" /> 10.00 - 12.00 <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="#"><img src="/assets/landing-page/img/icons/location1.svg" alt="" />C31 Cocody, Abidjan </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/ActiviteDetail2" className="head">Cérémonie officiel de l'ouverture du salon</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area" style={{display: 'flex', alignItems: 'center' , gap: '8px', border: 'none'}}>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																	</div>
																	
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="#" className="vl-btn2-prix"><span className="demo">5000 FCFA</span></Link>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space30" />
										<div className="row">
											<div className="col-lg-9 m-auto">
												<div className="event2-boxarea">
													<h1>02</h1>
													<div className="row align-items-center">
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/landing-page/img/event_img/R.jpeg" alt="" />
															</div>
														</div>
														<div className="col-lg-7">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="#"><img src="/assets/landing-page/img/icons/clock1.svg" alt="" />14.00 - 15.00 <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="#"><img src="/assets/landing-page/img/icons/location1.svg" alt="" />C31 Cocody, Abidjan  </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/ActiviteDetail2" className="head">Ateliers pour élever l'artisanat</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area" style={{display: 'flex', alignItems: 'center' , gap: '8px', border: 'none'}}>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																	</div>
																	
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="#" className="vl-btn2-prix"><span className="demo">7500 FCFA</span></Link>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space30" />
										<div className="row">
											<div className="col-lg-9 m-auto">
												<div className="event2-boxarea box3">
													<h1>03</h1>
													<div className="row align-items-center">
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/landing-page/img/event_img/2.jpg" alt="" />
															</div>
														</div>
														<div className="col-lg-7">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/landing-page/img/icons/clock1.svg" alt="" />15.00 - 16.00 <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/landing-page/img/icons/location1.svg" alt="" />C31 Cocody, Abidjan  </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/ActiviteDetail2" className="head">Durabilité, l'entreprise du futur</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area" style={{display: 'flex', alignItems: 'center' , gap: '8px', border: 'none'}}>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																	</div>
																	
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="#" className="vl-btn2-prix"><span className="demo">10 000 FCFA</span></Link>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className={isTab == 2 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
									<div className="event-widget-area">
										<div className="row">
											<div className="col-lg-9 m-auto">
												<div className="event2-boxarea box2">
													<h1>01</h1>
													<div className="row align-items-center">
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/landing-page/img/all-images/event/event-img1.png" alt="" />
															</div>
														</div>
														<div className="col-lg-7">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/landing-page/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/landing-page/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/ActiviteDetail2" className="head">Cérémonie officiel de l'ouverture du salon</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area" style={{display: 'flex', alignItems: 'center' , gap: '8px', border: 'none'}}>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																	</div>
																	
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="#" className="vl-btn2-prix"><span className="demo">5000 FCFA</span></Link>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space30" />
										<div className="row">
											<div className="col-lg-9 m-auto">
												<div className="event2-boxarea">
													<h1 className="active">02</h1>
													<div className="row align-items-center">
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/landing-page/img/all-images/event/event-img3.png" alt="" />
															</div>
														</div>
														<div className="col-lg-7">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/landing-page/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/landing-page/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/ActiviteDetail2" className="head">Ateliers pour élever l'artisanat</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area" style={{display: 'flex', alignItems: 'center' , gap: '8px', border: 'none'}}>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																	</div>
																	
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="#" className="vl-btn2-prix"><span className="demo">7500 FCFA</span></Link>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space30" />
										<div className="row">
											<div className="col-lg-9 m-auto">
												<div className="event2-boxarea box3">
													<h1>03</h1>
													<div className="row align-items-center">
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/landing-page/img/all-images/event/event-img2.png" alt="" />
															</div>
														</div>
														<div className="col-lg-7">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="#"><img src="/assets/landing-page/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="#"><img src="/assets/landing-page/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/ActiviteDetail2" className="head">Durabilité, l'entreprise du futur</Link>
																<div className="space24" />
																<div className="author-area" >
																	<div className="autho-name-area" style={{ display: 'flex', alignItems: 'center' , gap: '8px', border: 'none'}}>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																	</div>
																	
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="#" className="vl-btn2-prix"><span className="demo">10 000 FCFA</span></Link>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className={isTab == 3 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex={0}>
									<div className="event-widget-area">
										<div className="row">
											<div className="col-lg-9 m-auto">
												<div className="event2-boxarea box1">
													<h1>01</h1>
													<div className="row align-items-center">
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/landing-page/img/all-images/event/event-img1.png" alt="" />
															</div>
														</div>
														<div className="col-lg-7">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/landing-page/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/landing-page/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/ActiviteDetail2" className="head">Business World Event Introduction</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area" style={{display: 'flex', alignItems: 'center' , gap: '8px', border: 'none'}}>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																	</div>
																	
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="#" className="vl-btn2-prix"><span className="demo">5000 FCFA</span></Link>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space30" />
										<div className="row">
											<div className="col-lg-9 m-auto">
												<div className="event2-boxarea">
													<h1>02</h1>
													<div className="row align-items-center">
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/landing-page/img/all-images/event/event-img3.png" alt="" />
															</div>
														</div>
														<div className="col-lg-7">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/landing-page/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/landing-page/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/ActiviteDetail2" className="head">Workshops Keynote so Elevate Craft</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area" style={{ display: 'flex', alignItems: 'center' , gap: '8px', border: 'none'}}>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																	</div>
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/connexion" className="vl-btn2-prix"><span className="demo">7500 FCFA</span></Link>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space30" />
										<div className="row">
											<div className="col-lg-9 m-auto">
												<div className="event2-boxarea box3">
													<h1 className="active">03</h1>
													<div className="row align-items-center">
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/landing-page/img/all-images/event/event-img2.png" alt="" />
															</div>
														</div>
														<div className="col-lg-7">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/landing-page/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/landing-page/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/ActiviteDetail2" className="head">Sustainability the Future Business</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area" style={{ display: 'flex', alignItems: 'center' , gap: '8px', border: 'none'}}>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="img1">
																			<img src="/assets/landing-page/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																	</div>
																	
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/landing-page/inscription" className="vl-btn2-prix"><span className="demo">10 000 FCFA</span></Link>
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
					</div>
				</div>
			</div>

		</>
	)
}
