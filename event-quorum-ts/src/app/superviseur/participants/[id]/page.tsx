// File: src/app/superviseur/participants/[id]/page.tsx

'use client';

/**
 * PAGE: Détail d'un invité (Superviseur - Lecture seule)
 * 
 * Cette page affiche toutes les informations d'un invité de manière consultative.
 * Le superviseur peut uniquement consulter les données, sans possibilité de modification.
 * 
 * Sections affichées:
 * - Header avec bouton retour et breadcrumbs
 * - Informations personnelles (nom, prénom, téléphone, email)
 * - Type de connexion et date d'émargement
 * - Émargement (signature ou statut en ligne)
 * - Liste des activités de l'invité
 * 
 * @param params - Paramètres de la route (id de l'invité)
 */

import { useRouter } from 'next/navigation';
import { Box, Card, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Import des composants de détail
import {
  SuperviseurDetailHeader,
  SuperviseurInfoSection,
  SuperviseurConnectionSection,
  SuperviseurEmargementSection,
  SuperviseurActivitiesSection,
} from 'src/sections/superviseur/participants/detail';

// Import des données mockées
import { getSuperviseurInviteById } from 'src/_mock/_superviseurInvites';

// ============================================
// TYPES
// ============================================
interface PageProps {
  /** Paramètres de la route */
  params: {
    /** ID de l'invité */
    id: string;
  };
}

// ============================================
// COMPOSANT PRINCIPAL
// ============================================
export default function SuperviseurInviteDetailPage({ params }: PageProps) {
  // ============================================
  // HOOKS
  // ============================================
  const router = useRouter();
  const theme = useTheme();

  // Conversion de l'ID en nombre
  const inviteId = parseInt(params.id, 10);

  // ============================================
  // RÉCUPÉRATION DES DONNÉES
  // ============================================

  /**
   * Récupère les données de l'invité depuis le mock
   * TODO: Remplacer par un appel API réel
   * Exemple: const { data: invite, loading, error } = useFetch(`/api/superviseur/invites/${inviteId}`)
   */
  const invite = getSuperviseurInviteById(inviteId);

  // ============================================
  // GESTION DES ERREURS
  // ============================================

  // Si l'ID est invalide
  if (isNaN(inviteId)) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Card sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            ID invalide
          </Typography>
          <Typography variant="body1" color="text.secondary">
            L'identifiant de l'invité n'est pas valide.
          </Typography>
        </Card>
      </Box>
    );
  }

  // Si l'invité n'existe pas
  if (!invite) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Card sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Invité non trouvé
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            L'invité avec l'ID {inviteId} n'existe pas ou a été supprimé.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'primary.main',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={() => router.push('/superviseur/participants?tab=invites')}
          >
            ← Retour à la liste des invités
          </Typography>
        </Card>
      </Box>
    );
  }

  // ============================================
  // HANDLERS
  // ============================================

  /**
   * Gère le retour à la liste des invités
   * Redirige vers l'onglet "invités" de la page participants
   */
  const handleBack = () => {
    router.push('/superviseur/participants?tab=invites');
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Container principal avec largeur maximale */}
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>

        {/* ========== HEADER ========== */}
        <SuperviseurDetailHeader onBack={handleBack} />

        {/* ========== CONTENU PRINCIPAL ========== */}
        <Card
          sx={{
            mt: 3,
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            boxShadow:
              'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          }}
        >
          <Stack spacing={{ xs: 3, md: 4 }}>

            {/* ========== SECTION 1: INFORMATIONS PERSONNELLES ========== */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                  color: 'text.primary',
                }}
              >
                Informations personnelles
              </Typography>
              <SuperviseurInfoSection
                nom={invite.nom}
                prenom={invite.prenom}
                telephone={invite.telephone}
                email={invite.email}
              />
            </Box>

            {/* ========== DIVIDER ========== */}
            <Box
              sx={{
                height: 1,
                bgcolor: 'divider',
              }}
            />

            {/* ========== SECTION 2: TYPE DE CONNEXION ET DATE ========== */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                  color: 'text.primary',
                }}
              >
                Informations de participation
              </Typography>
              <SuperviseurConnectionSection
                typeConnexion={invite.typeConnexion}
                datePremiereConnexion={invite.datePremiereConnexion}
              />
            </Box>

            {/* ========== DIVIDER ========== */}
            <Box
              sx={{
                height: 1,
                bgcolor: 'divider',
              }}
            />

            {/* ========== SECTION 3: ÉMARGEMENT ========== */}
            <SuperviseurEmargementSection
              typeConnexion={invite.typeConnexion}
              emargement={invite.emargement}
            />

            {/* ========== DIVIDER ========== */}
            <Box
              sx={{
                height: 1,
                bgcolor: 'divider',
              }}
            />

            {/* ========== SECTION 4: ACTIVITÉS ========== */}
            <SuperviseurActivitiesSection activites={invite.activites} />

            {/* ========== SECTION BONUS: STATUT CHECKING (si applicable) ========== */}
            {invite.typeConnexion === 'en présentiel' && invite.emargement && (
              <>
                <Box
                  sx={{
                    height: 1,
                    bgcolor: 'divider',
                  }}
                />
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem' },
                      color: 'text.primary',
                    }}
                  >
                    Checking de présence
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: invite.checking ? 'success.main' : 'warning.main',
                      borderRadius: 1,
                      backgroundColor: invite.checking
                        ? 'success.lighter'
                        : 'warning.lighter',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 8, sm: 10 },
                        height: { xs: 8, sm: 10 },
                        borderRadius: '50%',
                        bgcolor: invite.checking ? 'success.main' : 'warning.main',
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: invite.checking ? 'success.main' : 'warning.main',
                        fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                      }}
                    >
                      {invite.checking
                        ? '✓ effectué'
                        : 'En attente de confirmation de présence'}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Stack>
        </Card>
      </Box>
    </Box>
  );
}