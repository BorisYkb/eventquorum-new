// src/app/participant/enligne/payer/activites/components/activites-payees-data.ts

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
}

// Données des activités payées
export const ACTIVITES_PAYEES: ActivitePayee[] = [
  {
    id: '1',
    time: '09H00 - 10H00',
    title: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
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
    videoUrl: '#video-1'
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
    videoUrl: '#video-4'
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
    documentUrl: '#doc-5'
  }
];

// Données des activités non payées
export const ACTIVITES_NON_PAYEES: ActivitePayee[] = [
  {
    id: '2',
    time: '10H00 - 11H00',
    title: 'POINT DE PRESSE',
    description: 'Conférence de presse avec les organisateurs',
    status: 'Non démarré',
    statusColor: 'default',
    standing: 'Standard',
    prix: 0,
    datePaiement: '',
    isPaid: false,
    hasDocument: true,
    hasVideo: false,
    documentUrl: '#doc-2'
  },
  {
    id: '3',
    time: '11H00 - 12H00',
    title: 'PANEL DE HAUT NIVEAU',
    description: 'Table ronde avec les experts du secteur',
    status: 'En cours',
    statusColor: 'warning',
    standing: "Standard | VIP",
    prix: 15000,
    datePaiement: '',
    isPaid: false,
    hasDocument: true,
    hasVideo: true,
    documentUrl: '#doc-3',
    videoUrl: '#video-3'
  },
  {
    id: '6',
    time: '14H00 - 15H00',
    title: 'WORKSHOP',
    description: 'Atelier pratique sur les innovations agricoles',
    status: 'Non démarré',
    statusColor: 'default',
    standing: 'VIP | VVIP',
    prix: 100000,
    datePaiement: '',
    isPaid: false,
    hasDocument: false,
    hasVideo: true,
    videoUrl: '#video-6'
  }
];