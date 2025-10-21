// superviseur/activites/[id]/components/activity-description.tsx

'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { Lightbox, useLightBox } from 'src/components/lightbox';

interface ActivityDescriptionProps {
  activity: any;
  activityId: string;
}

export default function ActivityDescription({ activity, activityId }: ActivityDescriptionProps) {
  const [selectedIntervenant, setSelectedIntervenant] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  // font size helpers used in sx props
  const fontSizes = {
    subtitle1: { fontSize: '0.95rem' },
    caption: { fontSize: '0.75rem' },
  };

  // Galerie photos
  const slides = activity.photos?.map((photo: string) => ({ src: photo })) || [];
  const {
    selected: selectedImage,
    open: openLightbox,
    onOpen: handleOpenLightbox,
    onClose: handleCloseLightbox,
  } = useLightBox(slides);

  const handleOpenDialog = (intervenant: any) => {
    setSelectedIntervenant(intervenant);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTimeout(() => setSelectedIntervenant(null), 300);
  };

  // TODO: API - Télécharger un document
  const handleDownloadDocument = async () => {
    if (!activity.hasDocument) return;
    console.log(`Téléchargement: ${activity.documentUrl}`);
    // const response = await fetch(`/api/activities/${activityId}/documents/download`);
  };

  // TODO: API - Lire une vidéo
  const handleWatchVideo = () => {
    if (!activity.hasVideo) return;
    console.log(`Lecture: ${activity.videoUrl}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: activity.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const InfoItem = ({ icon, label, value }: { icon: string; label: string; value: string | undefined }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
      <Box sx={{
        width: 48,
        height: 48,
        borderRadius: 2,
        bgcolor: 'primary.lighter',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Iconify icon={icon} width={24} sx={{ color: 'primary.main' }} />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" display="block">
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          {value || '-'}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Grid container spacing={3}>
      {/* Colonne principale */}
      <Grid size={{ xs: 12, lg: 8 }}>
        <Stack spacing={4}>
          
          <Box sx={{ p: 4, borderRadius: 2 }}>
            {/* Description */}
            {/* <Typography variant="h6" mb={2} fontWeight={600} display="flex" alignItems="center" gap={1}>
              <Iconify icon="solar:document-text-bold-duotone" width={24} color="primary.main" />
              Description
            </Typography>
            <Typography variant="body1" lineHeight={1.8} color="text.secondary">
              {activity.description}
            </Typography> */}
            
            {/* Objectifs */}
            <Box>
              <Typography variant="h6" mb={2} fontWeight={600} display="flex" alignItems="center" gap={1}>
                <Iconify icon="solar:target-bold" width={24} color="success.main" />
                Objectifs de l'activité
              </Typography>
              <Typography variant="body2" lineHeight={1.6} color="text.secondary">
                {activity.objectifs}
              </Typography>
            </Box>

            {/* Ressources */}
            <Box sx={{ pt: 4 }}>
              <Typography variant="h6" mb={3} fontWeight={600} display="flex" alignItems="center" gap={1}>
                {/* <Iconify icon="solar:folder-with-files-bold-duotone" width={24} color="primary.main" /> */}
                Ressources disponibles
              </Typography>

              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Iconify icon="mdi:link-variant" />}
                  onClick={handleShare}
                >
                  Lien
                </Button>

                {activity.hasDocument && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Iconify icon="solar:document-bold-duotone" />}
                    onClick={handleDownloadDocument}
                  >
                    Document
                  </Button>
                )}

                {activity.hasVideo && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Iconify icon="solar:videocamera-record-bold-duotone" />}
                    onClick={handleWatchVideo}
                  >
                    Vidéo
                  </Button>
                )}
              </Stack>
            </Box>

            {/* Galerie photos */}
            {slides.length > 0 && (
              <Box sx={{ pt: 4 }}>
                <Typography variant="h6" mb={3} fontWeight={600} display="flex" alignItems="center" gap={1}>
                  {/* <Iconify icon="solar:gallery-bold-duotone" width={24} color="primary.main" /> */}
                  Galerie photos
                </Typography>
                <Grid container spacing={1}>
                  {slides.slice(0, 3).map((slide: any, idx: number) => (
                    <Grid key={idx} size={{ xs: 12, sm: 4 }}>
                      <Image
                        alt={`Photo ${idx + 1}`}
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
              </Box>
            )}
          </Box>

          
          
        </Stack>
        {/* Intervenants */}
          {activity.intervenants?.length > 0 && (
            <Box sx={{px: 4}}>
              <Typography variant="h6" mb={3} fontWeight={600} display="flex" alignItems="center" gap={1}>
                <Iconify icon="solar:users-group-rounded-bold-duotone" width={24} color="primary.main" />
                Intervenants de l'activité
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
                {activity.intervenants.map((intervenant: any) => (
                  <Card
                    key={intervenant.id}
                    onClick={() => handleOpenDialog(intervenant)}
                    sx={{ p: 3, textAlign: 'center', cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
                  >
                    <Avatar src={intervenant.avatar} sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }} />
                    <Typography variant="subtitle1" fontWeight={600}>
                      {intervenant.nom}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {intervenant.poste}
                    </Typography>
                  </Card>
                ))}
              </Box>
            </Box>
          )}
      </Grid>

      {/* Sidebar */}
      <Grid size={{ xs: 12, lg: 4 }}>
      
        {/* Type d'accès */}
        <Card sx={{ position: 'sticky', top: 10 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" mb={2} fontWeight={600}>
              Type d'accès
            </Typography>

            <Stack spacing={2}>
                {activity.prix === 0 ? (
                  <Box sx={{ p: 2, bgcolor: 'success.lighter', borderRadius: 1, textAlign: 'center' }}>
                    <Typography variant="subtitle2" mb={1}>
                      Activité gratuite
                    </Typography>
                    <Typography variant="h6" color="success.main" fontWeight={700}>
                      Gratuit
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ p: 2, bgcolor: 'primary.lighter', borderRadius: 1, textAlign: 'center' }}>
                    <Typography variant="subtitle2" mb={1}>
                      {activity.standing}
                    </Typography>
                    <Typography variant="h6" color="primary.main" fontWeight={700}>
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
                        {/* <Typography variant="caption" color="text.secondary" sx={fontSizes.caption}>
                            • Présentation du badge obligatoire
                        </Typography> */}
                        <Typography variant="caption" color="text.secondary" sx={fontSizes.caption}>
                            • Supports fournis sur place
                        </Typography>
                        {/* <Typography variant="caption" color="text.secondary" sx={fontSizes.caption}>
                            • Activité déjà payée
                        </Typography> */}
                    </Stack>
                </Box>
            </Stack>
          </CardContent>
        </Card>
        
      </Grid>

      {/* Dialog intervenant */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedIntervenant && (
          <>
            <DialogTitle>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={selectedIntervenant.avatar} sx={{ width: 60, height: 60 }} />
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    {selectedIntervenant.nom}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedIntervenant.poste}
                  </Typography>
                </Box>
                <IconButton onClick={handleCloseDialog} sx={{ ml: 'auto' }}>
                  <Iconify icon="solar:close-circle-bold" />
                </IconButton>
              </Box>
            </DialogTitle>
            <Divider />
            <DialogContent>
              <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                {selectedIntervenant.bio}
              </Typography>
              <Box mt={3} display="flex" flexDirection="column" gap={2}>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Iconify icon="solar:letter-bold-duotone" color="success.main" width={22} />
                  <Typography variant="body2">{selectedIntervenant.email}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Iconify icon="solar:phone-calling-bold-duotone" color="warning.main" width={22} />
                  <Typography variant="body2">{selectedIntervenant.phone}</Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={handleCloseDialog} variant="contained" fullWidth>
                Fermer
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Grid>
  );
}