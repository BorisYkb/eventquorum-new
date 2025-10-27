// superviseur/activites/[id]/components/activity-description.tsx

'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useTheme, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/global-config';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { Lightbox, useLightBox } from 'src/components/lightbox';

import { ACTIVITY_PHOTOS, INTERVENANTS_EXTENDED } from 'src/sections/superviseur/activites/sup-data-activites';

interface ActivityDescriptionProps {
  activity: any;
  activityId: string;
}

export default function ActivityDescription({ activity, activityId }: ActivityDescriptionProps) {
  const theme = useTheme();

  // Hooks pour la responsivité
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Gestion de la galerie photos
  const slides = ACTIVITY_PHOTOS.map((photo) => ({ src: photo.imageUrl }));
  const {
    selected: selectedImage,
    open: openLightbox,
    onOpen: handleOpenLightbox,
    onClose: handleCloseLightbox,
  } = useLightBox(slides);

  // États pour le dialog des intervenants
  const [selectedIntervenant, setSelectedIntervenant] = useState<typeof INTERVENANTS_EXTENDED[0] | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Handlers pour le dialog
  const handleOpenDialog = (intervenant: typeof INTERVENANTS_EXTENDED[0]) => {
    setSelectedIntervenant(intervenant);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTimeout(() => setSelectedIntervenant(null), 300);
  };

  /**
   * Calcule les tailles de police responsives
   */
  const getResponsiveFontSizes = () => {
    if (isMobile) {
      return {
        h5: { fontSize: '1.125rem', fontWeight: 600 },
        h6: { fontSize: '1rem', fontWeight: 600 },
        subtitle1: { fontSize: '0.8rem', fontWeight: 500 },
        body2: { fontSize: '0.75rem', fontWeight: 400 },
        caption: { fontSize: '0.6875rem', fontWeight: 400 },
        button: { fontSize: '0.75rem' },
        iconSize: { width: 15, height: 15 }
      };
    }

    if (isTablet) {
      return {
        h5: { fontSize: '1.25rem', fontWeight: 600 },
        h6: { fontSize: '1.125rem', fontWeight: 600 },
        subtitle1: { fontSize: '1rem', fontWeight: 500 },
        body2: { fontSize: '0.875rem', fontWeight: 400 },
        caption: { fontSize: '0.75rem', fontWeight: 400 },
        button: { fontSize: '0.875rem' },
        iconSize: { width: 17, height: 17 }
      };
    }

    // Desktop
    return {
      h5: { fontSize: '1.5rem', fontWeight: 600 },
      h6: { fontSize: '1.25rem', fontWeight: 600 },
      subtitle1: { fontSize: '1.125rem', fontWeight: 500 },
      body2: { fontSize: '1rem', fontWeight: 400 },
      caption: { fontSize: '0.875rem', fontWeight: 400 },
      button: { fontSize: '0.875rem' },
      iconSize: { width: 19, height: 19 }
    };
  };

  const fontSizes = getResponsiveFontSizes();

  /**
   * Gestion du téléchargement de document
   */
  const handleDownloadDocument = () => {
    if (!activity?.hasDocument || !activity?.documentUrl) return;
    console.log(`Download document: ${activity.documentUrl}`);
    // TODO: Implémenter téléchargement via API
  };

  /**
   * Gestion de la lecture vidéo
   */
  const handleWatchVideo = () => {
    if (!activity?.hasVideo || !activity?.videoUrl) return;
    console.log(`Watch video: ${activity.videoUrl}`);
    // TODO: Implémenter lecture vidéo via API
  };

  /**
   * Gestion du partage
   */
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: activity?.name,
        text: activity?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      console.log('Lien copié dans le presse-papiers');
    }
  };

  /**
   * Vérifier si c'est un paiement unique
   */
  const isPaymentUnique = () => activity?.prix === null;

  /**
   * Vérifier si c'est gratuit
   */
  const isFree = () => activity?.prix === 0;

  /**
   * Rendu de la galerie photos - Version 3 cadres en ligne
   */
  const renderGallery = () => (
    <>
      <Grid container spacing={1}>
        {slides.slice(0, 3).map((slide, idx) => (
          <Grid key={slide.src} size={{ xs: 12, sm: 4 }}>
            <Image
              alt={`Activity ${idx + 1}`}
              src={slide.src}
              ratio="1/1"
              onClick={() => handleOpenLightbox(slide.src)}
              sx={[
                (theme) => ({
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: theme.transitions.create('opacity'),
                  '&:hover': { opacity: 0.85 },
                  position: 'relative',
                  ...(idx === 2 &&
                    slides.length > 3 && {
                    '&::after': {
                      content: `"+" '${slides.length - 3}' " photos"`,
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0,0,0,0.45)',
                      color: 'white',
                      fontWeight: 700,
                      borderRadius: 2,
                    },
                  }),
                }),
              ]}
            />
          </Grid>
        ))}
      </Grid>

      <Lightbox index={selectedImage} slides={slides} open={openLightbox} close={handleCloseLightbox} />
    </>
  );

  /**
   * Rendu des intervenants
   */
  const renderIntervenants = () => (
    <>
      <Box sx={{ mt: 6, mb: 3 }}>
        <Typography variant="h5" sx={{ ...fontSizes.h5, mb: 3, textAlign: 'center' }}>
          Intervenants de l'activité
        </Typography>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: { xs: 2, sm: 2, md: 3 }
        }}>
          {INTERVENANTS_EXTENDED.map((intervenant, index) => (
            <Card
              key={intervenant.id}
              onClick={() => handleOpenDialog(intervenant)}
              sx={{
                textAlign: 'center',
                p: { xs: 2.5, md: 3 },
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                }
              }}
            >
              <Avatar
                alt={intervenant.nom}
                src={`${CONFIG.assetsDir}/assets/images/mock/avatar/avatar-${index + 1}.webp`}
                sx={{
                  width: { xs: 80, sm: 90, md: 100 },
                  height: { xs: 80, sm: 90, md: 100 },
                  mx: 'auto',
                  mb: 2,
                  border: '3px solid',
                  borderColor: 'primary.lighter'
                }}
              />

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 0.5,
                  fontSize: { xs: '0.9375rem', sm: '1rem', md: '1.125rem' }
                }}
              >
                {intervenant.nom}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 0.5,
                  fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.9375rem' }
                }}
              >
                {intervenant.poste}
              </Typography>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Dialog avec les détails de l'intervenant */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
      >
        {selectedIntervenant && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  alt={selectedIntervenant.nom}
                  src={`${CONFIG.assetsDir}/assets/images/mock/avatar/avatar-${INTERVENANTS_EXTENDED.findIndex(i => i.id === selectedIntervenant.id) + 1}.webp`}
                  sx={{
                    width: 60,
                    height: 60,
                    border: '2px solid',
                    borderColor: 'primary.main'
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {selectedIntervenant.nom}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedIntervenant.poste}
                  </Typography>
                </Box>
                <IconButton
                  onClick={handleCloseDialog}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8
                  }}
                >
                  <Iconify icon="solar:close-circle-bold" />
                </IconButton>
              </Box>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ py: 3 }}>
              <Stack spacing={3}>
                {/* Bio */}
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {selectedIntervenant.bio}
                  </Typography>
                </Box>

                <Divider />

                {/* Informations de contact */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1, sm: 2 },
                    flexWrap: 'wrap'
                  }}
                >
                  {/* LinkedIn */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: { xs: '1 1 100%', sm: '1 1 auto' } }}>
                    <Iconify
                      icon="skill-icons:linkedin"
                      sx={{ width: 22, height: 22 }}
                    />
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25 }}>
                        LinkedIn
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {selectedIntervenant.nom}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Email */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Iconify
                      icon="solar:letter-bold-duotone"
                      sx={{ color: 'success.main', width: 22, height: 22 }}
                    />
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25 }}>
                        Email
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {selectedIntervenant.email}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Téléphone */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Iconify
                      icon="solar:phone-calling-bold-duotone"
                      sx={{ color: 'warning.main', width: 22, height: 22 }}
                    />
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25 }}>
                        Téléphone
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {selectedIntervenant.phone}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Facebook */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: { xs: '1 1 100%', sm: '1 1 auto' } }}>
                    <Iconify
                      icon="logos:facebook"
                      sx={{ width: 22, height: 22 }}
                    />
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25 }}>
                        Facebook
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {selectedIntervenant.nom}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={handleCloseDialog} variant="contained" fullWidth>
                Fermer
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );

  return (
    <Box>
      {/* SECTION PRINCIPALE : 2/3 + 1/3 */}
      <Grid container spacing={{ xs: 3, md: 4 }}>
        {/* 2/3 : Contenu principal */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={4}>
            {/* Objectifs */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Iconify icon="solar:target-bold" sx={{ color: 'success.main', ...fontSizes.iconSize }} />
                <Typography variant="h6" sx={fontSizes.h6}>
                  Objectifs de l'Activité
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  ...fontSizes.body2,
                  color: 'text.secondary',
                  lineHeight: 1.8
                }}
              >
                {activity.description}
              </Typography>
            </Box>

            {/* Informations pratiques - Boutons de partage */}
            <Box>
              <Typography variant="h6" sx={{ ...fontSizes.h6, mb: 2 }}>
                Ressources disponibles
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                flexWrap={{ xs: 'nowrap', sm: 'wrap' }}
                alignItems={{ xs: 'stretch', sm: 'center' }}
              >
                <Button
                  color="inherit"
                  variant="outlined"
                  size="small"
                  startIcon={<Iconify icon="mdi:link-variant" sx={{ color: 'inherit' }} />}
                  onClick={handleShare}
                  disableElevation
                  disableRipple
                  sx={{
                    textTransform: 'none',
                    color: 'common.black',
                    ...fontSizes.button,
                    width: { xs: '100%', sm: 'auto' },
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                  }}
                >
                  Lien
                </Button>

                {activity.hasDocument && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={
                      <Box
                        component="img"
                        src={`${CONFIG.assetsDir}/assets/icons/files/ic-document.svg`}
                        sx={{ width: 16, height: 16 }}
                      />
                    }
                    onClick={handleDownloadDocument}
                    disabled={activity.status === 'Non démarrée'}
                    sx={{
                      textTransform: 'none',
                      ...fontSizes.button,
                      width: { xs: '100%', sm: 'auto' },
                    }}
                  >
                    Document
                  </Button>
                )}

                {activity.hasVideo && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={
                      <Box
                        component="img"
                        src={`${CONFIG.assetsDir}/assets/icons/files/ic-video.svg`}
                        sx={{ width: 16, height: 16 }}
                      />
                    }
                    onClick={handleWatchVideo}
                    disabled={activity.status === 'Non démarrée'}
                    sx={{
                      textTransform: 'none',
                      ...fontSizes.button,
                      width: { xs: '100%', sm: 'auto' },
                    }}
                  >
                    Vidéo
                  </Button>
                )}
              </Stack>
            </Box>

            {/* Galerie photos */}
            <Box>
              <Typography variant="h6" sx={{ ...fontSizes.h6, mb: 2 }}>
                Galerie photos
              </Typography>
              {renderGallery()}
            </Box>
          </Stack>
        </Grid>

        {/* 1/3 : Sidebar - Type d'accès */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="h6" sx={{ ...fontSizes.h6, mb: 2 }}>
                Type d'accès
              </Typography>

              <Stack spacing={2}>
                {/* Affichage du type de paiement */}
                {isPaymentUnique() ? (
                  <Box sx={{
                    p: 2,
                    bgcolor: 'primary.lighter',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'primary.light'
                  }}>
                    <Typography variant="subtitle2" sx={{ ...fontSizes.subtitle1, mb: 1, textAlign: 'center' }}>
                      Accès à toutes les activités
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        ...fontSizes.h6,
                        color: 'primary.main',
                        fontWeight: 700,
                        textAlign: 'center'
                      }}
                    >
                      20 000 FCFA
                    </Typography>
                  </Box>
                ) : isFree() ? (
                  <Box sx={{
                    p: 2,
                    bgcolor: 'success.lighter',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'success.light'
                  }}>
                    <Typography variant="subtitle2" sx={{ ...fontSizes.subtitle1, mb: 1, textAlign: 'center' }}>
                      Activité gratuite
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        ...fontSizes.h6,
                        color: 'success.main',
                        fontWeight: 700,
                        textAlign: 'center'
                      }}
                    >
                      Gratuit (0 FCFA)
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{
                    p: 2,
                    bgcolor: 'grey.50',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'grey.300',
                    textAlign: 'center'
                  }}>
                    <Typography variant="subtitle2" sx={{ ...fontSizes.subtitle1, mb: 1 }}>
                      {activity.standing}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        ...fontSizes.h6,
                        color: 'primary.main',
                        fontWeight: 700
                      }}
                    >
                      {activity.prix?.toLocaleString()} FCFA
                    </Typography>
                  </Box>
                )}

                {/* Informations pratiques */}
                <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="subtitle2" sx={{ ...fontSizes.subtitle1, mb: 1 }}>
                    À savoir
                  </Typography>

                  <Stack spacing={0.5}>
                    <Typography variant="caption" color="text.secondary" sx={fontSizes.caption}>
                      • Arrivée 15min avant le début
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={fontSizes.caption}>
                      • Supports fournis sur place
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={fontSizes.caption}>
                      • Activité supervisée
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Intervenants sur toute la largeur */}
      {renderIntervenants()}
    </Box>
  );
}