// File: src/app/organisateur/gestionenquetes/[id]/page.tsx
// ✅ Version avec support flexible des activités (sans modifier les types de base)

'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { Alert, Snackbar } from '@mui/material';
import { Box, Card, Typography } from '@mui/material';

import Loading from 'src/app/loading';

import AddQuestionToEnquete from 'src/sections/gestionEnquete/AddQuestionToEnquete';

// Import des composants modulaires
import EnqueteHeader from '../components/EnqueteHeader';
import EnqueteInfoCard from '../components/EnqueteInfoCard';
import EnqueteStatsCards from '../components/EnqueteStatsCards';
import QuestionEditModal from '../components/QuestionEditModal';
import EnqueteActionButtons from '../components/EnqueteActionButtons';
// Import des types - ✅ ON NE MODIFIE PAS LES TYPES
import { Question, CurrentQuestion, Enquete } from '../nouveau/types';
import EnqueteQuestionsTable from '../components/EnqueteQuestionsTable';

/**
 * Interface pour les détails complets d'une enquête avec ses questions
 * ✅ Garde le type original "activite: string"
 */
interface EnqueteDetail extends Enquete {
  nombreParticipants: number;
  statut: 'Terminé' | 'En cours' | 'Non démarré';
  code: string;
  questions: Question[];
}

/**
 * ✅ Exemple 1 : Enquête avec UNE SEULE activité (format actuel)
 */
const sampleEnqueteSingleActivity: EnqueteDetail = {
  id: 1,
  titre: "Satisfaction des participants",
  activite: "CÉRÉMONIE D'OUVERTURE OFFICIELLE", // ✅ String simple
  code: "ENQ-001",
  nombreParticipants: 156,
  statut: "En cours",
  typeEnquete: "live",
  enqueteAnonymat: true,
  authentificationNumerique: false,
  createdAt: "2024-01-15",
  questions: [
    {
      id: 1,
      question: "Comment évaluez-vous la qualité de l'organisation de cet événement ?",
      type: "choix_multiple",
      reponses: ["Excellent", "Très bien", "Bien", "Moyen", "Insuffisant"],
      enqueteId: 1,
      nombrePoints: 10,
      bonneReponse: 0,
      required: true
    },
    {
      id: 2,
      question: "Avez-vous des suggestions d'amélioration ?",
      type: "question_libre",
      reponses: [],
      enqueteId: 1,
      nombrePoints: 0,
      bonneReponse: 0,
      required: false
    }
  ]
};

/**
 * ✅ Exemple 2 : Données "enrichies" pour simulation de plusieurs activités
 * On garde le type de base mais on ajoute une prop optionnelle
 */
interface EnqueteDetailExtended extends EnqueteDetail {
  activites?: string[]; // ✅ Propriété optionnelle pour plusieurs activités
}

const sampleEnqueteMultipleActivities: EnqueteDetailExtended = {
  id: 2,
  titre: "Évaluation globale de l'événement",
  activite: "PANEL DE HAUT NIVEAU", // ✅ Garde le type de base pour compatibilité
  activites: [ // ✅ Propriété additionnelle pour plusieurs activités
    "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
    "PANEL DE HAUT NIVEAU",
    "POINT DE PRESSE",
    "WORKSHOP"
  ],
  code: "ENQ-002",
  nombreParticipants: 234,
  statut: "En cours",
  typeEnquete: "live",
  enqueteAnonymat: false,
  authentificationNumerique: true,
  createdAt: "2024-01-20",
  questions: [
    {
      id: 1,
      question: "Sur une échelle de 1 à 10, comment évaluez-vous la qualité globale ?",
      type: "echelle_lineaire",
      reponses: [],
      enqueteId: 2,
      nombrePoints: 0,
      bonneReponse: 0,
      required: true,
      echelleMin: 1,
      echelleMax: 10,
      labelMin: "Très mauvais",
      labelMax: "Excellent"
    }
  ]
};

/**
 * Liste des enquêtes disponibles pour le modal d'édition
 */
const sampleEnquetes = [
  { id: 1, titre: "Satisfaction des participants" },
  { id: 2, titre: "Évaluation des intervenants" },
  { id: 3, titre: "Feedback général" }
];

/**
 * Page de détail d'une enquête
 * ✅ Supporte maintenant les deux formats d'activités sans modifier les types
 */
const EnqueteDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const enqueteId = params.id as string;

  // États principaux
  const [enqueteData, setEnqueteData] = useState<EnqueteDetailExtended | null>(null);
  const [loading, setLoading] = useState(true);

  // États pour les modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState<Question | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // État pour la question en cours de modification
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>({
    question: '',
    type: 'choix_multiple',
    reponses: [''],
    enqueteId: 0,
    nombrePoints: 0,
    bonneReponse: 0,
    required: false,
    echelleMin: 1,
    echelleMax: 10,
    labelMin: '',
    labelMax: ''
  });

  /**
   * Chargement des données de l'enquête au montage du composant
   */
  useEffect(() => {
    const loadEnqueteData = async () => {
      try {
        setLoading(true);

        // TODO: Remplacer par votre appel API réel
        // const response = await fetch(`/api/enquetes/${enqueteId}`);
        // const data = await response.json();
        // setEnqueteData(data);

        // Simulation d'un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 500));

        // ✅ Choix de l'exemple selon l'ID
        // ID "1" = une seule activité
        // ID "2" = plusieurs activités
        setEnqueteData(
          enqueteId === "1"
            ? sampleEnqueteSingleActivity
            : sampleEnqueteMultipleActivities
        );

      } catch (error) {
        console.error('Erreur lors du chargement de l\'enquête:', error);
      } finally {
        setLoading(false);
      }
    };

    if (enqueteId) {
      loadEnqueteData();
    }
  }, [enqueteId]);

  // ===========================================
  // GESTIONNAIRES D'ÉVÉNEMENTS - NAVIGATION
  // ===========================================

  const handleBack = () => {
    router.push('/organisateur/gestionenquete');
  };

  const handleEditEnquete = () => {
    router.push(`/organisateur/gestionenquete/${enqueteId}/modifier`);
  };

  // ===========================================
  // GESTIONNAIRES D'ÉVÉNEMENTS - ACTIONS ENQUÊTE
  // ===========================================

  const handleStartSurvey = () => {
    console.log('Démarrage de l\'enquête:', enqueteId);
    setSuccessMessage('Enquête démarrée avec succès !');
    setShowSuccessAlert(true);
  };

  const handleSuspendSurvey = () => {
    console.log('Suspension de l\'enquête:', enqueteId);
    setSuccessMessage('Enquête suspendue !');
    setShowSuccessAlert(true);
  };

  const handleEndSurvey = () => {
    if (window.confirm('Êtes-vous sûr de vouloir terminer cette enquête ?')) {
      console.log('Fin de l\'enquête:', enqueteId);
      setSuccessMessage('Enquête terminée !');
      setShowSuccessAlert(true);
    }
  };

  // ===========================================
  // GESTIONNAIRES D'ÉVÉNEMENTS - AJOUT QUESTION
  // ===========================================

  const handleAddQuestion = (questionData: Omit<Question, 'id'>) => {
    if (!enqueteData) return;

    const newId = Math.max(...enqueteData.questions.map(q => q.id), 0) + 1;

    const newQuestion: Question = {
      id: newId,
      ...questionData
    };

    setEnqueteData({
      ...enqueteData,
      questions: [newQuestion, ...enqueteData.questions]
    });

    console.log('Nouvelle question ajoutée:', newQuestion);
    setSuccessMessage('Question ajoutée avec succès !');
    setShowSuccessAlert(true);
  };

  // ===========================================
  // GESTIONNAIRES D'ÉVÉNEMENTS - QUESTIONS
  // ===========================================

  const handleViewQuestion = (questionId: number) => {
    router.push(`/organisateur/gestionenquete/${enqueteId}/questions/${questionId}`);
  };

  const handleEditQuestion = (questionId: number) => {
    if (enqueteData) {
      const question = enqueteData.questions.find(q => q.id === questionId);
      if (question) {
        setQuestionToEdit(question);
        setCurrentQuestion({
          question: question.question,
          type: question.type,
          reponses: question.reponses.length > 0 ? question.reponses : [''],
          enqueteId: question.enqueteId,
          nombrePoints: question.nombrePoints,
          bonneReponse: question.bonneReponse,
          required: question.required,
          echelleMin: question.echelleMin || 1,
          echelleMax: question.echelleMax || 10,
          labelMin: question.labelMin || '',
          labelMax: question.labelMax || ''
        });
        setEditModalOpen(true);
      }
    }
  };

  const handleDeleteQuestion = (questionId: number) => {
    if (enqueteData) {
      const updatedQuestions = enqueteData.questions.filter(q => q.id !== questionId);
      setEnqueteData({
        ...enqueteData,
        questions: updatedQuestions
      });
      console.log('Question supprimée:', questionId);
      setSuccessMessage('Question supprimée avec succès !');
      setShowSuccessAlert(true);
    }
  };

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  // ===========================================
  // GESTIONNAIRES D'ÉVÉNEMENTS - MODIFICATION QUESTION
  // ===========================================

  const handleCurrentQuestionChange = (field: string, value: any) => {
    setCurrentQuestion(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddReponse = () => {
    setCurrentQuestion(prev => ({
      ...prev,
      reponses: [...prev.reponses, '']
    }));
  };

  const handleRemoveReponse = (index: number) => {
    if (currentQuestion.reponses.length > 1) {
      setCurrentQuestion(prev => ({
        ...prev,
        reponses: prev.reponses.filter((_, i) => i !== index)
      }));
    }
  };

  const handleReponseChange = (index: number, value: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      reponses: prev.reponses.map((rep, i) => i === index ? value : rep)
    }));
  };

  const handleSaveEditedQuestion = () => {
    if (!currentQuestion.question.trim()) {
      alert('Veuillez saisir une question valide.');
      return;
    }

    if (!currentQuestion.enqueteId) {
      alert('Veuillez sélectionner une enquête.');
      return;
    }

    if (['liste_deroulante', 'case_a_cocher', 'choix_multiple'].includes(currentQuestion.type)) {
      const validReponses = currentQuestion.reponses.filter(rep => rep.trim());
      if (validReponses.length < 2) {
        alert('Veuillez saisir au moins 2 réponses.');
        return;
      }
    }

    if (!questionToEdit) return;

    const updatedQuestion: Question = {
      ...questionToEdit,
      question: currentQuestion.question,
      type: currentQuestion.type,
      reponses: currentQuestion.reponses.filter(rep => rep.trim()),
      enqueteId: currentQuestion.enqueteId,
      nombrePoints: currentQuestion.nombrePoints,
      bonneReponse: currentQuestion.bonneReponse,
      required: currentQuestion.required,
      ...(currentQuestion.type === 'echelle_lineaire' && {
        echelleMin: currentQuestion.echelleMin,
        echelleMax: currentQuestion.echelleMax,
        labelMin: currentQuestion.labelMin,
        labelMax: currentQuestion.labelMax
      })
    };

    if (enqueteData) {
      const updatedQuestions = enqueteData.questions.map(q =>
        q.id === questionToEdit.id ? updatedQuestion : q
      );
      setEnqueteData({
        ...enqueteData,
        questions: updatedQuestions
      });
    }

    setEditModalOpen(false);
    setQuestionToEdit(null);
    console.log('Question modifiée:', updatedQuestion);
    setSuccessMessage('Question modifiée avec succès !');
    setShowSuccessAlert(true);
  };

  // ===========================================
  // RENDU CONDITIONNEL - CHARGEMENT
  // ===========================================
  if (loading) {
    return <Loading />;
  }

  // ===========================================
  // RENDU CONDITIONNEL - ERREUR
  // ===========================================
  if (!enqueteData) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#fafafa'
      }}>
        <Typography variant="h6" color="error">
          Enquête introuvable
        </Typography>
      </Box>
    );
  }

  // ===========================================
  // RENDU PRINCIPAL
  // ===========================================
  return (
    <Box sx={{
      p: { xs: 2, sm: 3, md: 4 },
      backgroundColor: '#fafafa',
      minHeight: '100vh'
    }}>
      {/* En-tête de la page */}
      <EnqueteHeader
        onBack={handleBack}
        onEdit={handleEditEnquete}
      />

      {/* Contenu principal dans une carte */}
      <Card sx={{
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #f0f0f0'
      }}>
        {/* Informations générales de l'enquête */}
        <EnqueteInfoCard
          titre={enqueteData.titre}
          enqueteAnonymat={enqueteData.enqueteAnonymat}
          authentificationNumerique={enqueteData.authentificationNumerique}
        />

        {/* 
          ✅ Cartes de statistiques - Support flexible
          Passe "activites" si disponible, sinon "activite"
          Le composant gère automatiquement les deux cas
        */}
        <EnqueteStatsCards
          createdAt={enqueteData.createdAt}
          typeEnquete={enqueteData.typeEnquete}
          activite={enqueteData.activites || enqueteData.activite}
        />

        {/* Boutons d'actions sur l'enquête */}
        <EnqueteActionButtons
          onStartSurvey={handleStartSurvey}
          onSuspendSurvey={handleSuspendSurvey}
          onEndSurvey={handleEndSurvey}
        />

        {/* Section Ajouter une question */}
        <AddQuestionToEnquete
          enqueteId={enqueteData.id}
          onQuestionAdded={handleAddQuestion}
        />

        {/* Tableau des questions */}
        <EnqueteQuestionsTable
          questions={enqueteData.questions}
          onViewQuestion={handleViewQuestion}
          onEditQuestion={handleEditQuestion}
          onDeleteQuestion={handleDeleteQuestion}
        />
      </Card>

      {/* Modal de modification de question */}
      <QuestionEditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        question={questionToEdit}
        currentQuestion={currentQuestion}
        enquetes={sampleEnquetes}
        onQuestionChange={handleCurrentQuestionChange}
        onAddReponse={handleAddReponse}
        onRemoveReponse={handleRemoveReponse}
        onReponseChange={handleReponseChange}
        onSave={handleSaveEditedQuestion}
      />

      {/* Alert de succès */}
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={4000}
        onClose={handleCloseSuccessAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 8 }}
      >
        <Alert
          onClose={handleCloseSuccessAlert}
          severity="success"
          sx={{
            width: '100%',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EnqueteDetailPage;