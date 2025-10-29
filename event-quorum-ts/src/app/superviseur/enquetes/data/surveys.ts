// data/surveys.ts
import { Survey, Question, QuestionType } from '../types/survey';

export const surveys: Survey[] = [
  {
    id: 1,
    title: "Satisfaction des internautes",
    activity: "Activité 1",
    code: "52340",
    participants: 60,
    responses: 43,
    status: "Terminée",
    statusColor: "red",
    description: "Enquête sur la satisfaction des utilisateurs de notre plateforme web",
    option: "Asynchrone",
    dateCreation: "15/01/2024"
  },
  {
    id: 2,
    title: "Les conditions de vie",
    activity: "Activité 1",
    code: "55290",
    participants: 35,
    responses: 28,
    status: "En cours",
    statusColor: "green",
    description: "Étude sur les conditions de vie des participants",
    option: "Synchrone",
    dateCreation: "20/01/2024"
  },
  {
    id: 3,
    title: "Satisfaction des participants",
    activity: "Activité 2",
    code: "79863",
    participants: 42,
    responses: 35,
    status: "Non démarrée",
    statusColor: "orange",
    description: "Évaluation de la satisfaction générale des participants",
    option: "Asynchrone",
    dateCreation: "25/01/2024"
  },
  {
    id: 4,
    title: "Évaluation cyber",
    activity: "Activité 2",
    code: "10125",
    participants: 45,
    responses: 38,
    status: "En cours",
    statusColor: "green",
    description: "Évaluation des compétences en cybersécurité",
    option: "Synchrone",
    dateCreation: "30/01/2024"
  }
];

export const sampleQuestions: Question[] = [
  {
    id: 1,
    type: 'choix_multiple',
    question: 'Les participants de ce site d\'étude pouvait-ils développer de nouvelles idées et trouver des réponses à leurs interrogations ?',
    options: ['Oui', 'Non', 'Sans avis'],
    responses: { 'Oui': 156, 'Non': 31, 'Sans avis': 25 }
  },
  {
    id: 2,
    type: 'choix_multiple',
    question: 'Quelles sont les bonnes modalités de création des activités ?',
    options: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
    responses: { 'Réponse 1': 87, 'Réponse 2': 45, 'Réponse 3': 32, 'Réponse 4': 23 }
  },
  {
    id: 3,
    type: 'echelle_lineaire',
    question: 'Les prestataires de ce site d\'étude pouvaient-ils développer de nouvelles idées et trouver des réponses à leurs interrogations ?',
    options: ['Oui', 'Non', 'Sans avis'],
    responses: { 'Oui': 142, 'Non': 28, 'Sans avis': 17 }
  },
  {
    id: 4,
    type: 'question_libre',
    question: 'Les prestataires de ce site d\'étude pouvaient-ils développer de nouvelles idées et trouver des réponses à leurs interrogations ?',
    options: ['Oui', 'Non', 'Sans avis'],
    responses: { 'Oui': 142, 'Non': 28, 'Sans avis': 17 }
  }
];

export const questionTypes: QuestionType[] = [
  { id: 'text', name: 'Texte libre', icon: '📝' },
  { id: 'choice', name: 'Choix multiple', icon: '☑️' },
  { id: 'scale', name: 'Échelle', icon: '📊' },
  { id: 'yesno', name: 'Oui/Non', icon: '✅' }
];
