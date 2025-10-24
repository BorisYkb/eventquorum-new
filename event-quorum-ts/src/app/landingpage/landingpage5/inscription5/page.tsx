"use client"
import Countdown from 'src/components/landing-page-components/elements/Countdown'
import Layout from "src/components/landing-page-components/layout/Layout"
import Link from "next/link"
import ContactCarousel from '../../connexion/ContactCarousel' // Importer le composant carrousel
import '/public/assets/landing-page/css/ContactCarousel.css'; // Importer les styles CSS
import Footer1 from 'src/components/landing-page-components/layout/footer/Footer1'

export default function Contact() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    <div className="inner-page-header" style={{ backgroundImage: 'url(assets/landing-page/img/bg/header-bg12.png)' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 m-auto">
                                    <div className="heading1 text-center">
                                        <h1>Inscription</h1>
                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*===== HERO AREA ENDS =======*/}
                    
                    {/*===== CONTACT AREA STARTS =======*/}
                    <div className="contact-inner-section sp1">
                        <div className="container">
                            <div className="row">
                                {/* CARROUSEL REMPLACE L'IMAGE STATIQUE */}
                                <div className="col-lg-6">
                                    <ContactCarousel />
                                </div>
                                
                                <div className="col-lg-6" data-aos="zoom-in" data-aos-duration={1000}>
                                    <div className="contact4-boxarea">
                                        <h3 className="text-anime-style-3">Inscrivez-vous ici</h3>
                                        <div className="space9" />
                                        <div className="row">
                                            <div className="col-lg-12 col-md-6">
                                                <div className="input-area">
                                                    <input type="text" placeholder="Nom" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-6">
                                                <div className="input-area">
                                                    <input type="text" placeholder="Prénom" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-6">
                                                <div className="input-area">
                                                    <input type="text" placeholder="Téléphone" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-6">
                                                <div className="input-area">
                                                    <input type="email" placeholder="Email" />
                                                </div>
                                            </div>
                                            
                                            <div className="col-lg-12">
                                                <div className="space24" />
                                                <div className="input-area text-end">
                                                    <button type="submit" className="vl-btn1">Envoyer ma demande</button>
                                                </div>
                                            </div>
                                            {/*<div className='col-lg-12 mt-3 text-center heading2'>
                                                <p>Vous avez déjà un code d'accès ? <br /><Link href={'/connexion'}>Connecter vous</Link></p>
                                            </div>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*===== CONTACT AREA ENDS =======*/}
                </div>
                <Footer1 />
            </Layout>
        </>
    )
}

// ===== ALTERNATIVE AVEC CARROUSEL SIMPLIFIÉ =====
// Si vous voulez juste l'effet visuel sans la complexité du carrousel automatique

/*
// Remplacer la div col-lg-6 par :
<div className="col-lg-6">
	<div className="contact-carousel-wrapper carousel-enter visible">
		<div className="contact-carousel-container image-anime">
			<div className="carousel-wrapper">
				<div className="carousel-slide active">
					<img
						src="/assets/landing-page/img/all-images/contact/contact-img4.png"
						alt="EventQuorum - Gestion d'événements"
						className="loaded"
					/>
					<div className="carousel-overlay">
						<div className="carousel-content">
							<h3 className="carousel-title">
								Bienvenue sur EventQuorum
							</h3>
							<p className="carousel-description">
								Connectez-vous pour accéder à votre espace événements
							</p>
						</div>
					</div>
				</div>
			</div>
			
			<div className="carousel-shine animate" />
		</div>
	</div>
</div>
*/