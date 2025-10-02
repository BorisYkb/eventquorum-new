// src/app/participant/enligne/payer/page.tsx

'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import { DashboardContent } from 'src/layouts/dashboard';
import { SeoIllustration } from 'src/assets/illustrations';
import { Footer } from 'src/app/participant/components/footer';
import { AppWelcome } from 'src/app/participant/components/app-welcome-2';
import { IntervenantCarousel } from 'src/app/participant/components/intervenant-carousel';
import AccueilProgrammeSection2 from './components/programme/accueil-programme-section-2';

import { AccueilCompactVideo } from 'src/app/participant/components/accueil-compact-video';

// ----------------------------------------------------------------------


export default function ParticipantEnresentielPage() {
    return (
        <DashboardContent>
            <Grid container spacing={3}>
                {/* Section 1 - Welcome sans bouton */}
                <Grid size={12}>
                    <AppWelcome
                        title="Bonjour Kouakou Evarist"
                        description="Vous etes connecté en tant que participant au SARA 2023."
                        img={<SeoIllustration />}
                    />
                </Grid>

                {/* Section 2 - Vidéo hero */}
                <AccueilCompactVideo />

                {/* Section 3 - Programme */}
                <AccueilProgrammeSection2 />

                {/* Section 4 - Sponsors/Footer */}
                

                <Grid size={12}>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Footer />
                    </Box>
                </Grid>
            </Grid>
        </DashboardContent>
    );
}