// src/sections/superviseur/participants/SuperviseurParticipantRow.tsx

'use client';

import {
    TableRow,
    TableCell,
    Checkbox,
    Stack,
    Avatar,
    Typography,
    IconButton,
    Tooltip,
    Box,
    Chip,
} from '@mui/material';
import {
    Visibility as ViewIcon,
    Circle as CircleIcon,
    CheckBox as CheckBoxIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    Block as BlockIcon,
} from '@mui/icons-material';
import { Label } from 'src/components/label';

import type { SuperviseurParticipant } from './types';

/**
 * Props du composant SuperviseurParticipantRow
 */
type SuperviseurParticipantRowProps = {
    /** Données du participant */
    participant: SuperviseurParticipant;
    /** Indique si la ligne est sélectionnée */
    selected: boolean;
    /** Callback pour sélectionner/désélectionner la ligne */
    onSelect: () => void;
    /** Callback pour voir les détails du participant */
    onView: (id: number) => void;
    /** Indique si la colonne checking doit être affichée */
    showCheckingColumn?: boolean;
};

/**
 * Composant SuperviseurParticipantRow (Lecture seule)
 * Représente une ligne du tableau des participants pour le superviseur
 */
const SuperviseurParticipantRow = ({
    participant,
    selected,
    onSelect,
    onView,
    showCheckingColumn = false,
}: SuperviseurParticipantRowProps) => {
    /**
     * Gère la redirection vers la page de détails
     */
    const handleView = () => {
        onView(participant.id);
    };

    /**
     * Détermine l'icône de checking à afficher
     */
    const renderCheckingIcon = () => {
        // Si participant en ligne : icône "non applicable"
        if (participant.typeConnexion === 'en ligne') {
            return (
                <Tooltip title="Non applicable (participant en ligne)" arrow>
                    <BlockIcon
                        sx={{
                            fontSize: 24,
                            color: 'error.main',
                        }}
                    />
                </Tooltip>
            );
        }

        // Si participant en présentiel mais n'a pas émargé
        if (!participant.emargement) {
            return (
                <Tooltip title="Non émargé - Pas encore dans la salle" arrow>
                    <CheckBoxOutlineBlankIcon
                        sx={{
                            fontSize: 24,
                            color: 'grey.400',
                        }}
                    />
                </Tooltip>
            );
        }

        // Si participant en présentiel, a émargé et a fait le checking
        if (participant.checking) {
            return (
                <Tooltip title="Présent dans la salle (confirmé)" arrow>
                    <CheckBoxIcon
                        sx={{
                            fontSize: 24,
                            color: 'success.main',
                        }}
                    />
                </Tooltip>
            );
        }

        // Si participant en présentiel, a émargé mais n'a pas fait le checking
        return (
            <Tooltip title="Émargé mais pas encore dans la salle" arrow>
                <CheckBoxOutlineBlankIcon
                    sx={{
                        fontSize: 24,
                        color: 'grey.400',
                    }}
                />
            </Tooltip>
        );
    };

    return (
        <TableRow selected={selected} hover>
            {/* Case à cocher pour la sélection */}
            <TableCell padding="checkbox">
                <Checkbox checked={selected} onChange={onSelect} />
            </TableCell>

            {/* Nom & Prénoms avec avatar */}
            <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ width: 32, height: 32 }}>
                        {participant.prenom.charAt(0)}
                    </Avatar>
                    <Typography variant="subtitle2">
                        {participant.nom} {participant.prenom}
                    </Typography>
                </Stack>
            </TableCell>

            {/* Téléphone */}
            <TableCell>{participant.telephone}</TableCell>

            {/* Email */}
            <TableCell>{participant.email}</TableCell>

            {/* Participation (Type de participation) */}
            <TableCell>
                <Label
                    variant="soft"
                    color={participant.typeConnexion === 'en ligne' ? 'success' : 'warning'}
                    sx={{
                        fontWeight: 700,
                        textTransform: 'capitalize',
                    }}
                >
                    {participant.typeConnexion}
                </Label>

            </TableCell>

            {/* 1ère Connexion (indicateur visuel) */}
            <TableCell>
                <Tooltip
                    title={
                        participant.connecte
                            ? '1ère connexion effectuée'
                            : '1ère connexion non effectuée'
                    }
                    arrow
                >
                    <CircleIcon
                        sx={{
                            fontSize: 12,
                            color: participant.connecte ? 'success.main' : 'error.main',
                        }}
                    />
                </Tooltip>
            </TableCell>

            {/* Émargement (signature) */}
            <TableCell>
                {participant.emargement ? (
                    <Box
                        sx={{
                            width: 80,
                            height: 40,
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'grey.50',
                        }}
                    >
                        <img
                            src={participant.emargement}
                            alt="Signature"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                ) : (
                    <Typography variant="body2" color="text.disabled" fontStyle="italic">
                        Non signé
                    </Typography>
                )}
            </TableCell>

            {/* Checking (visible uniquement si showCheckingColumn est true) */}
            {showCheckingColumn && (
                <TableCell align="center">
                    {renderCheckingIcon()}
                </TableCell>
            )}

            {/* Actions - Seulement le bouton Voir pour le superviseur */}
            <TableCell>
                <Tooltip title="Voir les détails" arrow>
                    <IconButton
                        size="small"
                        onClick={handleView}
                        sx={{ color: '#374151' }}
                    >
                        <ViewIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};

export default SuperviseurParticipantRow;