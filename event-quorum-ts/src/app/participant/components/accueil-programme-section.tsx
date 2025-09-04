
'use client';

import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type ProgrammeItem = {
  id: string;
  time: string;
  title: string;
  description: string;
  type: string;
  status?: 'Terminé' | 'En cours' | 'Non démarré';
  statusColor?: 'success' | 'warning' | 'default' | 'error';
  hasDocument?: boolean;
  hasVideo?: boolean;
};

const programmeData: ProgrammeItem[] = [
  {
    id: '1',
    time: '08H00 - 9H00',
    title: 'OUVERTURE DU SALON ET DU SARA MARKET AU PUBLIC',
    description: 'Ouverture officielle du salon avec accueil des participants et découverte des espaces d\'exposition.',
    type: 'Ouverture',
    status: 'Terminé',
    statusColor: 'success',
    hasDocument: true,
    hasVideo: true,
  },
  {
    id: '2',
    time: '09H00 - 12H00',
    title: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
    description: 'SOUS LA PRÉSIDENCE DE S.E.M. ALASSANE OUATTARA, À LA SALLE PLÉNIÈRE DU SITE DU SARA. REMISE DE KITS AUX JEUNES ENTREPRENEURS ET AUX FILIÈRES PAR LE PRÉSIDENT DE LA RÉPUBLIQUE.',
    type: 'Cérémonie',
    status: 'En cours',
    statusColor: 'warning',
    hasDocument: true,
    hasVideo: true,
  },
  {
    id: '3',
    time: '09H00 - 12H00',
    title: 'POINT DE PRESSE',
    description: 'Conférence de presse avec les organisateurs et les personnalités présentes.',
    type: 'Conférence',
    status: 'Non démarré',
    statusColor: 'default',
    hasDocument: true,
    hasVideo: true,
  },
  {
    id: '4',
    time: '09H00 - 12H00',
    title: 'PANEL DE HAUT NIVEAU (LES ASSISES DU SARA 2023)',
    description: 'Table ronde avec les experts du secteur agricole sur les enjeux et perspectives.',
    type: 'Panel',
    status: 'En cours',
    statusColor: 'warning',
    hasDocument: true,
    hasVideo: true,
  },
  {
    id: '5',
    time: '19H00',
    title: 'FERMETURE DU SALON ET DU SARA MARKET AU PUBLIC',
    description: 'Fermeture des espaces d\'exposition au grand public.',
    type: 'Fermeture',
    status: 'Non démarré',
    statusColor: 'default',
    hasDocument: true,
    hasVideo: true,
  },
  {
    id: '6',
    time: '19H00 - 22H00',
    title: 'NOCTURNES AU SARA VILLAGE (CONCERTS ET ANIMATIONS)',
    description: 'Soirée culturelle avec concerts et animations dans l\'espace village.',
    type: 'Animation',
    status: 'En cours',
    statusColor: 'warning',
    hasVideo: true,
    hasDocument: true,
  },
];

type Props = {
  version: 'accueil1' | 'accueil2' | 'accueil3';
  participationType?: 'presentiel' | 'en_ligne' | null;
  extraActions?: React.ReactNode; // Boutons supplémentaires pour accueil3/accueil4
};

export function AccueilProgrammeSection({ version, participationType, extraActions }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const infoPopover = usePopover();

  return (
    <Card sx={{ borderRadius: { xs: 1, md: 2 }, overflow: 'hidden', height: 'fit-content' }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        {/* Header avec titre, popover info et boutons supplémentaires */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600,
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem', lg: '1.5rem' }
              }}
            >
              PROGRAMME SARA 2023
            </Typography>
            
            <IconButton 
              onClick={infoPopover.onOpen}
              sx={{ color: 'primary.main' }}
            >
              <Iconify icon="solar:calendar-bold-duotone" />
            </IconButton>
          </Box>
          
          {/* Boutons supplémentaires pour accueil3 et accueil4 */}
          {extraActions && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {extraActions}
            </Box>
          )}
        </Box>
        
        {/* Liste des activités */}
        <Box>
          {programmeData.map((item) => (
            <Accordion 
              key={item.id}
              sx={{
                // '&:before': { display: 'none' },
                mb: 1,
                borderRadius: '8px !important',
              }}
            >
              <AccordionSummary 
                expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                sx={{
                  px: { xs: 1.5, md: 2 },
                  py: 1,
                  minHeight: { xs: 48, md: 60 },
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                  },
                }}
              >
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  alignItems={{ xs: 'flex-start', sm: 'center' }} 
                  spacing={{ xs: 1, sm: 2 }} 
                  sx={{ width: '100%' }}
                >
                  <Chip
                    label={item.time}
                    size="small"
                    sx={{
                      minWidth: { xs: 50, md: 60 },
                      fontWeight: 600,
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      fontSize: { xs: '0.625rem', md: '0.75rem' }
                    }}
                  />
                  
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      flex: 1, 
                      fontWeight: 500,
                      fontSize: { xs: '0.75rem', sm: '0.825rem', md: '0.875rem', lg: '1rem' }
                    }}
                  >
                    {item.title}
                  </Typography>
                  
                  {item.status && (
                    <Chip
                      label={item.status}
                      size="small"
                      color={item.statusColor}
                      variant="soft"
                      sx={{ 
                        fontWeight: 500,
                        fontSize: { xs: '0.625rem', md: '0.75rem' }
                      }}
                    />
                  )}
                </Stack>
              </AccordionSummary>
              
              <AccordionDetails sx={{ px: { xs: 1.5, md: 2 }, pb: 2 }}>
                <Stack spacing={1}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: { xs: '0.7rem', md: '0.875rem' }
                    }}
                  >
                    Type d'activité: <strong>{item.type}</strong>
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{
                      fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' },
                      lineHeight: { xs: 1.4, md: 1.5 }
                    }}
                  >
                    {item.description}
                  </Typography>
                  
                  {(item.hasDocument || item.hasVideo) && (
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      {item.hasDocument && (
                        <Button 
                          size="small" 
                          startIcon={<Iconify icon="solar:document-text-bold" />}
                          sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}
                        >
                          Document
                        </Button>
                      )}
                      {item.hasVideo && (
                        <Button 
                          size="small" 
                          startIcon={<Iconify icon="solar:videocamera-record-bold" />}
                          sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}
                        >
                          Voir la vidéo
                        </Button>
                      )}
                    </Stack>
                  )}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </CardContent>

      {/* Popover informations pratiques */}
      <CustomPopover
        open={infoPopover.open}
        onClose={infoPopover.onClose}
        anchorEl={infoPopover.anchorEl}
        slotProps={{ arrow: { placement: 'top-center' } }}
      >
        <Card sx={{ p: 3, borderRadius: 2, height: 'fit-content', minWidth: 300 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2, 
              fontWeight: 600, 
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } 
            }}
          >
            Informations pratiques
          </Typography>
          
          <Stack 
            direction={{ xs: 'row', md: 'column' }} 
            spacing={{ xs: 2, md: 2 }}
            sx={{ 
              overflowX: { xs: 'auto', md: 'visible' },
              pb: { xs: 1, md: 0 }
            }}
          >
            <Box sx={{ minWidth: { xs: 120, md: 'auto' } }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 0.5,
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.9375rem' }
                }}
              >
                📅 Dates
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary', 
                  fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem' }
                }}
              >
                Du 29 septembre au 08 octobre 2023
              </Typography>
            </Box>
            
            <Divider 
              orientation={isMobile ? 'vertical' : 'horizontal'}
              flexItem 
              sx={{ 
                mx: { xs: 1, md: 0 },
                my: { xs: 0, md: 1 }
              }} 
            />
            
            <Box sx={{ minWidth: { xs: 120, md: 'auto' } }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 0.5,
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.9375rem' }
                }}
              >
                📍 Lieu
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary', 
                  fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem' }
                }}
              >
                Parc des Expositions d'Abidjan
              </Typography>
            </Box>
            
            <Divider 
              orientation={isMobile ? 'vertical' : 'horizontal'}
              flexItem 
              sx={{ 
                mx: { xs: 1, md: 0 },
                my: { xs: 0, md: 1 }
              }} 
            />
          </Stack>
        </Card>
      </CustomPopover>
    </Card>
  );
}