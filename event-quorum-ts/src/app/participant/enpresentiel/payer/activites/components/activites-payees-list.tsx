// src/app/participant/enligne/payer/activites/components/activites-payees-list.tsx

'use client';

import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';

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
  const router = useRouter();

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
   * Navigation vers la page de détail de l'activité
   */
  const handleViewActivityDetail = (activityId: string) => {
    router.push(`/participant/enpresentiel/payer/activites/${activityId}`);
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
              Acces
            </TableCell>
            <TableCell sx={fontSizes.tableHeader}>
              Prix payé (FCFA)
            </TableCell>
            <TableCell sx={fontSizes.tableHeader}>
              Date paiement
            </TableCell>
            {/* <TableCell sx={{
              ...fontSizes.tableHeader,
              textAlign: 'center'
            }}>
              Ressources
            </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {activites.map((activite) => (
            <TableRow key={activite.id} hover>
              {/* Colonne Activité avec lien cliquable */}
              <TableCell sx={{ minWidth: isMobile ? 200 : 'auto' }}>
                <Box>
                  <Link
                    component="button"
                    variant="subtitle2"
                    onClick={() => handleViewActivityDetail(activite.id)}
                    sx={{
                      ...fontSizes.subtitle2,
                      textAlign: 'left',
                      textDecoration: 'none',
                      color: 'primary.main',
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline',
                        color: 'primary.dark'
                      },
                      transition: theme.transitions.create(['color'], {
                        duration: theme.transitions.duration.shorter,
                      }),
                    }}
                  >
                    {activite.title}
                  </Link>
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
                  {activite.prix === 0 ? 'Gratuit' : `${activite.prix.toLocaleString()}`}
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

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}