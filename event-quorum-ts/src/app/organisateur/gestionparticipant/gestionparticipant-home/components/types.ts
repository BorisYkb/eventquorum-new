//src/app/organisateur/gestionparticipant/gestionparticipant-home/components/types.ts

/**
 * Type représentant un participant/invité
 */
export type Participant = {
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
};

/**
 * Type pour les options d'export
 */
export type ExportOption = {
  value: string;
  label: string;
};

/**
 * Type pour les activités disponibles
 */
export type Activity = {
  value: string;
  label: string;
};

/**
 * Type pour les filtres de participants
 */
export type ParticipantFilters = {
  /** Terme de recherche (nom, prénom, email) */
  searchTerm: string;
  /** Filtre par activité */
  activityFilter: string;
  /** Filtre par statut de première connexion */
  firstConnectionFilter: string;
  /** Filtre par type de connexion (en ligne/présentiel) */
  connectionTypeFilter: string;
};

/**
 * Type pour l'état de pagination
 */
export type PaginationState = {
  page: number;
  rowsPerPage: number;
};

/**
 * Type pour l'état de la table
 */
export type TableState = {
  selectedParticipants: number[];
  signatureEnabled: boolean;
};