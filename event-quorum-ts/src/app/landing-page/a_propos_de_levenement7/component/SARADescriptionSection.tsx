'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

// Images de vos vraies images
const images = [
  { id: 1, src: '/assets/img/sara/sara1.jpg', alt: 'Conférence SARA - Présentation principale' },
  { id: 2, src: '/assets/img/sara/sara2.jpeg', alt: 'Networking et échanges' },
  { id: 3, src: '/assets/img/sara/sara3.jpeg', alt: 'Public attentif' },
  { id: 4, src: '/assets/img/sara/sara4.jpeg', alt: 'Intervenant expert' },
  { id: 5, src: '/assets/img/sara/sara5.jpg', alt: 'Atelier pratique' },
  { id: 6, src: '/assets/img/sara/sara6.jpg', alt: 'Innovation technologique' },
  { id: 7, src: '/assets/img/sara/sara7.jpg', alt: 'Collaboration entre participants' },
  { id: 8, src: '/assets/img/sara/sara8.jpg', alt: 'Présentation startup' },
  { id: 9, src: '/assets/img/sara/sara9.jpg', alt: 'Remise de prix' }
]

// Images à afficher dans la grille (2 premières)
const displayedImages = images.slice(0, 2)

export default function SARADescriptionSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openModal = useCallback((imageIndex: number) => {
    setCurrentImageIndex(imageIndex)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    document.body.style.overflow = 'unset'
  }, [])

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }, [])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [])

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  // Gestion des touches clavier
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isModalOpen) return
      
      switch (e.key) {
        case 'Escape':
          closeModal()
          break
        case 'ArrowLeft':
          prevImage()
          break
        case 'ArrowRight':
          nextImage()
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isModalOpen, closeModal, prevImage, nextImage])

  return (
    <>
      <style jsx>{`
        .sara-container {
          padding: 4rem 1rem;
          background-color: #f9fafb;
          min-height: 80vh;
        }

        .sara-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .image-grid {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1rem;
        }

        .image-container {
          position: relative;
          cursor: pointer;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          height: 200px;
        }

        .image-container:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .sara-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .image-container:hover .sara-image {
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

        .image-container:hover .image-overlay {
          background-color: rgba(0, 0, 0, 0.2);
        }

        .overlay-icon {
          color: white;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .image-container:hover .overlay-icon {
          opacity: 1;
        }

        .more-photos {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .text-section {
          padding: 0 1rem;
        }

        .sara-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .text-content {
          margin-bottom: 2rem;
        }

        .sara-paragraph {
          font-size: 1.125rem;
          line-height: 1.7;
          color: #4b5563;
          margin-bottom: 1.5rem;
        }

        .quote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }

        .quote-text {
          font-size: 1.125rem;
          font-weight: 500;
          color: #1f2937;
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

        .organizer-section {
          padding: 2rem 1rem;
          background-color: white;
        }

        .organizer-title {
          font-family: 'Grotesk', sans-serif;
          text-align: center;
          font-size: 3rem;
          color: #23282eff;
          line-height: 1.7;
          font-weight: bold;
          margin-bottom: 3rem;
        }

        .organizer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 3rem;
          align-items: center;
        }

        .logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .logo-image {
          width: 100%;
          max-width: 300px;
          height: auto;
        }

        .organizer-text {
          font-family: 'Grotesk', sans-serif;
          text-align: justify;
          font-size: 1.1rem;
          color: #4b5563;
          line-height: 1.7;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .sara-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }

          .sara-title {
            font-size: 2rem;
          }

          .organizer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .organizer-title {
            font-size: 1.75rem;
            margin-bottom: 2rem;
          }

          .logo-image {
            max-width: 300px;
          }
        }

        @media (max-width: 768px) {
          .sara-container {
            padding: 2rem 1rem;
          }

          .sara-grid {
            gap: 1.5rem;
          }

          .image-grid {
            gap: 0.5rem;
          }

          .image-container {
            height: 150px;
          }

          .sara-title {
            font-size: 1.75rem;
            margin-bottom: 1rem;
          }

          .sara-paragraph {
            font-size: 1rem;
          }

          .quote-text {
            font-size: 1rem;
          }

          .text-section {
            padding: 0;
          }

          .organizer-title {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .organizer-text {
            font-size: 1rem;
          }

          .logo-image {
            max-width: 250px;
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
          .sara-container {
            padding: 1.5rem 0.5rem;
          }

          .image-grid {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }

          .image-container {
            height: 200px;
          }

          .sara-title {
            font-size: 1.5rem;
          }

          .sara-paragraph {
            font-size: 0.95rem;
          }

          .more-photos {
            font-size: 1rem;
          }

          .organizer-section {
            padding: 1.5rem 0.5rem;
          }

          .organizer-title {
            font-size: 1.25rem;
          }

          .organizer-text {
            font-size: 0.9rem;
            text-align: left;
          }

          .logo-image {
            max-width: 150px;
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
        }

        @media (max-width: 320px) {
          .sara-title {
            font-size: 1.25rem;
          }

          .organizer-title {
            font-size: 1.1rem;
          }

          .organizer-text {
            font-size: 0.85rem;
          }

          .logo-image {
            max-width: 100px;
          }
        }
      `}</style>

      <div className="sara-container">
        <div className="sara-grid">
          
          {/* Contenu texte - Côté gauche */}
          <div className="text-section">
            <div>
              <h2 className="sara-title">
                Présentation du SARA 2025
              </h2>
            </div>

            <div className="text-content">
              <p className="sara-paragraph">
                Le SARA (Sommet Africain de la Réussite et de l'Ambition) 2025 est l'événement 
                incontournable pour tous les entrepreneurs, innovateurs et leaders africains. 
                Cette conférence d'envergure internationale rassemble les esprits les plus brillants 
                du continent pour trois jours d'échanges, d'apprentissage et de networking.
              </p>
              
              <p className="sara-paragraph">
                Fort de plusieurs années d'expérience dans l'organisation d'événements de prestige, 
                le SARA s'est imposé comme la plateforme de référence pour découvrir les dernières 
                innovations, partager les meilleures pratiques et créer des synergies durables 
                entre les acteurs du développement économique africain.
              </p>

              <p className="sara-paragraph">
                En tant qu'organisateur principal de cet événement exceptionnel, nous veillons 
                à ce que chaque détail reflète notre vision : offrir un espace d'excellence, 
                de formation et d'opportunités pour tous les participants, tout en mettant 
                en avant le potentiel extraordinaire du continent africain.
              </p>
            </div>

            <div className="quote">
              <p className="quote-text">
                "Un événement qui transforme les idées en opportunités concrètes"
              </p>
            </div>
          </div>

          {/* Galerie d'images - Côté droit */}
          <div>
            <div className="image-grid">
              {displayedImages.map((image, index) => (
                <div 
                  key={image.id}
                  className="image-container"
                  onClick={() => openModal(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="sara-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-icon">
                      <svg width="32" height="32" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm5 3a2 2 0 11-4 0 2 2 0 014 0zm4.5 1.5a.5.5 0 11-1 0 .5.5 0 011 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  {index ===1 &&(
                    <div className="more-photos">
                      +{images.length - 2} photos
                    </div>
                  )}
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de galerie */}
      {isModalOpen && (
        <div className="modal">
          {/* Overlay */}
          <div 
            className="modal-overlay"
            onClick={closeModal}
          ></div>

          {/* Contenu du modal */}
          <div className="modal-content">
            {/* Bouton fermer */}
            <button
              onClick={closeModal}
              className="close-button"
            >
              <X size={32} />
            </button>

            {/* Image principale */}
            <div style={{ position: 'relative' }}>
              <img
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
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
              {images.map((image, index) => (
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
                {currentImageIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Section Organisateur */}
      <div className="organizer-section">
        <h2 className="organizer-title">Organisateur</h2>
      
        <div className="organizer-content">
          {/* Logo */}
          <div className="logo-container">
            <img src="/assets/img/logo/etat.png" alt="Logo État de Côte d'Ivoire" className="logo-image" />
          </div>

          {/* Texte */}
          <div>
            <p className="organizer-text">
              L'État de Côte d'Ivoire joue un rôle moteur dans l'organisation et la réussite du 
              Salon International de l'Agriculture et des Ressources Animales (SARA 2025), 
              à la fois par la mobilisation financière, la structuration des politiques agricoles et la mise en 
              œuvre d'initiatives concrètes. Par exemple, le gouvernement a mis en place un 
              guichet de financement spécifique pour les jeunes agripreneurs doté d'une enveloppe 
              de 1,5 milliard de FCFA afin de soutenir les porteurs de projets dans le secteur agricole. 
              De plus, le ministère de l'Agriculture et des Productions Vivrières, en collaboration avec 
              d'autres ministères, s'emploie à renforcer l'innovation et la modernisation du secteur à travers ce salon.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}