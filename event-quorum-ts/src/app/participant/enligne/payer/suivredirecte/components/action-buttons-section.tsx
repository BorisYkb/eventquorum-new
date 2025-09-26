// src/app/participant/enpresentiel/payer/components/action-buttons-section.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import CardContent from '@mui/material/CardContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid2';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/**
 * Section des boutons d'action pour participer aux enquêtes et partager des avis
 */
export function ActionButtonsSection() {
    const router = useRouter();
    const [enqueteModalOpen, setEnqueteModalOpen] = useState(false);
    const [codeEnquete, setCodeEnquete] = useState('');

    /**
     * Gestionnaire pour ouvrir la modal d'enquête
     */
    const handleParticiperEnquete = () => {
        setEnqueteModalOpen(true);
    };

    /**
     * Gestionnaire pour partager un avis
     */
    const handlePartagerAvis = () => {
        router.push('/participant/enligne/payer/suivredirecte/mesinteractions');
    };

    /**
     * Gestionnaire pour confirmer la participation à une enquête
     */
    const handleConfirmEnquete = () => {
        if (codeEnquete.trim()) {
            // Redirection avec le code d'enquête
            router.push(`/participant/enligne/payer/suivredirecte/enquete?code=${codeEnquete}`);
            setEnqueteModalOpen(false);
            setCodeEnquete('');
        }
    };

    /**
     * Gestionnaire pour fermer la modal d'enquête
     */
    const handleCloseEnqueteModal = () => {
        setEnqueteModalOpen(false);
        setCodeEnquete('');
    };

    return (
        <>
            <Grid size={12}>
                <Card
                    sx={{
                        borderRadius: { xs: 1, md: 2 },
                        overflow: 'hidden',
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'stretch', sm: 'center' },
                            justifyContent: { xs: 'center', sm: 'space-between' },
                            gap: 2
                        }}>
                            {/* Section gauche : Titre et description */}
                            <Box sx={{
                                flex: 1,
                                textAlign: { xs: 'center', sm: 'left' },
                                mb: { xs: 2, sm: 0 }
                            }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.125rem' },
                                        mb: 0.5,
                                        color: 'text.primary'
                                    }}
                                >
                                    Participez et partagez votre expérience
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' },
                                        lineHeight: 1.4
                                    }}
                                >
                                    Donnez votre avis ou participez aux enquêtes en temps réel
                                </Typography>
                            </Box>

                            {/* Section droite : Boutons d'action */}
                            <Box sx={{
                                display: 'flex',
                                gap: { xs: 1.5, sm: 2 },
                                alignItems: 'center',
                                flexDirection: { xs: 'column', sm: 'row' },
                                flexWrap: { sm: 'wrap', md: 'nowrap' }
                            }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Iconify icon="solar:question-circle-bold" />}
                                    onClick={handleParticiperEnquete}
                                    sx={{
                                        fontSize: { xs: '0.8rem', md: '0.875rem' },
                                        px: { xs: 2, md: 2.5 },
                                        py: { xs: 1, md: 1.25 },
                                        minWidth: { xs: '100%', sm: 'auto' },
                                        fontWeight: 600,
                                        borderRadius: 1.5,
                                        boxShadow: 1,
                                        '&:hover': {
                                            boxShadow: 2,
                                            transform: 'translateY(-1px)'
                                        },
                                        transition: 'all 0.2s ease-in-out'
                                    }}
                                >
                                    Je participe à une enquête
                                </Button>

                                <Button
                                    variant="contained"
                                    color="warning"
                                    startIcon={<Iconify icon="solar:heart-bold" />}
                                    onClick={handlePartagerAvis}
                                    sx={{
                                        fontSize: { xs: '0.8rem', md: '0.875rem' },
                                        px: { xs: 2, md: 2.5 },
                                        py: { xs: 1, md: 1.25 },
                                        minWidth: { xs: '100%', sm: 'auto' },
                                        fontWeight: 600,
                                        borderRadius: 1.5,
                                        boxShadow: 1,
                                        '&:hover': {
                                            boxShadow: 2,
                                            transform: 'translateY(-1px)'
                                        },
                                        transition: 'all 0.2s ease-in-out'
                                    }}
                                >
                                    Partager un avis
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* Modal pour saisir le code d'enquête */}
            <Dialog
                open={enqueteModalOpen}
                onClose={handleCloseEnqueteModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        bgcolor: 'background.paper'
                    }
                }}
            >
                <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                        Participer à une enquête
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ pt: 2, pb: 3 }}>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ textAlign: 'center', mb: 3, lineHeight: 1.5 }}
                    >
                        Donnez vos avis sur l'activité/Événement
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ mb: 2, fontWeight: 500, color: 'text.primary' }}
                    >
                        Renseigner le code de l'enquête
                    </Typography>

                    <TextField
                        fullWidth
                        label="Code"
                        placeholder="Ex: AZ123"
                        value={codeEnquete}
                        onChange={(e) => setCodeEnquete(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 2 }}
                        autoFocus
                    />
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'center', pb: 2, gap: 1 }}>
                    <Button
                        onClick={handleCloseEnqueteModal}
                        color="inherit"
                        variant="outlined"
                        sx={{ minWidth: 100 }}
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleConfirmEnquete}
                        variant="contained"
                        disabled={!codeEnquete.trim()}
                        sx={{ minWidth: 100 }}
                    >
                        Participer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}