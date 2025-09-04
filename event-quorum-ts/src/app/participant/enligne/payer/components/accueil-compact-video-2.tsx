// src/app/participant/enpresentiel/payer/components/accueil-compact-video.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import CardContent from '@mui/material/CardContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid2';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/**
 * Section vidéo compacte pour les pages /payer/ (accueil3)
 * Remplace la grande section vidéo par une version compacte avec icône et boutons d'action
 */
export function AccueilCompactVideo2() {
    const router = useRouter();


    const handleWatchVideo = () => {
        console.log('Watch video');
        // TODO: Ouvrir modal vidéo
    };

    return (
        <>
            <Grid size={12}>
                <Card
                    sx={{
                        borderRadius: { xs: 1, md: 2 },
                        overflow: 'hidden',
                        bgcolor: 'background.neutral',
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 2
                        }}>
                            {/* Section gauche : Icône + Titre + Description */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 200 }}>
                                {/* Icône vidéo compacte */}
                                <IconButton
                                    onClick={handleWatchVideo}
                                    sx={{
                                        bgcolor: 'primary.main',
                                        color: 'primary.contrastText',
                                        width: { xs: 48, md: 56 },
                                        height: { xs: 48, md: 56 },
                                        '&:hover': {
                                            bgcolor: 'primary.dark',
                                            transform: 'scale(1.05)'
                                        },
                                        transition: 'all 0.2s ease-in-out'
                                    }}
                                >
                                    <Iconify icon="solar:play-circle-bold" width={24} />
                                </IconButton>

                                {/* Titre et description */}
                                <Box>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                                            mb: 0.5
                                        }}
                                    >
                                        LE SARA, UN ÉVÉNEMENT INCONTOURNABLE
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontSize: { xs: '0.75rem', sm: '0.825rem', md: '0.875rem' } }}
                                    >
                                        Du 29 sept. au 08 oct. 2025 • Cliquez sur le bouton pour voir la vidéo
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Section droite : Boutons d'action */}
                            <Box sx={{
                                display: 'flex',
                                gap: 1.5,
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
}