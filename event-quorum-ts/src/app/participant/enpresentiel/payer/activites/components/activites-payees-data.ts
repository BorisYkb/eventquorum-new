// src/app/participant/enpresentiel/payer/activites/components/activites-payees-data.ts

export interface ActivitePayee {
  id: string;
  time: string;
  title: string;
  description: string;
  status: 'Terminé' | 'En cours' | 'Non démarré';
  statusColor: 'success' | 'warning' | 'default' | 'error' | 'info';
  standing: string;
  prix: number;
  datePaiement: string;
  isPaid: boolean;
  hasDocument: boolean;
  hasVideo: boolean;
  documentUrl?: string;
  videoUrl?: string;

  // Champs ajoutés pour parité avec le programme
  type: string;
  location: string; // peut être '' si inconnu
}

// Données des activités payées
export const ACTIVITES_PAYEES: ActivitePayee[] = [
  {
    id: '1',
    time: '09H00 - 10H00',
    title: "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
    description: 'Cérémonie officielle présidée par S.E.M. ALASSANE OUATTARA',
    status: 'Terminé',
    statusColor: 'success',
    standing: 'VIP',
    prix: 20000,
    datePaiement: '2024-01-15',
    isPaid: true,
    hasDocument: true,
    hasVideo: true,
    documentUrl: '#doc-1',
    videoUrl: '#video-1',
    type: 'Cérémonie',
    location: '',
  },
  {
    id: '4',
    time: '12H00 - 13H00',
    title: 'PAUSE CAFE',
    description: 'Pause networking avec les participants',
    status: 'En cours',
    statusColor: 'warning',
    standing: 'Standard',
    prix: 5000,
    datePaiement: '2024-01-15',
    isPaid: true,
    hasDocument: false,
    hasVideo: true,
    videoUrl: '#video-4',
    type: 'Pause',
    location: '',
  },
  {
    id: '5',
    time: '13H00 - 14H00',
    title: 'COOLING BREAK',
    description: 'Moment de détente et échanges informels',
    status: 'Non démarré',
    statusColor: 'default',
    standing: 'VIP',
    prix: 20000,
    datePaiement: '2024-01-15',
    isPaid: true,
    hasDocument: true,
    hasVideo: false,
    documentUrl: '#doc-5',
    type: 'Pause',
    location: '',
  },

  // ----- Ajouts depuis PROGRAMME_DAYS (transformés) -----
  {
    id: '6',
    time: '08H00 - 9H00',
    title: 'OUVERTURE DU SALON ET DU SARA MARKET AU PUBLIC',
    description:
      "Ouverture officielle du salon avec accueil des participants et découverte des espaces d'exposition.",
    status: 'Terminé',
    statusColor: 'success',
    standing: 'Standard',
    prix: 10000,
    datePaiement: '2024-01-15',
    isPaid: true,
    hasDocument: true,
    hasVideo: true,
    documentUrl: '#doc-prog-1',
    videoUrl: '#video-prog-1',
    type: 'Ouverture',
    location: 'Hall Principal - Parc des Expositions',
  },
  {
    id: '7',
    time: '09H00 - 12H00',
    title: "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
    description:
      "SOUS LA PRÉSIDENCE DE S.E.M. ALASSANE OUATTARA, À LA SALLE PLÉNIÈRE DU SITE DU SARA. REMISE DE KITS AUX JEUNES ENTREPRENEURS ET AUX FILIÈRES PAR LE PRÉSIDENT DE LA RÉPUBLIQUE.",
    status: 'En cours',
    statusColor: 'warning',
    standing: 'VIP',
    prix: 25000,
    datePaiement: '2024-01-15',
    isPaid: true,
    hasDocument: true,
    hasVideo: true,
    documentUrl: '#doc-prog-2',
    videoUrl: '#video-prog-2',
    type: 'Cérémonie',
    location: 'Salle Plénière',
  },
  {
    id: '8',
    time: '09H00 - 12H00',
    title: 'POINT DE PRESSE',
    description:
      'Conférence de presse avec les organisateurs et les personnalités présentes.',
    status: 'Non démarré',
    statusColor: 'default',
    standing: 'Standard',
    prix: 8000,
    datePaiement: '2024-01-15',
    isPaid: true,
    hasDocument: true,
    hasVideo: true,
    documentUrl: '#doc-prog-3',
    videoUrl: '#video-prog-3',
    type: 'Conférence',
    location: 'Salle de Conférence',
  },
  {
    id: '9',
    time: '09H00 - 12H00',
    title: 'PANEL DE HAUT NIVEAU (LES ASSISES DU SARA 2023)',
    description:
      'Table ronde avec les experts du secteur agricole sur les enjeux et perspectives.',
    status: 'En cours',
    statusColor: 'warning',
    standing: 'VIP',
    prix: 22000,
    datePaiement: '2024-01-15',
    isPaid: true,
    hasDocument: true,
    hasVideo: true,
    documentUrl: '#doc-prog-4',
    videoUrl: '#video-prog-4',
    type: 'Panel',
    location: 'Amphithéâtre A',
  },
  {
    id: '10',
    time: '14H00 - 17H00',
    title: 'ATELIERS TECHNIQUES',
    description:
      "Sessions d'ateliers techniques sur les innovations agricoles et les nouvelles technologies.",
    status: 'Non démarré',
    statusColor: 'default',
    standing: 'Standard',
    prix: 12000,
    datePaiement: '2024-01-15',
    isPaid: true,
    hasDocument: true,
    hasVideo: false,
    documentUrl: '#doc-prog-5',
    type: 'Atelier',
    location: 'Espaces Ateliers B & C',
  },
  {
    id: '11',
    time: '19H00',
    title: 'FERMETURE DU SALON ET DU SARA MARKET AU PUBLIC',
    description: "Fermeture des espaces d'exposition au grand public.",
    status: 'Non démarré',
    statusColor: 'default',
    standing: 'Standard',
    prix: 7000,
    datePaiement: '2024-01-15',
    isPaid: true,
    hasDocument: true,
    hasVideo: true,
    documentUrl: '#doc-prog-6',
    videoUrl: '#video-prog-6',
    type: 'Fermeture',
    location: 'Hall Principal',
  },
  {
    id: '12',
    time: '19H00 - 22H00',
    title: 'NOCTURNES AU SARA VILLAGE (CONCERTS ET ANIMATIONS)',
    description:
      "Soirée culturelle avec concerts et animations dans l'espace village.",
    status: 'En cours',
    statusColor: 'warning',
    standing: 'VIP',
    prix: 18000,
    datePaiement: '2024-01-15',
    isPaid: true,
    hasDocument: true,
    hasVideo: true,
    documentUrl: '#doc-prog-7',
    videoUrl: '#video-prog-7',
    type: 'Animation',
    location: 'SARA Village - Espace Culturel',
  },
  {
    id: '13',
    time: '10H00 - 16H00',
    title: 'FORUM DES JEUNES ENTREPRENEURS',
    description:
      'Rencontres et échanges entre jeunes entrepreneurs du secteur agricole.',
    status: 'Non démarré',
    statusColor: 'default',
    standing: 'Standard',
    prix: 9000,
    datePaiement: '2024-01-15',
    isPaid: true,
    hasDocument: true,
    hasVideo: true,
    documentUrl: '#doc-prog-8',
    videoUrl: '#video-prog-8',
    type: 'Forum',
    location: 'Pavillon Jeunesse',
  },
];
