// src/app/participant/enligne/components/activites-selection.tsx
'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTheme, useMediaQuery } from '@mui/material';

import { varAlpha } from 'minimal-shared/utils';

// ----------------------------------------------------------------------

/**
 * Interface pour les options de prix/standing d'une activité
 */
export interface PriceOption {
    id: string;
    label: string;
    price: number;
    currency: string;
}

/**
 * Interface pour une activité événementielle
 */
export interface Activite {
    id: string;
    time: string;
    title: string;
    description: string;
    status: string;
    statusColor: 'default' | 'warning' | 'success' | 'error' | 'info';
    priceOptions: PriceOption[];
}

/**
 * Interface pour une activité sélectionnée par l'utilisateur
 */
export interface SelectedActivite {
    activityId: string;
    selectedStanding: string;
}

// ----------------------------------------------------------------------

interface ActivitesSelectionProps {
    activites: Activite[];
    selectedActivites: SelectedActivite[];
    onActiviteToggle: (activiteId: string) => void;
    onStandingChange: (activiteId: string, standing: string) => void;
}

/**
 * Composant pour la sélection d'activités avec gestion responsive
 * et tailles de police dynamiques selon l'écran
 */
export function ActivitesSelection({
    activites,
    selectedActivites,
    onActiviteToggle,
    onStandingChange,
}: ActivitesSelectionProps) {
    // Hook pour la gestion responsive
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    /**
     * Vérifie si une activité est sélectionnée
     */
    const isActiviteSelected = (activiteId: string): boolean => {
        return selectedActivites.some(item => item.activityId === activiteId);
    };

    /**
     * Récupère le standing sélectionné pour une activité
     */
    const getSelectedStanding = (activiteId: string): string => {
        const found = selectedActivites.find(item => item.activityId === activiteId);
        return found?.selectedStanding || 'standard';
    };

    /**
     * Calcule les tailles de police selon l'écran
     */
    const getResponsiveFontSizes = () => {
        if (isMobile) {
            return {
                subtitle2: { fontSize: '0.75rem', fontWeight: 500 }, // Taille réduite sur mobile
                subtitle1: { fontSize: '0.875rem', fontWeight: 600 },
                body2: { fontSize: '0.75rem', fontWeight: 400 },
                caption: { fontSize: '0.6875rem', fontWeight: 400 },
                chipText: { fontSize: '0.6875rem', fontWeight: 500 }
            };
        }

        if (isTablet) {
            return {
                subtitle2: { fontSize: '0.8125rem', fontWeight: 500 },
                subtitle1: { fontSize: '0.9375rem', fontWeight: 600 },
                body2: { fontSize: '0.8125rem', fontWeight: 400 },
                caption: { fontSize: '0.75rem', fontWeight: 400 },
                chipText: { fontSize: '0.75rem', fontWeight: 500 }
            };
        }

        // Desktop - tailles par défaut
        return {
            subtitle2: { fontSize: '0.875rem', fontWeight: 500 },
            subtitle1: { fontSize: '1rem', fontWeight: 600 },
            body2: { fontSize: '0.875rem', fontWeight: 400 },
            caption: { fontSize: '0.75rem', fontWeight: 400 },
            chipText: { fontSize: '0.75rem', fontWeight: 500 }
        };
    };

    const fontSizes = getResponsiveFontSizes();

    /**
     * Calcule les espacements selon l'écran
     */
    const getResponsiveSpacing = () => {
        return {
            cardSpacing: isMobile ? 1.5 : 2,
            contentPadding: isMobile ? 1.5 : 2,
            itemSpacing: isMobile ? 1.5 : 2,
            radioGroupGap: isMobile ? 1 : 2,
            marginBottom: isMobile ? 2 : 4
        };
    };

    const spacing = getResponsiveSpacing();

    return (
        <Box>
            {/* Titre de la section */}
            <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{
                    mb: spacing.marginBottom,
                    ...fontSizes.subtitle2,
                    textAlign: isMobile ? 'center' : 'left'
                }}
            >
                La liste des activités au programme
            </Typography>

            {/* Liste des activités */}
            <Stack spacing={spacing.cardSpacing}>
                {activites.map((activite) => {
                    const isSelected = isActiviteSelected(activite.id);
                    const selectedStanding = getSelectedStanding(activite.id);

                    return (
                        <Card
                            key={activite.id}
                            sx={{
                                borderRadius: 1,
                                // Bordure dynamique selon la sélection
                                border: (theme) => `1px solid ${isSelected ? theme.palette.primary.main : theme.palette.divider}`,
                                // Arrière-plan selon la sélection
                                backgroundColor: isSelected ? 'grey.200' : 'background.paper',
                                // Transition fluide pour les changements d'état
                                transition: (theme) => theme.transitions.create(['border-color', 'background-color'], {
                                    easing: theme.transitions.easing.sharp,
                                    duration: theme.transitions.duration.shortest,
                                }),
                                // Ombre subtile sur survol
                                '&:hover': {
                                    boxShadow: (theme) => theme.shadows[2],
                                },
                            }}
                        >
                            <CardContent sx={{ p: spacing.contentPadding }}>
                                <Stack
                                    direction={isMobile ? "column" : "row"}
                                    spacing={spacing.itemSpacing}
                                    alignItems={isMobile ? "stretch" : "flex-start"}
                                >
                                    {/* Checkbox de sélection */}
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={() => onActiviteToggle(activite.id)}
                                                color="primary"
                                                size={isMobile ? "small" : "medium"}
                                            />
                                        }
                                        label=""
                                        sx={{
                                            m: 0,
                                            ...(isMobile && { alignSelf: 'flex-start' })
                                        }}
                                    />

                                    {/* Contenu de l'activité */}
                                    <Box sx={{ flex: 1, width: '100%' }}>
                                        {/* En-tête de l'activité */}
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: isMobile ? 'stretch' : 'flex-start',
                                            flexDirection: isMobile ? 'column' : 'row',
                                            gap: isMobile ? 1 : 0,
                                            mb: 1
                                        }}>
                                            <Box sx={{ flex: 1 }}>
                                                {/* Titre avec heure */}
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        ...fontSizes.subtitle1,
                                                        mb: 0.5,
                                                        wordBreak: 'break-word' // Évite le débordement sur mobile
                                                    }}
                                                >
                                                    {activite.time} {activite.title}
                                                </Typography>

                                                {/* Description */}
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        ...fontSizes.body2,
                                                        mb: 1,
                                                        lineHeight: 1.4,
                                                        wordBreak: 'break-word'
                                                    }}
                                                >
                                                    {activite.description}
                                                </Typography>
                                            </Box>

                                            {/* Chip de statut */}
                                            <Chip
                                                label={activite.status}
                                                size={isMobile ? "small" : "small"}
                                                color={activite.statusColor}
                                                variant="soft"
                                                sx={{
                                                    ...fontSizes.chipText,
                                                    alignSelf: isMobile ? 'flex-start' : 'flex-start',
                                                    flexShrink: 0
                                                }}
                                            />
                                        </Box>

                                        {/* Options de standing si activité sélectionnée */}
                                        {isSelected && (
                                            <Box sx={{
                                                mt: 2,
                                                ml: isMobile ? 0 : 1,
                                                p: isMobile ? 1 : 0,
                                                backgroundColor: isMobile ? 'grey.50' : 'transparent',
                                                borderRadius: isMobile ? 1 : 0
                                            }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        ...fontSizes.body2,
                                                        fontWeight: 600,
                                                        mb: 1
                                                    }}
                                                >
                                                    Type de place:
                                                </Typography>

                                                <RadioGroup
                                                    value={selectedStanding}
                                                    onChange={(e) => onStandingChange(activite.id, e.target.value)}
                                                    row={!isMobile} // Vertical sur mobile, horizontal sur desktop
                                                    sx={{
                                                        gap: spacing.radioGroupGap,
                                                        flexDirection: isMobile ? 'column' : 'row'
                                                    }}
                                                >
                                                    {activite.priceOptions.map((option) => (
                                                        <FormControlLabel
                                                            key={option.id}
                                                            value={option.id}
                                                            control={
                                                                <Radio
                                                                    size={isMobile ? "small" : "small"}
                                                                />
                                                            }
                                                            label={
                                                                <Box sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'flex-start'
                                                                }}>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            ...fontSizes.body2,
                                                                            fontWeight: 500
                                                                        }}
                                                                    >
                                                                        {option.label}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="caption"
                                                                        color="text.secondary"
                                                                        sx={fontSizes.caption}
                                                                    >
                                                                        {option.price.toLocaleString()} {option.currency}
                                                                    </Typography>
                                                                </Box>
                                                            }
                                                            sx={{
                                                                border: '1px solid',
                                                                borderColor: 'divider',
                                                                borderRadius: 1,
                                                                px: isMobile ? 1.5 : 1,
                                                                py: isMobile ? 1 : 0.5,
                                                                m: 0,
                                                                width: isMobile ? '100%' : 'auto',
                                                                // Effet hover
                                                                '&:hover': { borderColor: 'primary.main' },
                                                                // Style quand sélectionné
                                                                ...(selectedStanding === option.id && {
                                                                    borderColor: 'primary.main',
                                                                    bgcolor: (theme) => varAlpha(theme.vars.palette.primary.mainChannel, 0.08)
                                                                })
                                                            }}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </Box>
                                        )}
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
        </Box>
    );
}