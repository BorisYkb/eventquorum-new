"use client"
import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import ModernPagination from "../../components/elements/ModernPagination" // Nouveau composant de pagination
import Link from "next/link"
import React, { useState, useEffect } from "react"
import RegistrationForm from '@/components/elements/RegistrationForm'

/**
 * Page des événements avec pagination moderne
 * Affiche la liste des activités d'un événement avec navigation paginée
 */
export default function Event() {
	// Liste des activités de l'événement
	const activities = [
		{
			id: 1,
			img: "/assets/img/all-images/event/event-img4.png",
			title: "Conférences plénières inspirantes",
			speakers: [
				{ 
					img: "/assets/img/all-images/testimonials/testimonial-img1.png", 
					name: "Alex Roberton", 
					role: "UI/UX Designer" 
				},
				{ 
					img: "/assets/img/all-images/testimonials/testimonial-img2.png", 
					name: "Alexys Archer", 
					role: "WP Developer" 
				}
			],
			time: "10.00 AM - 12.00 PM",
			location: "Espace Event, II Plateau / Abidjan"
		},
		{
			id: 2,
			img: "/assets/img/all-images/event/event-img5.png",
			title: "Ateliers pratiques et interactifs",
			speakers: [
				{ 
					img: "/assets/img/all-images/testimonials/testimonial-img1.png", 
					name: "Alex Roberton", 
					role: "UI/UX Designer" 
				},
				{ 
					img: "/assets/img/all-images/testimonials/testimonial-img2.png", 
					name: "Alexys Archer", 
					role: "WP Developer" 
				}
			],
			time: "14.00 PM - 16.00 PM",
			location: "Salle de formation, II Plateau / Abidjan"
		},
		{
			id: 3,
			img: "/assets/img/all-images/event/event-img6.png",
			title: "Panel de discussion avec experts",
			speakers: [
				{ 
					img: "/assets/img/all-images/testimonials/testimonial-img1.png", 
					name: "Alex Roberton", 
					role: "UI/UX Designer" 
				},
				{ 
					img: "/assets/img/all-images/testimonials/testimonial-img2.png", 
					name: "Alexys Archer", 
					role: "WP Developer" 
				}
			],
			time: "16.30 PM - 18.00 PM",
			location: "Auditorium principal, II Plateau / Abidjan"
		},
		{
			id: 4,
			img: "/assets/img/all-images/event/event-img4.png",
			title: "Session de networking",
			speakers: [
				{ 
					img: "/assets/img/all-images/testimonials/testimonial-img1.png", 
					name: "Marie Kouassi", 
					role: "Business Coach" 
				},
				{ 
					img: "/assets/img/all-images/testimonials/testimonial-img2.png", 
					name: "Jean-Claude Brou", 
					role: "Entrepreneur" 
				}
			],
			time: "18.30 PM - 20.00 PM",
			location: "Espace networking, II Plateau / Abidjan"
		},
		{
			id: 5,
			img: "/assets/img/all-images/event/event-img5.png",
			title: "Cérémonie de clôture",
			speakers: [
				{ 
					img: "/assets/img/all-images/testimonials/testimonial-img1.png", 
					name: "Dr. Aminata Traoré", 
					role: "Directrice générale" 
				}
			],
			time: "20.00 PM - 21.00 PM",
			location: "Grand auditorium, II Plateau / Abidjan"
		}
	];

	// États pour la gestion de la pagination
	const [currentPage, setCurrentPage] = useState(1);
	const activitiesPerPage = 1; // Nombre d'activités par page
	const totalPages = Math.ceil(activities.length / activitiesPerPage);

	/**
	 * Effet pour le défilement automatique des activités
	 * Change de page toutes les 6 secondes
	 */
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPage(prev =>
				prev < totalPages ? prev + 1 : 1
			);
		}, 6000); // 6 secondes pour laisser plus de temps de lecture
		
		return () => clearInterval(interval);
	}, [totalPages]);

	/**
	 * Gère le changement de page via la pagination
	 * @param {number} page - Le numéro de la nouvelle page
	 */
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	// Calcul des activités à afficher sur la page actuelle
	const indexOfLast = currentPage * activitiesPerPage;
	const indexOfFirst = indexOfLast - activitiesPerPage;
	const currentActivities = activities.slice(indexOfFirst, indexOfLast);

	return (
		<>
			<Layout headerStyle={1} footerStyle={1}>
				<div>
					{/* En-tête de la page avec image de fond */}
					<div 
						className="inner-page-header" 
						style={{ backgroundImage: 'url(assets/img/bg/header-bg8.png)' }}
					>
						<div className="container">
							<div className="row">
								<div className="col-lg-6 m-auto">
									<div className="heading1 text-center">
										<h1>Liste des Activités</h1>
										<div className="space20" />
										<Link href="/">
											Accueil <i className="fa-solid fa-angle-right" /> 
											<span>Liste des Activités</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					{/* Section principale des événements */}
					<div className="event-team-area sp1">
						<div className="container">
							{/* Titre de la section */}
							<div className="row">
								<div className="col-lg-8 m-auto">
									<div className="heading2 text-center space-margin60">
										<h2>
											Historique des Activités de l'événement 
											"Innover et Réussir en 2025"
										</h2>
										<p className="mt-3 text-muted">
											Découvrez le programme complet de notre événement 
											avec des conférences inspirantes et des ateliers pratiques.
										</p>
									</div>
								</div>
							</div>
							
							{/* Liste des activités */}
							<div className="row">
								<div className="col-lg-12">
									<div className="event-widget-area">
										<div className="row">
											<div className="col-lg-10 m-auto">
												{currentActivities.map((activity, idx) => (
													<div 
														className="event2-boxarea box1" 
														key={activity.id}
														style={{
															opacity: 0,
															animation: 'fadeInUp 0.6s ease forwards',
															animationDelay: `${idx * 0.1}s`
														}}
													>
														{/* Numéro de l'activité */}
														<h1 className="active">
															{String(activity.id).padStart(2, '0')}
														</h1>
														
														<div className="row align-items-center">
															{/* Image de l'activité */}
															<div className="col-lg-5">
																<div className="img1">
																	<img 
																		src={activity.img} 
																		alt={activity.title}
																		loading="lazy"
																	/>
																</div>
															</div>
															
															<div className="col-lg-1" />
															
															{/* Contenu de l'activité */}
															<div className="col-lg-6">
																<div className="content-area">
																	{/* Informations pratiques */}
																	<ul>
																		<li>
																			<Link href="/#">
																				<img 
																					src="/assets/img/icons/clock1.svg" 
																					alt="Horaire" 
																				/>
																				{activity.time}
																				<span> | </span>
																			</Link>
																		</li>
																		<li>
																			<Link href="/#">
																				<img 
																					src="/assets/img/icons/location1.svg" 
																					alt="Localisation" 
																				/>
																				{activity.location}
																			</Link>
																		</li>
																	</ul>
																	
																	<div className="space20" />
																	
																	{/* Titre de l'activité */}
																	<Link 
																		href="/event-single" 
																		className="head"
																	>
																		{activity.title}
																	</Link>
																	
																	<div className="space24" />
																	
																	{/* Intervenants */}
																	<div className="author-area">
																		{activity.speakers.map((speaker, i) => (
																			<div 
																				className="autho-name-area" 
																				key={i} 
																				style={i === 1 ? { 
																					padding: '0 0 0 12px', 
																					border: 'none' 
																				} : {}}
																			>
																				<div className="img1">
																					<img 
																						src={speaker.img} 
																						alt={speaker.name}
																						loading="lazy"
																					/>
																				</div>
																				<div className="text">
																					<Link href="/speakers-single">
																						{speaker.name}
																					</Link>
																					<div className="space8" />
																					<p>{speaker.role}</p>
																				</div>
																			</div>
																		))}
																	</div>
																	
																	<div className="space24" />
																	
																	{/* Bouton de participation */}
																	<div className="btn-area1">
																		<Link 
																			href="/plan_tarifaire" 
																			className="vl-btn1"
																		>
																			<span className="demo">
																				Participer
																			</span>
																		</Link>
																	</div>
																</div>
															</div>
														</div>
													</div>
												))}
											</div>
										</div>
										
										{/* Espacement */}
										<div className="space48" />
										
										{/* Pagination moderne */}
										<div className="d-flex justify-content-center">
											<ModernPagination
												currentPage={currentPage}
												totalPages={totalPages}
												onPageChange={handlePageChange}
												siblingCount={1}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<RegistrationForm/>
				</div>
			</Layout>
			
			{/* Styles CSS pour les animations */}
			<style jsx>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				
				.event2-boxarea {
					transition: all 0.3s ease;
				}
				
				.event2-boxarea:hover {
					transform: translateY(-5px);
					box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
				}
			`}</style>
		</>
	)
}