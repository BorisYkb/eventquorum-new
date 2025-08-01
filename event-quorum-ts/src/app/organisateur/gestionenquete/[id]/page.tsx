// File: src/app/organisateur/gestionenquetes/[id]/detail/page.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Box, Card, Typography } from '@mui/material';

// Import des composants modulaires
import EnqueteHeader from '../components/EnqueteHeader';
import EnqueteInfoCard from '../components/EnqueteInfoCard';
import EnqueteStatsCards from '../components/EnqueteStatsCards';
import EnqueteActionButtons from '../components/EnqueteActionButtons';
import EnqueteQuestionsTable from '../components/EnqueteQuestionsTable';
import QuestionDetailModal from '../components/QuestionDetailModal';
import QuestionEditModal from '../components/QuestionEditModal';
import Loading from 'src/app/loading';

// Types
interface Question {
  id: number;
  question: string;
  type: 'choix_multiple' | 'echelle_appreciation' | 'zone_saisie' | 'choix_unique' | 'liste_deroulante' | 'note_etoile';
  reponses: string[];
  enqueteConcernee: string;
  nombrePoints: number;
  bonneReponse: number;
  required: boolean;
}

interface EnqueteDetail {
  id: number;
  titre: string;
  activite: string;
  code: string;
  nombreParticipants: number;
  statut: 'Terminé' | 'En cours' | 'Non démarré';
  typeEnquete: 'live' | 'asynchrone';
  enqueteAnonymat: boolean;
  authentificationNumerique: boolean;
  createdAt: string;
  questions: Question[];
}

interface CurrentQuestion {
  question: string;
  type: Question['type'];
  reponses: string[];
  enqueteConcernee: string;
  nombrePoints: number;
  bonneReponse: number;
  required: boolean;
}

// Données d'exemple - à remplacer par vos vraies données
const sampleEnqueteData: EnqueteDetail = {
  id: 1,
  titre: "Satisfaction des participants",
  activite: "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
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
      type: "choix_unique",
      reponses: ["Excellent", "Très bien", "Bien", "Moyen", "Insuffisant"],
      enqueteConcernee: "Enquête 1",
      nombrePoints: 10,
      bonneReponse: 0,
      required: true
    },
    {
      id: 2,
      question: "Quels aspects de l'événement avez-vous le plus appréciés ?",
      type: "choix_multiple",
      reponses: ["Les intervenants", "Le contenu", "L'organisation", "Les pauses", "Le lieu"],
      enqueteConcernee: "Enquête 1",
      nombrePoints: 15,
      bonneReponse: 0,
      required: false
    },
    {
      id: 3,
      question: "Avez-vous des suggestions d'amélioration ?",
      type: "zone_saisie",
      reponses: [],
      enqueteConcernee: "Enquête 1",
      nombrePoints: 5,
      bonneReponse: 0,
      required: false
    }
  ]
};

/**
 * Page de détail d'une enquête - Version modulaire
 * Affiche toutes les informations détaillées d'une enquête spécifique
 */
const EnqueteDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const enqueteId = params.id as string;

  // États principaux
  const [enqueteData, setEnqueteData] = useState<EnqueteDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // États pour les modals
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedQuestionForView, setSelectedQuestionForView] = useState<Question | null>(null);
  const [questionToEdit, setQuestionToEdit] = useState<Question | null>(null);

  // État pour la question en cours de modification
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>({
    question: '',
    type: 'choix_multiple',
    reponses: [''],
    enqueteConcernee: '',
    nombrePoints: 0,
    bonneReponse: 0,
    required: false
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
        setEnqueteData(sampleEnqueteData);
        
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

  /**
   * Retour vers la liste des enquêtes
   */
  const handleBack = () => {
    router.push('/organisateur/gestionenquete');
  };

  /**
   * Redirection vers la page de modification de l'enquête
   */
  const handleEditEnquete = () => {
    router.push(`/organisateur/gestionenquete/${enqueteId}/modifier`);
  };

  /**
   * Redirection vers les résultats de l'enquête
   */
  const handleViewResults = () => {
    console.log('Consultation des résultats pour l\'enquête:', enqueteId);
    router.push(`/organisateur/gestionenquete/${enqueteId}/resultats`);
  };

  // ===========================================
  // GESTIONNAIRES D'ÉVÉNEMENTS - ACTIONS ENQUÊTE
  // ===========================================

  /**
   * Démarrage de l'enquête
   */
  const handleStartSurvey = () => {
    console.log('Démarrage de l\'enquête:', enqueteId);
    // TODO: Logique pour démarrer l'enquête
    alert('Enquête démarrée avec succès !');
  };

  /**
   * Suspension de l'enquête
   */
  const handleSuspendSurvey = () => {
    console.log('Suspension de l\'enquête:', enqueteId);
    // TODO: Logique pour suspendre l'enquête
    alert('Enquête suspendue !');
  };

  /**
   * Fin de l'enquête
   */
  const handleEndSurvey = () => {
    if (window.confirm('Êtes-vous sûr de vouloir terminer cette enquête ?')) {
      console.log('Fin de l\'enquête:', enqueteId);
      // TODO: Logique pour terminer l'enquête
      alert('Enquête terminée !');
    }
  };

  // ===========================================
  // GESTIONNAIRES D'ÉVÉNEMENTS - QUESTIONS
  // ===========================================

  /**
   * Affichage des détails d'une question
   */
  const handleViewQuestion = (questionId: number) => {
    if (enqueteData) {
      const question = enqueteData.questions.find(q => q.id === questionId);
      if (question) {
        setSelectedQuestionForView(question);
        setDetailModalOpen(true);
      }
    }
  };

  /**
   * Modification d'une question
   */
  const handleEditQuestion = (questionId: number) => {
    if (enqueteData) {
      const question = enqueteData.questions.find(q => q.id === questionId);
      if (question) {
        setQuestionToEdit(question);
        setCurrentQuestion({
          question: question.question,
          type: question.type,
          reponses: question.reponses.length > 0 ? question.reponses : [''],
          enqueteConcernee: question.enqueteConcernee,
          nombrePoints: question.nombrePoints,
          bonneReponse: question.bonneReponse,
          required: question.required
        });
        setEditModalOpen(true);
      }
    }
  };

  /**
   * Suppression d'une question
   */
  const handleDeleteQuestion = (questionId: number) => {
    if (enqueteData) {
      const updatedQuestions = enqueteData.questions.filter(q => q.id !== questionId);
      setEnqueteData({
        ...enqueteData,
        questions: updatedQuestions
      });
      console.log('Question supprimée:', questionId);
      // TODO: Appel API pour supprimer la question
      alert('Question supprimée avec succès !');
    }
  };

  // ===========================================
  // GESTIONNAIRES D'ÉVÉNEMENTS - MODIFICATION QUESTION
  // ===========================================

  /**
   * Changement des propriétés de la question en cours de modification
   */
  const handleCurrentQuestionChange = (field: string, value: any) => {
    setCurrentQuestion(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Ajout d'une réponse à la question en cours de modification
   */
  const handleAddReponse = () => {
    setCurrentQuestion(prev => ({
      ...prev,
      reponses: [...prev.reponses, '']
    }));
  };

  /**
   * Suppression d'une réponse de la question en cours de modification
   */
  const handleRemoveReponse = (index: number) => {
    setCurrentQuestion(prev => ({
      ...prev,
      reponses: prev.reponses.filter((_, i) => i !== index)
    }));
  };

  /**
   * Modification d'une réponse de la question en cours de modification
   */
  const handleReponseChange = (index: number, value: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      reponses: prev.reponses.map((rep, i) => i === index ? value : rep)
    }));
  };

  /**
   * Sauvegarde des modifications d'une question
   */
  const handleSaveEditedQuestion = () => {
    if (!currentQuestion.question.trim() || !questionToEdit) {
      alert('Veuillez saisir une question valide.');
      return;
    }

    const updatedQuestion: Question = {
      ...questionToEdit,
      question: currentQuestion.question,
      type: currentQuestion.type,
      reponses: currentQuestion.reponses.filter(rep => rep.trim()),
      enqueteConcernee: currentQuestion.enqueteConcernee,
      nombrePoints: currentQuestion.nombrePoints,
      bonneReponse: currentQuestion.bonneReponse,
      required: currentQuestion.required
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
    // TODO: Appel API pour sauvegarder les modifications
    alert('Question modifiée avec succès !');
  };

  /**
   * Fonction utilitaire pour obtenir le label d'un type de question
   */
  const getTypeQuestionLabel = (type: string) => {
    const typeQuestions = [
      { value: 'choix_multiple', label: 'Choix multiple' },
      { value: 'echelle_appreciation', label: 'Échelle d\'appréciation' },
      { value: 'zone_saisie', label: 'Zone de saisie' },
      { value: 'choix_unique', label: 'Choix unique' },
      { value: 'liste_deroulante', label: 'Liste déroulante' },
      { value: 'note_etoile', label: 'Note étoile' }
    ];
    return typeQuestions.find(t => t.value === type)?.label || type;
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
      p: 4, 
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
        p: 4,
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

        {/* Cartes de statistiques */}
        <EnqueteStatsCards
          createdAt={enqueteData.createdAt}
          typeEnquete={enqueteData.typeEnquete}
          activite={enqueteData.activite}
        />

        {/* Boutons d'actions sur l'enquête */}
        <EnqueteActionButtons
          onStartSurvey={handleStartSurvey}
          onSuspendSurvey={handleSuspendSurvey}
          onEndSurvey={handleEndSurvey}
          onViewResults={handleViewResults}
        />

        {/* Tableau des questions */}
        <EnqueteQuestionsTable
          questions={enqueteData.questions}
          onViewQuestion={handleViewQuestion}
          onEditQuestion={handleEditQuestion}
          onDeleteQuestion={handleDeleteQuestion}
          onViewResults={handleViewResults}
        />
      </Card>

      {/* Modal de détail de question */}
      <QuestionDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        question={selectedQuestionForView}
        getTypeQuestionLabel={getTypeQuestionLabel}
      />

      {/* Modal de modification de question */}
      <QuestionEditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        question={questionToEdit}
        currentQuestion={currentQuestion}
        onQuestionChange={handleCurrentQuestionChange}
        onAddReponse={handleAddReponse}
        onRemoveReponse={handleRemoveReponse}
        onReponseChange={handleReponseChange}
        onSave={handleSaveEditedQuestion}
      />
    </Box>
  );
};

export default EnqueteDetailPage;