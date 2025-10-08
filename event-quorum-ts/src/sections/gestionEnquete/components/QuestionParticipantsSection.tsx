// File: src/sections/gestionEnquete/components/QuestionParticipantsSection.tsx

'use client'

import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import type { ParticipantResult } from 'src/sections/gestionEnquete/types/resultTypes';

interface QuestionParticipantsSectionProps {
    participants: ParticipantResult[];
    expanded: boolean;
    onToggle: () => void;
}

/**
 * Composant pour afficher une réponse (simple ou multiple)
 */
const ReponseDisplay: React.FC<{ reponse: string | string[] }> = ({ reponse }) => {
    // Si la réponse est un tableau (réponses multiples)
    if (Array.isArray(reponse)) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {reponse.map((r, index) => (
                    <Typography key={index} variant="body2" sx={{ fontSize: '0.85rem' }}>
                        {r}
                    </Typography>
                ))}
            </Box>
        );
    }

    // Réponse simple
    return (
        <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
            {reponse}
        </Typography>
    );
};

/**
 * Composant Section 3 : Résultats par participant (Accordion)
 * Affiche un tableau des participants avec filtres et pagination
 */
const QuestionParticipantsSection: React.FC<QuestionParticipantsSectionProps> = ({
    participants,
    expanded,
    onToggle
}) => {
    // États pour le filtrage et la pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [statutFilter, setStatutFilter] = useState('Tous');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    /**
     * Filtrage des participants selon les critères de recherche et de statut
     */
    const filteredParticipants = participants.filter(participant => {
        // Filtre par nom (insensible à la casse)
        const matchesSearch = participant.nom_prenom.toLowerCase().includes(searchTerm.toLowerCase());
        // Filtre par statut
        const matchesStatut = statutFilter === 'Tous' || participant.statut_participant === statutFilter;
        return matchesSearch && matchesStatut;
    });

    /**
     * Gestionnaire de changement de page
     */
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    /**
     * Gestionnaire de changement du nombre de lignes par page
     */
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset à la première page
    };

    return (
        <Accordion
            expanded={expanded}
            onChange={onToggle}
            sx={{
                borderRadius: '12px !important',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #f0f0f0',
                '&:before': { display: 'none' }
            }}
        >
            {/* En-tête de l'accordion */}
            <AccordionSummary
                expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                sx={{
                    bgcolor: '#fafafa',
                    borderRadius: '12px',
                    '&.Mui-expanded': {
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0
                    }
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                    Résultats par participant
                </Typography>
            </AccordionSummary>

            {/* Contenu de l'accordion */}
            <AccordionDetails sx={{ p: 3 }}>
                {/* Barre de filtres */}
                <Box sx={{
                    display: 'flex',
                    gap: { xs: 2, md: 3, lg: 7 },
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    mb: 3
                }}>
                    {/* Groupe Recherche */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body2" sx={{
                            color: '#666',
                            fontWeight: 500,
                            fontSize: '0.85rem'
                        }}>
                            Recherche
                        </Typography>
                        <TextField
                            placeholder="Recherche..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(0); // Reset à la première page lors de la recherche
                            }}
                            size="small"
                            sx={{
                                minWidth: 200,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '6px'
                                }
                            }}
                            InputProps={{
                                startAdornment: <Iconify icon="eva:search-fill" sx={{ mr: 1, color: '#666' }} />
                            }}
                        />
                    </Box>

                    {/* Groupe Filtre par statut */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body2" sx={{
                            color: '#666',
                            fontWeight: 500,
                            fontSize: '0.85rem'
                        }}>
                            Filtrer par statut
                        </Typography>
                        <FormControl size="small" sx={{ minWidth: 190 }}>
                            <InputLabel>Statut participant</InputLabel>
                            <Select
                                value={statutFilter}
                                onChange={(e) => {
                                    setStatutFilter(e.target.value);
                                    setPage(0); // Reset à la première page lors du filtrage
                                }}
                                label="Statut participant"
                                sx={{ borderRadius: '6px' }}
                            >
                                <MenuItem value="Tous">Tous</MenuItem>
                                <MenuItem value="En ligne">En ligne</MenuItem>
                                <MenuItem value="En présentiel">En présentiel</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                {/* Tableau des participants */}
                <Card sx={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                    <TableContainer>
                        <Table>
                            {/* En-tête du tableau */}
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                                    <TableCell sx={{ fontWeight: 600, color: '#333' }}>
                                        Nom_prenom
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#333' }}>
                                        Statut participant
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#333' }}>
                                        Réponse
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#333' }}>
                                        Date
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            {/* Corps du tableau */}
                            <TableBody>
                                {filteredParticipants
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((participant, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                '&:hover': { bgcolor: '#f8f9fa' },
                                                borderBottom: '1px solid #f0f0f0'
                                            }}
                                        >
                                            {/* Nom du participant */}
                                            <TableCell sx={{ py: 2 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {participant.nom_prenom}
                                                </Typography>
                                            </TableCell>

                                            {/* Statut du participant avec Label coloré */}
                                            <TableCell sx={{ py: 2 }}>
                                                <Label
                                                    color={
                                                        participant.statut_participant === 'En présentiel'
                                                            ? 'warning'
                                                            : participant.statut_participant === 'En ligne'
                                                                ? 'success'
                                                                : 'default'
                                                    }
                                                    variant="soft"
                                                >
                                                    {participant.statut_participant}
                                                </Label>
                                            </TableCell>

                                            {/* Réponse du participant */}
                                            <TableCell sx={{ py: 2 }}>
                                                <ReponseDisplay reponse={participant.reponse} />
                                            </TableCell>

                                            {/* Date de réponse */}
                                            <TableCell sx={{ py: 2 }}>
                                                <Typography variant="body2" sx={{ color: '#666' }}>
                                                    {participant.date}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredParticipants.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Lignes par page:"
                        labelDisplayedRows={({ from, to, count }) =>
                            `${from}-${to} sur ${count !== -1 ? count : `plus de ${to}`}`
                        }
                        sx={{
                            borderTop: '1px solid #e0e0e0',
                            '& .MuiTablePagination-toolbar': {
                                minHeight: '50px'
                            }
                        }}
                    />
                </Card>
            </AccordionDetails>
        </Accordion>
    );
};

export default QuestionParticipantsSection;