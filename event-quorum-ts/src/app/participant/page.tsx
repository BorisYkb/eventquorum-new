// src/app/participant/page.tsx

'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import { SeoIllustration } from 'src/assets/illustrations';

import { AppWelcome } from 'src/sections/overview/app/app-welcome';
import { DashboardContent } from 'src/layouts/dashboard';

import { AccueilVideoSection2 } from 'src/app/participant/components/accueil-video-section-2';
import AccueilProgrammeSection2 from 'src/app/participant/components/accueil-programme-section-2';
import { IntervenantCarousel } from 'src/app/participant/components/intervenant-carousel';
import { Footer } from 'src/app/participant/components/footer';

// ----------------------------------------------------------------------


export default function ParticipantPage() {
  return (
    <DashboardContent>
      <Grid container spacing={3}>
        {/* Section 1 - Welcome sans bouton */}
        <Grid size={12}>
          <AppWelcome
            title="Bienvenu(e) cher(e) participant(e)"
            description="Le SARA 2023 se tiendra dans le tout nouveau Parc des Expositions d'Abidjan. En seulement cinq éditions, le SARA s'est imposé comme le salon de référence en matière d'agriculture, de ressources animales, halieutiques et forestières en Afrique subsaharienne. Trois ans après sa dernière édition, le Salon International de l'Agriculture et des Ressources Animales d'Abidjan a été relancé par le gouvernement ivoirien afin de valoriser, promouvoir et développer toutes les richesses du secteur agricole, de l'élevage et de la pêche de la Côte d'Ivoire."
            img={<SeoIllustration hideBackground />}
          />
        </Grid>

        {/* Section 2 - Vidéo hero */}
        <AccueilVideoSection2 />

        {/* Section 3 - Programme */}
        <AccueilProgrammeSection2 />

        {/* Section 4 - Sponsors/Footer */}
        <Grid size={12}>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <IntervenantCarousel />
          </Box>
        </Grid>

        <Grid size={12}>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Footer />
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}