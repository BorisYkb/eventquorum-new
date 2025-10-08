// File: src/sections/gestionEnquete/types/resultTypes.ts

/**
 * Types communs pour les résultats d'enquête
 * À utiliser dans tous les composants de résultats pour éviter les conflits de types
 */

/**
 * Interface pour une réponse avec ses statistiques
 */
export interface ReponseData {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

/**
 * Interface pour les données d'une question avec ses résultats
 */
export interface QuestionData {
  questionNumber: number;
  question: string;
  totalParticipants: number;
  totalReponses: number;
  reponses: ReponseData[];
}

/**
 * Interface pour les résultats d'une question (avec type)
 */
export interface QuestionResult extends QuestionData {
  typeQuestion: string;
}

/**
 * Interface pour les résultats d'un participant
 */
export interface ParticipantResult {
  nom_prenom: string;
  statut_participant: 'En ligne' | 'En présentiel' | 'Clôturé';
  reponse: string | string[];
  date: string;
}