'use client'

import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useCallback } from 'react'
import CountUp from 'react-countup'

// Lazy loading du slider pour améliorer les performances
const Slider = dynamic(() => import('react-slick'), {
  ssr: false, // Désactive le SSR pour ce composant
  loading: () => <div className="slider-loading">Chargement...</div>
})

// Lazy loading du composant Countdown
const Countdown = dynamic(() => import('src/components/landing-page-components/elements/Countdown'), {
  ssr: false
})

// Configuration du slider extraite pour une meilleure lisibilité
const sliderSettings = {
  autoplay: true,
  autoplaySpeed: 5000,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: false,
  dots: false,
  arrows: false,
  pauseOnDotsHover: true,
  cssEase: 'linear',
  fade: true,
  draggable: true,
} as const

// Composant pour une slide individuelle
const HeroSlide = () => (
    <div className="her2-section-area" >
      
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="hero2-header">
              <div className="hero1-header heading1" >
                <h5 data-aos="fade-left" data-aos-duration={3000}>
                  
                  Le SARA, l&apos;évènement à ne pas rater
                </h5>
                
                <div className="space16" />
                
                <h1 className="text-anime-style-3">
                  Thème :
                  
                  Innover et Réussir en 2025
                </h1>
                
                <div className="space16" />
                
                {/* <p data-aos="fade-left" data-aos-duration={3000}>
                  Cette conférence est bien plus qu&apos;un simple rassemblement : 
                  <br className="d-lg-block d-none" />
                  c&apos;est un véritable rendez-vous d&apos;inspiration et d&apos;opportunités.
                </p> */}
                
                <div className="space32" />
                
                {/* <div className="btn-area2" style={{display: 'flex', gap: '16px'}}>
                  <Link
                    href="/landingpage/landingpage2/inscription2"
                    className="event-btn1"
                    
                    aria-label="S'inscrire à la conférence SARA"
                  >
                    S&apos;inscrire
                  </Link>
                  <Link 
                    href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F"
                    className="event-btn4"
                    aria-label="Se connecter à votre compte"
                  >
                    Se Connecter
                  </Link>
                </div> */}

                {/* Action Buttons */}
                <div className="hidden lg:flex items-center space-x-4">
                  
                  <Link 
                    href="/landingpage/landingpage2/inscription2"
                    className="px-4 py-2 bg-lime-400 text-gray-900 font-semibold rounded hover:bg-lime-500 hover:text-white transition-colors duration-200"
                  >
                    S'inscrire
                  </Link>

                  <Link 
                    href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F"
                    className="px-4 py-2 bg-black text-white font-semibold rounded hover:bg-slate-50 hover:text-black transition-colors duration-200"
                  >
                    Se Connecter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

export default function Section1() {
 

  return (
    <section 
      className="hero-section" 
      aria-label="Section principale de la conférence SARA"
    >
      <Slider {...sliderSettings} className="hero2-slider-area">
        <HeroSlide />
        
      </Slider>
    </section>
  )
}