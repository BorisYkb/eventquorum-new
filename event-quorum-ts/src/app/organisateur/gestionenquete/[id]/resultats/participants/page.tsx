// File: src/app/organisateur/gestionenquetes/[id]/resultats/participants/page.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    Box,
    Typography,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import Loading from 'src/app/loading';

/**
 * Interface pour les données d'un participant
 */
interface ParticipantResult {
    nom_prenom: string;
    statut_participant: 'En ligne' | 'En présentiel' | 'Clôturé';
    reponse: string | string[];
    date: string;
}

/**
 * Interface pour les résultats d'une question
 */
interface QuestionParticipantsResult {
    questionNumber: number;
    question: string;
    typeQuestion: string;
    totalParticipants: number;
    totalReponses: number;
    participants: ParticipantResult[];
}

/**
 * Interface pour les données complètes de la page
 */
interface ParticipantsResultsData {
    enqueteTitre: string;
    activiteTitre: string;
    questions: QuestionParticipantsResult[];
}

/**
 * Données d'exemple selon votre maquette
 */
const sampleParticipantsData: ParticipantsResultsData = {
    enqueteTitre: "ENQUÊTE 1",
    activiteTitre: "ACTIVITÉ 1",
    questions: [
        {
            questionNumber: 1,
            question: "Les populations de la côte d'ivoire propose que établissement de la carte nationale d'identité soit gratuit. Qu'en pensez vous ??",
            typeQuestion: "Choix multiple",
            totalParticipants: 50,
            totalReponses: 50,
            participants: [
                {
                    nom_prenom: "Bouadou kouadou evarist",
                    statut_participant: "En ligne",
                    reponse: "Oui",
                    date: "10/05/2024 10:00"
                },
                {
                    nom_prenom: "Kouassi",
                    statut_participant: "En ligne",
                    reponse: "Oui",
                    date: "10/05/2024 10:00"
                },
                {
                    nom_prenom: "Ahirlé jean",
                    statut_participant: "En présentiel",
                    reponse: "Non",
                    date: "10/05/2024 10:00"
                },
                {
                    nom_prenom: "Kouassi",
                    statut_participant: "En ligne",
                    reponse: "Non",
                    date: "10/05/2024 10:00"
                },
                {
                    nom_prenom: "Ahirlé jean",
                    statut_participant: "En présentiel",
                    reponse: "Non",
                    date: "10/05/2024 10:00"
                },
                {
                    nom_prenom: "Ouattara",
                    statut_participant: "En ligne",
                    reponse: "Oui",
                    date: "10/05/2024 10:00"
                },
                {
                    nom_prenom: "Beni",
                    statut_participant: "En ligne",
                    reponse: "Oui",
                    date: "10/05/2024 10:00"
                }
            ]
        },
        {
            questionNumber: 2,
            question: "Quel est le principal avantage de la rotation des cultures ?",
            typeQuestion: "Clôturé à cocher",
            totalParticipants: 60,
            totalReponses: 60,
            participants: [
                {
                    nom_prenom: "Badra",
                    statut_participant: "En ligne",
                    reponse: "Réponse 1",
                    date: "10/05/2024 10:00"
                },
                {
                    nom_prenom: "Ali",
                    statut_participant: "En ligne",
                    reponse: "Réponse 2",
                    date: "10/05/2024 10:00"
                },
                {
                    nom_prenom: "Coulibaly Aubert",
                    statut_participant: "En présentiel",
                    reponse: "Réponse 2",
                    date: "10/05/2024 10:00"
                },
                {
                    nom_prenom: "Manadia Ahirlé jean",
                    statut_participant: "En présentiel",
                    reponse: ["Réponse 1", "Réponse 2", "Réponse 4"],
                    date: "10/05/2024 10:00"
                },
                {
                    nom_prenom: "Manadia ouattara ali",
                    statut_participant: "En présentiel",
                    reponse: "Réponse 4",
                    date: "10/05/2024 10:00"
                },
                {
                    nom_prenom: "Bouadou kouadou Evarist",
                    statut_participant: "En ligne",
                    reponse: ["Réponse 3", "Réponse 4"],
                    date: "10/05/2024 10:00"
                }
            ]
        }
    ]
};

/**
 * Composant pour afficher le statut du participant avec couleur
 */
const StatutChip: React.FC<{ statut: string }> = ({ statut }) => {
    const getStatutColor = (statut: string) => {
        switch (statut) {
            case 'En ligne':
                return { bgcolor: '#e8f5e8', color: '#2e7d32' };
            case 'En présentiel':
                return { bgcolor: '#fff3e0', color: '#f57c00' };
            case 'Clôturé':
                return { bgcolor: '#f3e5f5', color: '#7b1fa2' };
            default:
                return { bgcolor: '#f5f5f5', color: '#666' };
        }
    };

    const colors = getStatutColor(statut);

    return (
        <Chip
            label={statut}
            size="small"
            sx={{
                ...colors,
                fontWeight: 500,
                fontSize: '0.75rem',
                height: 24
            }}
        />
    );
};

/**
 * Composant pour afficher les réponses (simple ou multiple)
 */
const ReponseDisplay: React.FC<{ reponse: string | string[] }> = ({ reponse }) => {
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

    return (
        <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
            {reponse}
        </Typography>
    );
};

/**
 * Composant principal de la page des résultats des participants
 */
const ParticipantsResultsPage: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const enqueteId = params.id as string;

    // États
    const [data, setData] = useState<ParticipantsResultsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState('Toutes les questions');

    /**
     * Chargement des données
     */
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                // TODO: Remplacer par l'appel API réel
                await new Promise(resolve => setTimeout(resolve, 1000));
                setData(sampleParticipantsData);
            } catch (error) {
                console.error('Erreur lors du chargement:', error);
            } finally {
                setLoading(false);
            }
        };

        if (enqueteId) {
            loadData();
        }
    }, [enqueteId]);


    function capitalizeFirst(text: string) {
        if (!text) return '';
        const lower = text.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    /**
     * Gestionnaires d'événements
     */
    const handleBack = () => {
        router.push(`/organisateur/gestionenquete/${enqueteId}/resultats`);
    };

    const handleExport = () => {
        console.log('Export des résultats des participants');
        alert('Fonctionnalité d\'export en cours de développement');
    };

    const handleAfficher = () => {
        console.log('Afficher avec filtres:', { searchTerm, selectedQuestion });
        // Logique de filtrage ici
    };

    // Rendu conditionnel - Chargement
    if (loading) {
        return <Loading />;
    }

    // Rendu conditionnel - Erreur
    if (!data) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#fafafa'
            }}>
                <Typography variant="h6" color="error">
                    Impossible de charger les données
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            p: { xs: 2, sm: 3, md: 4 },
            backgroundColor: '#fafafa',
            minHeight: '100vh'
        }}>
            {/* En-tête avec titre et boutons */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                flexWrap: 'wrap',
                gap: 2
            }}>
                <Label
                    color="info"
                    variant="filled"
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1rem', md: '1.2rem' },
                        px: 1, // padding horizontal (gauche/droite)
                        py: 2, // padding vertical (haut/bas)
                        textTransform: 'none', // garde la casse d'origine
                        borderRadius: 0.5, // arrondir un peu plus si besoin
                    }}
                >
                    {capitalizeFirst(data.enqueteTitre)} • {capitalizeFirst(data.activiteTitre)}
                </Label>



                <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Button
                        variant="contained"
                        onClick={handleExport}
                        sx={{
                            bgcolor: '#000000',
                            color: 'white',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            px: 3,
                            py: 1,
                            borderRadius: '6px',
                            '&:hover': {
                                bgcolor: '#333333'
                            }
                        }}
                    >
                        Exporter
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={handleBack}
                        sx={{
                            bgcolor: 'white',
                            color: '#000000',
                            border: '1px solid #e0e0e0',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            px: 3,
                            py: 1,
                            borderRadius: '6px',
                            '&:hover': {
                                bgcolor: '#f5f5f5',
                                border: '1px solid #d0d0d0'
                            }
                        }}
                    >
                        Retour
                    </Button>
                </Box>
            </Box>

            {/* Barre de filtres - Section intégrée à la page */}
            <Box sx={{
                p: 3,
                mb: 3,
                backgroundColor: 'transparent' // Se confond avec la page principale
            }}>
                <Box sx={{
                    display: 'flex',
                    gap: { xs:2 , md: 3 , lg: 7 },
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    {/* Groupe Recherche avec titre */}
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
                            onChange={(e) => setSearchTerm(e.target.value)}
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

                    {/* Groupe Filtre avec titre */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body2" sx={{
                            color: '#666',
                            fontWeight: 500,
                            fontSize: '0.85rem'
                        }}>
                            Filtrer
                        </Typography>
                        <FormControl size="small" sx={{ minWidth: 190 }}>
                            <InputLabel>Sélectionner une activité</InputLabel>
                            <Select
                                value={selectedQuestion}
                                onChange={(e) => setSelectedQuestion(e.target.value)}
                                label="Sélectionner une activité"
                                sx={{
                                    borderRadius: '6px',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        // Le trait de bordure s'arrête automatiquement autour du label
                                    }
                                }}
                            >
                                <MenuItem value="Toutes les questions">Toutes les questions</MenuItem>
                                <MenuItem value="Question 1">Question 1</MenuItem>
                                <MenuItem value="Question 2">Question 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Box>

            {/* Tableaux des résultats par question */}
            {data.questions.map((question) => (
                <Card key={question.questionNumber} sx={{
                    mb: 3,
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                    {/* En-tête de la question */}
                    <Box sx={{
                        p: 3,
                        borderBottom: '1px solid #f0f0f0',
                        bgcolor: '#fafafa'
                    }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 700,
                            color: '#333',
                            mb: 1
                        }}>
                            Question {question.questionNumber}
                        </Typography>
                        <Typography variant="body1" sx={{
                            color: '#666',
                            mb: 2,
                            lineHeight: 1.5
                        }}>
                            {question.question}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 3 }}>
                            <Typography variant="body2" sx={{
                                color: '#1976d2',
                                fontWeight: 600
                            }}>
                                {question.totalParticipants} participants / {question.totalReponses} réponses
                            </Typography>
                            <Typography variant="body2" sx={{
                                color: '#666',
                                fontWeight: 500
                            }}>
                                {question.typeQuestion}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Tableau des participants */}
                    <TableContainer>
                        <Table>
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
                            <TableBody>
                                {question.participants.map((participant, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            '&:hover': { bgcolor: '#f8f9fa' },
                                            borderBottom: '1px solid #f0f0f0'
                                        }}
                                    >
                                        <TableCell sx={{ py: 2 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {participant.nom_prenom}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 2 }}>
                                            {/* <StatutChip statut={participant.statut_participant} /> */}
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
                                        <TableCell sx={{ py: 2 }}>
                                            <ReponseDisplay reponse={participant.reponse} />
                                        </TableCell>
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
                </Card>
            ))}
        </Box>
    );
};

export default ParticipantsResultsPage;