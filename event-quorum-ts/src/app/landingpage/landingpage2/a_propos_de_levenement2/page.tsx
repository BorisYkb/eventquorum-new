'use client'

import Link from "next/link"
import { useState } from 'react'
import CountUp from 'react-countup'

import Layout from "src/components/landing-page-components/layout/Layout"
import Countdown from 'src/components/landing-page-components/elements/Countdown'
import Footer1 from 'src/components/landing-page-components/layout/footer/Footer1'
import BrandSlider from 'src/components/landing-page-components/slider/BrandSlider'
import Section5 from 'src/components/landing-page-components/sections/home1/section5'

import PastEventsSection from './component/PastEventsSection'
import SARADescriptionSection from './component/SARADescriptionSection'




export default function Page() {

	return (
		<Layout headerStyle={1_2} footerStyle={1}>
				
				<div>
					
					<div className="inner-page-header" style={{ backgroundImage: 'url(/assets/landing-page/img/bg/header-bg5.png)' }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-4 m-auto">
									<div className="heading1 text-center">
										<h1>À propos de l'événement</h1>
										
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== HERO AREA ENDS =======*/}
					<Section5 />

					<SARADescriptionSection />

					{/*===== OTHERS AREA STARTS =======*/}
					<div className="brands3-section-area sp2">
						<div className="container">
							
							<div className="row">
								<div className="col-lg-12" data-aos="zoom-in" data-aos-duration={800}>
									<BrandSlider />
								</div>
							</div>
						</div>
					</div>
					{/*===== OTHERS AREA ENDS =======*/}
					{/*===== ABOUT AREA ENDS =======*/}
					<PastEventsSection />
					
					{/*===== CTA AREA STARTS =======*/}
					
					
					{/* <div className="cta1-section-area d-lg-block d-block">
						<div className="container">
							<div className="row">
								<div className="col-lg-10 m-auto">
									<div className="cta1-main-boxarea">
										<div className="timer-btn-area display-flex align-items-center justify-content-center">
											<Countdown />
											
										</div>
										<ul>
											<li>
												<Link href="/#"><img src="/assets/landing-page/img/icons/calender1.svg" alt="" />30 January 2025 - 6pm to 11:30pm</Link>
											</li>
											<li className="m-0">
												<Link href="/#"><img src="/assets/landing-page/img/icons/location1.svg" alt="" />Secret Location In The UK</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div> */}

					<div className="cta2-section-area">
						<div className="container">
							<div className="row">
								<div className="col-lg-10 m-auto ">
									<div className="cta1-main-boxarea ">
										<div className="timer-btn-area display-flex align-items-center justify-content-center">
											<Countdown />
											
										</div>
										<div className='display-flex align-items-center justify-content-center'>
											<ul >
												<li>
													<Link href="/#"><img src="/assets/landing-page/img/icons/calender1.svg" alt="" />23 Mai 2025 - 6pm to 11:30pm</Link>
												</li>
												<li className="m-0">
													<Link href="/#"><img src="/assets/landing-page/img/icons/location1.svg" alt="" />Palais de la culture d'Abidjan</Link>
												</li>
											</ul>
										</div>
										
									</div>
								</div>
							</div>
						</div>
					</div>
					
				</div>
				
				<Footer1 />
			</Layout>
	)
}