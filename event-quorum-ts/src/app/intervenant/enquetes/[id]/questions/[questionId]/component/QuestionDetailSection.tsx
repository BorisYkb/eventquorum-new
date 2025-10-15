// File: src/sections/gestionEnquete/components/QuestionDetailSection.tsx

'use client'

import React from 'react';

import { Box, Card, Typography, Chip, Divider } from '@mui/material';

import { Question } from 'src/app/organisateur/gestionenquete/nouveau/types';

import { Iconify } from 'src/components/iconify';

interface QuestionDetailSectionProps {
    question: Question;
}

/**
 * Fonction utilitaire pour obtenir le label d'un type de question
 */
const getTypeQuestionLabel = (type: string) => {
    const typeQuestions = [
        { value: 'liste_deroulante', label: 'Liste déroulante' },
        { value: 'case_a_cocher', label: 'Case à cocher' },
        { value: 'question_libre', label: 'Question libre' },
        { value: 'echelle_lineaire', label: 'Échelle linéaire' },
        { value: 'choix_multiple', label: 'Choix multiple' }
    ];
    return typeQuestions.find(t => t.value === type)?.label || type;
};

/**
 * Composant Section 1 : Détail de la question
 * Affiche toutes les informations détaillées d'une question selon son type
 */
const QuestionDetailSection: React.FC<QuestionDetailSectionProps> = ({ question }) => {

    /**
     * Détermine la couleur du chip selon le type de question
     */
    const getTypeColor = (type: string): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'info' => {
        switch (type) {
            case 'choix_multiple': return 'primary';
            case 'liste_deroulante': return 'secondary';
            case 'echelle_lineaire': return 'success';
            case 'question_libre': return 'warning';
            case 'case_a_cocher': return 'info';
            default: return 'default';
        }
    };

    /**
     * Formate l'affichage des points
     */
    const formatPoints = (points: number) => points === 1 ? `${points} point` : `${points} points`;

    /**
     * Rendu du contenu spécifique selon le type de question
     */
    const renderQuestionTypeContent = () => {
        switch (question.type) {
            // Question libre - Affichage simple
            case 'question_libre':
                return (
                    <Box sx={{
                        p: 3,
                        bgcolor: '#f8f9fa',
                        borderRadius: '8px',
                        border: '1px dashed #ddd',
                        textAlign: 'center'
                    }}>
                        <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
                            Question libre - Les participants peuvent saisir leur réponse librement
                        </Typography>
                    </Box>
                );

            // Échelle linéaire - Affichage de l'échelle avec configuration
            case 'echelle_lineaire':
                return (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 5,
                        mb: 2
                    }}>
                        {/* Configuration de l'échelle */}
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                                Configuration de l'échelle
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, mt: 1, alignItems: 'center' }}>
                                <Chip
                                    label={`${question.echelleMin || 1} - ${question.echelleMax || 10}`}
                                    color="primary"
                                    size="small"
                                />
                            </Box>
                        </Box>

                        {/* Aperçu visuel de l'échelle */}
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                                Aperçu de l'échelle
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                gap: 1,
                                mt: 1,
                                flexWrap: 'wrap'
                            }}>
                                {Array.from({
                                    length: (question.echelleMax || 10) - (question.echelleMin || 1) + 1
                                }, (_, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            minWidth: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '2px solid #e0e0e0',
                                            borderRadius: '6px',
                                            backgroundColor: '#fafafa',
                                            fontWeight: 600,
                                            fontSize: '14px'
                                        }}
                                    >
                                        {(question.echelleMin || 1) + i}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                );

            // Liste déroulante / Choix multiple / Case à cocher - Affichage des options
            case 'liste_deroulante':
            case 'choix_multiple':
            case 'case_a_cocher':
                // Vérification si des réponses existent
                if (!question.reponses || question.reponses.length === 0) {
                    return (
                        <Box sx={{
                            p: 3,
                            bgcolor: '#f8f9fa',
                            borderRadius: '8px',
                            border: '1px solid #e9ecef',
                            textAlign: 'center'
                        }}>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                Aucune réponse définie pour cette question
                            </Typography>
                        </Box>
                    );
                }

                // Affichage de la liste des réponses
                return (
                    <Box sx={{
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        bgcolor: '#fff'
                    }}>
                        {question.reponses.map((reponse, index) => (
                            <Box key={index}>
                                <Box sx={{
                                    py: 2,
                                    px: 3,
                                    bgcolor: question.bonneReponse === index ? '#e8f5e8' : 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2
                                }}>
                                    {/* Icône selon le type et si c'est la bonne réponse */}
                                    {question.bonneReponse === index ? (
                                        <Iconify icon="eva:checkmark-circle-fill" width={20} sx={{ color: '#2e7d32' }} />
                                    ) : question.type === 'case_a_cocher' ? (
                                        <Iconify icon="eva:square-outline" width={20} sx={{ color: '#666' }} />
                                    ) : (
                                        <Iconify icon="eva:radio-button-off-outline" width={20} sx={{ color: '#666' }} />
                                    )}

                                    {/* Texte de la réponse */}
                                    <Typography variant="body2" sx={{
                                        fontWeight: question.bonneReponse === index ? 600 : 400,
                                        color: question.bonneReponse === index ? '#2e7d32' : '#333',
                                        flex: 1
                                    }}>
                                        {index + 1}. {reponse}
                                    </Typography>

                                    {/* Badge "Bonne réponse" */}
                                    {question.bonneReponse === index && (
                                        <Chip
                                            label="Bonne réponse"
                                            color="success"
                                            size="small"
                                            sx={{ fontSize: '0.7rem', height: 20 }}
                                        />
                                    )}
                                </Box>
                                {/* Séparateur entre les réponses */}
                                {index < question.reponses.length - 1 && <Divider />}
                            </Box>
                        ))}
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <Card sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0',
            mb: 3
        }}>
            {/* Titre de la section avec type de question */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                    Détail de la question
                </Typography>
                <Chip
                    label={getTypeQuestionLabel(question.type)}
                    color={getTypeColor(question.type)}
                    size="small"
                    sx={{ fontWeight: 500 }}
                />
            </Box>

            {/* Question principale */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: '#555',
                    fontSize: '0.875rem'
                }}>
                    Question
                </Typography>
                <Box sx={{
                    p: 2,
                    bgcolor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                }}>
                    <Typography variant="body1" sx={{
                        color: '#333',
                        lineHeight: 1.6,
                        fontSize: '1rem'
                    }}>
                        {question.question}
                    </Typography>
                </Box>
            </Box>

            {/* Informations générales */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: '#555',
                    fontSize: '0.875rem'
                }}>
                    Informations générales
                </Typography>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)'
                    },
                    gap: 2
                }}>
                    {/* Type de question */}
                    <Box sx={{
                        p: 2,
                        bgcolor: '#f8f9fa',
                        borderRadius: '8px',
                        border: '1px solid #e9ecef'
                    }}>
                        <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                            Type de question
                        </Typography>
                        <Typography variant="body2" sx={{
                            fontWeight: 500,
                            color: '#333',
                            mt: 0.5
                        }}>
                            {getTypeQuestionLabel(question.type)}
                        </Typography>
                    </Box>

                    {/* Statut obligatoire/facultatif */}
                    <Box sx={{
                        p: 2,
                        bgcolor: '#f8f9fa',
                        borderRadius: '8px',
                        border: '1px solid #e9ecef'
                    }}>
                        <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                            Statut
                        </Typography>
                        <Box sx={{ mt: 0.5 }}>
                            <Chip
                                label={question.required ? 'Obligatoire' : 'Facultative'}
                                color={question.required ? 'error' : 'default'}
                                size="small"
                                sx={{ fontSize: '0.75rem' }}
                            />
                        </Box>
                    </Box>

                    {/* Points attribués - Masqué pour question libre et échelle linéaire */}
                    {!['question_libre', 'echelle_lineaire'].includes(question.type) && (
                        <Box sx={{
                            p: 2,
                            bgcolor: '#f8f9fa',
                            borderRadius: '8px',
                            border: '1px solid #e9ecef'
                        }}>
                            <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                                Points attribués
                            </Typography>
                            <Typography variant="body2" sx={{
                                fontWeight: 500,
                                color: '#333',
                                mt: 0.5
                            }}>
                                {formatPoints(question.nombrePoints)}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Contenu spécifique selon le type de question */}
            <Box>
                <Typography variant="subtitle2" sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: '#555',
                    fontSize: '0.875rem'
                }}>
                    {question.type === 'question_libre' ? 'Type de réponse' :
                        question.type === 'echelle_lineaire' ? 'Configuration de l\'échelle' :
                            'Réponses possibles'}
                </Typography>
                {renderQuestionTypeContent()}
            </Box>
        </Card>
    );
};

export default QuestionDetailSection;