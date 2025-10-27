// src/sections/superviseur/participants/types.ts

/**
 * Type représentant un participant/invité pour le superviseur
 */
export type SuperviseurParticipant = {
  /** Identifiant unique du participant */
  id: number;
  /** Nom de famille */
  nom: string;
  /** Prénom */
  prenom: string;
  /** Numéro de téléphone */
  telephone: string;
  /** Adresse email */
  email: string;
  /** Indique si la première connexion a été effectuée (true) ou non (false) */
  connecte: boolean;
  /** URL de la signature d'émargement ou null si pas encore signé */
  emargement: string | null;
  /** Type d'activité auquel le participant est inscrit */
  activite: string;
  /** Type de connexion : en ligne ou en présentiel */
  typeConnexion: 'en ligne' | 'en présentiel';
  /** Indique si le participant a confirmé être dans la salle */
  checking?: boolean;
}

/**
 * Type pour les filtres actifs
 */
export type ActiveFilters = {
  activityFilter: string;
  firstConnectionFilter: string;
  connectionTypeFilter: string;
  emargementFilter: string;
  checkingFilter: string;
}