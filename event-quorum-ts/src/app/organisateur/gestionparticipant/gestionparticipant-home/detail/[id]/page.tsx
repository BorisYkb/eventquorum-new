//src/app/organisateur/gestionparticipant/gestionparticipant-home/detail/[id]/page.tsx

'use client';

import { useParams, useRouter } from 'next/navigation';

import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import {
  Box,
  Card,
  Container,
  Stack,
  Typography,
  Button,
  IconButton,
  Grid,
  Breadcrumbs,
  Link,
  Chip,
} from '@mui/material';

/**
 * Type représentant un participant
 */
interface Participant {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  connecte: boolean;
  emargement: string | null;
  activite: string;
  typeConnexion: 'en ligne' | 'en présentiel';
  activites: string[]; // Liste des activités
  datePremiereConnexion?: string;
  dateDerniereConnexion?: string;
}

/**
 * Page de détail d'un invité
 * Affiche les informations complètes d'un participant
 */
const ParticipantDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const participantId = params.id as string;

  // Données simulées du participant
  // TODO: Récupérer les vraies données via l'API avec l'ID
  const participant: Participant = {
    id: parseInt(participantId, 10),
    nom: 'Koffi',
    prenom: 'Emmanuel',
    telephone: '0101010101',
    email: 'koffi@gmail.com',
    connecte: true,
    emargement:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    activite: 'conference',
    typeConnexion: 'en présentiel', // 'en ligne' ou 'en présentiel'
    activites: ['Conférence principale', 'Atelier pratique'],
    datePremiereConnexion: '2024-01-20T09:30:00',
    dateDerniereConnexion: '2024-01-26T14:45:00',
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

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Stack spacing={4}>
        {/* En-tête avec breadcrumbs */}
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
                  Information sur l'invité
              </Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleBack}
                  sx={{
                    textDecoration: 'none',
                    
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Gestion des invités
                </Link>
                <Typography variant="body2"  sx={{ fontWeight: 500 }}>
                  Détail de l'invité
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
                fontWeight: 600,
              }}
            >
              Modifier
            </Button>
          </Box>
        </Box>

        {/* Carte principale */}
        <Card
          sx={{
            borderRadius: 2,
            boxShadow:
              'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
            p: 4,
          }}
        >
          <Stack spacing={4}>
            

            {/* Grille des informations - Nom, Prénom, Téléphone */}
            <Grid container spacing={3}>
              {/* Nom */}
              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    Nom
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      backgroundColor: 'grey.50',
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.nom}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              {/* Prénom */}
              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    Prénom
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      backgroundColor: 'grey.50',
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.prenom}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              {/* Téléphone */}
              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    Téléphone
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      backgroundColor: 'grey.50',
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.telephone}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              {/* Email - Prend toute la largeur */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      backgroundColor: 'grey.50',
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.email}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
              
            <Box sx={{display: "flex", flexDirection: "row", gap: 10}}>
              {/* Type de connexion */}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    Type de connexion
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      backgroundColor: 'grey.50',
                    }}
                  >
                    <Chip
                      label={participant.typeConnexion === 'en ligne' ? 'En ligne' : 'En présentiel'}
                      color={participant.typeConnexion === 'en ligne' ? 'info' : 'success'}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </Box>
                </Stack>
              </Grid>
                  
              {/* Date d'émargement */}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    Date d'émargement
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      backgroundColor: 'grey.50',
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.datePremiereConnexion 
                        ? formatDate(participant.datePremiereConnexion)
                        : 'Non émargé'
                      }
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Box>

            {/* Section Activités */}
            <Box>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}
              >
                Activités de l'invité
              </Typography>

              <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                {participant.activites.map((activite, index) => (
                  <Chip
                    key={index}
                    label={activite}
                    onDelete={() => {}}
                    deleteIcon={<CloseIcon />}
                    sx={{
                      backgroundColor: '#212B36',
                      color: 'white',
                      fontWeight: 500,
                      '& .MuiChip-deleteIcon': {
                        color: 'white',
                        '&:hover': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Section Émargement */}
            <Box>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}
              >
                Émargement
              </Typography>

              {participant.typeConnexion === 'en ligne' ? (
                // Affichage pour connexion en ligne
                <Box
                  sx={{
                    p: 3,
                    border: 1,
                    borderColor: 'success.main',
                    borderRadius: 1,
                    backgroundColor: 'success.lighter',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                    En ligne
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Ce participant suit l'événement en ligne
                  </Typography>
                </Box>
              ) : (
                // Affichage pour connexion en présentiel (miniature signature)
                <Box>
                  {participant.emargement ? (
                    <Box
                      sx={{
                        width: 200,
                        height: 100,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        backgroundColor: 'grey.50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        component="img"
                        src={participant.emargement}
                        alt="Signature"
                        sx={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="100"%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3ESignature%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: 200,
                        height: 100,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        backgroundColor: 'grey.50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="body2" color="text.secondary" fontStyle="italic">
                        Pas de signature
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};

export default ParticipantDetailPage;