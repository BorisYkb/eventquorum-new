// File: src/app/organisateur/gestionenquetes/[id]/resultats/page.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { Box, Button, Tooltip } from '@mui/material';

import Loading from 'src/app/loading';

// Import des types
import { Question, Enquete } from '../../nouveau/types';
import Question1ResultCard from './components/Question1ResultCard';
import Question2ResultCard from './components/Question2ResultCard';
// ✅ Import des 5 composants spécialisés
import EnqueteResultsHeader from './components/EnqueteResultsHeader';
import QuestionListResultCard from './components/QuestionListResultCard';
import QuestionChartResultCard from './components/QuestionChartResultCard';

/**
 * Interface pour les statistiques de l'enquête
 */
interface EnqueteStats {
  totalParticipants: number;
  participantsEnCours: number;
  participantsTermines: number;
  tauxParticipation: number;
}

/**
 * Interface pour les réponses d'une question
 */
interface QuestionResult {
  questionId: number;
  question: string;
  type: Question['type'];
  totalReponses: number;
  reponses: {
    [key: string]: {
      count: number;
      percentage: number;
      label: string;
    }
  };
  // Pour les questions libres
  reponsesLibres?: string[];
  // Pour les échelles linéaires
  moyenneEchelle?: number;
  repartitionEchelle?: { [key: number]: number };
}

/**
 * Interface pour les détails complets des résultats
 */
interface EnqueteResultsDetail {
  enquete: Enquete;
  stats: EnqueteStats;
  questions: Question[];
  resultats: QuestionResult[];
  createdAt: string;
  statut: 'Terminé' | 'En cours' | 'Non démarré';
}

/**
 * Données d'exemple selon vos maquettes
 */
const sampleResultsData: EnqueteResultsDetail = {
  enquete: {
    id: 1,
    titre: "ENQUÊTE 1",
    activite: "ACTIVITÉ 1",
    typeEnquete: "live",
    enqueteAnonymat: true,
    authentificationNumerique: false,
    createdAt: "2024-01-15"
  },
  stats: {
    totalParticipants: 80,
    participantsEnCours: 23,
    participantsTermines: 50,
    tauxParticipation: 65
  },
  questions: [
    {
      id: 1,
      question: "Les populations de la côte d'ivoire propose que établissement de la carte nationale d'identité soit gratuit. Qu'en pensez vous ??",
      type: "choix_multiple",
      reponses: ["Oui", "Non", "Sans avis"],
      enqueteId: 1,
      nombrePoints: 10,
      bonneReponse: 0,
      required: true
    },
    {
      id: 2,
      question: "Quel est le principal avantage de la rotation des cultures ?",
      type: "choix_multiple",
      reponses: ["Réponse1", "Réponse2", "Réponse3", "Réponse4"],
      enqueteId: 1,
      nombrePoints: 10,
      bonneReponse: 1,
      required: true
    },
    {
      id: 3,
      question: "Sur une échelle de 1 à 5, à quel point pensez-vous que cette conférence sera utile pour votre carrière ?",
      type: "echelle_lineaire",
      reponses: [],
      enqueteId: 1,
      nombrePoints: 0,
      bonneReponse: 0,
      required: true,
      echelleMin: 1,
      echelleMax: 5
    },
    {
      id: 4,
      question: "Quel intervenant aimeriez-vous voir à cette conférence ?",
      type: "liste_deroulante",
      reponses: [
        "Bouadou kouadou evarist ( Proposition 1 )",
        "Bouadou kouadou evarist ( Proposition 2 )",
        "Bouadou kouadou evarist ( Proposition 3 )",
        "Bouadou kouadou evarist ( Proposition 4 )"
      ],
      enqueteId: 1,
      nombrePoints: 15,
      bonneReponse: 0,
      required: false
    }
  ],
  resultats: [
    {
      questionId: 1,
      question: "Les populations de la côte d'ivoire propose que établissement de la carte nationale d'identité soit gratuit. Qu'en pensez vous ??",
      type: "choix_multiple",
      totalReponses: 50,
      reponses: {
        "0": { count: 35, percentage: 70, label: "Oui" },
        "1": { count: 13, percentage: 25, label: "Non" },
        "2": { count: 2, percentage: 5, label: "Sans avis" }
      }
    },
    {
      questionId: 2,
      question: "Quel est le principal avantage de la rotation des cultures ?",
      type: "choix_multiple",
      totalReponses: 60,
      reponses: {
        "0": { count: 3, percentage: 5, label: "Réponse1" },
        "1": { count: 55, percentage: 92, label: "Réponse2" },
        "2": { count: 2, percentage: 3, label: "Réponse3" },
        "3": { count: 0, percentage: 0, label: "Réponse4" }
      }
    },
    {
      questionId: 3,
      question: "Sur une échelle de 1 à 5, à quel point pensez-vous que cette conférence sera utile pour votre carrière ?",
      type: "echelle_lineaire",
      totalReponses: 30,
      reponses: {},
      moyenneEchelle: 3.8,
      repartitionEchelle: {
        1: 2, 2: 3, 3: 1, 4: 30, 5: 15
      }
    },
    {
      questionId: 4,
      question: "Quel intervenant aimeriez-vous voir à cette conférence ?",
      type: "liste_deroulante",
      totalReponses: 4,
      reponses: {
        "0": { count: 0, percentage: 0, label: "Bouadou kouadou evarist ( Proposition 1 )" },
        "1": { count: 0, percentage: 0, label: "Bouadou kouadou evarist ( Proposition 2 )" },
        "2": { count: 0, percentage: 0, label: "Bouadou kouadou evarist ( Proposition 3 )" },
        "3": { count: 0, percentage: 0, label: "Bouadou kouadou evarist ( Proposition 4 )" }
      }
    }
  ],
  createdAt: "2024-01-15",
  statut: "En cours"
};

/**
 * 🎯 PAGE PRINCIPALE - Assemblage de tous les composants
 */
const EnqueteResultsPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const enqueteId = params.id as string;

  // États principaux
  const [resultsData, setResultsData] = useState<EnqueteResultsDetail | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Chargement des données de résultats au montage du composant
   */
  useEffect(() => {
    const loadResultsData = async () => {
      try {
        setLoading(true);
        
        // TODO: Remplacer par votre appel API réel
        // const response = await fetch(`/api/enquetes/${enqueteId}/resultats`);
        // const data = await response.json();
        // setResultsData(data);

        // Simulation d'un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 1000));
        setResultsData(sampleResultsData);
        
      } catch (error) {
        console.error('Erreur lors du chargement des résultats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (enqueteId) {
      loadResultsData();
    }
  }, [enqueteId]);

  /**
   * 🔄 GESTIONNAIRES D'ÉVÉNEMENTS
   */
  const handleBack = () => {
    router.push(`/organisateur/gestionenquete/${enqueteId}`);
  };

  const handleExport = () => {
    console.log('Export des résultats pour l\'enquête:', enqueteId);
    alert('Fonctionnalité d\'export en cours de développement');
  };
  const handleViewDetail = (questionId: number) => {
    console.log('Voir détail de la question:', questionId);
    // L'alert peut être supprimé car le modal s'affiche maintenant
  };

  /**
   * 🆕 Gestionnaire pour voir les résultats des participants
   */
  const handleViewParticipantsResults = () => {
    console.log('Voir les résultats des participants pour l\'enquête:', enqueteId);
    // Navigation vers la page des résultats des participants
    router.push(`/organisateur/gestionenquete/${enqueteId}/resultats/participants`);
  };

  /**
   * 🔄 FONCTIONS DE CONVERSION pour Question 3 et 4
   */
  const convertToChartReponses = (result: QuestionResult) => {
    if (result.repartitionEchelle) {
      return Object.entries(result.repartitionEchelle).map(([scale, count]) => ({
        label: `Note ${scale}`,
        count: count,
        percentage: Math.round((count / result.totalReponses) * 100)
      }));
    }
    return [];
  };

  const convertToListReponses = (result: QuestionResult) => Object.values(result.reponses).map(reponse => ({
      label: reponse.label,
      count: reponse.count,
      selected: reponse.count > 0
    }));

  /**
   * 🎯 RENDU CONDITIONNEL - Le cœur de l'assemblage
   */
  const renderQuestionResult = (result: QuestionResult) => {
    // ✅ Question 1 : Composant spécialisé avec vraies données
    if (result.questionId === 1) {
      return (
        <Question1ResultCard
          key={result.questionId}
          onViewDetail={() => handleViewDetail(result.questionId)}
          // Passer les vraies données de la page
          questionData={{
            questionNumber: result.questionId,
            question: result.question,
            totalParticipants: resultsData?.stats.totalParticipants || 80,
            totalReponses: result.totalReponses,
            reponses: Object.values(result.reponses).map((reponse, index) => ({
              label: reponse.label,
              count: reponse.count,
              percentage: reponse.percentage,
              color: ['#1976d2', '#42a5f5', '#64b5f6'][index] || '#90caf9'
            }))
          }}
        />
      );
    }

    // ✅ Question 2 : Composant spécialisé avec vraies données
    if (result.questionId === 2) {
      return (
        <Question2ResultCard
          key={result.questionId}
          onViewDetail={() => handleViewDetail(result.questionId)}
          // Passer les vraies données de la page
          questionData={{
            questionNumber: result.questionId,
            question: result.question,
            totalParticipants: resultsData?.stats.totalParticipants || 80,
            totalReponses: result.totalReponses,
            reponses: Object.values(result.reponses).map((reponse, index) => ({
              label: reponse.label,
              count: reponse.count,
              percentage: reponse.percentage,
              color: ['#1976d2', '#42a5f5', '#64b5f6', '#90caf9'][index] || '#bbdefb'
            }))
          }}
        />
      );
    }

    // ✅ Question 3 : Composant avec graphique
    if (result.questionId === 3 && result.type === 'echelle_lineaire') {
      return (
        <QuestionChartResultCard
          key={result.questionId}
          questionNumber={result.questionId}
          question={result.question}
          totalParticipants={resultsData?.stats.totalParticipants || 0}
          totalReponses={result.totalReponses}
          reponses={convertToChartReponses(result)}
          onViewDetail={() => handleViewDetail(result.questionId)}
        />
      );
    }

    // ✅ Question 4 : Composant avec liste
    if (result.questionId === 4) {
      return (
        <QuestionListResultCard
          key={result.questionId}
          questionNumber={result.questionId}
          question={result.question}
          totalParticipants={resultsData?.stats.totalParticipants || 0}
          totalReponses={result.totalReponses}
          reponses={convertToListReponses(result)}
          onViewDetail={() => handleViewDetail(result.questionId)}
        />
      );
    }

    return null;
  };

  // ===========================================
  // 🔄 RENDU CONDITIONNEL - CHARGEMENT
  // ===========================================
  if (loading) {
    return <Loading />;
  }

  // ===========================================
  // 🔄 RENDU CONDITIONNEL - ERREUR
  // ===========================================
  if (!resultsData) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#fafafa'
      }}>
        <Box sx={{ 
          textAlign: 'center',
          p: 4,
          bgcolor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ color: '#333', marginBottom: '1rem' }}>Résultats introuvables</h2>
          <p style={{ color: '#666' }}>Impossible de charger les résultats de cette enquête.</p>
        </Box>
      </Box>
    );
  }

  // ===========================================
  // 🎯 RENDU PRINCIPAL - ASSEMBLAGE FINAL
  // ===========================================
  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 },
      backgroundColor: '#fafafa', 
      minHeight: '100vh' 
    }}>
      {/* 🔝 EN-TÊTE avec widgets oranges */}
      <EnqueteResultsHeader
        enqueteTitre={resultsData.enquete.titre}
        activiteTitre={resultsData.enquete.activite}
        nombreParticipants={resultsData.stats.totalParticipants}
        nombreQuestions={resultsData.questions.length}
        tauxParticipation={resultsData.stats.tauxParticipation}
        onExport={handleExport}
        onBack={handleBack}
      />

      {/* 🆕 BOUTON "Voir les résultats des participants" avec Tooltip - Aligné à droite */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        mt: 2, 
        mb: 2 
      }}>
        <Tooltip title="Voir les résultats des participants" arrow>
          <Button
            variant="contained"
            onClick={handleViewParticipantsResults}
            sx={{
              bgcolor: '#1976d2',
              color: 'white',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              px: 3,
              py: 1.2,
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.2)',
              '&:hover': {
                bgcolor: '#1565c0',
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                transform: 'translateY(-1px)'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Voir les résultats
          </Button>
        </Tooltip>
      </Box>

      {/* 📊 RÉSULTATS par question avec composants spécialisés */}
      <Box sx={{ mt: 2 }}>
        {resultsData.resultats.map(result => renderQuestionResult(result))}
      </Box>
    </Box>
  );
};

export default EnqueteResultsPage;