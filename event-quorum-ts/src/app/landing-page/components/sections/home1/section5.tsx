'use client'
import { useState } from 'react'
import ModalVideo from 'react-modal-video'


export default function Section5() {
	const [isOpen, setOpen] = useState(false)
	return (
		<>
			<div className="video-presentation-section sp1" style={{
				backgroundColor: '#ffffffff', // Fond beige
				backgroundImage: 'url(/assets/img/elements/elements13.png)',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				position: 'relative',
				paddingBottom: '0',
				
			}}>
				{/* Overlay beige semi-transparent pour conserver la lisibilité */}
				<div style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					padding: '0',
					margin: '0',
					zIndex: 1
				}}></div>

				<div className="container-fluid px-0" style={{ position: 'relative', zIndex: 2 }}>
					<div className="row">
						<div className="col-12">
							<div className="video-container position-relative" data-aos="fade-up" data-aos-duration={800}>
								{/* Image de fond pour la vidéo */}

								<div className="video-thumbnail">
									<img
										src="/landing-page/sara-presentation-video.png"
										alt="Vidéo de présentation SARA 2025"
										className="img-fluid w-100"
										style={{
											height: '60vh',
											minHeight: '400px',
											maxHeight: '600px',
											objectFit: 'cover',
											filter: 'brightness(0.85)'
										}}
									/>
									{/* Bouton de lecture centré */}
									<div className="video-play-btn position-absolute top-50 start-50 translate-middle">
										<a
											onClick={() => setOpen(true)}
											className="popup-youtube d-flex align-items-center justify-content-center"
											style={{
												width: '120px',
												height: '120px',
												backgroundColor: 'rgba(255,255,255,0.95)',
												borderRadius: '50%',
												boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
												cursor: 'pointer',
												transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
												backdropFilter: 'blur(10px)'
											}}
										>
											<svg xmlns="http://www.w3.org/2000/svg" width={32} height={38} viewBox="0 0 20 24" fill="none">
												<path d="M19.5185 11.1463L1.52146 0.147702C1.36988 0.0550624 1.19634 0.0044781 1.01872 0.0011519C0.8411 -0.00217431 0.665798 0.041878 0.510849 0.128777C0.3559 0.215677 0.226898 0.342285 0.137113 0.495581C0.0473273 0.648876 8.00178e-08 0.823322 0 1.00098V22.9981C8.00178e-08 23.1758 0.0473273 23.3502 0.137113 23.5035C0.226898 23.6568 0.3559 23.7834 0.510849 23.8703C0.665798 23.9572 0.8411 24.0013 1.01872 23.998C1.19634 23.9946 1.36988 23.944 1.52146 23.8514L19.5185 12.8528C19.6647 12.7635 19.7855 12.6381 19.8693 12.4887C19.9531 12.3393 19.9971 12.1709 19.9971 11.9996C19.9971 11.8282 19.9531 11.6598 19.8693 11.5104C19.7855 11.361 19.6647 11.2356 19.5185 11.1463Z" fill="#1A1719" />
											</svg>
										</a>
									</div>

									{/* Indicateur de lecture (optionnel) */}
									<div className="video-indicator position-absolute bottom-0 start-0 w-100 p-4"
										style={{
											background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
											color: 'white'
										}}>
										<div className="container">
											<div className="row justify-content-center">
												<div className="col-auto">
													<p className="mb-0 text-center">
														<i className="fa-solid fa-play me-2"></i>
														Découvrez SARA 2025 en vidéo
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<ModalVideo
				channel='youtube'
				isOpen={isOpen}
				videoId="JXMWOmuR1hU"
				onClose={() => setOpen(false)}
			/>

			<style jsx>{`
				.video-play-btn a:hover {
					transform: scale(1.15) !important;
					background-color: rgba(255,255,255,1) !important;
					box-shadow: 0 25px 80px rgba(0,0,0,0.4) !important;
				}
				
				.video-play-btn a:active {
					transform: scale(1.05) !important;
				}
				
				@media (max-width: 768px) {
					.video-thumbnail img {
						height: 55vh !important;
						min-height: 350px !important;
					}
					
					.video-play-btn a {
						width: 90px !important;
						height: 90px !important;
					}
					
					.video-play-btn svg {
						width: 24px !important;
						height: 28px !important;
					}
				}
				
				@media (max-width: 480px) {
					.video-thumbnail img {
						height: 45vh !important;
						min-height: 280px !important;
					}
					
					.video-play-btn a {
						width: 70px !important;
						height: 70px !important;
					}
					
					.video-play-btn svg {
						width: 20px !important;
						height: 24px !important;
					}
					
					.video-indicator p {
						font-size: 14px;
					}
				}
			`}</style>
		</>
	)
}