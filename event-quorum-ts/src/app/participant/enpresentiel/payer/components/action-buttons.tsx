// src/app/participant/enligne/payer/suivredirecte/components/action-buttons.tsx
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
 * Composant des boutons d'action pour la participation aux enquêtes et partage d'avis
 * Séparé de l'activité épinglée pour une meilleure organisation
 */
export function ActionButtons() {
    const router = useRouter();
    const [enqueteModalOpen, setEnqueteModalOpen] = useState(false);
    const [codeEnquete, setCodeEnquete] = useState('');

    /**
     * Ouvre la modal pour participer à une enquête
     */
    const handleParticiperEnquete = () => {
        setEnqueteModalOpen(true);
    };

    /**
     * Navigue vers la page de partage d'avis
     */
    const handlePartagerAvis = () => {
        router.push('/participant/enpresentiel/payer/mesinteractions');
    };

    /**
     * Confirme la participation à l'enquête avec le code saisi
     */
    const handleConfirmEnquete = () => {
        if (codeEnquete.trim()) {
            // Redirection avec le code d'enquête
            router.push(`/participant/enpresentiel/payer/enquete?code=${codeEnquete}`);
            setEnqueteModalOpen(false);
            setCodeEnquete('');
        }
    };

    /**
     * Ferme la modal d'enquête et remet à zéro le code
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
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            gap: { xs: 1.5, md: 2 },
                            flexWrap: 'wrap'
                        }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Iconify icon="mdi:poll" />}
                                onClick={handleParticiperEnquete}
                                sx={{
                                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                                    px: { xs: 1.5, md: 2 },
                                    py: { xs: 0.75, md: 1 },
                                    fontWeight: 600,
                                    borderRadius: 1
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
                                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                                    px: { xs: 1.5, md: 2 },
                                    py: { xs: 0.75, md: 1 },
                                    fontWeight: 600,
                                    borderRadius: 1
                                }}
                            >
                                Partager un avis
                            </Button>
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
                    sx: { borderRadius: 2 }
                }}
            >
                <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
                    <Typography variant="h5" component="div">
                        Participer à une enquête
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ pt: 2, pb: 3 }}>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ textAlign: 'center', mb: 3 }}
                    >
                        Donnez vos avis sur l'activité/Événement
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ mb: 2, fontWeight: 500 }}
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
                    />
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'center', pb: 2, gap: 1 }}>
                    <Button
                        onClick={handleCloseEnqueteModal}
                        color="inherit"
                        variant="outlined"
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleConfirmEnquete}
                        variant="contained"
                        disabled={!codeEnquete.trim()}
                    >
                        Participer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}