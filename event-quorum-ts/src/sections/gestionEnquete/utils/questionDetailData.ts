// File: src/sections/gestionEnquete/utils/questionDetailData.ts

import { Question } from 'src/app/organisateur/gestionenquete/nouveau/types';

import type { QuestionResult, ParticipantResult } from '../types/resultTypes';

/**
 * Interface pour les données complètes de la question
 */
export interface QuestionDetailData {
    question: Question;
    results: QuestionResult;
    participantsResults: ParticipantResult[];
}

// ✅ Export des types pour utilisation dans d'autres composants
export type { QuestionResult, ParticipantResult } from '../types/resultTypes';

/**
 * Fonction pour générer les données d'exemple d'une question
 * À remplacer par les vraies données de l'API
 */
export const getSampleQuestionData = (questionId: number): QuestionDetailData => {
    // Question de base selon l'ID
    const baseQuestion: Question = {
        id: questionId,
        question: questionId === 1
            ? "Les populations de la côte d'ivoire proposent que l'établissement de la carte nationale d'identité soit gratuit. Qu'en pensez-vous ?"
            : questionId === 2
                ? "Quel est le principal avantage de la rotation des cultures ?"
                : questionId === 3
                    ? "Sur une échelle de 1 à 10, comment évaluez-vous la qualité de l'organisation ?"
                    : "Avez-vous des suggestions d'amélioration ?",
        type: questionId === 1 || questionId === 2 ? 'choix_multiple'
            : questionId === 3 ? 'echelle_lineaire'
                : 'question_libre',
        reponses: questionId === 1
            ? ["Oui", "Non", "Sans avis"]
            : questionId === 2
                ? ["Réponse1", "Réponse2", "Réponse3", "Réponse4"]
                : questionId === 3
                    ? []
                    : [],
        enqueteId: 1,
        nombrePoints: 10,
        bonneReponse: questionId === 2 ? 1 : 0,
        required: true,
        echelleMin: questionId === 3 ? 1 : undefined,
        echelleMax: questionId === 3 ? 10 : undefined,
        labelMin: questionId === 3 ? 'Très mauvais' : undefined,
        labelMax: questionId === 3 ? 'Excellent' : undefined
    };

    // Résultats et participants selon le type de question
    let results: QuestionResult;
    let participantsResults: ParticipantResult[];

    // Question 1 : Choix multiple avec couleurs personnalisées
    if (questionId === 1) {
        results = {
            questionNumber: 1,
            question: baseQuestion.question,
            typeQuestion: 'Choix multiple',
            totalParticipants: 50,
            totalReponses: 50,
            reponses: [
                { label: "Oui", count: 35, percentage: 70, color: '#4caf50' },
                { label: "Non", count: 13, percentage: 26, color: '#f44336' },
                { label: "Sans avis", count: 2, percentage: 4, color: '#ff9800' }
            ]
        };

        participantsResults = [
            { nom_prenom: "Bouadou kouadou evarist", statut_participant: "En ligne", reponse: "Oui", date: "10/05/2024 10:00" },
            { nom_prenom: "Kouassi", statut_participant: "En ligne", reponse: "Oui", date: "10/05/2024 10:00" },
            { nom_prenom: "Ahirlé jean", statut_participant: "En présentiel", reponse: "Non", date: "10/05/2024 10:00" },
            { nom_prenom: "Ouattara", statut_participant: "En ligne", reponse: "Oui", date: "10/05/2024 10:00" },
            { nom_prenom: "Beni", statut_participant: "En ligne", reponse: "Oui", date: "10/05/2024 10:00" },
            { nom_prenom: "Kouassi Ali", statut_participant: "En ligne", reponse: "Non", date: "10/05/2024 10:15" },
            { nom_prenom: "Traoré", statut_participant: "En présentiel", reponse: "Sans avis", date: "10/05/2024 10:20" }
        ];
    }
    // Question 2 : Choix multiple avec plusieurs réponses
    else if (questionId === 2) {
        results = {
            questionNumber: 2,
            question: baseQuestion.question,
            typeQuestion: 'Choix multiple',
            totalParticipants: 60,
            totalReponses: 60,
            reponses: [
                { label: "Réponse1", count: 3, percentage: 5, color: '#1976d2' },
                { label: "Réponse2", count: 55, percentage: 92, color: '#42a5f5' },
                { label: "Réponse3", count: 2, percentage: 3, color: '#64b5f6' },
                { label: "Réponse4", count: 0, percentage: 0, color: '#90caf9' }
            ]
        };

        participantsResults = [
            { nom_prenom: "Badra", statut_participant: "En ligne", reponse: "Réponse1", date: "10/05/2024 10:00" },
            { nom_prenom: "Ali", statut_participant: "En ligne", reponse: "Réponse2", date: "10/05/2024 10:00" },
            { nom_prenom: "Coulibaly Aubert", statut_participant: "En présentiel", reponse: "Réponse2", date: "10/05/2024 10:00" },
            { nom_prenom: "Manadia Ahirlé jean", statut_participant: "En présentiel", reponse: ["Réponse1", "Réponse2", "Réponse4"], date: "10/05/2024 10:00" },
            { nom_prenom: "Bouadou kouadou Evarist", statut_participant: "En ligne", reponse: ["Réponse3", "Réponse4"], date: "10/05/2024 10:00" }
        ];
    }
    // Question 3 : Échelle linéaire
    else if (questionId === 3) {
        results = {
            questionNumber: 3,
            question: baseQuestion.question,
            typeQuestion: 'Échelle linéaire',
            totalParticipants: 45,
            totalReponses: 45,
            reponses: [
                { label: "1", count: 2, percentage: 4, color: '#1976d2' },
                { label: "2", count: 3, percentage: 7, color: '#42a5f5' },
                { label: "3", count: 5, percentage: 11, color: '#64b5f6' },
                { label: "4", count: 8, percentage: 18, color: '#90caf9' },
                { label: "5", count: 10, percentage: 22, color: '#bbdefb' },
                { label: "6", count: 7, percentage: 16, color: '#1976d2' },
                { label: "7", count: 5, percentage: 11, color: '#42a5f5' },
                { label: "8", count: 3, percentage: 7, color: '#64b5f6' },
                { label: "9", count: 1, percentage: 2, color: '#90caf9' },
                { label: "10", count: 1, percentage: 2, color: '#bbdefb' }
            ]
        };

        participantsResults = [
            { nom_prenom: "Kouassi", statut_participant: "En ligne", reponse: "8", date: "10/05/2024 10:00" },
            { nom_prenom: "Ahirlé jean", statut_participant: "En présentiel", reponse: "7", date: "10/05/2024 10:00" },
            { nom_prenom: "Ouattara", statut_participant: "En ligne", reponse: "9", date: "10/05/2024 10:00" },
            { nom_prenom: "Beni", statut_participant: "En ligne", reponse: "6", date: "10/05/2024 10:05" },
            { nom_prenom: "Traoré", statut_participant: "En présentiel", reponse: "5", date: "10/05/2024 10:10" }
        ];
    }
    // Question 4 : Question libre
    else {
        results = {
            questionNumber: 4,
            question: baseQuestion.question,
            typeQuestion: 'Question libre',
            totalParticipants: 30,
            totalReponses: 30,
            reponses: [
                { label: "Améliorer la communication", count: 5, percentage: 0, color: '#1976d2' },
                { label: "Plus d'interactivité", count: 8, percentage: 0, color: '#42a5f5' },
                { label: "Meilleure organisation", count: 7, percentage: 0, color: '#64b5f6' },
                { label: "Autres suggestions", count: 10, percentage: 0, color: '#90caf9' }
            ]
        };

        participantsResults = [
            { nom_prenom: "Bouadou", statut_participant: "En ligne", reponse: "Il faudrait améliorer la communication entre les participants", date: "10/05/2024 10:00" },
            { nom_prenom: "Kouassi", statut_participant: "En présentiel", reponse: "Plus d'activités interactives seraient appréciées", date: "10/05/2024 10:00" },
            { nom_prenom: "Ahirlé", statut_participant: "En ligne", reponse: "L'organisation était bonne mais peut être améliorée", date: "10/05/2024 10:00" },
            { nom_prenom: "Ouattara", statut_participant: "En ligne", reponse: "Très satisfait de l'événement", date: "10/05/2024 10:05" },
            { nom_prenom: "Traoré", statut_participant: "En présentiel", reponse: "Quelques améliorations à apporter sur la logistique", date: "10/05/2024 10:10" }
        ];
    }

    return {
        question: baseQuestion,
        results,
        participantsResults
    };
};