'use client'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Clock, MapPin, Ticket, TicketsPlane } from 'lucide-react'
import ModalVideo from 'react-modal-video'

import Countdown from 'src/components/landing-page-components/elements/Countdown'
import Layout from "src/components/landing-page-components/layout/Layout"
import Link from "next/link"
import Section4 from 'src/components/landing-page-components/sections/home1/section4'
import Footer2 from 'src/components/landing-page-components/layout/footer/Footer2'
import Footer1 from 'src/components/landing-page-components/layout/footer/Footer1'
import Section4activite from 'src/components/landing-page-components/sections/home1/Section4activite'

// Images pour la galerie
const galleryImages = [
  { id: 1, src: '/assets/landing-page/img/sara/sara1.jpg', alt: 'Laboratoire de Recherche SARA' },
  { id: 2, src: '/assets/landing-page/img/sara/sara2.jpeg', alt: 'Conférence principale' },
  { id: 3, src: '/assets/landing-page/img/sara/sara3.jpeg', alt: 'Networking et échanges' },
  { id: 4, src: '/assets/landing-page/img/sara/sara4.jpeg', alt: 'Public attentif' },
  { id: 5, src: '/assets/landing-page/img/sara/sara5.jpg', alt: 'Tests sur le Terrain' },
  { id: 6, src: '/assets/landing-page/img/sara/sara6.jpg', alt: 'Centre d\'Innovation' },
  { id: 7, src: '/assets/landing-page/img/sara/sara7.jpg', alt: 'Agriculture Durable' },
  { id: 8, src: '/assets/landing-page/img/sara/sara8.jpg', alt: 'Présentation startup' },
  { id: 9, src: '/assets/landing-page/img/sara/sara9.jpg', alt: 'Remise de prix' }
]

// Images à afficher dans la sidebar (2 premières)
const sidebarImages = galleryImages.slice(0, 2)

export default function SaraActivityDetail() {
	const [isOpen, setOpen] = useState(false)
	const [isGalleryOpen, setIsGalleryOpen] = useState(false)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	const openGallery = (imageIndex: number) => {
		setCurrentImageIndex(imageIndex)
		setIsGalleryOpen(true)
		document.body.style.overflow = 'hidden'
	}

	const closeGallery = () => {
		setIsGalleryOpen(false)
		document.body.style.overflow = 'unset'
	}

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
	}

	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
	}

	const goToImage = (index: number) => {
		setCurrentImageIndex(index)
	}

	return (
		<>
			<style jsx>{`
				.activity-detail-container {
					padding: 0;
				}

				.inner-page-header {
					background-size: cover;
					background-position: center;
					padding: 120px 0 80px;
					position: relative;
				}

				.inner-page-header::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: rgba(0, 0, 0, 0.4);
				}

				.inner-page-header .container {
					position: relative;
					z-index: 2;
				}

				.blog-details-section {
					padding: 80px 0;
				}

				.blog-deatils-content ul {
					list-style: none;
					padding: 0;
					margin-bottom: 20px;
					display: flex;
					flex-wrap: wrap;
					gap: 20px;
				}

				.blog-deatils-content ul li {
					display: flex;
					align-items: center;
					font-size: 14px;
					color: #666;
				}

				.blog-deatils-content ul li a {
					display: flex;
					align-items: center;
					text-decoration: none;
					color: #666;
				}

				.blog-deatils-content ul li .icon {
					margin-right: 8px;
					color: #3b82f6;
				}

				.blog-deatils-content h2 {
					font-size: 2.5rem;
					font-weight: bold;
					color: #1f2937;
					margin-bottom: 16px;
					line-height: 1.2;
				}

				.blog-deatils-content h3 {
					font-size: 1.8rem;
					font-weight: 600;
					color: #1f2937;
					margin-bottom: 16px;
				}

				.blog-deatils-content p {
					font-size: 1.125rem;
					line-height: 1.7;
					color: #4b5563;
					margin-bottom: 16px;
				}

				.blog-images-sidebar {
					display: flex;
					flex-direction: column;
					gap: 20px;
				}

				.sidebar-image-container {
					position: relative;
					cursor: pointer;
					border-radius: 12px;
					overflow: hidden;
					box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
					transition: all 0.3s ease;
					height: 280px;
				}

				.sidebar-image-container:hover {
					box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
					transform: translateY(-2px);
				}

				.sidebar-image {
					width: 100%;
					height: 100%;
					object-fit: cover;
					transition: transform 0.3s ease;
				}

				.sidebar-image-container:hover .sidebar-image {
					transform: scale(1.05);
				}

				.image-overlay {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-color: rgba(0, 0, 0, 0);
					display: flex;
					align-items: center;
					justify-content: center;
					transition: all 0.3s ease;
				}

				.sidebar-image-container:hover .image-overlay {
					background-color: rgba(0, 0, 0, 0.3);
				}

				.overlay-icon {
					color: white;
					opacity: 0;
					transition: opacity 0.3s ease;
				}

				.sidebar-image-container:hover .overlay-icon {
					opacity: 1;
				}

				.gallery-indicator {
					position: absolute;
					bottom: 15px;
					right: 15px;
					background: rgba(0, 0, 0, 0.7);
					color: white;
					padding: 8px 12px;
					border-radius: 20px;
					font-size: 0.875rem;
					font-weight: 500;
				}

				.modal {
					position: fixed;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					z-index: 1000;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.modal-overlay {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-color: rgba(0, 0, 0, 0.9);
					cursor: pointer;
				}

				.modal-content {
					position: relative;
					z-index: 10;
					max-width: 90vw;
					width: 100%;
					padding: 1rem;
				}

				.close-button {
					position: absolute;
					top: 1rem;
					right: 1rem;
					background: none;
					border: none;
					color: white;
					cursor: pointer;
					z-index: 20;
					padding: 0.5rem;
				}

				.modal-image {
					width: 100%;
					height: auto;
					max-height: 70vh;
					object-fit: contain;
					margin: 0 auto;
					display: block;
				}

				.nav-button {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					background: rgba(0, 0, 0, 0.5);
					border: none;
					color: white;
					cursor: pointer;
					border-radius: 50%;
					padding: 0.5rem;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.prev-button {
					left: 1rem;
				}

				.next-button {
					right: 1rem;
				}

				.thumbnails {
					display: flex;
					justify-content: center;
					margin-top: 1rem;
					gap: 0.5rem;
					overflow-x: auto;
					padding-bottom: 1rem;
				}

				.thumbnail {
					width: 60px;
					height: 45px;
					border-radius: 4px;
					overflow: hidden;
					cursor: pointer;
					border: none;
					padding: 0;
					flex-shrink: 0;
					opacity: 0.7;
				}

				.thumbnail:hover {
					opacity: 1;
				}

				.thumbnail-active {
					outline: 2px solid #3b82f6;
					opacity: 1;
				}

				.thumbnail-image {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}

				.counter {
					text-align: center;
					color: white;
					margin-top: 0.5rem;
					font-size: 0.875rem;
				}

				.cta1-section-area {
					background: #f8fafc;
					padding: 60px 0;
				}

				/* Responsive Design */
				@media (max-width: 1024px) {
					.blog-details-section {
						padding: 60px 0;
					}

					.blog-deatils-content h2 {
						font-size: 2rem;
					}

					.blog-deatils-content h3 {
						font-size: 1.5rem;
					}

					.sidebar-image-container {
						height: 220px;
					}
				}

				@media (max-width: 768px) {
					.inner-page-header {
						padding: 100px 0 60px;
					}

					.blog-details-section {
						padding: 40px 0;
					}

					.blog-deatils-content ul {
						flex-direction: column;
						gap: 10px;
					}

					.blog-deatils-content h2 {
						font-size: 1.75rem;
					}

					.blog-deatils-content h3 {
						font-size: 1.25rem;
					}

					.blog-deatils-content p {
						font-size: 1rem;
					}

					.blog-images-sidebar {
						flex-direction: row;
						gap: 15px;
					}

					.sidebar-image-container {
						height: 180px;
						flex: 1;
					}

					.modal-content {
						max-width: 95vw;
						padding: 0.5rem;
					}

					.nav-button {
						padding: 0.25rem;
					}

					.prev-button {
						left: 0.5rem;
					}

					.next-button {
						right: 0.5rem;
					}

					.thumbnails {
						gap: 0.25rem;
						margin-top: 0.5rem;
					}

					.thumbnail {
						width: 50px;
						height: 38px;
					}
				}

				@media (max-width: 480px) {
					.inner-page-header {
						padding: 80px 0 40px;
					}

					.blog-details-section {
						padding: 30px 0;
					}

					.blog-deatils-content h2 {
						font-size: 1.5rem;
					}

					.blog-deatils-content h3 {
						font-size: 1.1rem;
					}

					.blog-deatils-content p {
						font-size: 0.95rem;
					}

					.blog-images-sidebar {
						flex-direction: column;
					}

					.sidebar-image-container {
						height: 200px;
					}

					.modal-content {
						padding: 0.25rem;
					}

					.thumbnails {
						flex-wrap: wrap;
						justify-content: flex-start;
					}

					.thumbnail {
						width: 45px;
						height: 34px;
					}

					.cta1-section-area {
						padding: 40px 0;
					}
				}
			`}</style>

			<Layout headerStyle={1} footerStyle={1}>
				<div className="activity-detail-container">
					<div className="inner-page-header" style={{ backgroundImage: 'url(assets/landing-page/img/bg/header-bg14.png)' }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-6 m-auto">
									<div className="heading1 text-center">
										<h1>Détail de l'Activité</h1>
										
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== HERO AREA ENDS =======*/}
					
					{/*===== SARA ACTIVITY DETAILS AREA STARTS =======*/}
					<div className="blog-details-section sp8">
						<div className="container">
							<div className="row">
								<div className="col-lg-8">
									<div className="blog-deatils-content heading2">
										<ul>
											<li>
												<Link href="#">
													<svg className="icon" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
														<path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
													</svg>
													15-17 Février 2025 <span> | </span>
												</Link>
											</li>
											<li>
												<Link href="#">
													<Clock className="icon" size={16} />
													09H 30 - 12H 00 <span> | </span>
												</Link>
											</li>
											<li>
												<Link href="#">
													<MapPin className="icon" size={16} />
													Palais de la Culture
												</Link>
											</li>
											{/* <li>
												<Link href="#">
													<Ticket className="icon" size={18} />
													Paiement unique pour toutes les activités
												</Link>
											</li> */}
										</ul>
										<div className="space18" />
										<h2>Technologies Innovantes pour l'Agriculture Africaine Durable</h2>
										<div className="space16" />
										<p>Le SARA 2025 présente une session révolutionnaire dédiée aux technologies agricoles de pointe adaptées au contexte africain. Cette activité phare rassemble les meilleurs experts en agrotechnologie, chercheurs et entrepreneurs agricoles pour explorer les solutions innovantes qui transformeront l'agriculture africaine.</p>
										
										<div className="space32" />
										<h3>🌱 Objectifs de l'Activité</h3>
										<div className="space16" />
										<p><strong>Présentation des Technologies Émergentes :</strong> Découvrez les dernières innovations en agriculture de précision, intelligence artificielle et biotechnologies adaptées aux conditions climatiques africaines.</p>
										<div className="space16" />
										<p><strong>Démonstrations Pratiques :</strong> Assistez à des démonstrations de drones agricoles, capteurs IoT pour l'irrigation intelligente, et applications mobiles pour le diagnostic des cultures.</p>
									</div>
								</div>
								
								<div className="col-lg-4">
									<div className="space30 d-lg-none d-block" />
									<div className="blog-images-sidebar">
										{sidebarImages.map((image, index) => (
											<div 
												key={image.id}
												className="sidebar-image-container"
												onClick={() => openGallery(index)}
											>
												<img
													src={image.src}
													alt={image.alt}
													className="sidebar-image"
												/>
												<div className="image-overlay">
													<div className="overlay-icon">
														<svg width="32" height="32" fill="currentColor" viewBox="0 0 20 20">
															<path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm5 3a2 2 0 11-4 0 2 2 0 014 0zm4.5 1.5a.5.5 0 11-1 0 .5.5 0 011 0z" clipRule="evenodd" />
														</svg>
													</div>
												</div>
												{index === 1 && (
													<div className="gallery-indicator">
														+{galleryImages.length - 2} photos
													</div>
												)}
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== SARA ACTIVITY DETAILS AREA ENDS =======*/}

					<Section4activite/>

					{/*===== CTA AREA STARTS =======*/}
					<div className="cta1-section-area d-lg-block d-block">
						<div className="container">
							<div className="row">
								<div className="col-lg-10 m-auto ">
									<div className="cta1-main-boxarea">
										<div className="timer-btn-area display-flex align-items-center justify-content-center">
											<Countdown />
										</div>
										<ul>
											<li>
												<Link href="#">
													<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
														<path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
													</svg>
													15-17 Février 2025 - Programme complet 3 jours
												</Link>
											</li>
											<li className="m-0">
												<Link href="#">
													<MapPin size={16} />
													Centre d'Abidjan
												</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== CTA AREA ENDS =======*/}
				</div>

				{/* Modal de galerie */}
				{isGalleryOpen && (
					<div className="modal">
						{/* Overlay */}
						<div 
							className="modal-overlay"
							onClick={closeGallery}
						></div>

						{/* Contenu du modal */}
						<div className="modal-content">
							{/* Bouton fermer */}
							<button
								onClick={closeGallery}
								className="close-button"
							>
								<X size={32} />
							</button>

							{/* Image principale */}
							<div style={{ position: 'relative' }}>
								<img
									src={galleryImages[currentImageIndex].src}
									alt={galleryImages[currentImageIndex].alt}
									className="modal-image"
								/>

								{/* Boutons navigation */}
								<button
									onClick={prevImage}
									className="nav-button prev-button"
								>
									<ChevronLeft size={24} />
								</button>

								<button
									onClick={nextImage}
									className="nav-button next-button"
								>
									<ChevronRight size={24} />
								</button>
							</div>

							{/* Miniatures */}
							<div className="thumbnails">
								{galleryImages.map((image, index) => (
									<button
										key={image.id}
										onClick={() => goToImage(index)}
										className={`thumbnail ${index === currentImageIndex ? 'thumbnail-active' : ''}`}
									>
										<img
											src={image.src}
											alt={image.alt}
											className="thumbnail-image"
										/>
									</button>
								))}
							</div>

							{/* Compteur */}
							<div className="counter">
								<span>
									{currentImageIndex + 1} / {galleryImages.length}
								</span>
							</div>
						</div>
					</div>
				)}

				<Footer1 />
			</Layout>
		</>
	)
}