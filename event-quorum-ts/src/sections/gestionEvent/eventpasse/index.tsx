// src/sections/gestionEvent/eventpasse/index.tsx
'use client';

import { Box, Container, Typography } from '@mui/material';
import EventPasse from 'src/sections/gestionEvent/eventpasse/EventPasse';

/**
 * Page de gestion des événements passés
 * Permet de configurer quels événements afficher sur la landing page
 */
export default function EventPassePage() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Événements Passés
        </Typography>
        <EventPasse />
      </Box>
    </Container>
  );
}