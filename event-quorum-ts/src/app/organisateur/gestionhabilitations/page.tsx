// File: src/app/organisateur/gestionhabilitations/page.tsx

'use client'



import React, { useState, useEffect } from 'react';

import MuiAuthorizationDashboard, { Authorization } from 'src/app/organisateur/gestionhabilitations/components/MuiAuthorizationDashboard';

// ----------------------------------------------------------------------

// Données d'exemple - remplacez par vos vraies données ou un appel API
const sampleAuthorizations: Authorization[] = [
  {
    id: 1,
    firstName: "Jean",
    lastName: "Dupont",
    phone: "+225 07 12 34 56 78",
    email: "jean.dupont@example.com",
    role: "Superviseur",
    status: "Actif",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    firstName: "Marie",
    lastName: "Martin",
    phone: "+225 05 98 76 54 32",
    email: "marie.martin@example.com",
    role: "Intervenant",
    status: "Actif",
    createdAt: "2024-02-10"
  },
  {
    id: 3,
    firstName: "Pierre",
    lastName: "Kouassi",
    phone: "+225 01 23 45 67 89",
    email: "pierre.kouassi@example.com",
    role: "Opérateur de saisie",
    status: "Inactif",
    createdAt: "2024-01-20"
  },
  {
    id: 4,
    firstName: "Aminata",
    lastName: "Traoré",
    phone: "+225 07 11 22 33 44",
    email: "aminata.traore@example.com",
    role: "Organisateur",
    status: "Actif",
    createdAt: "2024-03-05"
  },
  {
    id: 5,
    firstName: "Kouadio",
    lastName: "Yao",
    phone: "+225 05 44 55 66 77",
    email: "kouadio.yao@example.com",
    role: "Intervenant",
    status: "Actif",
    createdAt: "2024-02-28"
  },
  {
    id: 6,
    firstName: "Oriane",
    lastName: "Chonou",
    phone: "+225 01 00 00 00 00",
    email: "admin@system.com",
    role: "Tous accès",
    status: "Actif",
    createdAt: "2024-01-01"
  }
];

export default function Page() {
  const [authorizations, setAuthorizations] = useState<Authorization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement de données
    // Remplacez ceci par votre appel API réel
    const loadAuthorizations = async () => {
      try {
        // Simulation d'un délai d'API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // TODO: Remplacer par votre appel API réel
        // const response = await fetch('/api/authorizations');
        // const data = await response.json();
        // setAuthorizations(data);

        setAuthorizations(sampleAuthorizations);
      } catch (error) {
        console.error('Erreur lors du chargement des habilitations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthorizations();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh'
      }}>
        Chargement des habilitations...
      </div>
    );
  }

  return <MuiAuthorizationDashboard authorizations={authorizations} />;
}
