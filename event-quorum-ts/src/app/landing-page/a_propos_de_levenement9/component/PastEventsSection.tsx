'use client'
import Link from 'next/link'

export default function PastEventsSection() {
	return (
		<>
			{/*===== PAST EVENTS SECTION STARTS =======*/}
			<div id="evenement_recent" className="past-events-section sp2">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="heading2 text-center space-margin60">
								<h5>Notre Expérience</h5>
								<div className="space18" />
								<h2 className="text-anime-style-3">Nos Événements Passés</h2>
								<div className="space16" />
								<p>Découvrez notre riche expérience à travers les événements majeurs où nous avons été présents.</p>
							</div>
						</div>
					</div>
					<div className="row">
						{/* Événement 1 */}
						<div className="col-lg-4 col-md-6 mb-4">
							<div className="past-event-card" data-aos="fade-up" data-aos-duration={600}>
								<div className="event-image-container">
									<img 
										src="/assets/img/event_img/R.jpeg" 
										alt="Salon de l'Agriculture 2023" 
										className="img-fluid"
									/>
									<div className="event-overlay">
										<div className="event-year">2023</div>
									</div>
								</div>
								<div className="event-content">
									<h4>Salon de l'Agriculture 2023</h4>
									<p className="event-location">
										<i className="fa-solid fa-location-dot me-2"></i>
										Paris, France
									</p>
									<p className="event-description">
										Une participation remarquée au plus grand salon agricole européen avec plus de 600 000 visiteurs.
									</p>
								</div>
							</div>
						</div>

						{/* Événement 2 */}
						<div className="col-lg-4 col-md-6 mb-4">
							<div className="past-event-card" data-aos="fade-up" data-aos-duration={800}>
								<div className="event-image-container">
									<img 
										src="/assets/img/past-events/forum-agro-abidjan-2022.png" 
										alt="Forum Agro Abidjan 2022" 
										className="img-fluid"
									/>
									<div className="event-overlay">
										<div className="event-year">2022</div>
									</div>
								</div>
								<div className="event-content">
									<h4>Forum Agro Abidjan 2022</h4>
									<p className="event-location">
										<i className="fa-solid fa-location-dot me-2"></i>
										Abidjan, Côte d'Ivoire
									</p>
									<p className="event-description">
										Premier forum dédié à l'agriculture moderne en Afrique de l'Ouest avec 200 exposants.
									</p>
								</div>
							</div>
						</div>

						{/* Événement 3 */}
						<div className="col-lg-4 col-md-6 mb-4">
							<div className="past-event-card" data-aos="fade-up" data-aos-duration={1000}>
								<div className="event-image-container">
									<img 
										src="/assets/img/past-events/agritech-summit-2023.jpg" 
										alt="AgriTech Summit 2023" 
										className="img-fluid"
									/>
									<div className="event-overlay">
										<div className="event-year">2023</div>
									</div>
								</div>
								<div className="event-content">
									<h4>AgriTech Summit 2023</h4>
									<p className="event-location">
										<i className="fa-solid fa-location-dot me-2"></i>
										Nairobi, Kenya
									</p>
									<p className="event-description">
										Sommet international sur les technologies agricoles innovantes réunissant 150 startups.
									</p>
								</div>
							</div>
						</div>

						{/* Événement 4 */}
						<div className="col-lg-4 col-md-6 mb-4">
							<div className="past-event-card" data-aos="fade-up" data-aos-duration={600}>
								<div className="event-image-container">
									<img 
										src="/assets/img/past-events/expo-elevage-2022.png" 
										alt="Expo Élevage 2022" 
										className="img-fluid"
									/>
									<div className="event-overlay">
										<div className="event-year">2022</div>
									</div>
								</div>
								<div className="event-content">
									<h4>Expo Élevage 2022</h4>
									<p className="event-location">
										<i className="fa-solid fa-location-dot me-2"></i>
										Ouagadougou, Burkina Faso
									</p>
									<p className="event-description">
										Exposition dédiée à l'élevage moderne et aux ressources animales en Afrique subsaharienne.
									</p>
								</div>
							</div>
						</div>

						{/* Événement 5 */}
						<div className="col-lg-4 col-md-6 mb-4">
							<div className="past-event-card" data-aos="fade-up" data-aos-duration={800}>
								<div className="event-image-container">
									<img 
										src="/assets/img/past-events/forum-peche-2023.jpg" 
										alt="Forum de la Pêche 2023" 
										className="img-fluid"
									/>
									<div className="event-overlay">
										<div className="event-year">2023</div>
									</div>
								</div>
								<div className="event-content">
									<h4>Forum de la Pêche 2023</h4>
									<p className="event-location">
										<i className="fa-solid fa-location-dot me-2"></i>
										Dakar, Sénégal
									</p>
									<p className="event-description">
										Rencontre internationale sur les ressources halieutiques et la pêche durable.
									</p>
								</div>
							</div>
						</div>

						{/* Événement 6 */}
						<div className="col-lg-4 col-md-6 mb-4">
							<div className="past-event-card" data-aos="fade-up" data-aos-duration={1000}>
								<div className="event-image-container">
									<img 
										src="/assets/img/past-events/conference-foret-2024.jpeg" 
										alt="Conférence Forêt 2024" 
										className="img-fluid"
									/>
									<div className="event-overlay">
										<div className="event-year">2024</div>
									</div>
								</div>
								<div className="event-content">
									<h4>Conférence Forêt 2024</h4>
									<p className="event-location">
										<i className="fa-solid fa-location-dot me-2"></i>
										Libreville, Gabon
									</p>
									<p className="event-description">
										Grande conférence sur la gestion durable des ressources forestières en Afrique centrale.
									</p>
								</div>
							</div>
						</div>
					</div>

					
				</div>
			</div>
			{/*===== PAST EVENTS SECTION ENDS =======*/}

			<style jsx>{`
				.past-events-section {
					background: #f8f9fa;
					position: relative;
				}

				.past-event-card {
					background: #fff;
					border-radius: 15px;
					overflow: hidden;
					box-shadow: 0 5px 20px rgba(0,0,0,0.08);
					transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
					height: 100%;
				}

				.past-event-card:hover {
					transform: translateY(-10px);
					box-shadow: 0 20px 40px rgba(0,0,0,0.15);
				}

				.event-image-container {
					position: relative;
					height: 250px;
					overflow: hidden;
				}

				.event-image-container img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					transition: transform 0.4s ease;
				}

				.past-event-card:hover .event-image-container img {
					transform: scale(1.1);
				}

				.event-overlay {
					position: absolute;
					top: 15px;
					right: 15px;
					background: rgba(255, 255, 255, 0.9);
					backdrop-filter: blur(10px);
					border-radius: 20px;
					padding: 5px 15px;
				}

				.event-year {
					font-weight: 700;
					color: #1A1719;
					font-size: 14px;
				}

				.event-content {
					padding: 25px;
				}

				.event-content h4 {
					font-size: 20px;
					font-weight: 700;
					color: #1A1719;
					margin-bottom: 15px;
					line-height: 1.3;
				}

				.event-location {
					color: #666;
					font-size: 14px;
					margin-bottom: 12px;
					display: flex;
					align-items: center;
				}

				.event-location i {
					color: #28a745;
				}

				.event-description {
					color: #555;
					font-size: 15px;
					line-height: 1.6;
					margin-bottom: 0;
				}

				.cta-content {
					background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
					color: white;
					padding: 40px;
					border-radius: 20px;
				}

				.cta-content h3 {
					color: white;
					margin-bottom: 15px;
				}

				.cta-content p {
					color: rgba(255,255,255,0.9);
				}

				.vl-btn2 {
					background: rgba(255,255,255,0.2);
					border: 2px solid rgba(255,255,255,0.3);
					color: white;
					padding: 12px 30px;
					border-radius: 50px;
					text-decoration: none;
					display: inline-flex;
					align-items: center;
					transition: all 0.3s ease;
				}

				.vl-btn2:hover {
					background: rgba(255,255,255,0.3);
					transform: translateY(-2px);
					color: white;
				}

				@media (max-width: 768px) {
					.event-image-container {
						height: 200px;
					}
					
					.event-content {
						padding: 20px;
					}
					
					.event-content h4 {
						font-size: 18px;
					}
					
					.cta-content {
						padding: 30px 20px;
					}
				}
			`}</style>
		</>
	)
}