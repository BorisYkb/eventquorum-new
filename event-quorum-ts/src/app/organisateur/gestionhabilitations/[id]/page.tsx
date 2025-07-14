'use client'
import React from 'react';
import { useParams } from 'next/navigation';

export default function DetailAccesPage() {
  const params = useParams();
  const authId = params.id;

  return (
    <div>
      <h1>Détail de l'accès {authId}</h1>
      {/* Affichage des détails de l'habilitation */}
    </div>
  );
}
