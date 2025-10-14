// File: src/sections/gestionEnquete/components/EnqueteTableRow.tsx

'use client'

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';

/**
 * Interface pour une enquête
 */
export interface Enquete {
    id: number;
    titre: string;
    activite: string | string[]; // ✅ Supporte string ou string[]
    code: string;
    nombreParticipants: number;
    statut: 'Terminé' | 'En cours' | 'Non démarré';
    typeEnquete?: 'live' | 'asynchrone';
    enqueteAnonymat?: boolean;
    authentificationNumerique?: boolean;
    createdAt: string;
}

interface EnqueteTableRowProps {
    enquete: Enquete;
    isSelected: boolean;
    onSelect: (event: React.MouseEvent<unknown>, id: number) => void;
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (enquete: Enquete) => void;
}

/**
 * Composant pour une ligne du tableau des enquêtes
 * Gère l'affichage d'une enquête avec ses actions
 */
const EnqueteTableRow: React.FC<EnqueteTableRowProps> = ({
    enquete,
    isSelected,
    onSelect,
    onView,
    onEdit,
    onDelete
}) => {
    /**
     * Formatage des nombres avec séparateurs de milliers
     */
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('fr-FR').format(num);
    };

    /**
     * Détermine la couleur du label de statut
     */
    const getStatutColor = (statut: string): 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' => {
        switch (statut) {
            case 'Terminé':
                return 'success';
            case 'En cours':
                return 'warning';
            case 'Non démarré':
                return 'error';
            default:
                return 'default';
        }
    };

    /**
     * ✅ Rendu de la colonne Activité
     * Affiche les activités les unes sous les autres si plusieurs
     */
    const renderActivites = () => {
        // Normalise en tableau
        const activites = Array.isArray(enquete.activite) ? enquete.activite : [enquete.activite];

        // Si une seule activité, affichage simple
        if (activites.length === 1) {
            return (
                <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                    {activites[0]}
                </Typography>
            );
        }

        // Si plusieurs activités, affichage sur plusieurs lignes
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {activites.map((activite, index) => (
                    <Typography
                        key={index}
                        variant="body2"
                        sx={{
                            fontSize: '13px',
                            color: '#374151',
                            lineHeight: 1.4
                        }}
                    >
                        • {activite}
                    </Typography>
                ))}
            </Box>
        );
    };

    return (
        <TableRow
            hover
            onClick={(event) => onSelect(event, enquete.id)}
            role="checkbox"
            aria-checked={isSelected}
            selected={isSelected}
            sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#F8F9FA' } }}
        >
            {/* Checkbox de sélection */}
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={isSelected}
                />
            </TableCell>

            {/* Titre de l'enquête */}
            <TableCell sx={{ py: 2 }}>
                <Typography variant="body2" sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#374151'
                }}>
                    {enquete.titre}
                </Typography>
            </TableCell>

            {/* ✅ Activité(s) - Affichage adaptatif */}
            <TableCell sx={{ py: 2 }}>
                {renderActivites()}
            </TableCell>

            {/* Code de l'enquête */}
            <TableCell sx={{ py: 2 }}>
                <Typography variant="body2" sx={{
                    fontSize: '14px',
                    // color: '#1976D2',
                    fontWeight: 500,
                    fontFamily: 'monospace'
                }}>
                    {enquete.code}
                </Typography>
            </TableCell>

            {/* Nombre de participants */}
            <TableCell sx={{ py: 2 }}>
                <Typography variant="body2" sx={{
                    fontSize: '14px',
                    color: '#374151',
                    fontWeight: 600
                }}>
                    {formatNumber(enquete.nombreParticipants)}
                </Typography>
            </TableCell>

            {/* Statut */}
            <TableCell sx={{ py: 2 }}>
                <Label
                    variant="soft"
                    color={getStatutColor(enquete.statut)}
                >
                    {enquete.statut}
                </Label>
            </TableCell>

            {/* Actions */}
            <TableCell align="center" sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    {/* Bouton Voir */}
                    <Tooltip title="Voir détails" placement="top" arrow>
                        <IconButton
                            color="info"
                            onClick={(e) => {
                                e.stopPropagation();
                                onView(enquete.id);
                            }}
                            size="small"
                            sx={{
                                width: 32,
                                height: 32,
                                '&:hover': {
                                    bgcolor: 'rgba(33, 150, 243, 0.08)'
                                }
                            }}
                        >
                            <Iconify icon="solar:eye-bold" width={16} />
                        </IconButton>
                    </Tooltip>

                    {/* Bouton Modifier */}
                    <Tooltip title="Modifier" placement="top" arrow>
                        <IconButton
                            color="warning"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(enquete.id);
                            }}
                            size="small"
                            sx={{
                                width: 32,
                                height: 32,
                                '&:hover': {
                                    bgcolor: 'rgba(255, 152, 0, 0.08)'
                                }
                            }}
                        >
                            <Iconify icon="solar:pen-new-square-linear" width={16} />
                        </IconButton>
                    </Tooltip>

                    {/* Bouton Supprimer */}
                    <Tooltip title="Supprimer" placement="top" arrow>
                        <IconButton
                            color="error"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(enquete);
                            }}
                            size="small"
                            sx={{
                                width: 32,
                                height: 32,
                                '&:hover': {
                                    bgcolor: 'rgba(244, 67, 54, 0.08)'
                                }
                            }}
                        >
                            <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default EnqueteTableRow;