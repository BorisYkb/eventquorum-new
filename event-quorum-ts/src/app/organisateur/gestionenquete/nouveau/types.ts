// File: src/app/organisateur/gestionenquetes/nouveau/types.ts

export interface Enquete {
  id: number;
  titre: string;
  activite: string;
  typeEnquete: 'live' | 'asynchrone';
  enqueteAnonymat: boolean;
  authentificationNumerique: boolean;
  createdAt: string;
}

export interface Question {
  id: number;
  question: string;
  type: 'liste_deroulante' | 'case_a_cocher' | 'question_libre' | 'echelle_lineaire' | 'choix_multiple';
  reponses: string[];
  enqueteId: number; // ID de l'enquête associée
  nombrePoints: number;
  bonneReponse: number;
  required: boolean;
  // Propriétés spécifiques aux échelles linéaires
  echelleMin?: number;
  echelleMax?: number;
  labelMin?: string;
  labelMax?: string;
}

export interface CurrentQuestion {
  question: string;
  type: Question['type'];
  reponses: string[];
  enqueteId: number;
  nombrePoints: number;
  bonneReponse: number;
  required: boolean;
  // Propriétés spécifiques aux échelles linéaires
  echelleMin: number;
  echelleMax: number;
  labelMin: string;
  labelMax: string;
}

export interface EnqueteFormData {
  titre: string;
  activite: string;
  typeEnquete: 'live' | 'asynchrone';
  enqueteAnonymat: boolean;
  authentificationNumerique: boolean;
}

// Types de questions disponibles
export const QUESTION_TYPES = [
  { value: 'liste_deroulante', label: 'Liste déroulante' },
  { value: 'case_a_cocher', label: 'Case à cocher' },
  { value: 'question_libre', label: 'Question libre' },
  { value: 'echelle_lineaire', label: 'Échelle linéaire' },
  { value: 'choix_multiple', label: 'Choix multiple' }
] as const;

// Activités disponibles
export const ACTIVITES = [
  "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
  "PANEL DE HAUT NIVEAU",
  "POINT DE PRESSE",
  "COOLING BREAK",
  "PAUSE CAFE"
] as const;