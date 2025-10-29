'use client'

import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"

export default function Tarif4() {
    return (
        <div>
                {/*===== PRICING AREA STARTS =======*/}
					<div className="pricing-lan-section-area sp1">
						<div className="container">
							<div className="row">
								<div className="col-lg-5 m-auto">
									<div className="heading2 text-center space-margin60">
										<h5>Plan Tarifaire</h5>
										<div className="space18" />
										<h2>Choisissez votre Type d'Accès</h2>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-4 col-md-6">
									<div className="pricing-boxarea">
										<h5>Standard</h5>
										<div className="space20" />
										<h2>1000 FCFA<span>/Une Personne</span></h2>
										
										
										<div className="space28" />
										<div className="btn-area1">
											<Link href="/landing-page/landingpage4/inscription4" className="px-3 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors duration-200 uppercase">Acheter un Ticket</Link>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="pricing-boxarea">
										<h5>Vip</h5>
										<div className="space20" />
										<h2>2000 FCFA<span>/Une Personne</span></h2>
										
										
										<div className="space28" />
										<div className="btn-area1">
											<Link href="/landing-page/landingpage4/inscription4" className="px-3 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors duration-200 uppercase">
												Acheter un Ticket
											</Link>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="pricing-boxarea">
										<h5>Vvip</h5>
										<div className="space20" />
										<h2>5000 FCFA<span>/Une Personne</span></h2>
										
										<div className="space28" />
										<div className="btn-area1">
											<Link href="/landing-page/landingpage4/inscription4 " className="px-3 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors duration-200 uppercase">Acheter un Ticket</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== PRICING AREA ENDS =======*/}
            </div>
    )
}