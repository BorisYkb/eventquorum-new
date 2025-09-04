// src/app/participant/enligne/payer/activites/components/activites-payees-list.tsx
'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import { useTheme, useMediaQuery } from '@mui/material';
import { CONFIG } from 'src/global-config';

import type { ActivitePayee } from './activites-payees-data';

// ----------------------------------------------------------------------

interface ActivitesPayeesListProps {
  activites: ActivitePayee[];
}

/**
 * Composant de liste des activités payées avec gestion responsive
 * et tailles de police dynamiques selon l'écran
 */
export function ActivitesPayeesList({ activites }: ActivitesPayeesListProps) {
  // Hooks pour la gestion responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  /**
   * Calcule les tailles de police responsives
   */
  const getResponsiveFontSizes = () => {
    if (isMobile) {
      return {
        // En-têtes de tableau
        tableHeader: { fontSize: '0.75rem', fontWeight: 600 },
        // Titre d'activité
        subtitle2: { fontSize: '0.8125rem', fontWeight: 600 },
        // Description
        body2: { fontSize: '0.7rem', fontWeight: 400 },
        // Prix
        priceText: { fontSize: '0.75rem', fontWeight: 600 },
        // Date
        dateText: { fontSize: '0.7rem', fontWeight: 400 },
        // Chips
        chip: { fontSize: '0.625rem' },
        // Icônes
        iconSize: { width: 16, height: 16 }
      };
    }

    if (isTablet) {
      return {
        tableHeader: { fontSize: '0.8125rem', fontWeight: 600 },
        subtitle2: { fontSize: '0.875rem', fontWeight: 600 },
        body2: { fontSize: '0.75rem', fontWeight: 400 },
        priceText: { fontSize: '0.8125rem', fontWeight: 600 },
        dateText: { fontSize: '0.75rem', fontWeight: 400 },
        chip: { fontSize: '0.6875rem' },
        iconSize: { width: 17, height: 17 }
      };
    }

    // Desktop - tailles par défaut
    return {
      tableHeader: { fontSize: '0.875rem', fontWeight: 600 },
      subtitle2: { fontSize: '0.9375rem', fontWeight: 600 },
      body2: { fontSize: '0.8125rem', fontWeight: 400 },
      priceText: { fontSize: '0.875rem', fontWeight: 600 },
      dateText: { fontSize: '0.8125rem', fontWeight: 400 },
      chip: { fontSize: '0.75rem' },
      iconSize: { width: 18, height: 18 }
    };
  };

  const fontSizes = getResponsiveFontSizes();

  /**
   * Gestion du téléchargement de document
   */
  const handleDownloadDocument = (activite: ActivitePayee) => {
    if (!activite.hasDocument || !activite.documentUrl) return;
    console.log(`Download document: ${activite.documentUrl}`);
    // TODO: Implémenter téléchargement document
  };

  /**
   * Gestion de la lecture vidéo
   */
  const handleWatchVideo = (activite: ActivitePayee) => {
    if (!activite.hasVideo || !activite.videoUrl) return;
    console.log(`Watch video: ${activite.videoUrl}`);
    // TODO: Implémenter lecture vidéo
  };

  /**
   * Détermine si une ressource est désactivée
   */
  const isResourceDisabled = (activite: ActivitePayee, resourceType: 'document' | 'video') => {
    // Désactiver si activité non démarrée OU si la ressource n'existe pas
    const hasResource = resourceType === 'document' ? activite.hasDocument : activite.hasVideo;
    return activite.status === 'Non démarré' || !hasResource;
  };

  // État vide - aucune activité payée
  if (activites.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            fontSize: isMobile ? '1rem' : isTablet ? '1.125rem' : '1.25rem',
            fontWeight: 600
          }}
        >
          Aucune activité payée
        </Typography>
        <Typography
          variant="body2"
          color="text.disabled"
          sx={{
            mt: 1,
            fontSize: isMobile ? '0.75rem' : isTablet ? '0.8125rem' : '0.875rem'
          }}
        >
          Les activités payées apparaîtront ici une fois les paiements effectués
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      sx={{
        boxShadow: 2,
        borderRadius: 1,
        // Scroll horizontal sur mobile pour les tableaux larges
        overflowX: 'auto'
      }}
    >
      <Table sx={{ minWidth: isMobile ? 800 : 'auto' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={fontSizes.tableHeader}>
              Activité
            </TableCell>
            <TableCell sx={fontSizes.tableHeader}>
              Horaire
            </TableCell>
            <TableCell sx={fontSizes.tableHeader}>
              Statut
            </TableCell>
            <TableCell sx={fontSizes.tableHeader}>
              Place
            </TableCell>
            <TableCell sx={fontSizes.tableHeader}>
              Prix payé
            </TableCell>
            <TableCell sx={fontSizes.tableHeader}>
              Date paiement
            </TableCell>
            <TableCell sx={{
              ...fontSizes.tableHeader,
              textAlign: 'center'
            }}>
              Ressources
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activites.map((activite) => (
            <TableRow key={activite.id} hover>
              {/* Colonne Activité */}
              <TableCell sx={{ minWidth: isMobile ? 200 : 'auto' }}>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={fontSizes.subtitle2}
                  >
                    {activite.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 0.5,
                      ...fontSizes.body2
                    }}
                  >
                    {activite.description}
                  </Typography>
                </Box>
              </TableCell>

              {/* Colonne Horaire */}
              <TableCell>
                <Chip
                  label={activite.time}
                  size="small"
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    ...fontSizes.chip,
                    fontWeight: 600
                  }}
                />
              </TableCell>

              {/* Colonne Statut */}
              <TableCell>
                <Chip
                  label={activite.status}
                  size="small"
                  color={activite.statusColor}
                  variant="soft"
                  sx={{
                    ...fontSizes.chip,
                    fontWeight: 500
                  }}
                />
              </TableCell>

              {/* Colonne Place */}
              <TableCell>
                <Typography
                  variant="body2"
                  sx={{
                    ...fontSizes.body2,
                    fontWeight: 500
                  }}
                >
                  {activite.standing}
                </Typography>
              </TableCell>

              {/* Colonne Prix */}
              <TableCell>
                <Typography
                  variant="body2"
                  sx={{
                    ...fontSizes.priceText,
                    color: 'success.main'
                  }}
                >
                  {activite.prix === 0 ? 'Gratuit' : `${activite.prix.toLocaleString()} FCFA`}
                </Typography>
              </TableCell>

              {/* Colonne Date paiement */}
              <TableCell>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={fontSizes.dateText}
                >
                  {new Date(activite.datePaiement).toLocaleDateString('fr-FR')}
                </Typography>
              </TableCell>

              {/* Colonne Ressources */}
              <TableCell>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                  {/* Bouton Document avec icône SVG */}
                  <IconButton
                    size="small"
                    onClick={() => handleDownloadDocument(activite)}
                    disabled={isResourceDisabled(activite, 'document')}
                    title={isResourceDisabled(activite, 'document') ? 'Document indisponible' : 'Télécharger le document'}
                    sx={{
                      color: isResourceDisabled(activite, 'document') ? 'text.disabled' : 'primary.main',
                      '&:hover': {
                        bgcolor: isResourceDisabled(activite, 'document') ? 'transparent' : 'primary.lighter'
                      },
                      // Transition fluide
                      transition: theme.transitions.create(['color', 'background-color'], {
                        duration: theme.transitions.duration.shortest,
                      }),
                    }}
                  >
                    <Box
                      component="img"
                      src={`${CONFIG.assetsDir}/assets/icons/files/ic-document.svg`}
                      sx={fontSizes.iconSize}
                      alt="Document"
                    />
                  </IconButton>

                  {/* Bouton Vidéo avec icône SVG */}
                  <IconButton
                    size="small"
                    onClick={() => handleWatchVideo(activite)}
                    disabled={isResourceDisabled(activite, 'video')}
                    title={isResourceDisabled(activite, 'video') ? 'Vidéo indisponible' : 'Voir la vidéo'}
                    sx={{
                      color: isResourceDisabled(activite, 'video') ? 'text.disabled' : 'secondary.main',
                      '&:hover': {
                        bgcolor: isResourceDisabled(activite, 'video') ? 'transparent' : 'secondary.lighter'
                      },
                      // Transition fluide
                      transition: theme.transitions.create(['color', 'background-color'], {
                        duration: theme.transitions.duration.shortest,
                      }),
                    }}
                  >
                    <Box
                      component="img"
                      src={`${CONFIG.assetsDir}/assets/icons/files/ic-video.svg`}
                      sx={fontSizes.iconSize}
                      alt="Vidéo"
                    />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}