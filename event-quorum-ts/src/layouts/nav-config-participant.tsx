// src/layouts/nav-config-participant.tsx
import type { NavSectionProps } from 'src/components/nav-section';
import { usePathname } from 'next/navigation';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/**
 * Configuration dynamique de navigation pour l'espace participant
 * Basée sur le pathname actuel pour afficher les onglets appropriés
 */
export function useParticipantNavData(): NavSectionProps['data'] {
  const pathname = usePathname();

  // Navigation dynamique basée sur la progression du participant
  if (pathname === '/participant' || pathname === '/participant/') {
    // Niveau initial - seulement Accueil
    return [
      {
        subheader: 'Navigation',
        items: [
          { 
            title: 'Accueil', 
            path: '/participant', 
            icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> 
          },
        ],
      },
    ];
  }

  if (pathname.startsWith('/participant/enpresentiel') && !pathname.includes('/payer')) {
    // Niveau présentiel confirmé - Accueil + Activités
    return [
      {
        subheader: 'Navigation',
        items: [
          { 
            title: 'Accueil', 
            path: '/participant/enpresentiel', 
            icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> 
          },
          { 
            title: 'Activités', 
            path: '/participant/enpresentiel/activites', 
            icon: <Iconify width={22} icon="solar:calendar-bold-duotone" /> 
          },
        ],
      },
    ];
  }

  if (pathname.startsWith('/participant/enligne') && !pathname.includes('/payer')) {
    // Niveau en ligne confirmé - Accueil + Activités
    return [
      {
        subheader: 'Navigation',
        items: [
          { 
            title: 'Accueil', 
            path: '/participant/enligne', 
            icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> 
          },
          { 
            title: 'Activités', 
            path: '/participant/enligne/activites', 
            icon: <Iconify width={22} icon="solar:calendar-bold-duotone" /> 
          },
        ],
      },
    ];
  }

  if (pathname.startsWith('/participant/enpresentiel/payer')) {
    // Niveau présentiel payé - Accueil + Activités + Mes interactions
    return [
      {
        subheader: 'Navigation',
        items: [
          { 
            title: 'Accueil', 
            path: '/participant/enpresentiel/payer', 
            icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> 
          },
          { 
            title: 'Activités', 
            path: '/participant/enpresentiel/payer/activites', 
            icon: <Iconify width={22} icon="solar:calendar-bold-duotone" /> 
          },
          { 
            title: 'Mes interactions', 
            path: '/participant/enpresentiel/payer/mesinteractions', 
            icon: <Iconify width={22} icon="solar:chat-round-call-bold-duotone" /> 
          },
        ],
      },
    ];
  }

  if (pathname.startsWith('/participant/enligne/payer') && !pathname.includes('/suivredirecte')) {
    // Niveau en ligne payé (avant suivi direct) - Accueil + Activités
    return [
      {
        subheader: 'Navigation',
        items: [
          { 
            title: 'Accueil', 
            path: '/participant/enligne/payer', 
            icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> 
          },
          { 
            title: 'Activités', 
            path: '/participant/enligne/payer/activites', 
            icon: <Iconify width={22} icon="solar:calendar-bold-duotone" /> 
          },
        ],
      },
    ];
  }

  if (pathname.startsWith('/participant/enligne/payer/suivredirecte')) {
    // Niveau en ligne avec suivi direct - Accueil + Activités + Mes interactions
    return [
      {
        subheader: 'Navigation',
        items: [
          { 
            title: 'Accueil', 
            path: '/participant/enligne/payer/suivredirecte', 
            icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> 
          },
          { 
            title: 'Activités', 
            path: '/participant/enligne/payer/suivredirecte/activites', 
            icon: <Iconify width={22} icon="solar:calendar-bold-duotone" /> 
          },
          { 
            title: 'Mes interactions', 
            path: '/participant/enligne/payer/suivredirecte/mesinteractions', 
            icon: <Iconify width={22} icon="solar:chat-round-call-bold-duotone" /> 
          },
        ],
      },
    ];
  }

  // Configuration par défaut (fallback)
  return [
    {
      subheader: 'Navigation',
      items: [
        { 
          title: 'Accueil', 
          path: '/participant', 
          icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> 
        },
      ],
    },
  ];
}