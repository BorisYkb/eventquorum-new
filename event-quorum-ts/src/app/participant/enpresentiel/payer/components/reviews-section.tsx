// src/app/participant/components/reviews-section.tsx
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Tooltip from '@mui/material/Tooltip';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/**
 * Interface pour un avis donné par le participant
 */
interface ReviewData {
  id: number;
  type: 'activity' | 'event';
  title: string;
  rating: number;
  comment: string;
  date: string;
}

/**
 * Données fictives pour les avis existants
 */
const EXISTING_REVIEWS: ReviewData[] = [
  {
    id: 1,
    type: 'activity',
    title: 'Activité 1',
    rating: 3,
    comment: 'Certaines parties de l\'activité manquaient d\'interaction, ce qui aurait pu rendre l\'expérience plus engageante.',
    date: '12/05/2024 10H00',
  },
  {
    id: 2,
    type: 'event',
    title: 'Évènement',
    rating: 5,
    comment: 'Je tiens à exprimer ma profonde satisfaction',
    date: '12/05/2024 10H00',
  },
];

/**
 * Options disponibles pour donner des avis
 */
const REVIEW_OPTIONS = [
  { value: 'activity', label: 'Activité' },
  { value: 'event', label: 'Évènement' },
];

/**
 * Liste des activités disponibles (simulée)
 */
const AVAILABLE_ACTIVITIES = [
  'Activité 1',
  'Activité 2',
  'Activité 3',
];

// ----------------------------------------------------------------------

/**
 * Props pour le composant ReviewsSection
 */
interface ReviewsSectionProps {
  /** Classes CSS personnalisées */
  sx?: any;
}

/**
 * Section Avis pour la page Mes Interactions
 * Permet aux participants de donner leur avis sur les activités et événements
 * et de consulter leurs avis précédents
 * 
 * @param sx - Styles personnalisés
 */
export function ReviewsSection({ sx }: ReviewsSectionProps) {
  // Hooks pour la responsivité
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // État pour contrôler l'ouverture/fermeture de la modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // États pour le formulaire d'avis
  const [selectedType, setSelectedType] = useState<'activity' | 'event' | ''>('');
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  // État pour la liste des avis (simulation d'un état global)
  const [reviews, setReviews] = useState<ReviewData[]>(EXISTING_REVIEWS);

  // Statut simulé (dans la vraie app ça viendra de l'API)
  const getStatus = (rating: number) => {
    if (rating >= 4) return { label: 'Terminé', color: 'success.main' };
    if (rating === 3) return { label: 'En cours', color: 'warning.main' };
    return { label: 'Non démarré', color: 'error.main' };
  };

  /**
   * Gestionnaire d'ouverture de la modal
   */
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  /**
   * Gestionnaire de fermeture de la modal
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  /**
   * Gestionnaire de soumission du formulaire d'avis
   */
  const handleSubmitReview = () => {
    // Validation basique
    if (!rating || !reviewText.trim()) {
      return;
    }

    if (selectedType === 'activity' && !selectedActivity) {
      return;
    }

    // Création du nouvel avis
    const newReview: ReviewData = {
      id: Date.now(),
      type: selectedType as 'activity' | 'event',
      title: selectedType === 'activity' ? selectedActivity : 'Évènement',
      rating,
      comment: reviewText,
      date: new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).replace(',', ''),
    };

    // Ajout à la liste des avis
    setReviews(prev => [newReview, ...prev]);

    // Fermeture de la modal et réinitialisation du formulaire
    handleCloseModal();
  };

  /**
   * Réinitialisation du formulaire
   */
  const resetForm = () => {
    setSelectedType('');
    setSelectedActivity('');
    setReviewText('');
    setRating(0);
  };

  /**
   * Gestionnaire de changement des radio buttons
   */
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value as 'activity' | 'event');
    // Réinitialiser l'activité sélectionnée si on change de type
    if (event.target.value !== 'activity') {
      setSelectedActivity('');
    }
  };

  /**
   * Rendu du bouton pour ouvrir la modal
   */
  const renderReviewButton = () => (
    <Box sx={{ mb: { xs: 3, sm: 4 }, textAlign: 'start' }}>
      <Button
        variant="contained"
        onClick={handleOpenModal}
        // startIcon={<Iconify icon="solar:star-bold-duotone" />}
        sx={{
          textTransform: 'none',
          fontWeight: 600,
          px: { xs: 1.5, sm: 2 },
          py: { xs: 0.5, sm: 1 },
          fontSize: { xs: '0.875rem', sm: '1rem' },
          borderRadius: 1,
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
          boxShadow: theme.customShadows?.z8 || 2,
        }}
      >
        Donnez un avis
      </Button>
    </Box>
  );

  /**
   * Rendu du formulaire de création d'avis dans la modal
   */
  const renderReviewModal = () => (
    <Dialog
      open={isModalOpen}
      onClose={handleCloseModal}
      maxWidth="sm"
      fullWidth
      fullScreen={isSmallMobile}
      PaperProps={{
        sx: {
          borderRadius: isSmallMobile ? 0 : 2,
          m: isSmallMobile ? 0 : 2,
        }
      }}
    >
      <DialogTitle sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pb: 2,
      }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            fontWeight: 600,
            color: 'primary.main',
          }}
        >
          Donner un avis
        </Typography>
        <IconButton
          onClick={handleCloseModal}
          size="small"
        >
          <Iconify icon="solar:close-bold" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Section des radio buttons pour choisir le type d'avis */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              fontWeight: 500,
            }}
          >
            Vous voulez donner vos avis sur ?
          </Typography>

          <FormControl component="fieldset">
            <RadioGroup
              value={selectedType}
              onChange={handleRadioChange}
              row={!isSmallMobile}
            >
              <FormControlLabel
                value="activity"
                control={
                  <Radio
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: { xs: 20, sm: 24 },
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    Activité
                  </Typography>
                }
              />
              <FormControlLabel
                value="event"
                control={
                  <Radio
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: { xs: 20, sm: 24 },
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    Évènement
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Sélecteur d'activité (affiché seulement si "Activité" est sélectionnée) */}
        {selectedType === 'activity' && (
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
              <InputLabel>Sélectionner une activité</InputLabel>
              <Select
                value={selectedActivity}
                label="Sélectionner une activité"
                onChange={(e) => setSelectedActivity(e.target.value)}
                sx={{
                  '& .MuiSelect-select': {
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  },
                }}
              >
                {AVAILABLE_ACTIVITIES.map((activity) => (
                  <MenuItem key={activity} value={activity}>
                    <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {activity}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {/* Section de notation et commentaire */}
        {selectedType && (
          <>
            {/* Question et système de notation par étoiles */}
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 2,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  fontWeight: 500,
                }}
              >
                {selectedType === 'activity'
                  ? `Vos avis sur ${selectedActivity || 'activité'}`
                  : 'Vos avis sur événement'
                }
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                }}
              >
                Quelle note donneriez-vous à votre expérience ?
              </Typography>

              {/* Système de notation par étoiles */}
              <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue || 0);
                }}
                size={isMobile ? 'medium' : 'large'}
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem' },
                  '& .MuiRating-iconFilled': {
                    color: '#ffc107',
                  },
                  '& .MuiRating-iconHover': {
                    color: '#ffb400',
                  },
                }}
              />
            </Box>

            {/* Champ de commentaire */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 1,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                }}
              >
                Laissez nous un commentaire
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={isMobile ? 3 : 4}
                placeholder="Votre commentaire..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                variant="outlined"
                size={isMobile ? 'small' : 'medium'}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& textarea': {
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    },
                  },
                }}
              />
            </Box>
          </>
        )}
      </DialogContent>

      {/* Actions de la modal */}
      <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
        <Button
          onClick={handleCloseModal}
          sx={{
            textTransform: 'none',
            color: 'text.secondary',
          }}
        >
          Annuler
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmitReview}
          disabled={
            !selectedType ||
            !rating ||
            !reviewText.trim() ||
            (selectedType === 'activity' && !selectedActivity)
          }
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            px: { xs: 2, sm: 3 },
            py: { xs: 0.5, sm: 1 },
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            borderRadius: 1,
            bgcolor: 'black',
            color: 'white',
            '&:hover': {
              bgcolor: '#333',
            },
          }}
        >
          Envoyer
        </Button>
      </DialogActions>
    </Dialog>
  );

  /**
   * Rendu du tableau des avis existants
   */
  const renderReviewsList = () => (
    <Card sx={{ overflow: 'hidden' }}>
      {/* En-tête de la liste */}
      <Box sx={{
        p: { xs: 2, sm: 3 },
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
          }}
        >
          Liste des avis
        </Typography>
      </Box>

      {/* Tableau responsive */}
      <TableContainer>
        <Table size={isMobile ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell sx={{
                fontWeight: 600,
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                py: { xs: 1, sm: 1.5 },
              }}>
                Évènement/Activité
              </TableCell>
              <TableCell sx={{
                fontWeight: 600,
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                py: { xs: 1, sm: 1.5 },
              }}>
                Note
              </TableCell>
              {!isSmallMobile && (
                <TableCell sx={{
                  fontWeight: 600,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  py: { xs: 1, sm: 1.5 },
                }}>
                  Commentaire
                </TableCell>
              )}
              <TableCell sx={{
                fontWeight: 600,
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                py: { xs: 1, sm: 1.5 },
              }}>
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id} hover>
                <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      fontWeight: 500,
                    }}
                  >
                    {review.title}
                  </Typography>
                </TableCell>

                <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        fontWeight: 600,
                      }}
                    >
                      {review.rating === 3 ? 'Moyen' :
                        review.rating >= 4 ? 'Très satisfait' : 'Insatisfait'}
                    </Typography>
                    <Rating
                      value={review.rating}
                      readOnly
                      size="small"
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: '#ffc107',
                        },
                      }}
                    />
                  </Box>
                </TableCell>

                {!isSmallMobile && (
                  <TableCell sx={{ py: { xs: 1, sm: 2 }, maxWidth: 300 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {review.comment}
                    </Typography>
                  </TableCell>
                )}

                <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  >
                    {review.date}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Message si aucun avis */}
      {reviews.length === 0 && (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Iconify
            icon="solar:star-bold-duotone"
            sx={{
              width: { xs: 48, sm: 64 },
              height: { xs: 48, sm: 64 },
              color: 'text.disabled',
              mb: 2,
            }}
          />
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
          >
            Aucun avis donné pour le moment
          </Typography>
          <Typography
            variant="body2"
            color="text.disabled"
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            Vos avis apparaîtront ici après soumission
          </Typography>
        </Box>
      )}
    </Card>
  );

  return (
    <Box sx={sx}>
      {renderReviewButton()}
      {renderReviewModal()}
      {renderReviewsList()}
    </Box>
  );
}