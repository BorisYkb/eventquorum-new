//src/sections/gestionhabilitation/nouveau/Guichet-Sup-infos.tsx

'use client';

import React from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Box,
    Typography,
    FormControlLabel,
    Checkbox,
} from '@mui/material';

interface GuichetData {
    autoriserAjoutParticipant: boolean;
}

interface GuichetSupinfosProps {
    guichetData: GuichetData;
    onGuichetDataChange: React.Dispatch<React.SetStateAction<GuichetData>>;
}

const GuichetSupinfos: React.FC<GuichetSupinfosProps> = ({
    guichetData,
    onGuichetDataChange
}) => {
    const theme = useTheme();

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onGuichetDataChange({
            autoriserAjoutParticipant: event.target.checked
        });
    };

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
                    backgroundColor: theme.palette.warning.main,
                    mr: 1
                }} />
                Permissions du guichetier
            </Typography>

            <Box sx={{ mb: 3 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={guichetData.autoriserAjoutParticipant}
                            onChange={handleCheckboxChange}
                        />
                    }
                    label="Autoriser l'ajout de participant depuis l'espace guichet"
                />
            </Box>
        </Box>
    );
};

export default GuichetSupinfos;