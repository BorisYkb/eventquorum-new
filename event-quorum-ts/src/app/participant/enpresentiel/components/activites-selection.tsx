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

import { varAlpha } from 'minimal-shared/utils';

// ----------------------------------------------------------------------

// Types pour les activités
export interface PriceOption {
    id: string;
    label: string;
    price: number;
    currency: string;
}

export interface Activite {
    id: string;
    time: string;
    title: string;
    description: string;
    status: string;
    statusColor: 'default' | 'warning' | 'success' | 'error' | 'info';
    priceOptions: PriceOption[];
}

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

export function ActivitesSelection({
    activites,
    selectedActivites,
    onActiviteToggle,
    onStandingChange,
}: ActivitesSelectionProps) {
    const isActiviteSelected = (activiteId: string) => {
        return selectedActivites.some(item => item.activityId === activiteId);
    };

    const getSelectedStanding = (activiteId: string) => {
        const found = selectedActivites.find(item => item.activityId === activiteId);
        return found?.selectedStanding || 'standard';
    };

    return (
        <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 4 }}>
                La liste des activités au programme
            </Typography>

            <Stack spacing={2}>
                {activites.map((activite) => {
                    const isSelected = isActiviteSelected(activite.id);
                    const selectedStanding = getSelectedStanding(activite.id);

                    return (
                        <Card
                            key={activite.id}
                            sx={{
                                borderRadius: 1,
                                border: (theme) => `1px solid ${isSelected ? theme.palette.primary.main : theme.palette.divider}`,
                                backgroundColor: isSelected ? 'grey.200' : 'background.paper',
                                transition: (theme) => theme.transitions.create(['border-color', 'background-color'], {
                                    easing: theme.transitions.easing.sharp,
                                    duration: theme.transitions.duration.shortest,
                                }),
                            }}
                        >
                            <CardContent sx={{ p: 2 }}>
                                <Stack direction="row" spacing={2} alignItems="flex-start">
                                    {/* Checkbox de sélection */}
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={() => onActiviteToggle(activite.id)}
                                                color="primary"
                                            />
                                        }
                                        label=""
                                        sx={{ m: 0 }}
                                    />

                                    {/* Contenu de l'activité */}
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                                    {activite.time} {activite.title}
                                                </Typography>

                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                    {activite.description}
                                                </Typography>
                                            </Box>

                                            <Chip
                                                label={activite.status}
                                                size="small"
                                                color={activite.statusColor}
                                                variant="soft"
                                                sx={{ fontWeight: 500, fontSize: '0.75rem' }}
                                            />
                                        </Box>

                                        {/* Options de standing si activité sélectionnée */}
                                        {isSelected && (
                                            <Box sx={{ mt: 2, ml: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                                    Type de place:
                                                </Typography>

                                                <RadioGroup
                                                    value={selectedStanding}
                                                    onChange={(e) => onStandingChange(activite.id, e.target.value)}
                                                    row
                                                    sx={{ gap: 2 }}
                                                >
                                                    {activite.priceOptions.map((option) => (
                                                        <FormControlLabel
                                                            key={option.id}
                                                            value={option.id}
                                                            control={<Radio size="small" />}
                                                            label={
                                                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                                        {option.label}
                                                                    </Typography>
                                                                    <Typography variant="caption" color="text.secondary">
                                                                        {option.price.toLocaleString()} {option.currency }
                                                                    </Typography>
                                                                </Box>
                                                            }
                                                            sx={{
                                                                border: '1px solid',
                                                                borderColor: 'divider',
                                                                borderRadius: 1,
                                                                px: 1,
                                                                py: 0.5,
                                                                m: 0,
                                                                '&:hover': { borderColor: 'primary.main' },
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