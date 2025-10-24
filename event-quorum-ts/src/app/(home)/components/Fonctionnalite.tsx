'use client'

import React, { useEffect, useRef } from 'react'
import { User, CreditCard, QrCode, Video, Users, BarChart3 } from 'lucide-react'

export default function Fonctionnalite() {
  const headingRef = useRef(null)
  const heading2Ref = useRef(null)
  const sectionRef = useRef(null)
  const buttonref = useRef(null)

  const features = [
    {
      icon: <User className="w-12 h-12 text-teal-400" />,
      title: 'Inscription & Billetterie',
      items: [
        "Formulaire d'inscription",
        "Enregistrement payant ou gratuit",
        'Édition de badges',
        "Edition de liens d'accès en ligne",
      ],
      gradient: 'from-teal-500/10 to-teal-600/5',
      border: 'border-teal-500/20',
      iconBg: 'bg-teal-500/10'
    },
    {
      icon: <CreditCard className="w-12 h-12 text-yellow-400" />,
      title: 'Paiement électronique sécurisé',
      items: [
        'Intégration de solutions de paiement (Orange Money, Wave, etc.)',
        'Gestion des remboursements automatisée',
        'Suivi en temps réel des paiements',
        'Compatibilité automatique des paiements',
      ],
      gradient: 'from-yellow-500/10 to-yellow-600/5',
      border: 'border-yellow-500/20',
      iconBg: 'bg-yellow-500/10'
    },
    {
      icon: <QrCode className="w-12 h-12 text-pink-400" />,
      title: 'Enregistrement sur site',
      items: [
        "Poste d'accueil (impression de badges)",
        "Solution de contrôle d'accès",
        'Notification sur site par SMS ou Slack',
      ],
      gradient: 'from-pink-500/10 to-pink-600/5',
      border: 'border-pink-500/20',
      iconBg: 'bg-pink-500/10'
    },
    {
      icon: <Video className="w-12 h-12 text-orange-300" />,
      title: 'Formats digitaux',
      items: [
        'Webinaires',
        'Visio-conférences',
        'Événements digitaux',
        'Diffusion en direct et replay',
      ],
      gradient: 'from-orange-500/10 to-orange-600/5',
      border: 'border-orange-500/20',
      iconBg: 'bg-orange-500/10'
    },
    {
      icon: <Users className="w-12 h-12 text-emerald-300" />,
      title: 'Engagement des participants',
      items: [
        'Matchmaking',
        'Networking',
        "Outils d'interactivité",
        'Génération de leads',
      ],
      gradient: 'from-emerald-500/10 to-emerald-600/5',
      border: 'border-emerald-500/20',
      iconBg: 'bg-emerald-500/10'
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-yellow-300" />,
      title: "Outils d'analyse de données",
      items: [
        "Tableau de bord",
        "Rapports et exports sur mesure",
        "Score d'engagement événementiel",
        "Comparatif entre événements"
      ],
      gradient: 'from-amber-500/10 to-amber-600/5',
      border: 'border-amber-500/20',
      iconBg: 'bg-amber-500/10'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 
            ref={headingRef} 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Les fonctionnalités personnalisables{' '}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
              préférées
            </span>
            <br />de nos clients
          </h1>

          <p 
            ref={heading2Ref} 
            className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Découvrez nos modules les plus populaires, pensés pour offrir une expérience 
            fluide et complète lors de vos événements.
          </p>
        </div>

        {/* Grille des fonctionnalités */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        >
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative bg-gradient-to-br ${feature.gradient} backdrop-blur-sm 
                         border ${feature.border} rounded-2xl p-8 hover:border-opacity-50 
                         transition-all duration-500 hover:scale-105 hover:shadow-2xl 
                         hover:shadow-purple-500/10 max-w-sm w-full h-full`}
            >
              {/* Effet de brillance au survol */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icône */}
              <div className={`${feature.iconBg} rounded-xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Titre */}
              <h3 className="font-bold text-xl text-gray-900 mb-4 group-hover:text-pink-300 transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Liste des fonctionnalités */}
              <ul className="space-y-3">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex items-start text-gray-600 text-sm leading-relaxed">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 mt-2 mr-3 flex-shrink-0" />
                    <span className={i === 0 ? 'font-semibold text-gray-900' : ''}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Effet de fond animé */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Section CTA optionnelle 
        <div ref={buttonref} className="text-center mt-16">
          <div className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 cursor-pointer">
            Découvrir toutes nos fonctionnalités
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
        */}
      </div>
    </div>
  )
}