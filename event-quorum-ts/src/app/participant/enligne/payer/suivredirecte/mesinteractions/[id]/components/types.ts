// src/app/participant/enpresentiel/payer/mesinteractions/[id]/components/types.ts

/**
 * Type pour une question d'enquête avec réponses complètes
 */
export type SurveyQuestion = {
    id: number;
    question: string;
    description: string;
    correctAnswer: string; // Réponse complète
    userResponse: string; // Réponse complète de l'utilisateur
    responseColor: string;
    detailedExplanation?: string;
    options?: string[];
    isCorrect: boolean; // true si la réponse est correcte
    isFreeResponse: boolean; // true si c'est une réponse libre
};

/**
 * Type pour les tailles de police responsives
 */
export type FontSizes = {
    h4: { fontSize: string; fontWeight: number };
    h6: { fontSize: string; fontWeight: number };
    subtitle1: { fontSize: string; fontWeight: number };
    body2: { fontSize: string; fontWeight: number };
    tableHeader: { fontSize: string; fontWeight: number };
    tableCell: { fontSize: string; fontWeight: number };
    chip: { fontSize: string; fontWeight: number };
    iconSize: { width: number; height: number };
};

/**
 * Données de l'enquête
 */
export type SurveyData = {
    id: string;
    title: string;
    description: string;
    totalScore: string;
    status: string;
    statusColor: string;
    questions: SurveyQuestion[];
};