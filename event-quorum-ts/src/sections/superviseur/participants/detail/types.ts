// src/sections/superviseur/participants/detail/types.ts

/**
 * Types pour la page de détails d'un invité (superviseur)
 */

/**
 * Type représentant les détails complets d'un participant
 */
export interface SuperviseurParticipantDetail {
    /** Identifiant unique */
    id: number;
    /** Nom */
    nom: string;
    /** Prénom */
    prenom: string;
    /** Téléphone */
    telephone: string;
    /** Email */
    email: string;
    /** Première connexion effectuée */
    connecte: boolean;
    /** URL de la signature d'émargement */
    emargement: string | null;
    /** Activité principale */
    activite: string;
    /** Type de connexion */
    typeConnexion: 'en ligne' | 'en présentiel';
    /** Liste de toutes les activités */
    activites: string[];
    /** Date de première connexion */
    datePremiereConnexion?: string;
    /** Date de dernière connexion */
    dateDerniereConnexion?: string;
    /** Checking confirmé (pour présentiel) */
    checking?: boolean;
}