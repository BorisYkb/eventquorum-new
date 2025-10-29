// src/sections/gestion-message/add-message-dialog.tsx

'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    FormLabel,
    FormControlLabel,
    Checkbox,
    Stack,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

import { Editor } from 'src/components/editor';

// ----------------------------------------------------------------------

/**
 * Interface pour les données d'un nouveau message
 */
export interface NewMessageData {
    titre: string;
    description: string;
    contenu: string;
    afficherSurPage: boolean;
    envoyerParReseau: boolean;
}

/**
 * Props du composant
 */
interface AddMessageDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (data: NewMessageData) => void;
}

/**
 * Dialog pour ajouter un nouveau message
 * Permet de renseigner le titre, le contenu et les options d'affichage/envoi
 */
export function AddMessageDialog({ open, onClose, onAdd }: AddMessageDialogProps) {
    // États pour le formulaire
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [contenu, setContenu] = useState('');
    const [afficherSurPage, setAfficherSurPage] = useState(false);
    const [envoyerParReseau, setEnvoyerParReseau] = useState(false);
    const [errors, setErrors] = useState<{ titre?: string; contenu?: string }>({});

    /**
     * Validation du formulaire
     */
    const validate = (): boolean => {
        const newErrors: { titre?: string; contenu?: string } = {};

        if (!titre.trim()) {
            newErrors.titre = 'Le titre est requis';
        }

        if (!contenu.trim()) {
            newErrors.contenu = 'Le contenu est requis';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Gestion de l'ajout
     */
    const handleAdd = () => {
        if (!validate()) {
            return;
        }

        onAdd({
            titre,
            description,
            contenu,
            afficherSurPage,
            envoyerParReseau,
        });

        // Réinitialiser le formulaire
        handleReset();
    };

    /**
     * Réinitialisation du formulaire
     */
    const handleReset = () => {
        setTitre('');
        setDescription('');
        setContenu('');
        setAfficherSurPage(false);
        setEnvoyerParReseau(false);
        setErrors({});
    };

    /**
     * Gestion de la fermeture
     */
    const handleClose = () => {
        handleReset();
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                }
            }}
        >
            {/* En-tête */}
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                    Ajouter un message
                </Typography>
                <IconButton onClick={handleClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            {/* Contenu */}
            <DialogContent dividers>
                <Stack spacing={3}>
                    {/* Titre du message */}
                    <TextField
                        fullWidth
                        required
                        label="Titre du message"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        error={!!errors.titre}
                        helperText={errors.titre}
                        placeholder="Ex: Message de bienvenue"
                        sx={{
                            '& .MuiInputBase-root': {
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            },
                        }}
                    />

                    {/* Description (NB) */}
                    <TextField
                        fullWidth
                        label="NB - Note ou description (optionnel)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ex: Affiché lorsque le participant choisit de payer au guichet"
                        multiline
                        rows={2}
                        sx={{
                            '& .MuiInputBase-root': {
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            },
                        }}
                    />

                    {/* Contenu du message */}
                    <Box>
                        <FormLabel
                            required
                            sx={{
                                fontWeight: 600,
                                color: errors.contenu ? 'error.main' : 'text.primary',
                                mb: 1,
                                display: 'block',
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            }}
                        >
                            Contenu du message
                        </FormLabel>
                        <Box
                            sx={{
                                border: 1,
                                borderColor: errors.contenu ? 'error.main' : 'divider',
                                borderRadius: 1,
                                overflow: 'hidden',
                            }}
                        >
                            <Editor
                                fullItem={false}
                                value={contenu}
                                onChange={setContenu}
                                sx={{
                                    height: 200,
                                    '& .ql-container': {
                                        border: 'none',
                                    },
                                    '& .ql-toolbar': {
                                        borderBottom: 1,
                                        borderColor: 'divider',
                                    }
                                }}
                            />
                        </Box>
                        {errors.contenu && (
                            <Typography
                                variant="caption"
                                color="error"
                                sx={{ mt: 0.5, display: 'block', fontSize: { xs: '0.75rem', md: '0.8125rem' } }}
                            >
                                {errors.contenu}
                            </Typography>
                        )}
                    </Box>

                    {/* Options d'affichage et d'envoi */}
                    <FormControl component="fieldset">
                        <FormLabel
                            component="legend"
                            sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                mb: 1,
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            }}
                        >
                            Options du message
                        </FormLabel>

                        <Stack spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={afficherSurPage}
                                        onChange={(e) => setAfficherSurPage(e.target.checked)}
                                    />
                                }
                                label={
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontWeight: 500, fontSize: { xs: '0.875rem', md: '1rem' } }}
                                        >
                                            Afficher sur la page
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ fontSize: { xs: '0.75rem', md: '0.8125rem' } }}
                                        >
                                            Le message sera affiché sur une page de l'application
                                        </Typography>
                                    </Box>
                                }
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={envoyerParReseau}
                                        onChange={(e) => setEnvoyerParReseau(e.target.checked)}
                                    />
                                }
                                label={
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontWeight: 500, fontSize: { xs: '0.875rem', md: '1rem' } }}
                                        >
                                            Envoyer par réseau social
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ fontSize: { xs: '0.75rem', md: '0.8125rem' } }}
                                        >
                                            Activez les options d'envoi (WhatsApp, SMS, Email)
                                        </Typography>
                                    </Box>
                                }
                            />
                        </Stack>
                    </FormControl>
                </Stack>
            </DialogContent>

            {/* Actions */}
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    sx={{
                        textTransform: 'none',
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        fontWeight: 500,
                    }}
                >
                    Annuler
                </Button>
                <Button
                    onClick={handleAdd}
                    variant="contained"
                    sx={{
                        textTransform: 'none',
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        fontWeight: 600,
                        bgcolor: '#4CAF50',
                        '&:hover': {
                            bgcolor: '#45A049'
                        }
                    }}
                >
                    Ajouter le message
                </Button>
            </DialogActions>
        </Dialog>
    );
}