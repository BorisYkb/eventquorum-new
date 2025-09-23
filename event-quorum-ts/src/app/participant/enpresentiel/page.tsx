// src/app/participant/page.tsx

'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import { DashboardContent } from 'src/layouts/dashboard';
import { SeoIllustration } from 'src/assets/illustrations';
import { Footer } from 'src/app/participant/components/footer';
import { AppWelcome } from 'src/app/participant/components/app-welcome-2';
import { AccueilVideoSection2 } from 'src/app/participant/components/accueil-video-section-2';
import AccueilProgrammeSection2 from 'src/app/participant/components/accueil-programme-section-2';

// ----------------------------------------------------------------------


export default function ParticipantEnresentielPage() {
    return (
        <DashboardContent>
            <Grid container spacing={3}>
                {/* Section 1 - Welcome sans bouton */}
                <Grid size={12}>
                    <AppWelcome
                        title="Bonjours cher(e) participant(e) Kouakou Evarist"
                        description="Vous etes connecté en tant que participant au SARA 2023. Veuillez selectionner vos activités"
                        img={<SeoIllustration />}
                    />
                </Grid>

                {/* Section 2 - Vidéo hero */}
                <AccueilVideoSection2 />

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