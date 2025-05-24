'use client';

import { IParticipantItem } from 'src/types/participant';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface DetailsInviteProps {
    open: boolean;
    onClose: () => void;
    participant: IParticipantItem | null;
}

export function DetailsInvite({ open, onClose, participant }: DetailsInviteProps) {
    const theme = useTheme();

    if (!participant) return null;

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '-';
        return dateStr;
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'connecté':
            case 'oui':
                return 'success';
            case 'non connecté':
            case 'non':
                return 'error';
            default:
                return 'default';
        }
    };

    const getConnectionIcon = (connected: string) => {
        return connected === 'connecté' || connected === 'oui' ? (
            <Box
                sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'success.main',
                    display: 'inline-block',
                    mr: 1,
                }}
            />
        ) : (
            <Box
                sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'error.main',
                    display: 'inline-block',
                    mr: 1,
                }}
            />
        );
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    minHeight: 500,
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pb: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Box>
                    <Typography variant="h6" component="div">
                        Détail d'un invité
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {participant.nom_prenom}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            bgcolor: 'warning.main',
                            color: 'white',
                            '&:hover': { bgcolor: 'warning.dark' },
                        }}
                        size="small"
                    >
                        <Iconify icon="eva:close-fill" width={16} />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
                {/* Section PROFIL */}
                <Box
                    sx={{
                        bgcolor: 'grey.200',
                        p: 1.5,
                        mb: 3,
                        borderRadius: 1,
                        textAlign: 'center',
                        border: `2px solid ${theme.palette.grey[400]}`,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                        PROFIL
                    </Typography>
                </Box>

                {/* Contenu du profil */}
                <Box sx={{ border: `1px solid ${theme.palette.grey[300]}`, p: 3, borderRadius: 1, mb: 3 }}>
                    <Grid container spacing={3}>
                        {/* Colonne gauche */}
                        <Grid  xs={12} md={6}>
                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <Typography sx={{ minWidth: 140, fontWeight: 'medium', color: 'text.secondary' }}>
                                    Nom_Prénom
                                </Typography>
                                <Typography sx={{ fontWeight: 'medium' }}>
                                    {participant.nom_prenom}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <Typography sx={{ minWidth: 140, fontWeight: 'medium', color: 'text.secondary' }}>
                                    Email
                                </Typography>
                                <Typography sx={{ fontWeight: 'medium' }}>
                                    {participant.email || '-'}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <Typography sx={{ minWidth: 140, fontWeight: 'medium', color: 'text.secondary' }}>
                                    Téléphone
                                </Typography>
                                <Typography sx={{ fontWeight: 'medium' }}>
                                    {participant.telephone || '-'}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                                <Typography sx={{ minWidth: 140, fontWeight: 'medium', color: 'text.secondary' }}>
                                    Connecté
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {getConnectionIcon(participant.connecte ? 'connecté' : 'non connecté')}
                                    <Typography sx={{ fontWeight: 'medium' }}>
                                        {participant.connecte ? 'Connecté' : 'Non connecté'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Colonne droite */}
                        <Grid xs={12} md={6}>
                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <Typography sx={{ minWidth: 140, fontWeight: 'medium', color: 'text.secondary' }}>
                                    Première connexion
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {getConnectionIcon(participant.premiere_connexion ? 'oui' : 'non')}
                                    <Typography sx={{ fontWeight: 'medium' }}>
                                        {participant.premiere_connexion ? 'Oui' : 'Non'}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <Typography sx={{ minWidth: 140, fontWeight: 'medium', color: 'text.secondary' }}>
                                    Date première connexion
                                </Typography>
                                <Typography sx={{ fontWeight: 'medium' }}>
                                    {formatDate(participant.date_premiere_connexion)}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <Typography sx={{ minWidth: 140, fontWeight: 'medium', color: 'text.secondary' }}>
                                    Date dernière connexion
                                </Typography>
                                <Typography sx={{ fontWeight: 'medium' }}>
                                    {formatDate(participant.date_derniere_connexion)}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <Typography sx={{ minWidth: 140, fontWeight: 'medium', color: 'text.secondary' }}>
                                    Achat effectué
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {getConnectionIcon(participant.achat_effectue ? 'oui' : 'non')}
                                    <Typography sx={{ fontWeight: 'medium' }}>
                                        {participant.achat_effectue ? 'Oui' : 'Non'}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <Typography sx={{ minWidth: 140, fontWeight: 'medium', color: 'text.secondary' }}>
                                    Date achat effectué
                                </Typography>
                                <Typography sx={{ fontWeight: 'medium' }}>
                                    {formatDate(participant.date_achat_effectue)}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <Typography sx={{ minWidth: 140, fontWeight: 'medium', color: 'text.secondary' }}>
                                    Méthode d'inscription
                                </Typography>
                                <Typography sx={{ fontWeight: 'medium' }}>
                                    {participant.methode_inscription || '-'}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <Typography sx={{ minWidth: 140, fontWeight: 'medium', color: 'text.secondary' }}>
                                    Activités sélectionnées
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {getConnectionIcon(participant.activites_selectionnees ? 'oui' : 'non')}
                                    <Typography sx={{ fontWeight: 'medium' }}>
                                        {participant.activites_selectionnees ? 'Oui' : 'Non'}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <Typography sx={{ minWidth: 140, fontWeight: 'medium', color: 'text.secondary' }}>
                                    Date activités sélectionnées
                                </Typography>
                                <Typography sx={{ fontWeight: 'medium' }}>
                                    {formatDate(participant.date_activites_selectionnees)}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>
    );
}