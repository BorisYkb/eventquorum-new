'use client'
import CountUp from 'react-countup'
import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import BrandSlider from '@/components/slider/BrandSlider'
import Link from "next/link"

import Section5 from '@/components/sections/home1/section5'
import PastEventsSection from './component/PastEventsSection'

import SARADescriptionSection from './component/SARADescriptionSection'

import { useState } from 'react'
import Footer1 from '@/components/layout/footer/Footer1'



export default function Page() {

	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<div>
					
					<div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg5.png)' }}>
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
												<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />30 January 2025 - 6pm to 11:30pm</Link>
											</li>
											<li className="m-0">
												<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Secret Location In The UK</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					
				</div>
				
				<Footer1 />
			</Layout>
		</>
	)
}