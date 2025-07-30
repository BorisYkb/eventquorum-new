'use client';

import React, { useState } from 'react';
import { ChevronDown, Send, Mail, MessageSquare, User } from 'lucide-react';
import Headerfaq from './component/header';

const EventQuorumFAQ = () => {
  const [expandedItem, setExpandedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  const faqData = [
    {
      id: 1,
      question: "Qu'est-ce qu'EventQuorum ?",
      answer: "EventQuorum est une plateforme innovante de gestion d'événements qui permet aux organisateurs de créer, gérer et optimiser leurs événements de manière efficace. Notre solution offre des outils complets pour la planification, la promotion, la gestion des participants et l'analyse des résultats."
    },
    {
      id: 2,
      question: "Comment EventQuorum peut-il m'aider à organiser mes événements ?",
      answer: "EventQuorum simplifie l'organisation d'événements grâce à ses fonctionnalités intégrées : création de pages d'événement personnalisées, gestion des inscriptions en temps réel, système de billetterie, outils de communication avec les participants, analytics détaillés, et bien plus encore. Tout est centralisé sur une seule plateforme."
    },
    {
      id: 3,
      question: "Quels types d'événements puis-je créer avec EventQuorum ?",
      answer: "EventQuorum s'adapte à tous types d'événements : conférences professionnelles, séminaires, ateliers, formations, événements corporatifs, salons, concerts, festivals, événements sportifs, webinaires, et événements hybrides. La plateforme est flexible et personnalisable selon vos besoins spécifiques."
    },
    {
      id: 4,
      question: "EventQuorum propose-t-il des outils d'analyse ?",
      answer: "Oui, EventQuorum inclut des tableaux de bord analytiques complets qui vous permettent de suivre les inscriptions, analyser la participation, mesurer l'engagement des participants, générer des rapports détaillés, et obtenir des insights précieux pour optimiser vos futurs événements."
    },
    {
      id: 5,
      question: "La plateforme est-elle facile à utiliser ?",
      answer: "Absolument ! EventQuorum a été conçu avec une interface intuitive et user-friendly. Aucune compétence technique particulière n'est requise. Notre équipe propose également un accompagnement personnalisé et des ressources de formation pour vous aider à maîtriser rapidement la plateforme."
    },
    {
      id: 6,
      question: "Puis-je personnaliser l'apparence de mes événements ?",
      answer: "Oui, EventQuorum offre de nombreuses options de personnalisation : thèmes et couleurs personnalisables, ajout de votre logo et branding, création de pages d'événement sur mesure, emails de communication personnalisés, et possibilité d'intégrer votre charte graphique."
    },
    {
      id: 7,
      question: "Comment fonctionne la gestion des inscriptions ?",
      answer: "La gestion des inscriptions est automatisée et en temps réel. Les participants peuvent s'inscrire directement via votre page événement, recevoir des confirmations automatiques, et vous pouvez suivre toutes les inscriptions depuis votre tableau de bord. Le système gère également les listes d'attente et les annulations."
    },
    {
      id: 8,
      question: "EventQuorum propose-t-il un support client ?",
      answer: "Oui, nous proposons un support client dédié via plusieurs canaux : assistance par email, chat en ligne, documentation complète, tutoriels vidéo, et accompagnement personnalisé pour les clients premium. Notre équipe est là pour vous aider à réussir vos événements."
    }
  ];

  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.question) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setIsSubmitting(true);

    // Simulation d'envoi du formulaire
    setTimeout(() => {
      alert('Votre question a été envoyée avec succès ! Nous vous répondrons dans les plus brefs délais.');
      setFormData({ name: '', email: '', question: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <Headerfaq isLoaded={isLoaded} />
      <div className="max-w-7xl mx-auto mt-15">

        <div className="grid lg:grid-cols-2 gap-12 px-5 py-10">
          {/* FAQ Section - Left */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <MessageSquare className="mr-3 text-blue-600" size={28} />
              Questions Fréquentes
            </h2>

            <div className="space-y-3">
              {faqData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md border-none overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer"
                >
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-150"
                  >
                    <span className="font-medium text-gray-900 pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`flex-shrink-0 text-blue-600 transition-transform duration-200 ${
                        expandedItem === item.id ? 'rotate-180' : ''
                      }`}
                      size={20}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-4 text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form - Right */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Mail className="mr-3 text-blue-600" size={28} />
                Une question spécifique ?
              </h2>

              <p className="text-gray-600 mb-6">
                Vous ne trouvez pas la réponse à votre question ? N'hésitez pas à nous contacter directement. Notre équipe vous répondra rapidement.
              </p>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline mr-2" size={16} />
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline mr-2" size={16} />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="inline mr-2" size={16} />
                    Votre question
                  </label>
                  <textarea
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                    placeholder="Décrivez votre question en détail..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white border-none cursor-pointer font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Send className="mr-2" size={18} />
                  )}
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma question'}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Nous nous engageons à répondre dans les 24h ouvrées
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventQuorumFAQ;
