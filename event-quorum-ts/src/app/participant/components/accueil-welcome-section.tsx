
'use client';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';

import { SeoIllustration } from 'src/assets/illustrations';

import { AppWelcome } from 'src/sections/overview/app/app-welcome';

// ----------------------------------------------------------------------

type Props = {
  showConfirmerPresence: boolean;
  onConfirmerPresence: () => void;
  userName?: string;
  extraActions?: React.ReactNode; // Boutons supplémentaires pour accueil3/accueil4
};

export function AccueilWelcomeSection({ 
  showConfirmerPresence, 
  onConfirmerPresence, 
  userName = 'participant(e)',
  extraActions
}: Props) {
  return (
    <Grid size={12}>
      <AppWelcome
        title={`Bienvenu(e) cher(e) ${userName}`}
        description="Le SARA 2023 se tiendra dans le tout nouveau Parc des Expositions d'Abidjan. En seulement cinq éditions, le SARA s'est imposé comme le salon de référence en matière d'agriculture, de ressources animales, halieutiques et forestières en Afrique subsaharienne."
        img={<SeoIllustration hideBackground />}
      />
    </Grid>
  );
}