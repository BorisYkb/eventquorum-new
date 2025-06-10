'use client';

import type { BoxProps } from '@mui/material/Box';
import { IParticipantItem } from 'src/types/participant';
import { varAlpha } from 'minimal-shared/utils';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import { _userAbout } from 'src/_mock';

// ----------------------------------------------------------------------

interface DetailsInviteProps {
    open: boolean;
    onClose: () => void;
    participant: IParticipantItem | null;
}

// Composant ProfileCover adapté pour l'invité
function InviteProfileCover({
  sx,
  name,
  role,
  coverUrl,
  avatarUrl,
  ...other
}: BoxProps & {
  name: string;
  role: string;
  coverUrl: string;
  avatarUrl?: string;
}) {
  const theme = useTheme();
  
  return (
    <Box
      sx={[
        () => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(0deg, ${varAlpha(theme.vars.palette.primary.darkerChannel, 0.8)}, ${varAlpha(theme.vars.palette.primary.darkerChannel, 0.8)})`,
              `url(${coverUrl})`,
            ],
          }),
          height: 180,
          color: 'common.white',
          position: 'relative',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={{
          display: 'flex',
          left: { md: 24 },
          bottom: { md: 24 },
          zIndex: { md: 10 },
          pt: { xs: 6, md: 0 },
          position: { md: 'absolute' },
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Avatar
          alt={name}
          src={avatarUrl}
          sx={[
            (theme) => ({
              mx: 'auto',
              width: { xs: 80, md: 128 },
              height: { xs: 80, md: 128 },
              border: `solid 2px ${theme.vars.palette.common.white}`,
              fontSize: { xs: '2rem', md: '3rem' },
            }),
          ]}
        >
          {name?.charAt(0).toUpperCase()}
        </Avatar>

        <ListItemText
          sx={{ mt: 3, ml: { md: 3 }, textAlign: { xs: 'center', md: 'unset' } }}
          primary={name}
          secondary={role}
          primaryTypographyProps={{ typography: 'h4' }}
          secondaryTypographyProps={{
            mt: 0.5,
            color: 'inherit',
            component: 'span',
            typography: 'body2',
            sx: { opacity: 0.48 },
          }}
        />
      </Box>

      {/* Bouton fermer repositionné */}
      <IconButton
        onClick={() => {}} // sera passé en props
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          bgcolor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          '&:hover': { 
            bgcolor: 'rgba(255, 255, 255, 0.3)',
          },
        }}
      >
        <Iconify icon="eva:close-fill" width={20} />
      </IconButton>
    </Box>
  );
}

export function DetailsInvite({ open, onClose, participant }: DetailsInviteProps) {
    const theme = useTheme();

    if (!participant) return null;

    const formatDate = (dateStr: string | undefined) => {
        if (!dateStr) return '-';
        return dateStr;
    };

    const getConnectionIcon = (connected: string | boolean) => {
        const isConnected = connected === 'connecté' || connected === 'oui' || connected === true;
        return (
            <Box
                sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: isConnected ? 'success.main' : 'error.main',
                    display: 'inline-block',
                    mr: 1,
                }}
            />
        );
    };

    const renderInfoBox = (label: string, value: string | undefined, showIcon?: boolean, iconValue?: string | boolean) => (
        <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
            <Typography 
                sx={{ 
                    minWidth: 160, 
                    fontWeight: 'medium', 
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    mr: 2 // Ajout d'une marge droite pour l'espacement
                }}
            >
                {label}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                {showIcon && iconValue !== undefined && getConnectionIcon(iconValue)}
                <Typography sx={{ fontWeight: 'medium', fontSize: '0.875rem' }}>
                    {value || '-'}
                </Typography>
            </Box>
        </Box>
    );

    const renderPersonalInfo = () => (
        <Card sx={{ p: 3, height: 'fit-content', minHeight: 280, width: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
                INFORMATIONS PERSONNELLES
            </Typography>
            <Stack spacing={1.5}>
                {renderInfoBox("Nom & Prénom", participant.nom_prenom)}
                {renderInfoBox("Email", participant.email)}
                {renderInfoBox("Téléphone", participant.telephone)}
                {renderInfoBox("Date d'inscription", formatDate(participant.date))}
                {renderInfoBox("Statut demande", participant.statut)}
                {participant.nom && renderInfoBox("Nom", participant.nom)}
                {participant.prenom && renderInfoBox("Prénom", participant.prenom)}
            </Stack>
        </Card>
    );

    const renderConnectionInfo = () => (
        <Card sx={{ p: 3, height: 'fit-content', minHeight: 280, width: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
                STATUT DE CONNEXION
            </Typography>
            <Stack spacing={1.5}>
                {participant.connecte && renderInfoBox(
                    "Connecté", 
                    participant.connecte === 'connecté' ? 'Oui' : 'Non',
                    true,
                    participant.connecte === 'connecté'
                )}
                {participant.premiere_connexion && renderInfoBox(
                    "Première connexion", 
                    participant.premiere_connexion === 'oui' ? 'Oui' : 'Non',
                    true,
                    participant.premiere_connexion === 'oui'
                )}
                {/* Informations fictives basées sur le statut pour enrichir l'affichage */}
                {participant.connecte === 'connecté' && renderInfoBox("Dernière connexion", "Aujourd'hui 14:30")}
                {participant.connecte === 'connecté' && renderInfoBox("Nombre de connexions", "12")}
                {participant.connecte === 'non connecté' && renderInfoBox("Statut", "Jamais connecté")}
                {participant.premiere_connexion === 'oui' && renderInfoBox("Première connexion", "15/06/2024 09:15")}
            </Stack>
        </Card>
    );

    const renderPurchaseInfo = () => (
        <Card sx={{ p: 3, height: 'fit-content', minHeight: 280, width: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
                INFORMATIONS D'ACHAT & ACTIVITÉS
            </Typography>
            <Stack spacing={1.5}>
                {participant.achat_effectue && renderInfoBox(
                    "Achat effectué", 
                    participant.achat_effectue === 'oui' ? 'Oui' : 'Non',
                    true,
                    participant.achat_effectue === 'oui'
                )}
                {participant.achat_effectue === 'oui' && renderInfoBox("Montant payé", "25 000 FCFA")}
                {participant.achat_effectue === 'oui' && renderInfoBox("Méthode de paiement", "Orange Money")}
                {participant.achat_effectue === 'oui' && renderInfoBox("Date d'achat", "16/06/2024 10:45")}
                {participant.activite_selectionnee && renderInfoBox("Activité sélectionnée", participant.activite_selectionnee)}
                {participant.emargement && renderInfoBox(
                    "Émargement", 
                    participant.emargement === 'signé' ? 'Signé' : 'Non signé',
                    true,
                    participant.emargement === 'signé'
                )}
            </Stack>
        </Card>
    );

    const renderAdditionalInfo = () => (
        <Card sx={{ p: 3, height: 'fit-content', minHeight: 280, width: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
                INFORMATIONS COMPLÉMENTAIRES
            </Typography>
            <Stack spacing={1.5}>
                {/* Informations conditionnelles basées sur le type de participant */}
                {participant.statut === 'en présentiel' && renderInfoBox("Mode de participation", "En présentiel")}
                {participant.statut === 'en ligne' && renderInfoBox("Mode de participation", "En ligne")}
                {participant.statut === 'acceptée' && renderInfoBox("Statut", "Invité confirmé")}
                {participant.statut === 'en attente' && renderInfoBox("Statut", "En attente de validation")}
                {participant.statut === 'rejetée' && renderInfoBox("Statut", "Demande rejetée")}
                
                {/* Informations fictives pour enrichir */}
                {participant.achat_effectue === 'oui' && renderInfoBox("Nombre de tickets", "2")}
                {participant.connecte === 'connecté' && renderInfoBox("Appareil utilisé", "Smartphone Android")}
                {participant.premiere_connexion === 'oui' && renderInfoBox("Source d'inscription", "Site web")}
                {renderInfoBox("Langue préférée", "Français")}
                {renderInfoBox("Notifications", "Activées")}
            </Stack>
        </Card>
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    overflow: 'hidden',
                    maxHeight: '95vh',
                    width: '95%',
                    maxWidth: '950px',
                },
            }}
        >
            {/* En-tête avec ProfileCover */}
            <Box sx={{ position: 'relative' }}>
                <InviteProfileCover
                    name={participant.nom_prenom}
                    role="Invité à l'événement"
                    coverUrl={_userAbout.coverUrl}
                    avatarUrl={undefined} // Pas d'image spécifique, utilise les initiales
                />
                {/* Bouton fermer */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        '&:hover': { 
                            bgcolor: 'rgba(255, 255, 255, 0.3)',
                        },
                    }}
                >
                    <Iconify icon="eva:close-fill" width={20} />
                </IconButton>
            </Box>

            {/* Contenu principal */}
            <DialogContent sx={{ p: 3, bgcolor: 'grey.50' }}>
                <Grid container spacing={3} sx={{ justifyContent: 'center', alignItems: 'stretch' }}>
                    {/* Colonne gauche */}
                    <Grid xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ width: '100%', maxWidth: 450 }}>
                            <Stack spacing={3}>
                                {renderPersonalInfo()}
                                {renderPurchaseInfo()}
                            </Stack>
                        </Box>
                    </Grid>

                    {/* Colonne droite */}
                    <Grid xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ width: '100%', maxWidth: 450 }}>
                            <Stack spacing={3}>
                                {renderConnectionInfo()}
                                {renderAdditionalInfo()}
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}