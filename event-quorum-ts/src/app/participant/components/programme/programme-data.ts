// src/app/participant/components/programme/programme-data.ts

/**
 * Interface pour une activité du programme
 */
export interface ProgrammeActivity {
    id: string;
    time: string;
    title: string;
    description: string;
    type: string;
    status: 'Terminé' | 'En cours' | 'Non démarré';
    statusColor: 'success' | 'warning' | 'default';
    location: string; // Nouvelle propriété pour la localisation
    hasDocument: boolean;
    hasVideo: boolean;
}

/**
 * Interface pour un jour du programme
 */
export interface ProgrammeDay {
    id: string;
    label: string;
    date: string;
    activities: ProgrammeActivity[];
}

/**
 * Données du programme organisées par jour
 */
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
                description: 'Ouverture officielle du salon avec accueil des participants et découverte des espaces d\'exposition.',
                type: 'Ouverture',
                status: 'Terminé',
                statusColor: 'success',
                location: 'Hall Principal - Parc des Expositions',
                hasDocument: true,
                hasVideo: true,
            },
            {
                id: '2',
                time: '09H00 - 12H00',
                title: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
                description: 'SOUS LA PRÉSIDENCE DE S.E.M. ALASSANE OUATTARA, À LA SALLE PLÉNIÈRE DU SITE DU SARA. REMISE DE KITS AUX JEUNES ENTREPRENEURS ET AUX FILIÈRES PAR LE PRÉSIDENT DE LA RÉPUBLIQUE.',
                type: 'Cérémonie',
                status: 'En cours',
                statusColor: 'warning',
                location: 'Salle Plénière',
                hasDocument: true,
                hasVideo: true,
            },
            {
                id: '3',
                time: '09H00 - 12H00',
                title: 'POINT DE PRESSE',
                description: 'Conférence de presse avec les organisateurs et les personnalités présentes.',
                type: 'Conférence',
                status: 'Non démarré',
                statusColor: 'default',
                location: 'Salle de Conférence',
                hasDocument: true,
                hasVideo: true,
            },
        ]
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
                description: 'Table ronde avec les experts du secteur agricole sur les enjeux et perspectives.',
                type: 'Panel',
                status: 'En cours',
                statusColor: 'warning',
                location: 'Amphithéâtre A',
                hasDocument: true,
                hasVideo: true,
            },
            {
                id: '5',
                time: '14H00 - 17H00',
                title: 'ATELIERS TECHNIQUES',
                description: 'Sessions d\'ateliers techniques sur les innovations agricoles et les nouvelles technologies.',
                type: 'Atelier',
                status: 'Non démarré',
                statusColor: 'default',
                location: 'Espaces Ateliers B & C',
                hasDocument: true,
                hasVideo: false,
            },
            {
                id: '6',
                time: '19H00',
                title: 'FERMETURE DU SALON ET DU SARA MARKET AU PUBLIC',
                description: 'Fermeture des espaces d\'exposition au grand public.',
                type: 'Fermeture',
                status: 'Non démarré',
                statusColor: 'default',
                location: 'Hall Principal',
                hasDocument: true,
                hasVideo: true,
            },
        ]
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
                description: 'Soirée culturelle avec concerts et animations dans l\'espace village.',
                type: 'Animation',
                status: 'En cours',
                statusColor: 'warning',
                location: 'SARA Village - Espace Culturel',
                hasVideo: true,
                hasDocument: true,
            },
            {
                id: '8',
                time: '10H00 - 16H00',
                title: 'FORUM DES JEUNES ENTREPRENEURS',
                description: 'Rencontres et échanges entre jeunes entrepreneurs du secteur agricole.',
                type: 'Forum',
                status: 'Non démarré',
                statusColor: 'default',
                location: 'Pavillon Jeunesse',
                hasDocument: true,
                hasVideo: true,
            },
        ]
    }
];