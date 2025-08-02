// File: src/app/organisateur/gestionenquetes/[id]/page.tsx

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

// Import des types mis à jour
import { Question, CurrentQuestion, Enquete } from '../nouveau/types';

/**
 * Interface pour les détails complets d'une enquête avec ses questions
 */
interface EnqueteDetail extends Enquete {
  nombreParticipants: number;
  statut: 'Terminé' | 'En cours' | 'Non démarré';
  code: string;
  questions: Question[];
}

/**
 * Données d'exemple - à remplacer par vos vraies données
 * Utilise les nouveaux types pour assurer la compatibilité
 */
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
      type: "choix_multiple",
      reponses: ["Excellent", "Très bien", "Bien", "Moyen", "Insuffisant"],
      enqueteId: 1, // ✅ Utilise enqueteId au lieu de enqueteConcernee
      nombrePoints: 10,
      bonneReponse: 0,
      required: true
    },
    {
      id: 2,
      question: "Quels aspects de l'événement avez-vous le plus appréciés ?",
      type: "case_a_cocher",
      reponses: ["Les intervenants", "Le contenu", "L'organisation", "Les pauses", "Le lieu"],
      enqueteId: 1,
      nombrePoints: 15,
      bonneReponse: 0,
      required: false
    },
    {
      id: 3,
      question: "Avez-vous des suggestions d'amélioration ?",
      type: "question_libre",
      reponses: [],
      enqueteId: 1,
      nombrePoints: 0, // ✅ 0 points pour question libre
      bonneReponse: 0,
      required: false
    },
    {
      id: 4,
      question: "Sur une échelle de 1 à 10, comment évaluez-vous l'événement ?",
      type: "echelle_lineaire",
      reponses: [],
      enqueteId: 1,
      nombrePoints: 0, // ✅ 0 points pour échelle linéaire
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
 * Page de détail d'une enquête - Version adaptée
 * Compatible avec les nouveaux types et composants modaux
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

  // État pour la question en cours de modification - Utilise le nouveau type CurrentQuestion
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>({
    question: '',
    type: 'choix_multiple',
    reponses: [''],
    enqueteId: 0,
    nombrePoints: 0,
    bonneReponse: 0,
    required: false,
    // ✅ Propriétés pour échelle linéaire
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
   * ✅ Adaptée pour utiliser les nouveaux types
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
          enqueteId: question.enqueteId, // ✅ Utilise enqueteId
          nombrePoints: question.nombrePoints,
          bonneReponse: question.bonneReponse,
          required: question.required,
          // ✅ Propriétés pour échelle linéaire avec valeurs par défaut
          echelleMin: question.echelleMin || 1,
          echelleMax: question.echelleMax || 10,
          labelMin: question.labelMin || '',
          labelMax: question.labelMax || ''
        });
        setEditModalOpen(true);
      }
    }
  };

  /**
   * Suppression d'une question
   */
  const handleDeleteQuestion = (questionId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette question ?')) {
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
    }
  };

  // ===========================================
  // GESTIONNAIRES D'ÉVÉNEMENTS - MODIFICATION QUESTION
  // ===========================================

  /**
   * Changement des propriétés de la question en cours de modification
   * ✅ Mise à jour pour supporter tous les champs du nouveau type
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
    if (currentQuestion.reponses.length > 1) {
      setCurrentQuestion(prev => ({
        ...prev,
        reponses: prev.reponses.filter((_, i) => i !== index)
      }));
    }
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
   * ✅ Adaptée pour les nouveaux types
   */
  const handleSaveEditedQuestion = () => {
    if (!currentQuestion.question.trim()) {
      alert('Veuillez saisir une question valide.');
      return;
    }

    if (!currentQuestion.enqueteId) {
      alert('Veuillez sélectionner une enquête.');
      return;
    }

    // Validation spécifique selon le type
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
      // ✅ Propriétés pour échelle linéaire
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
    // TODO: Appel API pour sauvegarder les modifications
    alert('Question modifiée avec succès !');
  };

  /**
   * Fonction utilitaire pour obtenir le label d'un type de question
   * ✅ Mise à jour avec les nouveaux types
   */
  const getTypeQuestionLabel = (type: string) => {
    const typeQuestions = [
      { value: 'liste_deroulante', label: 'Liste déroulante' },
      { value: 'case_a_cocher', label: 'Case à cocher' },
      { value: 'question_libre', label: 'Question libre' },
      { value: 'echelle_lineaire', label: 'Échelle linéaire' },
      { value: 'choix_multiple', label: 'Choix multiple' }
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
      p: { xs: 2, sm: 3, md: 4 }, // ✅ Responsive padding
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
        p: { xs: 2, sm: 3, md: 4 }, // ✅ Responsive padding
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

      {/* Modal de détail de question - ✅ Compatible avec le nouveau composant */}
      <QuestionDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        question={selectedQuestionForView}
        getTypeQuestionLabel={getTypeQuestionLabel}
      />

      {/* Modal de modification de question - ✅ Compatible avec le nouveau composant */}
      <QuestionEditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        question={questionToEdit}
        currentQuestion={currentQuestion}
        enquetes={sampleEnquetes} // ✅ Passe la liste des enquêtes
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