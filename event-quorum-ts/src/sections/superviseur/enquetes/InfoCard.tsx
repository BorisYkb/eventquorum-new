// File: src/sections/superviseur/enquetes/InfoCard.tsx

'use client';

/**
 * COMPOSANT: InfoCard
 * 
 * Carte d'information élégante pour afficher une statistique ou une donnée clé
 * Utilisée pour afficher les informations d'une enquête de manière visuelle et attractive
 * 
 * Props:
 * - title: Le titre/label de l'information (ex: "Code d'enquête")
 * - value: La valeur à afficher (ex: "52340")
 * - icon: L'icône React à afficher
 * - color: La couleur principale de la carte
 */

import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

// ============================================
// TYPES
// ============================================
interface InfoCardProps {
    /** Titre/label de l'information */
    title: string;

    /** Valeur à afficher (peut être un string ou un number) */
    value: string | number;

    /** Icône React à afficher */
    icon: React.ReactNode;

    /** Couleur principale de la carte (hex code) */
    color: string;
}

// ============================================
// COMPOSANT
// ============================================
const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon, color }) => {
    return (
        <Card
            sx={{
                p: { xs: 1.5, sm: 2, md: 2.5, lg: 2.5 },
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                // Dégradé de fond subtil avec la couleur fournie
                background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
                border: `1px solid ${color}30`,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 25px ${color}20`,
                }
            }}
        >
            {/* Cercle d'icône à gauche */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: { xs: 44, sm: 48, md: 50, lg: 40 },
                    height: { xs: 44, sm: 48, md: 50, lg: 40 },
                    borderRadius: '50%',
                    bgcolor: `${color}15`,
                    color: color,
                    mr: { xs: 1, md: 1.5 },
                    flexShrink: 0,
                    fontSize: { xs: '1rem', sm: '1.15rem', md: '1.2rem', lg: '1.4rem' },
                    '& svg': {
                        fontSize: { xs: '1.15rem', sm: '1.275rem', md: '1.4rem', lg: '1.65rem' }
                    }
                }}
            >
                {icon}
            </Box>

            {/* Contenu: Titre et Valeur */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontWeight: 500,
                        mb: 0.5,
                        fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.775rem' }
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        color: 'text.primary',
                        wordBreak: 'break-word',
                        lineHeight: 1.2,
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.125rem', lg: '1.25rem' }
                    }}
                >
                    {value || 'Non défini'}
                </Typography>
            </Box>
        </Card>
    );
};

export default InfoCard;