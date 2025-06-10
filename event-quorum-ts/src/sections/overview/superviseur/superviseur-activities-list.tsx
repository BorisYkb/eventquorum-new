import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { alpha, useTheme } from '@mui/material/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type ActivityData = {
  name: string;
  link: string;
  status: 'Terminé' | 'En cours' | 'Non démarrer';
  hasVideo: boolean;
  hasDocument: boolean;
};

export type ActivitiesListProps = CardProps & {
  title?: string;
  subheader?: string;
  tableData: ActivityData[];
};

export function ActivitiesList({ title, subheader, tableData, ...other }: ActivitiesListProps) {
  const theme = useTheme();

  // Modifier les données pour avoir des éléments grisés
  const modifiedTableData = tableData.map((item, index) => {
    if (index === 1) { // Deuxième élément
      return {
        ...item,
        link: '', // Pas de lien
        hasVideo: false // Pas de vidéo
      };
    }
    return item;
  });

  const getStatusColor = (status: ActivityData['status']) => {
    switch (status) {
      case 'Terminé':
        return 'success'; // Vert
      case 'En cours':
        return 'warning'; // Jaune
      case 'Non démarrer':
        return 'error'; // Rouge
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: ActivityData['status']) => {
    switch (status) {
      case 'Terminé':
        return 'eva:checkmark-circle-2-fill';
      case 'En cours':
        return 'eva:clock-fill';
      case 'Non démarrer':
        return 'eva:pause-circle-fill';
      default:
        return 'eva:radio-button-off-fill';
    }
  };

  return (
    <Card {...other}>
      <CardHeader 
        title={title} 
        subheader={subheader} 
        sx={{ pb: 3 }}
        action={
          <Chip 
            label={`${modifiedTableData.length} activités`}
            size="small"
            variant="soft"
            color="primary"
          />
        }
      />

      <TableContainer>
        <Scrollbar>
          <Table sx={{ minWidth: { xs: 650, md: 800 } }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: { xs: '60%', md: '45%' } }}>
                  <Typography variant="subtitle2">Activité</Typography>
                </TableCell>
                <TableCell sx={{ width: { xs: '25%', md: '35%' }, display: { xs: 'none', sm: 'table-cell' } }} align="center">
                  <Typography variant="subtitle2">Ressources</Typography>
                </TableCell>
                <TableCell sx={{ width: { xs: '40%', md: '20%' } }} align="center">
                  <Typography variant="subtitle2">Statut</Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {modifiedTableData.map((row, index) => (
                <TableRow 
                  key={index}
                  hover
                  sx={{
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  {/* Colonne Activité */}
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: alpha(theme.palette.primary.main, 0.12),
                          color: theme.palette.primary.main,
                        }}
                      >
                        <Iconify icon="eva:activity-fill" width={20} />
                      </Avatar>
                      
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography 
                          variant="subtitle2" 
                          noWrap
                          sx={{ mb: 0.5 }}
                        >
                          {row.name}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Colonne Ressources - Cachée sur mobile */}
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }} align="center">
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
                      {/* Icône de lien externe */}
                      <Tooltip title={row.link ? "Lien externe" : "Pas de lien"}>
                        <IconButton 
                          component={row.link ? "a" : "div"}
                          href={row.link || undefined}
                          target={row.link ? "_blank" : undefined}
                          rel={row.link ? "noopener noreferrer" : undefined}
                          size="small"
                          sx={{
                            color: row.link ? 'primary.main' : 'text.disabled',
                            backgroundColor: row.link 
                              ? alpha(theme.palette.primary.main, 0.12)
                              : alpha(theme.palette.grey[500], 0.08),
                            '&:hover': {
                              backgroundColor: row.link 
                                ? alpha(theme.palette.primary.main, 0.2)
                                : alpha(theme.palette.grey[500], 0.16),
                            },
                            cursor: row.link ? 'pointer' : 'default',
                          }}
                        >
                          <Iconify icon="eva:external-link-fill" width={16} />
                        </IconButton>
                      </Tooltip>

                      {/* Icône vidéo */}
                      <Tooltip title={row.hasVideo ? "Vidéo disponible" : "Pas de vidéo"}>
                        <IconButton 
                          size="small"
                          sx={{
                            color: row.hasVideo ? 'success.main' : 'text.disabled',
                            backgroundColor: row.hasVideo 
                              ? alpha(theme.palette.success.main, 0.12)
                              : alpha(theme.palette.grey[500], 0.08),
                            '&:hover': {
                              backgroundColor: row.hasVideo 
                                ? alpha(theme.palette.success.main, 0.2)
                                : alpha(theme.palette.grey[500], 0.16),
                            },
                          }}
                        >
                          <Iconify icon="eva:video-fill" width={16} />
                        </IconButton>
                      </Tooltip>
                      
                      {/* Icône document */}
                      <Tooltip title={row.hasDocument ? "Document disponible" : "Pas de document"}>
                        <IconButton 
                          size="small"
                          sx={{
                            color: row.hasDocument ? 'info.main' : 'text.disabled',
                            backgroundColor: row.hasDocument 
                              ? alpha(theme.palette.info.main, 0.12)
                              : alpha(theme.palette.grey[500], 0.08),
                            '&:hover': {
                              backgroundColor: row.hasDocument 
                                ? alpha(theme.palette.info.main, 0.2)
                                : alpha(theme.palette.grey[500], 0.16),
                            },
                          }}
                        >
                          <Iconify icon="eva:file-text-fill" width={16} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>

                  {/* Colonne Statut */}
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <Label 
                        variant="soft" 
                        color={getStatusColor(row.status)}
                        sx={{ 
                          minWidth: { xs: 80, sm: 100 },
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}
                      >
                        {row.status}
                      </Label>
                      
                      {/* Ressources sur mobile - affichées sous le statut */}
                      <Box sx={{ 
                        display: { xs: 'flex', sm: 'none' }, 
                        gap: 0.5,
                        mt: 0.5
                      }}>
                        {row.link ? (
                          <Tooltip title="Lien externe">
                            <IconButton 
                              component="a"
                              href={row.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="small"
                              sx={{ p: 0 }}
                            >
                              <Iconify 
                                icon="eva:external-link-fill" 
                                width={16} 
                                sx={{ color: 'primary.main' }}
                              />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Pas de lien">
                            <Iconify 
                              icon="eva:external-link-fill" 
                              width={16} 
                              sx={{ color: 'text.disabled' }}
                            />
                          </Tooltip>
                        )}
                        {row.hasVideo && (
                          <Tooltip title="Vidéo disponible">
                            <Iconify 
                              icon="eva:video-fill" 
                              width={16} 
                              sx={{ color: 'success.main' }}
                            />
                          </Tooltip>
                        )}
                        {row.hasDocument && (
                          <Tooltip title="Document disponible">
                            <Iconify 
                              icon="eva:file-text-fill" 
                              width={16} 
                              sx={{ color: 'info.main' }}
                            />
                          </Tooltip>
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      {/* Footer avec statistiques */}
      <Box 
        sx={{ 
          p: 2, 
          borderTop: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
          backgroundColor: alpha(theme.palette.grey[500], 0.04),
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1
        }}>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                backgroundColor: theme.palette.success.main 
              }} />
              <Typography variant="caption">
                {modifiedTableData.filter(item => item.status === 'Terminé').length} Terminées
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                backgroundColor: theme.palette.warning.main 
              }} />
              <Typography variant="caption">
                {modifiedTableData.filter(item => item.status === 'En cours').length} En cours
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                backgroundColor: theme.palette.error.main 
              }} />
              <Typography variant="caption">
                {modifiedTableData.filter(item => item.status === 'Non démarrer').length} Non démarrées
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}