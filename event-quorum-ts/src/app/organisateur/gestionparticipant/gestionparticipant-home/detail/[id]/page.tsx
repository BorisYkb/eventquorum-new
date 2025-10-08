'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import {
  Box,
  Card,
  Container,
  Stack,
  Typography,
  Button,
  IconButton,
  Paper,
  Grid,
  Avatar,
  Breadcrumbs,
  Link,
} from '@mui/material';

// Import du type
interface Participant {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  connecte: boolean;
  emargement: string | null;
  activite: string;
  datePremiereConnexion?: string;
  dateDerniereConnexion?: string;
}

/**
 * Page de détail d'un invité
 * Affiche toutes les informations complètes d'un participant
 */
const ParticipantDetailPage = () => {
  const router = useRouter();

  // Données simulées du participant - En production, récupérer via l'ID dans l'URL
  const participant: Participant = {
    id: 1,
    nom: 'Koffi',
    prenom: 'Emmanuel',
    telephone: '0101010101',
    email: 'koffi@gmail.com',
    connecte: true,
    emargement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    activite: 'conference',
    datePremiereConnexion: '2024-01-20T09:30:00',
    dateDerniereConnexion: '2024-01-26T14:45:00',
  };

  /**
   * Retour à la page de gestion des participants
   */
  const handleBack = () => {
    router.push('/organisateur/gestionparticipant');
  };

  /**
   * Redirection vers la page d'édition
   */
  const handleEdit = () => {
    router.push(`/organisateur/gestionparticipant/edit/${participant.id}`);
  };

  /**
   * Fonction pour formater la date
   */
  const formatDate = (dateString: string) => {
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
   * Fonction pour obtenir les activités du participant
   */
  const getActivitiesList = () => {
    const activities = [
      'Activité 1',
      'Activité 2',
      'Activité 3',
      'Activité 4'
    ];
    return activities;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Stack spacing={4}>
        {/* En-tête avec breadcrumbs et navigation */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <IconButton
              onClick={handleBack}
              sx={{
                backgroundColor: 'grey.100',
                '&:hover': { backgroundColor: 'grey.200' },
                borderRadius: 1,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Détail de l'invité
              </Typography>
              <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleBack}
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Gestion des Participants
                </Link>
                <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                  {participant.nom} {participant.prenom}
                </Typography>
              </Breadcrumbs>
            </Box>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEdit}
              sx={{
                borderRadius: 1,
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              Modifier
            </Button>
          </Box>
        </Box>

        {/* Carte principale avec les informations */}
        <Card sx={{
          borderRadius: 2,
          boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          border: 1,
          borderColor: 'divider'
        }}>
          {/* En-tête de la carte */}
          <Box
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              p: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                width: 64,
                height: 64,
              }}
            >
              <PersonIcon sx={{ fontSize: 36 }} />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                {participant.nom} {participant.prenom}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Informations complètes du participant
              </Typography>
            </Box>
          </Box>

          {/* Contenu de la carte */}
          <Box sx={{ p: 4 }}>
            <Stack spacing={3}>
              {/* Section informations personnelles */}
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: 1, borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                  Informations Personnelles
                </Typography>

                <Grid container spacing={3}>
                  {/* Nom */}
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                        Nom :
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
                        Prénom :
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {participant.prenom}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <EmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                        Email :
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, color: 'primary.main' }}>
                        {participant.email}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Téléphone */}
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <PhoneIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                        Téléphone :
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {participant.telephone}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              {/* Section statut de connexion */}
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: 1, borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                  Statut de Connexion
                </Typography>

                <Stack spacing={2}>
                  {/* Connecté */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 180 }}>
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
                          <Typography variant="body1" sx={{ fontWeight: 500, color: 'success.main' }}>
                            En ligne
                          </Typography>
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

                  {/* Date de première connexion */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 180 }}>
                      Date de première connexion
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.datePremiereConnexion ? formatDate(participant.datePremiereConnexion) : 'Non disponible'}
                    </Typography>
                  </Box>

                  {/* Date de dernière connexion */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 180 }}>
                      Date de dernière connexion
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.dateDerniereConnexion ? formatDate(participant.dateDerniereConnexion) : 'Non disponible'}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              {/* Section émargement */}
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: 1, borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                  Émargement
                </Typography>

                {participant.emargement ? (
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Signature de l'invité
                    </Typography>
                    <Box
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 2,
                        p: 2,
                        backgroundColor: 'grey.50',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: 200,
                      }}
                    >
                      <Box
                        component="img"
                        src={participant.emargement}
                        alt="Signature"
                        sx={{
                          maxWidth: '100%',
                          maxHeight: 300,
                          objectFit: 'contain',
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="100"%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3ESignature%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 2,
                      p: 4,
                      backgroundColor: 'grey.50',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 500, color: 'warning.main' }}>
                      Aucune signature enregistrée
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      L'invité n'a pas encore émargé
                    </Typography>
                  </Box>
                )}
              </Paper>

              {/* Section activités */}
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: 1, borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                  Activités Suivies
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Activités suivies:
                  </Typography>
                  <Stack spacing={1.5}>
                    {getActivitiesList().map((activity, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          p: 1.5,
                          borderRadius: 1,
                          backgroundColor: 'grey.50',
                        }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                            flexShrink: 0,
                          }}
                        />
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {activity}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Paper>
            </Stack>
          </Box>
        </Card>

        {/* Footer */}
        <Box sx={{
          mt: 4,
          py: 3,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 EVENTQUORUM. Powered by FX_LABS SARL.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="text" size="small" sx={{ textTransform: 'none' }}>
              Confidentialité
            </Button>
            <Button variant="text" size="small" sx={{ textTransform: 'none' }}>
              Aide
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ParticipantDetailPage;