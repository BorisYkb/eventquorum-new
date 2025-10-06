import Countdown from 'src/components/landing-page-components/elements/Countdown'
import RegistrationForm from 'src/components/landing-page-components/elements/RegistrationForm'
import Layout from "src/components/landing-page-components/layout/Layout"
import Link from "next/link"
export default function PricingPlan() {

	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<div className="inner-page-header" style={{ backgroundImage: 'url(/assets/landing-page/img/bg/header-bg16.png)' }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-9 m-auto">
									<div className="heading1 text-center">
										<h1>Plan Tarifaire</h1>
										<div className="space20" />
										<Link href="/">Accueil <i className="fa-solid fa-angle-right" /> <span>Plan Tarifaire</span></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== HERO AREA ENDS =======*/}
					{/*===== PRICING AREA STARTS =======*/}
					<div className="pricing-lan-section-area sp1">
						<div className="container">
							<div className="row">
								<div className="col-lg-5 m-auto">
									<div className="heading2 text-center space-margin60">
										<h5>Prix des tickets pour chaque Activité</h5>
										<div className="space18" />
										<h2>Passe d’événement &amp; Tickets</h2>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-4 col-md-6">
									<div className="pricing-boxarea">
										<h5>Acticité 1</h5>
										<div className="space20" />
										<h2>5000 FCFA<span>/Une Personne</span></h2>
										<div className="space8" />
										<ul>
											<li className='font-bold'><img src="/assets/landing-page/img/icons/check2.svg" alt="" />Conférences plénières inspirantes</li>
											<li>Des intervenants de renommée partageront leurs parcours, leurs réussites et leurs leçons. Chaque conférence est conçue pour inspirer, éveiller de nouvelles idées et offrir une vision claire des tendances de demain.</li>
											
										</ul>
										<div className="space28" />
										<div className="btn-area1">
											<Link href="/connexion" className="vl-btn1">Acheter un Ticket</Link>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="pricing-boxarea">
										<h5>Acticité 2</h5>
										<div className="space20" />
										<h2>2000 FCFA<span>/Une Personne</span></h2>
										<div className="space8" />
										<ul>
											<li><img src="/assets/landing-page/img/icons/check2.svg" alt="" />Ateliers pratiques et interactifs</li>
											<li>Des sessions en petits groupes où les participants pourront mettre en pratique des outils concrets : gestion de projet, innovation digitale, stratégies marketing ou encore leadership. L’objectif : repartir avec des compétences directement applicables.</li>
											
										</ul>
										<div className="space28" />
										<div className="btn-area1">
											<Link href="/connexion" className="vl-btn1">Acheter un Ticket</Link>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="pricing-boxarea">
										<h5>Acticité 3</h5>
										<div className="space20" />
										<h2>1000 FCFA<span>/Une Personne</span></h2>
										<div className="space8" />
										<ul>
											<li><img src="/assets/landing-page/img/icons/check2.svg" alt="" />Panel de discussion avec experts</li>
											<li>Un échange animé entre plusieurs spécialistes qui confronteront leurs points de vue sur les défis et opportunités de 2025. Les participants pourront poser leurs questions en direct et enrichir leur réflexion.</li>
											
										</ul>
										<div className="space28" />
										<div className="btn-area1">
											<Link href="/connexion " className="vl-btn1">Acheter un Ticket</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== PRICING AREA ENDS =======*/}
					
					<RegistrationForm/>
				</div>

			</Layout>
		</>
	)
}