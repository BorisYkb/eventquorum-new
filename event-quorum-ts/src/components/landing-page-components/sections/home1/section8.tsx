
import Link from 'next/link'

export default function Section8() {
	return (
		<>

			<div className="blog1-section-area sp2">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="blog-header text-center heading2 space-margin60">
								<h5 data-aos="fade-left" data-aos-duration={900}>Nouvelles &amp; Mise à jour des acticités</h5>
								<div className="space16" />
								<h2 className="text-anime-style-3">Quelques Activités liées à l'événement</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={800}>
							<div className="blog1-auhtor-boxarea">
								<div className="img1 image-anime">
									<img src="/assets/landing-page/img/all-images/blog/blog-img1.png" alt="" />
								</div>
								<div className="content-area">
									<ul>
										<li>
											<Link href="/#"><img src="/assets/landing-page/img/icons/calender1.svg" alt="" />15 Septembre 2025</Link>
										</li>
									</ul>
									<div className="space20" />
									<Link href="/#">Conférences plénières inspirantes</Link>
									<div className="space24" />
									<p>Des intervenants de renommée partageront leurs parcours, leurs réussites et leurs leçons. Chaque conférence est conçue pour inspirer, éveiller de nouvelles idées et offrir une vision claire des tendances de demain.</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={1000}>
							<div className="blog1-auhtor-boxarea">
								<div className="img1 image-anime">
									<img src="/assets/landing-page/img/all-images/blog/blog-img2.png" alt="" />
								</div>
								<div className="content-area">
									<ul>
										<li>
											<Link href="/#"><img src="/assets/landing-page/img/icons/calender1.svg" alt="" />16 Septembre 2025</Link>
										</li>
									</ul>
									<div className="space20" />
									<Link href="/#">Ateliers pratiques et interactifs</Link>
									<div className="space24" />
									<p>Des sessions en petits groupes où les participants pourront mettre en pratique des outils concrets : gestion de projet, innovation digitale, stratégies marketing ou encore leadership. L’objectif : repartir avec des compétences directement applicables.</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={1200}>
							<div className="blog1-auhtor-boxarea">
								<div className="img1 image-anime">
									<img src="/assets/landing-page/img/all-images/blog/blog-img3.png" alt="" />
								</div>
								<div className="content-area">
									<ul>
										<li>
											<Link href="/#"><img src="/assets/landing-page/img/icons/calender1.svg" alt="" />16 Septembre 2025</Link>
										</li>
									</ul>
									<div className="space20" />
									<Link href="/#">Panel de discussion avec experts</Link>
									<div className="space24" />
									<p>Un échange animé entre plusieurs spécialistes qui confronteront leurs points de vue sur les défis et opportunités de 2025. Les participants pourront poser leurs questions en direct et enrichir leur réflexion.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
