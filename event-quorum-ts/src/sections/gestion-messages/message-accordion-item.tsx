// src/sections/gestion-message/message-accordion-item.tsx

'use client';

import { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Stack,
    Box,
    FormControl,
    FormLabel,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Button,
    Paper,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import { Editor } from 'src/components/editor';

// ----------------------------------------------------------------------

/**
 * Interface pour les modes d'envoi
 */
export interface ModeEnvoi {
    whatsapp: boolean;
    sms: boolean;
    mail: boolean;
}

/**
 * Interface pour un message
 */
export interface Message {
    id: string;
    titre: string;
    description?: string;
    contenu: string;
    modesEnvoi: ModeEnvoi;
    estPublie: boolean;
    afficherSurPage: boolean;
    envoyerParReseau: boolean;
}

/**
 * Props du composant
 */
interface MessageAccordionItemProps {
    message: Message;
    expanded: boolean;
    onExpand: (messageId: string, isExpanded: boolean) => void;
    onContentChange: (messageId: string, content: string) => void;
    onModeEnvoiChange: (messageId: string, mode: keyof ModeEnvoi, checked: boolean) => void;
    onPublicationChange: (messageId: string, checked: boolean) => void;
    onSave: (messageId: string) => void;
}

/**
 * Composant pour un item de message dans la liste
 * Gère l'affichage et l'édition d'un message avec publication
 */
export function MessageAccordionItem({
    message,
    expanded,
    onExpand,
    onContentChange,
    onModeEnvoiChange,
    onPublicationChange,
    onSave,
}: MessageAccordionItemProps) {
    /**
     * Gestion de l'expansion de l'accordéon
     */
    const handleAccordionChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
        onExpand(message.id, isExpanded);
    };

    /**
     * Gestion du changement de checkbox de publication
     * On empêche la propagation pour ne pas ouvrir/fermer l'accordéon
     */
    const handlePublicationClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const handlePublicationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onPublicationChange(message.id, event.target.checked);
    };

    /**
     * Gestion du changement de mode d'envoi
     */
    const handleModeEnvoiChange = (mode: keyof ModeEnvoi) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        onModeEnvoiChange(message.id, mode, event.target.checked);
    };

    /**
     * Gestion de la sauvegarde
     */
    const handleSave = () => {
        onSave(message.id);
    };

    /**
     * Détermine si les réseaux sociaux doivent être désactivés
     * Ils sont désactivés si envoyerParReseau est false
     */
    const reseauxDisabled = !message.envoyerParReseau;

    return (
        <Accordion
            expanded={expanded}
            onChange={handleAccordionChange}
            sx={{
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                '&:before': {
                    display: 'none',
                },
                '&.Mui-expanded': {
                    margin: 0,
                },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    backgroundColor: expanded ? 'grey.50' : 'white',
                    borderRadius: 1,
                    '&.Mui-expanded': {
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        width: '100%',
                        pr: 2,
                    }}
                >
                    {/* Checkbox de publication */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={message.estPublie}
                                onChange={handlePublicationChange}
                                onClick={handlePublicationClick}
                                sx={{
                                    '&.Mui-checked': {
                                        color: '#4CAF50',
                                    }
                                }}
                            />
                        }
                        label=""
                        sx={{ m: 0 }}
                    />

                    {/* Titre du message */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            flex: 1,
                            fontSize: { xs: '1rem', md: '1rem' },
                        }}
                    >
                        {message.titre}
                    </Typography>

                    {/* Indicateur de statut */}
                    {/* {message.estPublie && (
                        <Box
                            sx={{
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 1,
                                bgcolor: '#4CAF50',
                                color: 'white',
                                fontSize: { xs: '0.7rem', md: '0.75rem' },
                                fontWeight: 600,
                            }}
                        >
                            Publié
                        </Box>
                    )} */}
                </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ p: { xs: 2, md: 3 }, backgroundColor: 'grey.50' }}>
                <Stack spacing={3}>
                    {/* Mode d'envoi avec checkboxes */}
                    <Box>
                        <FormControl component="fieldset" fullWidth>
                            <FormLabel
                                component="legend"
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    mb: 1,
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                }}
                            >
                                Mode d'envoi
                            </FormLabel>

                            <FormGroup
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    gap: 2,
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={message.modesEnvoi.whatsapp}
                                            onChange={handleModeEnvoiChange('whatsapp')}
                                            disabled={reseauxDisabled}
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                                        >
                                            WhatsApp
                                        </Typography>
                                    }
                                    sx={{
                                        opacity: reseauxDisabled ? 0.5 : 1,
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={message.modesEnvoi.sms}
                                            onChange={handleModeEnvoiChange('sms')}
                                            disabled={reseauxDisabled}
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                                        >
                                            SMS
                                        </Typography>
                                    }
                                    sx={{
                                        opacity: reseauxDisabled ? 0.5 : 1,
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={message.modesEnvoi.mail}
                                            onChange={handleModeEnvoiChange('mail')}
                                            disabled={reseauxDisabled}
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                                        >
                                            Email
                                        </Typography>
                                    }
                                    sx={{
                                        opacity: reseauxDisabled ? 0.5 : 1,
                                    }}
                                />
                            </FormGroup>
                        </FormControl>
                    </Box>

                    {/* Description du message */}
                    {message.description && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                fontStyle: 'italic',
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            }}
                        >
                            NB : {message.description}
                        </Typography>
                    )}

                    {/* Contenu du message */}
                    <Box>
                        <Typography
                            variant="body1"
                            sx={{
                                mb: 2,
                                fontWeight: 500,
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            }}
                        >
                            Contenu du message
                        </Typography>

                        <Paper
                            variant="outlined"
                            sx={{
                                borderRadius: 1,
                                overflow: 'hidden',
                            }}
                        >
                            <Editor
                                fullItem={false}
                                value={message.contenu}
                                onChange={(value) => onContentChange(message.id, value)}
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
                        </Paper>
                    </Box>

                    {/* Bouton de sauvegarde individuel */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            sx={{
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                '&:hover': { backgroundColor: '#45A049' },
                                borderRadius: 1,
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: { xs: '0.875rem', md: '1rem' },
                                px: 3,
                            }}
                        >
                            Enregistrer
                        </Button>
                    </Box>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}