'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Chip,
  Autocomplete,
  TextField,
} from '@mui/material';
import { Upload } from 'src/components/upload';
import { Iconify } from 'src/components/iconify';
import { PhotoList } from './photo-list';

/**
 * Type pour une photo avec ses métadonnées
 */
type PhotoWithMetadata = {
  id: string;
  file: File;
  url: string;
  activityId?: string;
  activityName?: string;
  isEventPhoto: boolean;
  uploadDate: Date;
  clientName: string;
  clientLogo: string;
};

/**
 * Type pour une activité
 */
type Activity = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
};

/**
 * DONNÉES MOCKÉES - À remplacer par vos vraies données du backend plus tard
 */
const MOCK_ACTIVITIES: Activity[] = [
  { id: '1', name: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE', startTime: '09:00', endTime: '12:00' },
  { id: '2', name: 'POINT DE PRESSE', startTime: '09:00', endTime: '12:00' },
  { id: '3', name: 'PANEL DE HAUT NIVEAU', startTime: '11:00', endTime: '12:00' },
  { id: '4', name: 'PAUSE CAFE', startTime: '12:00', endTime: '13:00' },
  { id: '5', name: 'WORKSHOP', startTime: '14:00', endTime: '15:00' },
];

const CLIENT_NAME = 'Quorum Événementiel';
const CLIENT_LOGO = '/assets/images/avatar/avatar-1.webp';

/**
 * Composant principal de la photothèque
 * Gère l'upload et l'affichage des photos en frontend uniquement
 */
export default function Phototheque() {
  // État pour les fichiers temporaires (avant enregistrement)
  const [files, setFiles] = useState<(File | string)[]>([]);

  // État pour les checkboxes de sélection
  const [isActivityChecked, setIsActivityChecked] = useState(false);
  const [isEventChecked, setIsEventChecked] = useState(false);

  // État pour les activités sélectionnées (utilise des objets Activity complets)
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);

  // État pour les photos enregistrées (stockage en mémoire)
  const [savedPhotos, setSavedPhotos] = useState<PhotoWithMetadata[]>([]);

  // État pour afficher la prévisualisation dans Upload
  const [showPreview] = useState(true);

  /**
   * Gère le drop de fichiers multiples dans la zone d'upload
   * @param acceptedFiles - Fichiers acceptés par le composant Upload
   */
  const handleDropMultiFile = (acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
  };

  /**
   * Supprime un fichier de la liste temporaire (avant enregistrement)
   * @param inputFile - Fichier à supprimer (peut être File ou string)
   */
  const handleRemoveFile = (inputFile: File | string) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles(filesFiltered);
  };

  /**
   * Supprime tous les fichiers temporaires
   */
  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  /**
   * Gère le changement de la checkbox "Activité"
   * Si décochée, réinitialise la sélection des activités
   */
  const handleActivityCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActivityChecked(event.target.checked);
    if (!event.target.checked) {
      setSelectedActivities([]);
    }
  };

  /**
   * Gère le changement de la checkbox "Image de l'évènement"
   */
  const handleEventCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEventChecked(event.target.checked);
  };

  /**
   * Gère le changement de sélection des activités dans l'Autocomplete
   */
  const handleActivitySelectChange = (_event: React.SyntheticEvent, newValue: Activity[]) => {
    setSelectedActivities(newValue);
  };

  /**
   * Enregistre les photos avec les métadonnées
   * Crée une carte pour chaque combinaison (photo × destination)
   * 
   * Exemple : 2 photos × (2 activités + 1 événement) = 6 cartes créées
   */
  const handleSavePhotos = () => {
    // Validation 1 : Au moins une destination doit être sélectionnée
    if (!isActivityChecked && !isEventChecked) {
      alert('Veuillez sélectionner au moins une destination (Activité ou Image de l\'événement)');
      return;
    }

    // Validation 2 : Si activité cochée, au moins une activité doit être sélectionnée
    if (isActivityChecked && selectedActivities.length === 0) {
      alert('Veuillez sélectionner au moins une activité');
      return;
    }

    // Validation 3 : Au moins un fichier doit être uploadé
    if (files.length === 0) {
      alert('Veuillez uploader au moins une photo');
      return;
    }

    const newPhotos: PhotoWithMetadata[] = [];
    const uploadDate = new Date();

    // Pour chaque fichier uploadé, crée les cartes nécessaires
    files.forEach((file) => {
      // Ne traite que les objets File (pas les strings)
      if (!(file instanceof File)) return;

      // Crée une URL temporaire pour afficher l'image
      const fileUrl = URL.createObjectURL(file);

      // Crée une carte pour chaque activité sélectionnée
      if (isActivityChecked) {
        selectedActivities.forEach((activity) => {
          newPhotos.push({
            id: `${Date.now()}-${Math.random()}-${activity.id}-${file.name}`,
            file,
            url: fileUrl,
            activityId: activity.id,
            activityName: activity.name,
            isEventPhoto: false,
            uploadDate,
            clientName: CLIENT_NAME,
            clientLogo: CLIENT_LOGO,
          });
        });
      }

      // Crée une carte pour l'événement si la checkbox est cochée
      if (isEventChecked) {
        newPhotos.push({
          id: `${Date.now()}-${Math.random()}-event-${file.name}`,
          file,
          url: fileUrl,
          isEventPhoto: true,
          uploadDate,
          clientName: CLIENT_NAME,
          clientLogo: CLIENT_LOGO,
        });
      }
    });

    // Ajoute les nouvelles photos au début de la liste (les plus récentes en premier)
    setSavedPhotos([...newPhotos, ...savedPhotos]);

    // Réinitialise le formulaire après enregistrement
    setFiles([]);
    setIsActivityChecked(false);
    setIsEventChecked(false);
    setSelectedActivities([]);

    // Message de confirmation
    alert(`${newPhotos.length} photo(s) enregistrée(s) avec succès !`);
  };

  /**
   * Supprime les photos sélectionnées
   * @param photoIds - Liste des IDs des photos à supprimer
   */
  const handleDeletePhotos = (photoIds: string[]) => {
    // Libère les URLs d'objets pour éviter les fuites mémoire
    photoIds.forEach((id) => {
      const photo = savedPhotos.find((p) => p.id === id);
      if (photo) {
        URL.revokeObjectURL(photo.url);
      }
    });

    // Filtre les photos non supprimées
    setSavedPhotos(savedPhotos.filter((photo) => !photoIds.includes(photo.id)));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* ============ SECTION 1 : SÉLECTION DES DESTINATIONS ============ */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: 'column',
          boxShadow: 3,
          p: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        {/* Titre de la section */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
          }}
        >
          Photothèque de l'événement
        </Typography>

        {/* Checkboxes de sélection des destinations */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Checkbox Activité avec Autocomplete */}
          <FormControlLabel
            control={
              <Checkbox checked={isActivityChecked} onChange={handleActivityCheckChange} />
            }
            label={
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Activité
              </Typography>
            }
          />

          {/* Autocomplete des activités (visible uniquement si checkbox cochée) */}
          {isActivityChecked && (
            <Box sx={{ ml: 4 }}>
              <Autocomplete
                multiple
                disableCloseOnSelect
                options={MOCK_ACTIVITIES}
                value={selectedActivities}
                onChange={handleActivitySelectChange}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="+ Sélectionner les activités"
                    variant="outlined"
                  />
                )}
                renderOption={(props, activity) => (
                  <li {...props} key={activity.id}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        width: '100%',
                      }}
                    >
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {activity.name}
                        </Typography>
                      </Box>
                    </Box>
                  </li>
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((activity, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={activity.id}
                      size="small"
                      variant="soft"
                      label={activity.name}
                      sx={{
                        fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                      }}
                    />
                  ))
                }
                sx={{
                  '& .MuiOutlinedInput-root': {
                    py: 1,
                  },
                }}
              />
            </Box>
          )}

          {/* Checkbox Image de l'événement */}
          <FormControlLabel
            control={<Checkbox checked={isEventChecked} onChange={handleEventCheckChange} />}
            label={
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Image de l'événement
              </Typography>
            }
          />
        </Box>
      </Box>

      {/* ============ SECTION 2 : UPLOAD DES IMAGES ============ */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: 'column',
          boxShadow: 3,
          p: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: 1,
            fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
          }}
        >
          Upload des images
        </Typography>

        {/* Composant Upload de minimals.cc */}
        <Upload
          multiple
          thumbnail={showPreview}
          value={files}
          onDrop={handleDropMultiFile}
          onRemove={handleRemoveFile}
          onRemoveAll={handleRemoveAllFiles}
        />

        {/* Bouton Enregistrer */}
        <Button
          variant="contained"
          size="large"
          onClick={handleSavePhotos}
          disabled={files.length === 0}
          sx={{
            mt: 2,
            alignSelf: 'flex-end',
            minWidth: { xs: '100%', sm: 150 },
            fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem' },
          }}
        >
          Enregistrer
        </Button>
      </Box>

      {/* ============ SECTION 3 : LISTE DES PHOTOS ENREGISTRÉES ============ */}
      {savedPhotos.length > 0 && (
        <PhotoList photos={savedPhotos} onDeletePhotos={handleDeletePhotos} />
      )}
    </Box>
  );
}