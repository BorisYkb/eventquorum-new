// src/sections/gestionEvent/eventpasse/EventPasse.tsx
'use client';

import React, { useState } from 'react';
import { FormProvider } from 'react-hook-form';

import {
    InputLabel,
    Select,
    Typography,
    Box,
    Button,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Avatar,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Upload } from 'src/components/upload';
import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

import { useEventPasseController } from './controller';
import { EVENEMENTS_REALISES_DISPONIBLES } from './types';

/**
 * Composant principal pour la gestion des événements passés
 * Permet de sélectionner des événements réalisés et de créer des événements non réalisés
 * pour affichage sur la landing page
 */
export default function EventPasse() {
    const {
        methods,
        selectedRealisesIds,
        evenementsRealisesAffiches,
        handleRealisesSelectionChange,
        handleEnregistrerRealises,
        handleDeleteRealise,
        evenementsNonRealises,
        files,
        editingIndex,
        handleDropMultiFile,
        handleRemoveFile,
        handleRemoveAllFiles,
        onSubmitNonRealise,
        handleEditNonRealise,
        handleDeleteNonRealise,
        formatPeriode,
    } = useEventPasseController();

    // États pour gérer l'expansion des accordéons
    const [expandedRealises, setExpandedRealises] = useState(false);
    const [expandedNonRealises, setExpandedNonRealises] = useState(false);

    return (
        <Box sx={{ mb: 5, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper', p: 2 }}>
            {/* ============================================ */}
            {/* ACCORDION 1 - ÉVÉNEMENTS PASSÉS RÉALISÉS */}
            {/* ============================================ */}
            <Accordion
                expanded={expandedRealises}
                onChange={(e, isExpanded) => setExpandedRealises(isExpanded)}
                sx={{
                    mb: 2,
                    '&:before': {
                        display: 'none',
                    },
                    boxShadow: 'none',
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                        '& .MuiAccordionSummary-content': {
                            margin: '12px 0',
                        }
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        Événements Passés Réalisés
                    </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ pt: 0 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                            Sélectionnez les événements déjà réalisés que vous souhaitez afficher sur la landing page.
                        </Typography>

                        {/* Liste déroulante de sélection */}
                        <Box sx={{ mb: 3 }}>
                            <InputLabel sx={{ mb: 1, fontWeight: 500 }}>
                                Sélectionnez un ou plusieurs événements réalisés
                            </InputLabel>
                            <Select
                                multiple
                                value={selectedRealisesIds}
                                onChange={handleRealisesSelectionChange}
                                displayEmpty
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <em style={{ color: '#999' }}>Aucun événement sélectionné</em>;
                                    }
                                    return (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((id) => {
                                                const event = EVENEMENTS_REALISES_DISPONIBLES.find(e => e.id === id);
                                                return (
                                                    <Chip
                                                        key={id}
                                                        label={event?.nom}
                                                        size="small"
                                                        sx={{ bgcolor: 'black' }}
                                                    />
                                                );
                                            })}
                                        </Box>
                                    );
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 300,
                                            overflowY: 'auto',
                                        },
                                    },
                                }}
                                fullWidth
                                sx={{ bgcolor: 'background.neutral' }}
                            >
                                {EVENEMENTS_REALISES_DISPONIBLES.map((event) => (
                                    <MenuItem key={event.id} value={event.id}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar src={event.logo} alt={event.nom} sx={{ width: 32, height: 32 }} />
                                            <Box>
                                                <Typography variant="subtitle2">{event.nom}</Typography>
                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                    {formatPeriode(event.dateDebut, event.dateFin)} • {event.lieu}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>

                        {/* Boutons d'action */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleEnregistrerRealises}
                                disabled={selectedRealisesIds.length === 0}
                                startIcon={<Iconify icon="solar:check-circle-bold" />}
                            >
                                Enregistrer ({selectedRealisesIds.length})
                            </Button>
                        </Box>

                        {/* Tableau des événements réalisés affichés */}
                        {evenementsRealisesAffiches.length > 0 && (
                            <Box sx={{ mt: 4 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 2,
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    Liste des événements passés réalisés affichés sur la landing page
                                    <Chip label={evenementsRealisesAffiches.length} size="small" color="primary" />
                                </Typography>

                                <TableContainer component={Paper} variant="outlined">
                                    <Table>
                                        <TableHead>
                                            <TableRow sx={{ bgcolor: '#f3f4f6' }}>
                                                <TableCell sx={{ fontWeight: 600, color: '#374151', width: 80 }}>Logo</TableCell>
                                                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Nom</TableCell>
                                                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Description</TableCell>
                                                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Période</TableCell>
                                                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Lieu</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 600, color: '#374151', width: 80 }}>
                                                    Actions
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {evenementsRealisesAffiches.map((event) => (
                                                <TableRow key={event.id} hover sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                                                    <TableCell>
                                                        <Avatar src={event.logo} alt={event.nom} sx={{ width: 50, height: 50 }} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                            {event.nom}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: 'vertical',
                                                                color: 'text.secondary',
                                                            }}
                                                        >
                                                            {event.description}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2">
                                                            {formatPeriode(event.dateDebut, event.dateFin)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2">{event.lieu}</Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleDeleteRealise(event.id)}
                                                            sx={{ color: 'error.main' }}
                                                        >
                                                            <Iconify icon="solar:trash-bin-trash-bold" width={18} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        )}
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* ============================================ */}
            {/* ACCORDION 2 - ÉVÉNEMENTS PASSÉS NON RÉALISÉS */}
            {/* ============================================ */}
            <FormProvider {...methods}>
                <Accordion
                    expanded={expandedNonRealises}
                    onChange={(e, isExpanded) => setExpandedNonRealises(isExpanded)}
                    sx={{
                        '&:before': {
                            display: 'none',
                        },
                        boxShadow: 'none',
                        border: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                            '& .MuiAccordionSummary-content': {
                                margin: '12px 0',
                            }
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            Événements Passés Non Réalisés
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={{ pt: 0 }}>
                        <Box
                            id="section-non-realises"
                            component="form"
                            onSubmit={onSubmitNonRealise}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                                Créez un nouvel événement passé (non encore réalisé dans le système) pour l'afficher sur la landing page.
                            </Typography>

                            {/* Informations de l'événement */}
                            <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Box sx={{ flex: '1 1 300px' }}>
                                    <Field.Text name="nom" label="Nom de l'événement *" fullWidth />
                                </Box>
                                <Box sx={{ flex: '1 1 200px' }}>
                                    <Field.Text name="dateDebut" label="Date de début *" type="date" fullWidth InputLabelProps={{ shrink: true }} />
                                </Box>
                                <Box sx={{ flex: '1 1 200px' }}>
                                    <Field.Text name="dateFin" label="Date de fin *" type="date" fullWidth InputLabelProps={{ shrink: true }} />
                                </Box>
                                <Box sx={{ flex: '1 1 300px' }}>
                                    <Field.Text name="lieu" label="Lieu de l'événement *" fullWidth />
                                </Box>
                            </Box>

                            {/* Description */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                                    Description de l'événement
                                </Typography>
                                <Field.Editor name="description" placeholder="Décrivez brièvement l'événement..." />
                            </Box>

                            {/* Upload d'images */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                                    Images de l'événement * <span style={{ color: '#999', fontSize: '0.875rem' }}>(La première image sera utilisée comme logo)</span>
                                </Typography>
                                <Upload
                                    multiple
                                    thumbnail
                                    value={files}
                                    onDrop={handleDropMultiFile}
                                    onRemove={handleRemoveFile}
                                    onRemoveAll={handleRemoveAllFiles}
                                    onUpload={() => console.info('ON UPLOAD')}
                                />
                            </Box>

                            {/* Boutons d'action */}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    color="warning"
                                    type="submit"
                                    startIcon={<Iconify icon={editingIndex !== null ? 'solar:pen-bold' : 'solar:add-circle-bold'} />}
                                >
                                    {editingIndex !== null ? 'Mettre à jour' : 'Ajouter'}
                                </Button>
                            </Box>

                            {/* Tableau des événements non réalisés */}
                            {evenementsNonRealises.length > 0 && (
                                <Box sx={{ mt: 4 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mb: 2,
                                            fontWeight: 600,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Iconify icon="solar:list-bold" width={24} />
                                        Liste des événements passés non réalisés affichés sur la landing page
                                        <Chip label={evenementsNonRealises.length} size="small" color="warning" />
                                    </Typography>

                                    <TableContainer component={Paper} variant="outlined">
                                        <Table>
                                            <TableHead>
                                                <TableRow sx={{ bgcolor: '#f3f4f6' }}>
                                                    <TableCell sx={{ fontWeight: 600, color: '#374151', width: 80 }}>Logo</TableCell>
                                                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Nom</TableCell>
                                                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Description</TableCell>
                                                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Période</TableCell>
                                                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Lieu</TableCell>
                                                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Images</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 600, color: '#374151', width: 100 }}>
                                                        Actions
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {evenementsNonRealises.map((event, index) => (
                                                    <TableRow key={event.id} hover sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                                                        <TableCell>
                                                            <Avatar src={event.logo} alt={event.nom} sx={{ width: 50, height: 50 }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                                {event.nom}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography
                                                                variant="body2"
                                                                dangerouslySetInnerHTML={{ __html: event.description }}
                                                                sx={{
                                                                    '& p': { margin: 0 },
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    display: '-webkit-box',
                                                                    WebkitLineClamp: 2,
                                                                    WebkitBoxOrient: 'vertical',
                                                                    color: 'text.secondary',
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2">
                                                                {formatPeriode(event.dateDebut, event.dateFin)}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2">{event.lieu}</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip label={`${event.images.length} image(s)`} size="small" color="info" />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleEditNonRealise(index)}
                                                                sx={{ color: 'warning.main', mr: 1 }}
                                                            >
                                                                <Iconify icon="solar:pen-bold" width={18} />
                                                            </IconButton>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleDeleteNonRealise(index)}
                                                                sx={{ color: 'error.main' }}
                                                            >
                                                                <Iconify icon="solar:trash-bin-trash-bold" width={18} />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            )}
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </FormProvider>
        </Box>
    );
}