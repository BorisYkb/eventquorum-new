// src/sections/superviseur/activites/sup-data-activites.ts

import { CONFIG } from 'src/global-config';

/**
 * Interface pour définir la structure d'une activité du superviseur
 */
export interface ActivitySuperviseur {
  id: string;
  name: string;                    // Nom de l'activité (ex: Activité 1)
  type: string;                    // Type d'activité (ex: Atelier, Salon, Conférence)
  title: string;                   // Titre de l'activité (ex: Formation, Innovations)
  status: 'Terminée' | 'En cours' | 'Non démarrée';
  statusColor: 'success' | 'warning' | 'error' | 'info';
  date: string;                    // Date et horaires de l'activité
  time: string;                    // Horaire de l'activité
  location: string;                // Lieu de l'activité
  description: string;             // Description détaillée
  prix: number | null;             // Prix (null = paiement unique pour toutes les activités)
  standing: string;                // Type de place (Standard, VIP, VVIP)
  hasDocument: boolean;            // Indique si l'activité a un document
  documentUrl?: string;            // URL du document (optionnel)
  hasVideo: boolean;               // Indique si l'activité a une vidéo
  videoUrl?: string;               // URL de la vidéo (optionnel)
  datePaiement: string;            // Date du paiement
}

/**
 * Données factices des activités du superviseur
 * Ces données seront remplacées par des appels API vers le backend
 */
export const ACTIVITES_SUPERVISEUR: ActivitySuperviseur[] = [
  {
    id: '1',
    name: 'Activité 1',
    type: 'Atelier',
    title: 'Formation continue en agronomie',
    status: 'En cours',
    statusColor: 'success',
    date: '10/12/24 10H00 -> 10/12/24 17H00',
    time: '10H00 - 17H00',
    location: 'Salle de conférence A, Parc des Expositions',
    description: 'Formation approfondie sur les techniques modernes d\'agriculture durable et de gestion des ressources naturelles. Cette session permettra aux participants de découvrir les dernières innovations en matière d\'agronomie et de pratiques agricoles respectueuses de l\'environnement.',
    prix: 15000,
    standing: 'Standard',
    hasDocument: true,
    documentUrl: '/documents/formation-agronomie.pdf',
    hasVideo: true,
    videoUrl: '/videos/formation-agronomie.mp4',
    datePaiement: '10 Décembre 2024'
  },
  {
    id: '2',
    name: 'Activité 2',
    type: 'Salon',
    title: 'Innovations technologiques',
    status: 'Non démarrée',
    statusColor: 'warning',
    date: '11/12/24 10H00 -> 11/12/24 17H00',
    time: '10H00 - 17H00',
    location: 'Hall d\'exposition B, Parc des Expositions',
    description: 'Salon dédié aux dernières innovations technologiques dans le secteur agricole. Découvrez les outils et équipements de pointe qui révolutionnent l\'agriculture moderne et améliorent la productivité des exploitations.',
    prix: 0,
    standing: 'Gratuit',
    hasDocument: true,
    documentUrl: '/documents/innovations-tech.pdf',
    hasVideo: false,
    datePaiement: '11 Décembre 2024'
  },
  {
    id: '3',
    name: 'Activité 3',
    type: 'Conférence',
    title: 'Diversité et inclusion dans l\'agriculture',
    status: 'Terminée',
    statusColor: 'error',
    date: '12/12/24 10H00 -> 12/12/24 17H00',
    time: '10H00 - 17H00',
    location: 'Amphithéâtre principal, Parc des Expositions',
    description: 'Conférence sur l\'importance de la diversité et de l\'inclusion dans le secteur agricole. Discussion sur les opportunités pour les femmes et les jeunes dans l\'agriculture, ainsi que sur les politiques favorisant l\'égalité des chances.',
    prix: null,
    standing: 'Accès complet',
    hasDocument: true,
    documentUrl: '/documents/diversite-inclusion.pdf',
    hasVideo: true,
    videoUrl: '/videos/diversite-inclusion.mp4',
    datePaiement: '12 Décembre 2024'
  },
  {
    id: '4',
    name: 'Activité 4',
    type: 'Festival',
    title: 'Planète Verte - Festival de l\'agriculture durable',
    status: 'Non démarrée',
    statusColor: 'warning',
    date: '13/12/24 10H00 -> 13/12/24 17H00',
    time: '10H00 - 17H00',
    location: 'Espace extérieur, Parc des Expositions',
    description: 'Festival célébrant l\'agriculture durable et les pratiques écologiques. Au programme : démonstrations, ateliers pratiques, dégustations de produits bio et locaux, animations pour toute la famille et rencontres avec des producteurs engagés.',
    prix: 25000,
    standing: 'VIP',
    hasDocument: false,
    hasVideo: true,
    videoUrl: '/videos/planete-verte.mp4',
    datePaiement: '13 Décembre 2024'
  },
  {
    id: '5',
    name: 'Activité 5',
    type: 'Workshop',
    title: 'Techniques avancées de gestion des sols',
    status: 'En cours',
    statusColor: 'success',
    date: '14/12/24 09H00 -> 14/12/24 16H00',
    time: '09H00 - 16H00',
    location: 'Salle de formation C, Parc des Expositions',
    description: 'Workshop pratique sur les techniques avancées de gestion et d\'amélioration des sols agricoles. Les participants apprendront à analyser la composition des sols, à identifier les carences et à mettre en place des solutions adaptées pour optimiser la productivité.',
    prix: 12000,
    standing: 'Standard',
    hasDocument: true,
    documentUrl: '/documents/gestion-sols.pdf',
    hasVideo: false,
    datePaiement: '14 Décembre 2024'
  },
  {
    id: '6',
    name: 'Activité 6',
    type: 'Séminaire',
    title: 'Financement et microfinance agricole',
    status: 'Non démarrée',
    statusColor: 'warning',
    date: '15/12/24 14H00 -> 15/12/24 18H00',
    time: '14H00 - 18H00',
    location: 'Salle de conférence B, Parc des Expositions',
    description: 'Séminaire consacré aux solutions de financement pour les agriculteurs et les coopératives. Présentation des différents dispositifs de microfinance, des subventions disponibles et des stratégies pour obtenir des prêts avantageux pour développer son activité agricole.',
    prix: 18000,
    standing: 'Standard',
    hasDocument: true,
    documentUrl: '/documents/financement-agricole.pdf',
    hasVideo: true,
    videoUrl: '/videos/financement-agricole.mp4',
    datePaiement: '15 Décembre 2024'
  }
];

/**
 * Données statiques des photos pour la galerie
 */
export const ACTIVITY_PHOTOS = [
    { imageUrl: `${CONFIG.assetsDir}/assets/background/background-3.webp` },
    { imageUrl: `${CONFIG.assetsDir}/assets/background/background-7.webp` },
    { imageUrl: `${CONFIG.assetsDir}/assets/background/background-3.webp` },
    { imageUrl: `${CONFIG.assetsDir}/assets/background/background-5.webp` },
    { imageUrl: `${CONFIG.assetsDir}/assets/background/background-5.webp` },
    { imageUrl: `${CONFIG.assetsDir}/assets/background/background-6.webp` },
    { imageUrl: `${CONFIG.assetsDir}/assets/background/background-7.webp` },
];

/**
 * Interface pour les intervenants
 */
export interface Intervenant {
    id: string;
    nom: string;
    poste: string;
    specialty: string;
    bio: string;
    email: string;
    phone: string;
    organisation: string;
    experience: string;
    domaines: string[];
}

/**
 * Données statiques des intervenants
 */
export const INTERVENANTS_EXTENDED: Intervenant[] = [
    {
        id: '1',
        nom: 'Dr. Kouakou',
        poste: 'Expert Agricole',
        specialty: 'Agronomie',
        bio: 'Spécialiste en développement agricole durable avec 15 ans d\'expérience en Afrique de l\'Ouest. Expert reconnu dans l\'amélioration des rendements agricoles et la gestion durable des ressources.',
        email: 'kouakou@sara2023.ci',
        phone: '+225 07 00 00 00',
        organisation: 'Institut Agricole de Côte d\'Ivoire',
        experience: '15 ans',
        domaines: ['Agriculture durable', 'Gestion des sols', 'Irrigation']
    },
    {
        id: '2',
        nom: 'Prof. Diallo',
        poste: 'Directeur Innovation',
        specialty: 'Innovation',
        bio: 'Pionnier des technologies agricoles intelligentes et de l\'agriculture de précision. Leader dans l\'intégration des nouvelles technologies au service de l\'agriculture africaine.',
        email: 'diallo@sara2023.ci',
        phone: '+225 07 11 11 11',
        organisation: 'Centre de Recherche Technologique',
        experience: '12 ans',
        domaines: ['AgriTech', 'Intelligence artificielle', 'Agriculture de précision']
    },
    {
        id: '3',
        nom: 'Mme Traoré',
        poste: 'Analyste Financier',
        specialty: 'Finance',
        bio: 'Experte en financement de projets agricoles et en microfinance rurale. Spécialisée dans l\'accompagnement financier des petits exploitants et des coopératives agricoles.',
        email: 'traore@sara2023.ci',
        phone: '+225 07 22 22 22',
        organisation: 'Banque de Développement Agricole',
        experience: '10 ans',
        domaines: ['Microfinance', 'Financement agricole', 'Gestion de projets']
    },
    {
        id: '4',
        nom: 'M. Bamba',
        poste: 'Tech Lead',
        specialty: 'Tech',
        bio: 'Développeur de solutions numériques pour l\'agriculture et la traçabilité. Expert en création de plateformes digitales pour améliorer la chaîne de valeur agricole.',
        email: 'bamba@sara2023.ci',
        phone: '+225 07 33 33 33',
        organisation: 'AgriTech Solutions CI',
        experience: '8 ans',
        domaines: ['Blockchain', 'Traçabilité', 'Applications mobiles']
    }
];