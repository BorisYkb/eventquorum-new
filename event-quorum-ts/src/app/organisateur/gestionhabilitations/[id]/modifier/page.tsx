'use client'
import React from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ModifierAccesPage() {
  const params = useParams();
  const router = useRouter();
  const authId = params.id;

  const handleUpdateSuccess = () => {
    router.push('/organisateur/gestionhabilitations');
  };

  return (
    <div>
      <h1>Modifier l'accès {authId}</h1>
      {/* Votre formulaire de modification */}
      {/* <AuthorizationForm authId={authId} onSuccess={handleUpdateSuccess} /> */}
    </div>
  );
}
