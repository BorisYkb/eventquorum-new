// src/app/participant/page.tsx

'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import { DashboardContent } from 'src/layouts/dashboard';
import { SeoIllustration } from 'src/assets/illustrations';
import { Footer } from 'src/app/participant/components/footer';
import { AppWelcome } from 'src/app/participant/components/app-welcome-2';
import { IntervenantCarousel } from 'src/app/participant/components/intervenant-carousel';
import { AccueilVideoSection2 } from 'src/app/participant/components/accueil-video-section-2';
import AccueilProgrammeSectionInit from './components/accueil-programme-section-init';

// ----------------------------------------------------------------------


export default function ParticipantPage() {
  return (
    <DashboardContent>
      <Grid container spacing={3}>
        {/* Section 1 - Welcome sans bouton */}
        <Grid size={12}>
          <AppWelcome
            title="Bienvenu(e) Chonou Oriane"
            description="Vous êtes connecté en tant que participant de l'évènement SARA."
            img={<SeoIllustration />}
          />
        </Grid>

        {/* Section 2 - Vidéo hero */}
        <AccueilVideoSection2 />

        {/* Section 3 - Programme */}
        <AccueilProgrammeSectionInit />

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