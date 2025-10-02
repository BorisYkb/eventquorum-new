// src/app/participant/components/programme/programme-data.ts

export interface ProgrammeActivity {
    id: string;
    time: string;
    title: string;
    description: string;
    status: 'Terminé' | 'En cours' | 'Non démarré';
    statusColor: 'success' | 'warning' | 'default' | 'error' | 'info';
    standing: string;
    /** 0 = Gratuit, null = pas de prix individuel, >0 = montant */
    prix: number | null;
    datePaiement: string;
    isPaid: boolean;
    hasDocument: boolean;
    hasVideo: boolean;
    documentUrl?: string;
    videoUrl?: string;

    // Champs conservés du programme
    type: string;
    location: string;
}

export interface ProgrammeDay {
    id: string;
    label: string;
    date: string;
    activities: ProgrammeActivity[];
}

export const PROGRAMME_DAYS: ProgrammeDay[] = [
    {
        id: 'jour-1',
        label: 'Jour 1',
        date: '29 septembre 2023',
        activities: [
            {
                id: '1',
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
                id: '2',
                time: '09H00 - 12H00',
                title: "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
                description:
                    "SOUS LA PRÉSIDENCE DE S.E.M. ALASSANE OUATTARA, À LA SALLE PLÉNIÈRE DU SITE DU SARA. REMISE DE KITS AUX JEUNES ENTREPRENEURS ET AUX FILIÈRES PAR LE PRÉSIDENT DE LA RÉPUBLIQUE.",
                status: 'En cours',
                statusColor: 'warning',
                standing: 'VIP',
                prix: null, // ---- pas de prix individuel
                datePaiement: '2024-01-15',
                isPaid: false,
                hasDocument: true,
                hasVideo: true,
                documentUrl: '#doc-prog-2',
                videoUrl: '#video-prog-2',
                type: 'Cérémonie',
                location: 'Salle Plénière',
            },
            {
                id: '3',
                time: '09H00 - 12H00',
                title: 'POINT DE PRESSE',
                description:
                    'Conférence de presse avec les organisateurs et les personnalités présentes.',
                status: 'Non démarré',
                statusColor: 'error',
                standing: 'Standard',
                prix: 0, // Gratuit
                datePaiement: '2024-01-15',
                isPaid: false,
                hasDocument: true,
                hasVideo: true,
                documentUrl: '#doc-prog-3',
                videoUrl: '#video-prog-3',
                type: 'Conférence',
                location: 'Salle de Conférence',
            },
        ],
    },
    {
        id: 'jour-2',
        label: 'Jour 2',
        date: '30 septembre 2023',
        activities: [
            {
                id: '4',
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
                id: '5',
                time: '14H00 - 17H00',
                title: 'ATELIERS TECHNIQUES',
                description:
                    "Sessions d'ateliers techniques sur les innovations agricoles et les nouvelles technologies.",
                status: 'Non démarré',
                statusColor: 'error',
                standing: 'Standard',
                prix: null, // ---- pas de prix individuel
                datePaiement: '2024-01-15',
                isPaid: false,
                hasDocument: true,
                hasVideo: false,
                documentUrl: '#doc-prog-5',
                type: 'Atelier',
                location: 'Espaces Ateliers B & C',
            },
            {
                id: '6',
                time: '19H00',
                title: 'FERMETURE DU SALON ET DU SARA MARKET AU PUBLIC',
                description: "Fermeture des espaces d'exposition au grand public.",
                status: 'Non démarré',
                statusColor: 'error',
                standing: 'Standard',
                prix: 0, // Gratuit
                datePaiement: '2024-01-15',
                isPaid: false,
                hasDocument: true,
                hasVideo: true,
                documentUrl: '#doc-prog-6',
                videoUrl: '#video-prog-6',
                type: 'Fermeture',
                location: 'Hall Principal',
            },
        ],
    },
    {
        id: 'jour-3',
        label: 'Jour 3',
        date: '01 octobre 2023',
        activities: [
            {
                id: '7',
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
                id: '8',
                time: '10H00 - 16H00',
                title: 'FORUM DES JEUNES ENTREPRENEURS',
                description:
                    'Rencontres et échanges entre jeunes entrepreneurs du secteur agricole.',
                status: 'Non démarré',
                statusColor: 'error',
                standing: 'Standard',
                prix: 0, // Gratuit
                datePaiement: '2024-01-15',
                isPaid: false,
                hasDocument: true,
                hasVideo: true,
                documentUrl: '#doc-prog-8',
                videoUrl: '#video-prog-8',
                type: 'Forum',
                location: 'Pavillon Jeunesse',
            },
        ],
    },
];
