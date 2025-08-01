// File: src/app/organisateur/gestionenquetes/page.tsx

'use client'

import React, { useState, useEffect } from 'react';

import MuiEnquetesDashboard, { Enquete } from './components/MuiEnquetesDashboard';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// Données d'exemple - remplacez par vos vraies données ou un appel API
const sampleEnquetes: Enquete[] = [
  {
    id: 1,
    titre: "Satisfaction des participants",
    activite: "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
    code: "ENQ-001",
    nombreParticipants: 156,
    statut: "Terminé",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    titre: "Évaluation de la qualité des intervenants",
    activite: "PANEL DE HAUT NIVEAU",
    code: "ENQ-002",
    nombreParticipants: 89,
    statut: "En cours",
    createdAt: "2024-02-10"
  },
  {
    id: 3,
    titre: "Feedback sur l'organisation",
    activite: "POINT DE PRESSE",
    code: "ENQ-003",
    nombreParticipants: 45,
    statut: "Non démarré",
    createdAt: "2024-01-20"
  },
  {
    id: 4,
    titre: "Enquête de satisfaction générale",
    activite: "COOLING BREAK",
    code: "ENQ-004",
    nombreParticipants: 234,
    statut: "Terminé",
    createdAt: "2024-03-05"
  },
  {
    id: 5,
    titre: "Évaluation des installations",
    activite: "PAUSE CAFE",
    code: "ENQ-005",
    nombreParticipants: 78,
    statut: "En cours",
    createdAt: "2024-02-28"
  },
  {
    id: 6,
    titre: "Questionnaire post-événement",
    activite: "PANEL DE HAUT NIVEAU",
    code: "ENQ-006",
    nombreParticipants: 167,
    statut: "Non démarré",
    createdAt: "2024-03-12"
  },
  {
    id: 7,
    titre: "Analyse des besoins futurs",
    activite: "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
    code: "ENQ-007",
    nombreParticipants: 203,
    statut: "En cours",
    createdAt: "2024-03-20"
  },
  {
    id: 8,
    titre: "Évaluation de la communication",
    activite: "POINT DE PRESSE",
    code: "ENQ-008",
    nombreParticipants: 91,
    statut: "Terminé",
    createdAt: "2024-02-15"
  },
  {
    id: 9,
    titre: "Satisfaction des sponsors",
    activite: "COOLING BREAK",
    code: "ENQ-009",
    nombreParticipants: 32,
    statut: "Non démarré",
    createdAt: "2024-03-25"
  },
  {
    id: 10,
    titre: "Enquête sur l'accessibilité",
    activite: "PAUSE CAFE",
    code: "ENQ-010",
    nombreParticipants: 145,
    statut: "En cours",
    createdAt: "2024-03-18"
  }
];

export default function Page() {
  const [enquetes, setEnquetes] = useState<Enquete[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement de données
    // Remplacez ceci par votre appel API réel
    const loadEnquetes = async () => {
      try {
        // Simulation d'un délai d'API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // TODO: Remplacer par votre appel API réel
        // const response = await fetch('/api/enquetes');
        // const data = await response.json();
        // setEnquetes(data);

        setEnquetes(sampleEnquetes);
      } catch (error) {
        console.error('Erreur lors du chargement des enquêtes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEnquetes();
  }, []);
  
  if (loading) {
    return <LoadingScreen />;
  }



  return <MuiEnquetesDashboard enquetes={enquetes} />;
}
