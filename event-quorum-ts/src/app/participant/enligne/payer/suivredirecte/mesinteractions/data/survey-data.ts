// src/app/participant/enligne/payer/suivredirecte/mesinteractions/data/survey-data.ts

/**
 * Interface pour une option de réponse
 */
export interface AnswerOption {
    id: number;
    text: string;
    value: string;
}

/**
 * Interface pour une question d'enquête
 */
export interface SurveyQuestion {
    id: number;
    question: string;
    description: string;
    correctAnswer: string;
    userResponse: string;
    responseColor: string;
    possibleAnswers: AnswerOption[];
    detailedExplanation?: string;
}

/**
 * Interface pour les données d'une enquête
 */
export interface SurveyData {
    id: string;
    title: string;
    description: string;
    totalScore: string;
    status: string;
    statusColor: string;
    questions: SurveyQuestion[];
}

/**
 * Données des questions pour l'enquête de satisfaction - Panel de Haut Niveau
 */
export const SURVEY_QUESTIONS: SurveyQuestion[] = [
    {
        id: 1,
        question: 'QUESTION 1',
        description: 'Combien de participants étaient présents lors du panel de haut niveau ?',
        correctAnswer: 'entre_100_150',
        userResponse: 'entre_100_150',
        responseColor: 'success.main',
        possibleAnswers: [
            { id: 1, text: 'Moins de 50 participants', value: 'moins_50' },
            { id: 2, text: 'Entre 50 et 100 participants', value: 'entre_50_100' },
            { id: 3, text: 'Entre 100 et 150 participants', value: 'entre_100_150' },
            { id: 4, text: 'Plus de 150 participants', value: 'plus_150' }
        ],
        detailedExplanation: 'Le panel comptait effectivement entre 100 et 150 participants selon les registres d\'inscription officiels.'
    },
    {
        id: 2,
        question: 'QUESTION 2',
        description: 'Quelle était la durée prévue du panel de haut niveau selon le programme officiel ?',
        correctAnswer: '3_heures',
        userResponse: 'Je pense que cela durait environ 2 heures car j\'ai vu que beaucoup de personnes sont parties vers 11h30 et l\'événement avait commencé à 9h00 selon mes observations personnelles',
        responseColor: 'error.main',
        possibleAnswers: [
            { id: 1, text: '1 heure', value: '1_heure' },
            { id: 2, text: '2 heures', value: '2_heures' },
            { id: 3, text: '3 heures', value: '3_heures' },
            { id: 4, text: '4 heures ou plus', value: '4_heures_plus' }
        ],
        detailedExplanation: 'Selon le programme officiel, le panel était prévu pour durer 3 heures complètes, de 9h00 à 12h00.'
    },
    {
        id: 3,
        question: 'QUESTION 3',
        description: 'Quel était le thème principal abordé lors du panel ?',
        correctAnswer: 'innovations_agricoles',
        userResponse: 'Le financement des projets agricoles',
        responseColor: 'error.main',
        possibleAnswers: [
            { id: 1, text: 'Les innovations agricoles en Afrique', value: 'innovations_agricoles' },
            { id: 2, text: 'Le financement des projets agricoles', value: 'financement_projets' },
            { id: 3, text: 'Les politiques gouvernementales', value: 'politiques_gouvernementales' },
            { id: 4, text: 'La transformation digitale', value: 'transformation_digitale' }
        ],
        detailedExplanation: 'Le thème principal était "Les innovations agricoles en Afrique", bien que le financement ait été évoqué comme sous-thème.'
    },
    {
        id: 4,
        question: 'QUESTION 4',
        description: 'Comment évaluez-vous la qualité des présentations lors de ce panel ?',
        correctAnswer: 'tres_satisfaisant',
        userResponse: 'Très satisfaisant - les intervenants étaient compétents et les supports visuels de qualité',
        responseColor: 'success.main',
        possibleAnswers: [
            { id: 1, text: 'Très satisfaisant', value: 'tres_satisfaisant' },
            { id: 2, text: 'Satisfaisant', value: 'satisfaisant' },
            { id: 3, text: 'Moyen', value: 'moyen' },
            { id: 4, text: 'Insatisfaisant', value: 'insatisfaisant' }
        ],
        detailedExplanation: 'Votre évaluation positive correspond aux retours généraux des participants sur la qualité du panel.'
    },
    {
        id: 5,
        question: 'QUESTION 5',
        description: 'Quelle recommandation principale feriez-vous pour améliorer les prochaines éditions du SARA ?',
        correctAnswer: 'plus_interaction',
        userResponse: 'Il faudrait prévoir une meilleure gestion du temps car certains intervenants ont dépassé leur créneau et cela a créé des retards dans le programme général. Aussi, l\'espace de networking pourrait être mieux organisé pour favoriser les échanges entre participants',
        responseColor: 'warning.main',
        possibleAnswers: [
            { id: 1, text: 'Prévoir plus d\'interactions avec le public', value: 'plus_interaction' },
            { id: 2, text: 'Améliorer la gestion du temps', value: 'meilleur_timing' },
            { id: 3, text: 'Diversifier les intervenants', value: 'diversifier_intervenants' },
            { id: 4, text: 'Renforcer la logistique', value: 'renforcer_logistique' }
        ],
        detailedExplanation: 'Bien que votre suggestion sur la gestion du temps soit pertinente, la recommandation principale des organisateurs portait sur l\'augmentation des interactions avec le public.'
    }
];

/**
 * Fonction pour obtenir les données d'enquête selon l'ID
 */
export const getSurveyData = (id: string): SurveyData => ({
    id,
    title: 'Satisfaction',
    description: 'Évaluation du Panel de Haut Niveau - SARA 2023',
    totalScore: '8/10',
    status: 'Terminée',
    statusColor: 'success.main',
    questions: SURVEY_QUESTIONS,
});

/**
 * Fonction utilitaire pour tronquer les réponses longues
 */
export const truncateResponse = (text: string, maxLength: number = 50): string => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
};