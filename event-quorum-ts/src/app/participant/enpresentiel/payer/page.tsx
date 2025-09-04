// src/app/participant/page.tsx

'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import { SeoIllustration } from 'src/assets/illustrations';

import { AppWelcome } from 'src/sections/overview/app/app-welcome';
import { DashboardContent } from 'src/layouts/dashboard';

import { AccueilWelcomePayer } from './components/accueil-welcome-payer';
import { AccueilCompactVideo } from './components/accueil-compact-video';
import AccueilProgrammeSection2 from 'src/app/participant/components/accueil-programme-section-2';
import { IntervenantCarousel } from 'src/app/participant/components/intervenant-carousel';
import { Footer } from 'src/app/participant/components/footer';

// ----------------------------------------------------------------------


export default function ParticipantEnresentielPage() {
    return (
        <DashboardContent>
            <Grid container spacing={3}>
                {/* Section 1 - Welcome sans bouton */}
                <Grid size={12}>
                    <AppWelcome
                        title="Bonjours cher(e) participant(e) Kouakou Evarist"
                        description="Vous etes connecté en tant que participant au SARA 2023."
                        img={<SeoIllustration hideBackground />}
                    />
                </Grid>

                {/* Section 2 - Vidéo hero */}
                <AccueilCompactVideo />

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