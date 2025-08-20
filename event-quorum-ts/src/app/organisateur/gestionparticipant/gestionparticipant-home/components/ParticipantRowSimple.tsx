//src/app/organisateur/gestionparticipant/gestionparticipant-home/components/ParticipantRowSimple.tsx
'use client';

import {
    TableRow,
    TableCell,
    Stack,
    Avatar,
    Typography,
    Box,
} from '@mui/material';

// Types
import { Participant } from './types';

type ParticipantRowSimpleProps = {
    participant: Participant;
};

/**
 * Composant ParticipantRow simplifié pour la liste des participants
 * Sans les colonnes : Connecté, Actions, et sans checkbox
 * Avec la colonne Émargement
 */
const ParticipantRowSimple: React.FC<ParticipantRowSimpleProps> = ({ participant }) => {
    return (
        <TableRow hover>
            <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ width: 32, height: 32 }}>
                        {participant.prenom.charAt(0)}
                    </Avatar>
                    <Typography variant="subtitle2">
                        {participant.nom} {participant.prenom}
                    </Typography>
                </Stack>
            </TableCell>
            <TableCell>{participant.telephone}</TableCell>
            <TableCell>{participant.email}</TableCell>
            <TableCell>
                {participant.emargement ? (
                    <Box
                        sx={{
                            width: 80,
                            height: 40,
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'grey.50'
                        }}
                    >
                        <img
                            src={participant.emargement}
                            alt="Signature"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain'
                            }}
                        />
                    </Box>
                ) : (
                    <Typography variant="body2" color="text.disabled" fontStyle="italic">
                        Non signé
                    </Typography>
                )}
            </TableCell>
        </TableRow>
    );
};

export default ParticipantRowSimple;