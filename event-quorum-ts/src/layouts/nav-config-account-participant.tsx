// src/layouts/nav-config-account-participant.tsx
'use client';

import { usePathname } from 'next/navigation';

import { Iconify } from 'src/components/iconify';

import type { AccountDrawerProps } from './components/account-drawer';

// ----------------------------------------------------------------------

/**
 * Configuration du menu account spécifique à l'espace participant
 * Dynamique selon le niveau de progression du participant
 */
export function useParticipantAccountData(): AccountDrawerProps['data'] {
  const pathname = usePathname();

  // Menu de base commun à tous les niveaux
  const baseItems: AccountDrawerProps['data'] = [
    { 
      label: 'Accueil', 
      href: '/participant', 
      icon: <Iconify icon="solar:home-angle-bold-duotone" /> 
    },
    {
      label: 'Mes informations personnelles',
      href: '#profile',
      icon: <Iconify icon="solar:user-bold-duotone" />,
    },
    {
      label: 'Modifier mon mot de passe',
      href: '#password',
      icon: <Iconify icon="solar:lock-password-bold-duotone" />,
    },
  ];

  // Actions dynamiques selon le niveau
  const dynamicItems: AccountDrawerProps['data'] = [];

  // Si participant en ligne payé, peut passer en présentiel
  if (pathname.startsWith('/participant/enligne/payer')) {
    dynamicItems.push({
      label: 'Passer en présentiel',
      href: '#switch-presentiel',
      icon: <Iconify icon="solar:user-speak-bold-duotone" />,
    });
  }

  // Si participant présentiel payé, peut passer en ligne
  if (pathname.startsWith('/participant/enpresentiel/payer')) {
    dynamicItems.push({
      label: 'Passer en ligne',
      href: '#switch-enligne',
      icon: <Iconify icon="solar:monitor-bold-duotone" />,
    });
  }

  // Si participant a payé, peut voir ses résultats
  if (pathname.includes('/payer')) {
    dynamicItems.push({
      label: 'Voir mes résultats',
      href: '#results',
      icon: <Iconify icon="solar:chart-bold-duotone" />,
    });

    dynamicItems.push({
      label: 'Reçu de paiement',
      href: '#receipt',
      icon: <Iconify icon="solar:document-bold-duotone" />,
    });
  }

  // Déconnexion toujours en dernier
  const logoutItem: AccountDrawerProps['data'] = [
    {
      label: 'Se déconnecter',
      href: '#logout',
      icon: <Iconify icon="solar:logout-2-bold-duotone" />,
    },
  ];

  return [...baseItems, ...dynamicItems, ...logoutItem];
}