// File: src/app/organisateur/gestionenquetes/page.tsx

'use client'

import React, { useState, useEffect } from 'react';

import { LoadingScreen } from 'src/components/loading-screen';

import MuiEnquetesDashboard, { Enquete } from './components/MuiEnquetesDashboard';

// ----------------------------------------------------------------------

/**
 * Données d'exemple - remplacez par vos vraies données ou un appel API
 * ✅ Inclut des exemples avec une seule activité ET plusieurs activités
 */
const sampleEnquetes: Enquete[] = [
  // ✅ Exemple 1 : UNE SEULE activité
  {
    id: 1,
    titre: "Satisfaction des participants",
    activite: "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
    code: "ENQ-001",
    nombreParticipants: 156,
    statut: "Terminé",
    createdAt: "2024-01-15"
  },

  // ✅ Exemple 2 : PLUSIEURS activités
  {
    id: 2,
    titre: "Évaluation globale de l'événement",
    activite: [
      "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
      "PANEL DE HAUT NIVEAU",
      "POINT DE PRESSE"
    ],
    code: "ENQ-002",
    nombreParticipants: 234,
    statut: "En cours",
    createdAt: "2024-02-10"
  },

  // ✅ Exemple 3 : UNE SEULE activité
  {
    id: 3,
    titre: "Feedback sur l'organisation",
    activite: "POINT DE PRESSE",
    code: "ENQ-003",
    nombreParticipants: 45,
    statut: "Non démarré",
    createdAt: "2024-01-20"
  },

  // ✅ Exemple 4 : PLUSIEURS activités
  {
    id: 4,
    titre: "Satisfaction générale - Journée complète",
    activite: [
      "COOLING BREAK",
      "PAUSE CAFE",
      "WORKSHOP"
    ],
    code: "ENQ-004",
    nombreParticipants: 189,
    statut: "Terminé",
    createdAt: "2024-03-05"
  },

  // ✅ Exemple 5 : UNE SEULE activité
  {
    id: 5,
    titre: "Évaluation des installations",
    activite: "PAUSE CAFE",
    code: "ENQ-005",
    nombreParticipants: 78,
    statut: "En cours",
    createdAt: "2024-02-28"
  },

  // ✅ Exemple 6 : PLUSIEURS activités (toutes les activités principales)
  {
    id: 6,
    titre: "Enquête complète - Tous les ateliers",
    activite: [
      "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
      "PANEL DE HAUT NIVEAU"
    ],
    code: "ENQ-006",
    nombreParticipants: 342,
    statut: "Non démarré",
    createdAt: "2024-03-12"
  },

  // ✅ Exemple 7 : PLUSIEURS activités
  {
    id: 7,
    titre: "Analyse des sessions principales",
    activite: [
      "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
      "PANEL DE HAUT NIVEAU"
    ],
    code: "ENQ-007",
    nombreParticipants: 203,
    statut: "En cours",
    createdAt: "2024-03-20"
  },

  // ✅ Exemple 8 : UNE SEULE activité
  {
    id: 8,
    titre: "Évaluation de la communication",
    activite: "POINT DE PRESSE",
    code: "ENQ-008",
    nombreParticipants: 91,
    statut: "Terminé",
    createdAt: "2024-02-15"
  },

  // ✅ Exemple 9 : PLUSIEURS activités
  {
    id: 9,
    titre: "Satisfaction des pauses et ateliers",
    activite: [
      "COOLING BREAK",
      "WORKSHOP",
      "PAUSE CAFE"
    ],
    code: "ENQ-009",
    nombreParticipants: 167,
    statut: "Non démarré",
    createdAt: "2024-03-25"
  },

  // ✅ Exemple 10 : UNE SEULE activité
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

/**
 * Page principale de gestion des enquêtes
 * Charge et affiche la liste des enquêtes avec le dashboard
 */
export default function Page() {
  const [enquetes, setEnquetes] = useState<Enquete[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Chargement des données des enquêtes
     * Simuler un chargement - Remplacez par votre appel API réel
     */
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

  // Affichage du loader pendant le chargement
  if (loading) {
    return <LoadingScreen />;
  }

  // Affichage du dashboard avec les enquêtes
  return <MuiEnquetesDashboard enquetes={enquetes} />;
}