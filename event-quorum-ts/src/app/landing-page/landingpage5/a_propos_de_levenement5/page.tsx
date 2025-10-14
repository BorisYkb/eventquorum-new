'use client'
import CountUp from 'react-countup'
import Countdown from 'src/components/landing-page-components/elements/Countdown'
import Layout from "src/components/landing-page-components/layout/Layout"
import BrandSlider from 'src/components/landing-page-components/slider/BrandSlider'
import Link from "next/link"

import Section5 from 'src/components/landing-page-components/sections/home1/section5'
import PastEventsSection from './component/PastEventsSection'

import SARADescriptionSection from './component/SARADescriptionSection'

import { useState } from 'react'
import Footer1 from 'src/components/landing-page-components/layout/footer/Footer1'
import Header1_5 from '../Header1_5'
import Section9 from 'src/components/landing-page-components/sections/home5/section9'
import Section12 from 'src/components/landing-page-components/sections/home5/section12'



export default function Page() {

	return (
		<>

			<Layout headerStyle={1_5} footerStyle={4} >
				<Header1_5 />
				<div>
					
					<div className="inner-page-header" style={{ backgroundImage: 'url(assets/landing-page/img/bg/header-bg5.png)' }}>
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

					{/* <div style={{backgroundImage: 'url(assets/landing-page/img/bg/header-bg2.png)'}}>
						<Section9 />
					</div> */}
					
					
					{/*===== CTA AREA STARTS =======*/}
					
					
					<div className="cta1-section-area d-lg-block d-block">
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
					</div>

					
					
				</div>
				
				{/* <Footer1 /> */}
			</Layout>
		</>
	)
}