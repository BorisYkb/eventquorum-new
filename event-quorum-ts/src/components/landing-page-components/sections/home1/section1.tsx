
"use client"

import Link from 'next/link'

import Countdown from 'src/components/landing-page-components/elements/Countdown'


export default function Section1() {
	
	return (
		<div className="hero1-section-area">
				<div className="bg1">
					<img src="/assets/landing-page/img/bg/header-bg2.png" alt="" className="header-bg1" />
				</div>
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<div className="hero1-header heading1">
								<h5 data-aos="fade-left" data-aos-duration={800}><img src="/assets/landing-page/img/icons/sub-logo1.svg" alt="" />Objectif principal, innover avec passion</h5>
								<div className="space16" />
								<h1 className="text-anime-style-3">
									Thème :
									<br className="d-lg-block d-none" />
									Innover et Réussir en 2025
								</h1>
								<div className="space16" />
								<p data-aos="fade-left" data-aos-duration={900}>
									Cette conférence est bien plus qu’un simple rassemblement : <br className="d-lg-block d-none" />
									c’est un véritable rendez-vous d’inspiration et d’opportunités.
								</p>
								<div className="space32" />
								<div className="btn-area1" data-aos="fade-left" data-aos-duration={1100}>
									<Link href="/landingpage/inscription" className="vl-btn1 border-0">S'inscrire</Link>
									<Link href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F" className="vl-btn2">Se Connecter</Link>
								</div>
							</div>
						</div>
						<div className="col-lg-5">
							<div className="header-images">
								<div className="img1" data-aos="zoom-in" data-aos-duration={1000}>
									<img src="/assets/landing-page/img/all-images/hero/hero-img1.png" alt="" />
								</div>
								<div className="images-content-area" data-aos="fade-up" data-aos-duration={900}>
									<h3>LE SOMMET DE L’INNOVATION</h3>
									<div className="space12" />
									<Link href="#">15-16 Septembre, 2025</Link>
									<div className="space12" />
									<Link href="#">ABIDJAN MALL, ABIDJAN COCODY</Link>
									<div className="space16" />
									<p>La conférence “Innover et Réussir en 2025” est une expérience qui peut transformer votre vision et ouvrir de nouvelles portes.</p>
								</div>
							</div>
						</div>
						<div className="col-lg-1">
							<Countdown />
						</div>
					</div>
				</div>
			</div>
	)
}
