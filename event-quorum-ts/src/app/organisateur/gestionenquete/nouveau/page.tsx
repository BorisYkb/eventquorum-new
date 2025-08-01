// File: src/app/organisateur/gestionenquetes/nouveau/page.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';

// Import des types et composants
import { Enquete, Question, EnqueteFormData, CurrentQuestion } from './types';
import CreateEnqueteForm from './components/CreateEnqueteForm';
import AddQuestionForm from './components/AddQuestionForm';
import QuestionsListWithFilter from './components/QuestionsListWithFilter';

// Import des modals
import QuestionDetailModal from '../components/QuestionDetailModal';
import QuestionEditModal from '../components/QuestionEditModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { LoadingScreen } from 'src/components/loading-screen';

/**
 * Page de création d'enquêtes et de questions - Version refactorisée
 * Divisée en 3 parties indépendantes avec logique modulaire
 */
const CreateEnquetePage: React.FC = () => {
  const router = useRouter();

  // États principaux
  const [enquetes, setEnquetes] = useState<Enquete[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  // Compteur pour les IDs uniques
  const [nextEnqueteId, setNextEnqueteId] = useState(1);
  const [nextQuestionId, setNextQuestionId] = useState(1);

  // États pour les modals
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedQuestionForView, setSelectedQuestionForView] = useState<Question | null>(null);
  const [questionToEdit, setQuestionToEdit] = useState<Question | null>(null);
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null);

  // État pour la question en cours de modification (compatible avec le modal)
  const [currentQuestionEdit, setCurrentQuestionEdit] = useState<CurrentQuestion>({
    question: '',
    type: 'liste_deroulante',
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
   * Chargement initial des données depuis la base de données
   */
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);

        // TODO: Remplacer par vos vrais appels API
        // const enquetesResponse = await fetch('/api/enquetes');
        // const questionsResponse = await fetch('/api/questions');
        // const enquetesData = await enquetesResponse.json();
        // const questionsData = await questionsResponse.json();
        
        // Données fictives initiales (enquêtes existantes de la BDD)
        const initialEnquetes: Enquete[] = [
          {
            id: 1,
            titre: "Satisfaction générale événement",
            activite: "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
            typeEnquete: "live",
            enqueteAnonymat: true,
            authentificationNumerique: false,
            createdAt: "2024-01-15"
          },
          {
            id: 2,
            titre: "Évaluation des intervenants",
            activite: "PANEL DE HAUT NIVEAU",
            typeEnquete: "asynchrone",
            enqueteAnonymat: false,
            authentificationNumerique: true,
            createdAt: "2024-01-20"
          },
          {
            id: 3,
            titre: "Feedback organisation logistique",
            activite: "POINT DE PRESSE",
            typeEnquete: "live",
            enqueteAnonymat: true,
            authentificationNumerique: false,
            createdAt: "2024-01-25"
          }
        ];

        // Questions fictives existantes
        const initialQuestions: Question[] = [
          {
            id: 1,
            question: "Comment évaluez-vous la qualité générale de l'événement ?",
            type: "choix_multiple",
            reponses: ["Excellent", "Très bien", "Bien", "Moyen", "Insuffisant"],
            enqueteId: 1,
            nombrePoints: 10,
            bonneReponse: 0,
            required: true
          },
          {
            id: 2,
            question: "Quels aspects avez-vous le plus appréciés ?",
            type: "case_a_cocher",
            reponses: ["Organisation", "Contenu", "Intervenants", "Logistique"],
            enqueteId: 1,
            nombrePoints: 5,
            bonneReponse: 0,
            required: false
          },
          {
            id: 3,
            question: "Vos commentaires et suggestions",
            type: "question_libre",
            reponses: [],
            enqueteId: 1,
            nombrePoints: 0,
            bonneReponse: 0,
            required: false
          },
          {
            id: 4,
            question: "Notez la qualité des intervenants de 1 à 5",
            type: "echelle_lineaire",
            reponses: [],
            enqueteId: 2,
            nombrePoints: 8,
            bonneReponse: 0,
            required: true,
            echelleMin: 1,
            echelleMax: 5,
            labelMin: "Très mauvais",
            labelMax: "Excellent"
          }
        ];

        setEnquetes(initialEnquetes);
        setQuestions(initialQuestions);
        
        // Définir les prochains IDs
        setNextEnqueteId(Math.max(...initialEnquetes.map(e => e.id)) + 1);
        setNextQuestionId(Math.max(...initialQuestions.map(q => q.id)) + 1);

      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // ===========================================
  // GESTIONNAIRES D'ÉVÉNEMENTS - ENQUÊTES
  // ===========================================

  /**
   * Création d'une nouvelle enquête (Partie 1)
   */
  const handleEnqueteCreated = (enqueteData: EnqueteFormData) => {
    const newEnquete: Enquete = {
      id: nextEnqueteId,
      ...enqueteData,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setEnquetes(prev => [...prev, newEnquete]);
    setNextEnqueteId(prev => prev + 1);

    console.log('Nouvelle enquête créée:', newEnquete);
    // TODO: Appel API pour sauvegarder l'enquête
  };

  // ===========================================
  // GESTIONNAIRES D'ÉVÉNEMENTS - QUESTIONS
  // ===========================================

  /**
   * Ajout d'une nouvelle question (Partie 2)
   */
  const handleQuestionAdded = (questionData: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      id: nextQuestionId,
      ...questionData
    };

    setQuestions(prev => [...prev, newQuestion]);
    setNextQuestionId(prev => prev + 1);

    console.log('Nouvelle question ajoutée:', newQuestion);
    // TODO: Appel API pour sauvegarder la question
  };

  /**
   * Modification d'une question (Partie 3)
   */
  const handleEditQuestion = (questionId: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      setQuestionToEdit(question);
      
      // Préparer les données pour le modal d'édition
      setCurrentQuestionEdit({
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
  };

  /**
   * Suppression d'une question (Partie 3)
   */
  const handleDeleteQuestion = (questionId: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      setQuestionToDelete(question);
      setDeleteModalOpen(true);
    }
  };

  /**
   * Visualisation des détails d'une question (Partie 3)
   */
  const handleViewQuestion = (questionId: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      setSelectedQuestionForView(question);
      setDetailModalOpen(true);
    }
  };

  // ===========================================
  // GESTIONNAIRES D'ÉVÉNEMENTS - NAVIGATION
  // ===========================================

  /**
   * Sauvegarde finale et retour
   */
  const handleSaveAndExit = () => {
    console.log('Sauvegarde finale des données...');
    console.log('Enquêtes créées:', enquetes);
    console.log('Questions créées:', questions);

    // TODO: Appels API finaux pour sauvegarder toutes les données
    alert('Toutes les enquêtes et questions ont été sauvegardées avec succès !');
    
    // Redirection vers la liste des enquêtes
    router.push('/organisateur/gestionenquetes');
  };

  /**
   * Annulation et retour sans sauvegarder
   */
  const handleCancel = () => {
    if (window.confirm('Êtes-vous sûr de vouloir quitter sans sauvegarder ?')) {
      router.push('/organisateur/gestionenquetes');
    }
  };

  // ===========================================
  // GESTIONNAIRES D'ÉVÉNEMENTS - MODALS
  // ===========================================

  /**
   * Changement des propriétés de la question en cours de modification
   */
  const handleCurrentQuestionEditChange = (field: string, value: any) => {
    setCurrentQuestionEdit(prev => {
      const updated = { ...prev, [field]: value };
      
      // Réinitialiser les réponses lors du changement de type
      if (field === 'type') {
        if (value === 'question_libre') {
          updated.reponses = [];
        } else if (value === 'echelle_lineaire') {
          updated.reponses = [];
        } else if (updated.reponses.length === 0) {
          updated.reponses = [''];
        }
        updated.bonneReponse = 0;
      }
      
      return updated;
    });
  };

  /**
   * Ajouter une réponse à la question en cours de modification
   */
  const handleAddReponseEdit = () => {
    setCurrentQuestionEdit(prev => ({
      ...prev,
      reponses: [...prev.reponses, '']
    }));
  };

  /**
   * Supprimer une réponse de la question en cours de modification
   */
  const handleRemoveReponseEdit = (index: number) => {
    setCurrentQuestionEdit(prev => ({
      ...prev,
      reponses: prev.reponses.filter((_, i) => i !== index),
      bonneReponse: prev.bonneReponse >= index ? Math.max(0, prev.bonneReponse - 1) : prev.bonneReponse
    }));
  };

  /**
   * Modifier une réponse de la question en cours de modification
   */
  const handleReponseEditChange = (index: number, value: string) => {
    setCurrentQuestionEdit(prev => ({
      ...prev,
      reponses: prev.reponses.map((rep, i) => i === index ? value : rep)
    }));
  };

  /**
   * Sauvegarder les modifications d'une question
   */
  const handleSaveEditedQuestion = () => {
    if (!currentQuestionEdit.question.trim() || !questionToEdit) {
      alert('Veuillez saisir une question valide.');
      return;
    }

    const updatedQuestion: Question = {
      ...questionToEdit,
      question: currentQuestionEdit.question,
      type: currentQuestionEdit.type,
      reponses: currentQuestionEdit.reponses.filter(rep => rep.trim()),
      enqueteId: currentQuestionEdit.enqueteId,
      nombrePoints: currentQuestionEdit.nombrePoints,
      bonneReponse: currentQuestionEdit.bonneReponse,
      required: currentQuestionEdit.required,
      ...(currentQuestionEdit.type === 'echelle_lineaire' && {
        echelleMin: currentQuestionEdit.echelleMin,
        echelleMax: currentQuestionEdit.echelleMax,
        labelMin: currentQuestionEdit.labelMin,
        labelMax: currentQuestionEdit.labelMax
      })
    };

    // Mettre à jour la liste des questions
    setQuestions(prev => prev.map(q => 
      q.id === questionToEdit.id ? updatedQuestion : q
    ));

    setEditModalOpen(false);
    setQuestionToEdit(null);
    console.log('Question modifiée:', updatedQuestion);
    alert('Question modifiée avec succès !');
    // TODO: Appel API pour sauvegarder les modifications
  };

  /**
   * Confirmation de suppression d'une question
   */
  const handleConfirmDeleteQuestion = () => {
    if (questionToDelete) {
      setQuestions(prev => prev.filter(q => q.id !== questionToDelete.id));
      setQuestionToDelete(null);
      console.log('Question supprimée:', questionToDelete.id);
      alert('Question supprimée avec succès !');
      // TODO: Appel API pour supprimer la question
    }
  };

  /**
   * Fermeture des modals
   */
  const handleCloseModals = () => {
    setDetailModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedQuestionForView(null);
    setQuestionToEdit(null);
    setQuestionToDelete(null);
  };

  /**
   * Fonction utilitaire pour obtenir le label d'un type de question
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
    return <LoadingScreen />;
  }

  // ===========================================
  // RENDU PRINCIPAL
  // ===========================================
  return (
    <Box sx={{ p: 4, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* En-tête avec titre et bouton retour */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 4,
        pb: 2,
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Typography variant="h4" component="h1" sx={{
          fontWeight: 700,
          color: '#1a1a1a',
          fontSize: '2rem'
        }}>
          Créer une enquête
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.back()}
          sx={{
            bgcolor: '#2c2c2c',
            color: 'white',
            px: 3,
            py: 1,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              bgcolor: '#1a1a1a',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          Retour
        </Button>
      </Box>

      {/* PARTIE 1 - Créer des enquêtes */}
      <CreateEnqueteForm onEnqueteCreated={handleEnqueteCreated} />

      {/* PARTIE 2 - Ajouter des questions */}
      <AddQuestionForm
        enquetes={enquetes}
        onQuestionAdded={handleQuestionAdded}
      />

      {/* PARTIE 3 - Liste des questions avec filtre */}
      <QuestionsListWithFilter
        questions={questions}
        enquetes={enquetes}
        onEditQuestion={handleEditQuestion}
        onDeleteQuestion={handleDeleteQuestion}
        onViewQuestion={handleViewQuestion}
      />

      {/* Boutons finaux - Sauvegarde globale */}
      <Box sx={{
        display: 'flex',
        gap: 3,
        justifyContent: 'flex-end',
        pt: 3,
        mt: 4,
        borderTop: '1px solid #e0e0e0'
      }}>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            minWidth: 120,
            py: 1.5,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            borderColor: '#ccc',
            color: 'black',
            '&:hover': {
              borderColor: '#999',
              color: '#333',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          Annuler
        </Button>
        <Button
          variant="contained"
          onClick={handleSaveAndExit}
          sx={{
            minWidth: 160,
            py: 1.5,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            bgcolor: '#1976d2',
            '&:hover': {
              bgcolor: '#1565c0',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(25,118,210,0.3)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          Enregistrer tout
        </Button>
      </Box>

      {/* Modals */}
      <QuestionDetailModal
        open={detailModalOpen}
        onClose={handleCloseModals}
        question={selectedQuestionForView}
        getTypeQuestionLabel={getTypeQuestionLabel}
      />

      <QuestionEditModal
        open={editModalOpen}
        onClose={handleCloseModals}
        question={questionToEdit}
        currentQuestion={currentQuestionEdit}
        enquetes={enquetes}
        onQuestionChange={handleCurrentQuestionEditChange}
        onAddReponse={handleAddReponseEdit}
        onRemoveReponse={handleRemoveReponseEdit}
        onReponseChange={handleReponseEditChange}
        onSave={handleSaveEditedQuestion}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleConfirmDeleteQuestion}
        title={questionToDelete ? `Êtes-vous sûr de supprimer la question "${questionToDelete.question.substring(0, 30)}..." ?` : "Êtes-vous sûr de supprimer cette question ?"}
        message="Vous ne pourrez pas annuler cette action !"
      />
    </Box>
  );
};

export default CreateEnquetePage;