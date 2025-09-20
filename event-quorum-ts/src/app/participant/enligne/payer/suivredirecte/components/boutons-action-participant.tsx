// src/app/participant/components/boutons-action-participant.tsx
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
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/**
 * Composant pour les boutons d'action du participant
 * Séparé de l'activité épinglée pour une meilleure organisation
 */
export function BoutonsActionParticipant() {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [enqueteModalOpen, setEnqueteModalOpen] = useState(false);
    const [codeEnquete, setCodeEnquete] = useState('');

    /**
     * Gestionnaire pour participer à une enquête
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
     * Confirmation de l'enquête avec code
     */
    const handleConfirmEnquete = () => {
        if (codeEnquete.trim()) {
            router.push(`/participant/enligne/payer/suivredirecte/enquete?code=${codeEnquete}`);
            setEnqueteModalOpen(false);
            setCodeEnquete('');
        }
    };

    /**
     * Fermeture de la modal enquête
     */
    const handleCloseEnqueteModal = () => {
        setEnqueteModalOpen(false);
        setCodeEnquete('');
    };

    return (
        <>
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
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 2
                    }}>
                        {/* Section gauche : Titre */}
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                                    mb: 0.5,
                                    color: 'text.primary'
                                }}
                            >
                                Actions rapides
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: { xs: '0.75rem', sm: '0.825rem', md: '0.875rem' } }}
                            >
                                Participez et partagez votre expérience
                            </Typography>
                        </Box>

                        {/* Section droite : Boutons d'action */}
                        <Box sx={{
                            display: 'flex',
                            gap: 1.5,
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            justifyContent: { xs: 'center', sm: 'flex-end' }
                        }}>
                            <Button
                                variant="contained"
                                color="info"
                                startIcon={<Iconify icon="solar:question-circle-bold" />}
                                onClick={handleParticiperEnquete}
                                sx={{
                                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                                    px: { xs: 1.5, md: 2 },
                                    py: { xs: 0.75, md: 1 },
                                    minWidth: 'auto',
                                    borderRadius: 1.5,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    boxShadow: 1,
                                    '&:hover': {
                                        boxShadow: 2,
                                        transform: 'translateY(-1px)'
                                    },
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                {isMobile ? 'Enquête' : 'Je participe à une enquête'}
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
                                    minWidth: 'auto',
                                    borderRadius: 1.5,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    boxShadow: 1,
                                    '&:hover': {
                                        boxShadow: 2,
                                        transform: 'translateY(-1px)'
                                    },
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                {isMobile ? 'Avis' : 'Partager un avis'}
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Modal pour saisir le code d'enquête */}
            <Dialog
                open={enqueteModalOpen}
                onClose={handleCloseEnqueteModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        boxShadow: 4
                    }
                }}
            >
                <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                        <Iconify icon="solar:question-circle-bold" width={24} />
                        <Typography variant="h5" component="div">
                            Participer à une enquête
                        </Typography>
                    </Box>
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
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 1.5
                            }
                        }}
                        autoFocus
                    />
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 1 }}>
                    <Button
                        onClick={handleCloseEnqueteModal}
                        color="inherit"
                        variant="outlined"
                        sx={{
                            borderRadius: 1.5,
                            textTransform: 'none',
                            px: 3
                        }}
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleConfirmEnquete}
                        variant="contained"
                        disabled={!codeEnquete.trim()}
                        sx={{
                            borderRadius: 1.5,
                            textTransform: 'none',
                            px: 3
                        }}
                    >
                        Participer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}