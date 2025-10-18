// src/app/participant/enpresentiel/payer/mesinteractions/[id]/components/survey-data.ts

import type { SurveyQuestion, SurveyData } from './types';

/**
 * Données des questions pour l'enquête de satisfaction avec réponses complètes
 */
export const SURVEY_QUESTIONS: SurveyQuestion[] = [
    {
        id: 1,
        question: 'QUESTION 1',
        description: 'Êtes-vous satisfait de l\'activité panel de haut niveau ?',
        correctAnswer: 'La satisfaction globale était excellente avec une organisation impeccable et des intervenants de qualité',
        userResponse: 'La satisfaction globale était excellente avec une organisation impeccable et des intervenants de qualité',
        responseColor: 'success.main',
        isCorrect: true,
        isFreeResponse: false,
        detailedExplanation: 'Excellente réponse ! Cette activité a été conçue pour offrir une expérience enrichissante aux participants de haut niveau. Votre appréciation positive reflète les efforts déployés pour garantir une organisation de qualité.',
        options: [
            'Très insatisfait, l\'organisation était médiocre',
            'La satisfaction globale était excellente avec une organisation impeccable et des intervenants de qualité',
            'Moyennement satisfait avec quelques aspects à améliorer',
            'Sans avis particulier sur cette activité'
        ]
    },
    {
        id: 2,
        question: 'QUESTION 2',
        description: 'Comment évaluez-vous la pertinence des sujets abordés ?',
        correctAnswer: 'Les sujets étaient parfaitement alignés avec les enjeux actuels du secteur et très pertinents pour mon domaine d\'activité',
        userResponse: 'Les thématiques manquaient de profondeur et ne correspondaient pas vraiment à mes attentes professionnelles',
        responseColor: 'error.main',
        isCorrect: false,
        isFreeResponse: false,
        detailedExplanation: 'La réponse attendue était que les sujets étaient parfaitement alignés avec les enjeux actuels. Cette question évaluait votre compréhension des aspects techniques et thématiques du panel. Les organisateurs ont sélectionné les sujets en fonction des tendances et des besoins identifiés dans le secteur.',
        options: [
            'Les thématiques manquaient de profondeur et ne correspondaient pas vraiment à mes attentes professionnelles',
            'Certains sujets étaient intéressants mais d\'autres semblaient hors contexte',
            'Les sujets étaient parfaitement alignés avec les enjeux actuels du secteur et très pertinents pour mon domaine d\'activité',
            'Aucune opinion sur la pertinence des thématiques'
        ]
    },
    {
        id: 3,
        question: 'QUESTION 3',
        description: 'Quelles suggestions avez-vous pour améliorer les prochaines éditions ? (Réponse libre)',
        correctAnswer: '-',
        userResponse: 'Il serait intéressant d\'organiser plus de sessions pratiques avec des ateliers interactifs et d\'améliorer la gestion du temps pour permettre davantage d\'échanges entre participants',
        responseColor: 'text.primary',
        isCorrect: true,
        isFreeResponse: true,
        detailedExplanation: 'Question à réponse libre. Votre retour est précieux pour améliorer nos services. Vos suggestions concernant les ateliers interactifs et la gestion du temps seront prises en compte pour les prochaines éditions.',
        options: ['Réponse libre']
    },
    {
        id: 4,
        question: 'QUESTION 4',
        description: 'Recommanderiez-vous cette activité à vos collègues ?',
        correctAnswer: 'Oui absolument, je la recommande vivement pour la qualité des interventions et les opportunités de networking',
        userResponse: 'Oui absolument, je la recommande vivement pour la qualité des interventions et les opportunités de networking',
        responseColor: 'success.main',
        isCorrect: true,
        isFreeResponse: false,
        detailedExplanation: 'Parfait ! Vous avez bien identifié les points clés de satisfaction concernant cette activité. Votre recommandation positive témoigne de la valeur ajoutée que vous avez trouvée dans cette expérience.',
        options: [
            'Oui absolument, je la recommande vivement pour la qualité des interventions et les opportunités de networking',
            'Probablement, mais avec quelques réserves sur certains aspects organisationnels',
            'Non, je ne pense pas que cela corresponde aux besoins de mes collègues',
            'Je ne sais pas, j\'ai besoin de plus de recul pour me prononcer'
        ]
    },
];

/**
 * Fonction pour récupérer les données d'une enquête selon son ID
 */
export const getSurveyData = (id: string): SurveyData => ({
    id,
    title: 'Satisfaction',
    description: 'Satisfaction sur l\'activité',
    totalScore: '8/10',
    status: 'En cours',
    statusColor: 'success.main',
    questions: SURVEY_QUESTIONS,
});