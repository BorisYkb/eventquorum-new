//src/app/organisateur/gestionparticipant/components/ParticipantDetailModal.tsx
'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stack,
  Divider,
  Chip,
  Avatar,
  IconButton,
  Paper,
  Grid,
} from '@mui/material';
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

// Import du type
import { Participant } from 'src/app/organisateur/gestionparticipant/gestionparticipant-home/components/types';

/**
 * Interface pour les props du composant ParticipantDetailModal
 */
interface ParticipantDetailModalProps {
  /** Indique si le modal est ouvert */
  open: boolean;
  /** Fonction appelée pour fermer le modal */
  onClose: () => void;
  /** Données du participant à afficher */
  participant: Participant | null;
  /** Fonction appelée pour éditer le participant */
  onEdit?: (id: number) => void;
}

/**
 * Composant modal pour afficher les détails complets d'un participant
 * Affiche toutes les informations du participant dans un format structuré
 * avec des sections organisées et des indicateurs visuels
 */
const ParticipantDetailModal: React.FC<ParticipantDetailModalProps> = ({
  open,
  onClose,
  participant,
  onEdit,
}) => {
  // Gestion de l'absence de participant
  if (!participant) return null;

  /**
   * Fonction pour gérer l'édition du participant
   */
  const handleEdit = () => {
    if (onEdit) {
      onEdit(participant.id);
    }
    onClose(); // Ferme le modal après avoir déclenché l'édition
  };

  /**
   * Fonction pour formater la date de dernière connexion
   */
  const formatLastConnection = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Fonction pour obtenir les activités du participant sous forme de liste
   */
  const getActivitiesList = () => {
    // Simulation des activités basées sur la maquette
    const activities = [
      'Activité 1',
      'Activité 2', 
      'Activité 3',
      'Activité 4'
    ];
    return activities;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: '90vh',
          boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
        }
      }}
    >
      {/* En-tête du modal */}
      <DialogTitle
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          p: 3,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              width: 48,
              height: 48,
            }}
          >
            <PersonIcon sx={{ fontSize: 28 }} />
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
              DÉTAIL D'UN INVITÉ
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Informations complètes du participant
            </Typography>
          </Box>
        </Box>
        
        {/* Bouton de fermeture */}
        <IconButton
          onClick={onClose}
          sx={{
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Contenu du modal */}
      <DialogContent sx={{ p: 3, marginTop:3 }}>
        <Stack spacing={1}>
          {/* Section informations personnelles */}
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: 1 , borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
              Informations Personnelles
            </Typography>
            
            <Grid container spacing={3}>
              {/* Nom */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                    Nom
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {participant.nom}
                  </Typography>
                </Box>
              </Grid>

              {/* Prénom */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                    Prénom
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {participant.prenom}
                  </Typography>
                </Box>
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <EmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                    Email
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: 'primary.main' }}>
                    {participant.email}
                  </Typography>
                </Box>
              </Grid>

              {/* Téléphone */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <PhoneIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                    Téléphone
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {participant.telephone}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* <Divider /> */}

          {/* Section statut de connexion */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: 1 , borderColor: 'divider'}}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
              Statut de Connexion
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                Connecté
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {participant.connecte ? (
                  <>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: 'success.main',
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: 'error.main',
                      }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 500, color: 'error.main' }}>
                      Hors ligne
                    </Typography>
                  </>
                )}
              </Box>
            </Box>

            {/* Dernière connexion (simulation) */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                Dernière connexion
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {formatLastConnection('2024-01-26T14:45:00')}
              </Typography>
            </Box>
          </Paper>

          {/* <Divider /> */}

          {/* Section émargement */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: 1 , borderColor: 'divider'}}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
              Émargement
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                Émargement
              </Typography>
              {participant.emargement ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    En ligne /
                  </Typography>
                  <Box
                    component="img"
                    src="/signature-icon.png" // Remplacez par l'icône appropriée
                    alt="Signature"
                    sx={{
                      width: 24,
                      height: 24,
                      cursor: 'pointer',
                      '&:hover': { opacity: 0.7 }
                    }}
                    onError={(e) => {
                      // Fallback si l'image n'existe pas
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      color: 'primary.main',
                      '&:hover': { opacity: 0.7 }
                    }}
                    onClick={() => {
                      // Ouvrir la signature dans un nouvel onglet ou modal
                      window.open(participant.emargement!, '_blank');
                    }}
                  >
                    Voir signature
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'warning.main' }}>
                  Non signé
                </Typography>
              )}
            </Box>
          </Paper>

          {/* <Divider /> */}

          {/* Section activités */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: 1 , borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
              Activités Suivies
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Activités suivies:
              </Typography>
              <Stack spacing={1}>
                {getActivitiesList().map((activity, index) => (
                  <Typography 
                    key={index}
                    variant="body1" 
                    sx={{ 
                      pl: 2,
                      fontWeight: 500,
                      position: 'relative',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                      }
                    }}
                  >
                    {activity}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </Paper>
        </Stack>
      </DialogContent>

      {/* Actions du modal */}
      <DialogActions sx={{ p: 2, gap: 2, justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
          }}
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ParticipantDetailModal;