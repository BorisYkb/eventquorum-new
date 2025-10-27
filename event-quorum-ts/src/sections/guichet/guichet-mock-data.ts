// File: src/sections/guichet/guichet-mock-data.ts

/**
 * Données mockées pour le module Guichet
 * 
 * Ce fichier contient les données de test pour les participants.
 * À remplacer par des appels API dans la version production.
 */

// ============================================
// TYPES
// ============================================

/**
 * Représente une activité payée par un participant
 */
export type ActivitePaye = {
  activiteId: string; // ID de l'activité (ex: '1', '2', etc.)
  standing: string;   // Standing sélectionné (ex: 'standard', 'vip', 'vvip', 'gratuit', 'included')
};

/**
 * Représente un participant avec ses activités payées
 */
export type ParticipantData = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  typeParticipation: 'En ligne' | 'En présentiel';
  activites: ActivitePaye[]; // Liste des activités payées avec leur standing
};

// ============================================
// DONNÉES MOCKÉES
// ============================================

/**
 * Liste des activités disponibles (pour référence et affichage)
 * Ces données doivent correspondre à celles de activites-data.ts
 */
export const ACTIVITES_DISPONIBLES = [
    { id: '1', nom: 'CÉRÉMONIE D\'OUVERTURE' },
    { id: '2', nom: 'POINT DE PRESSE' },
    { id: '3', nom: 'PANEL DE HAUT NIVEAU' },
    { id: '4', nom: 'PAUSE CAFE' },
    { id: '5', nom: 'COOLING BREAK' },
    { id: '6', nom: 'WORKSHOP' },
];

/**
 * Données mockées des participants avec leurs activités payées
 * 
 * Structure:
 * - activites: tableau d'objets { activiteId, standing }
 * - activiteId: correspond à l'ID dans ACTIVITES_DISPONIBLES
 * - standing: 'standard', 'vip', 'vvip', 'gratuit', ou 'included'
 * 
 * Exemples de cas :
 * - Participants avec activités payées (ID 1, 3, 4, 6, 7)
 * - Participants sans activités (ID 2, 5, 8)
 * - Différents types de participation (En ligne / En présentiel)
 * - Différents standings (standard, vip, vvip)
 * - Activités gratuites (standing: 'gratuit')
 * - Activités incluses (standing: 'included')
 */
export const MOCK_PARTICIPANTS: ParticipantData[] = [
    {
        id: 1,
        nom: 'Boudou',
        prenom: 'Khoudou',
        email: 'boudou@gmail.com',
        telephone: '0102030405',
        typeParticipation: 'En présentiel',
        activites: [
            { activiteId: '1', standing: 'vip' },      // Cérémonie - VIP
            { activiteId: '2', standing: 'standard' }, // Point de presse - Standard
        ],
    },
    {
        id: 2,
        nom: 'Kouame',
        prenom: 'Jean',
        email: 'kouame@gmail.com',
        telephone: '0706080945',
        typeParticipation: 'En ligne',
        activites: [], // Aucune activité payée - Cas important pour tester le bouton "Mettre à jour"
    },
    {
        id: 3,
        nom: 'Sidibe',
        prenom: 'Moussa',
        email: 'sidibemoussa@gmail.com',
        telephone: '0544023467',
        typeParticipation: 'En présentiel',
        activites: [
            { activiteId: '3', standing: 'included' }, // Panel - Inclus (pas de prix)
            { activiteId: '4', standing: 'vvip' },     // Pause café - VVIP
        ],
    },
    {
        id: 4,
        nom: 'GRA-BI',
        prenom: 'Amira',
        email: 'grabiamira@gmail.com',
        telephone: '0701459358',
        typeParticipation: 'En ligne',
        activites: [
            { activiteId: '2', standing: 'standard' }, // Point de presse - Standard
        ],
    },
    {
        id: 5,
        nom: 'Traore',
        prenom: 'Fatou',
        email: 'fatou.traore@gmail.com',
        telephone: '0607080910',
        typeParticipation: 'En présentiel',
        activites: [], // Aucune activité payée
    },
    {
        id: 6,
        nom: 'Koffi',
        prenom: 'Emmanuel',
        email: 'koffi@gmail.com',
        telephone: '0101010101',
        typeParticipation: 'En ligne',
        activites: [
            { activiteId: '1', standing: 'vvip' },     // Cérémonie - VVIP
            { activiteId: '3', standing: 'included' }, // Panel - Inclus
            { activiteId: '5', standing: 'gratuit' },  // Cooling break - Gratuit
        ],
    },
    {
        id: 7,
        nom: 'Diallo',
        prenom: 'Mariama',
        email: 'mariama.diallo@gmail.com',
        telephone: '0708091011',
        typeParticipation: 'En présentiel',
        activites: [
            { activiteId: '6', standing: 'vip' },      // Workshop - VIP
            { activiteId: '4', standing: 'standard' }, // Pause café - Standard
        ],
    },
    {
        id: 8,
        nom: 'Kone',
        prenom: 'Abdoulaye',
        email: 'abdou.kone@gmail.com',
        telephone: '0501020304',
        typeParticipation: 'En ligne',
        activites: [], // Aucune activité payée
    },
];

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/**
 * Recherche un participant par son ID
 * @param id - ID du participant à rechercher
 * @returns Le participant trouvé ou undefined
 */
export function findParticipantById(id: number): ParticipantData | undefined {
    return MOCK_PARTICIPANTS.find((p) => p.id === id);
}

/**
 * Récupère tous les participants
 * @returns Liste de tous les participants
 */
export function getAllParticipants(): ParticipantData[] {
    return [...MOCK_PARTICIPANTS]; // Retourne une copie pour éviter les mutations
}

/**
 * Filtre les participants par activité
 * @param activiteId - ID de l'activité à filtrer
 * @returns Liste des participants ayant payé cette activité
 */
export function getParticipantsByActivity(activiteId: string): ParticipantData[] {
    return MOCK_PARTICIPANTS.filter((p) =>
        p.activites.some((act) => act.activiteId === activiteId)
    );
}

/**
 * Filtre les participants par type de participation
 * @param type - Type de participation ('En ligne' ou 'En présentiel')
 * @returns Liste des participants de ce type
 */
export function getParticipantsByType(type: 'En ligne' | 'En présentiel'): ParticipantData[] {
    return MOCK_PARTICIPANTS.filter((p) => p.typeParticipation === type);
}

/**
 * Récupère les participants sans activités
 * @returns Liste des participants n'ayant payé aucune activité
 */
export function getParticipantsWithoutActivities(): ParticipantData[] {
    return MOCK_PARTICIPANTS.filter((p) => p.activites.length === 0);
}

/**
 * Récupère les participants avec au moins une activité
 * @returns Liste des participants ayant payé au moins une activité
 */
export function getParticipantsWithActivities(): ParticipantData[] {
    return MOCK_PARTICIPANTS.filter((p) => p.activites.length > 0);
}

/**
 * Compte le nombre total de participants
 * @returns Nombre total de participants
 */
export function getTotalParticipantsCount(): number {
    return MOCK_PARTICIPANTS.length;
}

/**
 * Compte le nombre de participants par type
 * @returns Objet avec le compte par type
 */
export function getParticipantsCountByType(): { enLigne: number; enPresentiel: number } {
    return {
        enLigne: MOCK_PARTICIPANTS.filter((p) => p.typeParticipation === 'En ligne').length,
        enPresentiel: MOCK_PARTICIPANTS.filter((p) => p.typeParticipation === 'En présentiel').length,
    };
}

/**
 * Compte le nombre de participants par activité
 * @returns Map avec l'ID de l'activité comme clé et le nombre de participants comme valeur
 */
export function getParticipantsCountByActivity(): Map<string, number> {
    const counts = new Map<string, number>();

    ACTIVITES_DISPONIBLES.forEach((activite) => {
        const count = MOCK_PARTICIPANTS.filter((p) =>
            p.activites.some((act) => act.activiteId === activite.id)
        ).length;
        counts.set(activite.id, count);
    });

    return counts;
}

/**
 * Récupère le nom d'une activité par son ID
 * @param activiteId - ID de l'activité
 * @returns Nom de l'activité ou undefined
 */
export function getActivityName(activiteId: string): string | undefined {
    return ACTIVITES_DISPONIBLES.find((a) => a.id === activiteId)?.nom;
}