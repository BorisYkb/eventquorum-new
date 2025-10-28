//src/sections/gestionhabilitation/nouveau/AgentSaisie-Sup-infos.tsx

'use client';

import React from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
} from '@mui/material';

interface AgentSaisieData {
    typeAdmission: 'entree' | 'activite' | 'entree_et_activite' | '';
    activiteSelectionnee: string;
}

interface AgentSaisieSupinfosProps {
    activites: { id: string; nom: string; }[];
    agentSaisieData: AgentSaisieData;
    onAgentSaisieDataChange: React.Dispatch<React.SetStateAction<AgentSaisieData>>;
}

const AgentSaisieSupinfos: React.FC<AgentSaisieSupinfosProps> = ({
    activites,
    agentSaisieData,
    onAgentSaisieDataChange
}) => {
    const theme = useTheme();

    const handleTypeAdmissionChange = (type: 'entree' | 'activite' | 'entree_et_activite') => {
        const newValue = agentSaisieData.typeAdmission === type ? '' : type;
        onAgentSaisieDataChange({
            typeAdmission: newValue,
            activiteSelectionnee: newValue === 'entree' ? '' : agentSaisieData.activiteSelectionnee
        });
    };

    const handleActiviteChange = (activiteId: string) => {
        onAgentSaisieDataChange(prev => ({
            ...prev,
            activiteSelectionnee: activiteId
        }));
    };

    const needsActiviteSelection = agentSaisieData.typeAdmission === 'activite' || 
                                   agentSaisieData.typeAdmission === 'entree_et_activite';

    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{
                fontWeight: 600,
                mb: 2,
                color: '#474751',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Box sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.secondary.main,
                    mr: 1
                }} />
                Type d'admission
            </Typography>

            <Box sx={{ mb: 3 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={agentSaisieData.typeAdmission === 'entree'}
                            onChange={() => handleTypeAdmissionChange('entree')}
                        />
                    }
                    label="Admission d'entrée"
                />
            </Box>

            <Box sx={{ mb: 3 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={agentSaisieData.typeAdmission === 'activite'}
                            onChange={() => handleTypeAdmissionChange('activite')}
                        />
                    }
                    label="Admission à une activité"
                />
            </Box>

            <Box sx={{ mb: 3 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={agentSaisieData.typeAdmission === 'entree_et_activite'}
                            onChange={() => handleTypeAdmissionChange('entree_et_activite')}
                        />
                    }
                    label="Admission d'entrée et à une activité"
                />
            </Box>

            {/* Liste déroulante pour sélectionner l'activité */}
            {needsActiviteSelection && (
                <Box sx={{ mt: 3 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Sélectionner une activité</InputLabel>
                        <Select
                            value={agentSaisieData.activiteSelectionnee}
                            onChange={(e) => handleActiviteChange(e.target.value)}
                            label="Sélectionner une activité"
                            required
                        >
                            {activites.map((activite) => (
                                <MenuItem key={activite.id} value={activite.id}>
                                    {activite.nom}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            )}
        </Box>
    );
};

export default AgentSaisieSupinfos;