// File: src/sections/guichet/GuichetInfoForm.tsx

'use client';

/**
 * COMPOSANT: GuichetInfoForm
 * 
 * Formulaire pour saisir les informations personnelles du participant
 * Inclut maintenant le champ "Type de participation" (En ligne / En présentiel)
 */

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';

// ============================================
// TYPES
// ============================================
interface ParticipantInfo {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    typeParticipation: 'En ligne' | 'En présentiel';
}

interface GuichetInfoFormProps {
    /** Informations du participant */
    participantInfo: ParticipantInfo;

    /** Callback pour mettre à jour les informations */
    onInfoChange: (info: ParticipantInfo) => void;
}

// ============================================
// COMPOSANT
// ============================================
export function GuichetInfoForm({ participantInfo, onInfoChange }: GuichetInfoFormProps) {

    /**
     * Gère les changements des champs texte
     */
    const handleChange = (field: keyof ParticipantInfo) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        onInfoChange({
            ...participantInfo,
            [field]: event.target.value,
        });
    };

    /**
     * Gère le changement du type de participation
     */
    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onInfoChange({
            ...participantInfo,
            typeParticipation: event.target.value as 'En ligne' | 'En présentiel',
        });
    };

    return (
        <Card sx={{ p: { xs: 2, md: 4 } }}>
            <Typography
                variant="h6"
                sx={{
                    mb: 3,
                    fontWeight: 600,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                }}
            >
                Informations du participant
            </Typography>

            <Grid container spacing={{ xs: 2, md: 3 }}>
                {/* Nom */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        required
                        label="Nom"
                        value={participantInfo.nom}
                        onChange={handleChange('nom')}
                        placeholder="Entrez le nom"
                        sx={{
                            '& .MuiInputBase-root': {
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            },
                        }}
                    />
                </Grid>

                {/* Prénom */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        required
                        label="Prénom"
                        value={participantInfo.prenom}
                        onChange={handleChange('prenom')}
                        placeholder="Entrez le prénom"
                        sx={{
                            '& .MuiInputBase-root': {
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            },
                        }}
                    />
                </Grid>

                {/* Email */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        required
                        type="email"
                        label="Email"
                        value={participantInfo.email}
                        onChange={handleChange('email')}
                        placeholder="exemple@email.com"
                        sx={{
                            '& .MuiInputBase-root': {
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            },
                        }}
                    />
                </Grid>

                {/* Téléphone */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        required
                        label="Téléphone"
                        value={participantInfo.telephone}
                        onChange={handleChange('telephone')}
                        placeholder="+225 XX XX XX XX XX"
                        sx={{
                            '& .MuiInputBase-root': {
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            },
                        }}
                    />
                </Grid>

                {/* Type de participation */}
                <Grid size={{ xs: 12 }}>
                    <FormControl component="fieldset">
                        <FormLabel
                            component="legend"
                            sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                mb: 1,
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            }}
                        >
                            Type de participation *
                        </FormLabel>
                        <RadioGroup
                            row
                            value={participantInfo.typeParticipation}
                            onChange={handleTypeChange}
                            sx={{
                                gap: { xs: 2, md: 4 },
                            }}
                        >
                            <FormControlLabel
                                value="En présentiel"
                                control={<Radio />}
                                label={
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: { xs: '0.875rem', md: '1rem' },
                                            }}
                                        >
                                            En présentiel
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ fontSize: { xs: '0.75rem', md: '0.8125rem' } }}
                                        >
                                            Participation physique à l'événement
                                        </Typography>
                                    </Box>
                                }
                                sx={{
                                    border: 1,
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    px: 2,
                                    py: 1,
                                    m: 0,
                                    width: { xs: '100%', sm: 'auto' },
                                    '&:hover': { borderColor: 'primary.main' },
                                    ...(participantInfo.typeParticipation === 'En présentiel' && {
                                        borderColor: 'primary.main',
                                        bgcolor: 'primary.lighter',
                                    }),
                                }}
                            />

                            <FormControlLabel
                                value="En ligne"
                                control={<Radio />}
                                label={
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: { xs: '0.875rem', md: '1rem' },
                                            }}
                                        >
                                            En ligne
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ fontSize: { xs: '0.75rem', md: '0.8125rem' } }}
                                        >
                                            Participation à distance
                                        </Typography>
                                    </Box>
                                }
                                sx={{
                                    border: 1,
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    px: 2,
                                    py: 1,
                                    m: 0,
                                    width: { xs: '100%', sm: 'auto' },
                                    '&:hover': { borderColor: 'primary.main' },
                                    ...(participantInfo.typeParticipation === 'En ligne' && {
                                        borderColor: 'primary.main',
                                        bgcolor: 'primary.lighter',
                                    }),
                                }}
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </Card>
    );
}