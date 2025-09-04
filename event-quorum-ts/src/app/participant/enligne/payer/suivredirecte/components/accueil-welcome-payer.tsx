// src/app/participant/enpresentiel/payer/components/accueil-welcome-payer.tsx
'use client';

import Grid from '@mui/material/Grid2';

import { SeoIllustration } from 'src/assets/illustrations';

import { AppWelcome } from 'src/sections/overview/app/app-welcome';

// ----------------------------------------------------------------------

/**
 * Section Welcome pour les pages /payer/ (accueil3)
 * Sans bouton "Confirmer ma présence"
 */
export function AccueilWelcomePayer() {
  return (
    <Grid size={12}>
      <AppWelcome
        title="Bonjour(e) cher(e) participant(e) Kouakou Evarist"
        description="Vous êtes connecté en tant que participant au SARA 2023. Sur ce espace, vous avez accès à vos activités payées et à vos interactions."
        img={<SeoIllustration hideBackground />}
      />
    </Grid>
  );
}