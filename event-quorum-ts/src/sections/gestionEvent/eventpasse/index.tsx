'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import {
  InputLabel,
  Select,
  Typography,
  Box,
  Button,
  FormControl,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';

import { Upload } from 'src/components/upload';
import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

interface EvenementNonRealise {
  nomEvenement: string;
  anneeEvenement: string;
  lieuEvenement: string;
  description: string;
  images: (File | string)[];
}

export default function EventPasse() {
  const methods = useForm({
    defaultValues: {
      description: '',
      nomEvenement: '',
      anneeEvenement: '',
      lieuEvenement: '',
    },
  });

  const { handleSubmit, reset } = methods;

  const OPTIONS = [
    { value: 'Event 1', label: 'Event 1' },
    { value: 'Event 2', label: 'Event 2' },
    { value: 'Event 3', label: 'Event 3' },
    { value: 'Event 4', label: 'Event 4' },
    { value: 'Event 5', label: 'Event 5' },
    { value: 'Event 6', label: 'Event 6' },
    { value: 'Event 7', label: 'Event 7' },
    { value: 'Event 8', label: 'Event 8' },
  ];

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [showPreview, setShowPreview] = useState(true);
  const [evenementsNonRealises, setEvenementsNonRealises] = useState<EvenementNonRealise[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleDropMultiFile = (acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const handleRemoveFile = (inputFile: File | string) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles(filesFiltered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const handleEventChange = (event: any) => {
    setSelectedEvents(event.target.value);
  };

  const onSubmit = (data: any) => {
    const nouvelEvenement: EvenementNonRealise = {
      nomEvenement: data.nomEvenement,
      anneeEvenement: data.anneeEvenement,
      lieuEvenement: data.lieuEvenement,
      description: data.description,
      images: [...files],
    };

    if (editingIndex !== null) {
      // Mise à jour
      const updated = [...evenementsNonRealises];
      updated[editingIndex] = nouvelEvenement;
      setEvenementsNonRealises(updated);
      setEditingIndex(null);
    } else {
      // Ajout
      setEvenementsNonRealises([...evenementsNonRealises, nouvelEvenement]);
    }

    // Réinitialiser le formulaire
    reset();
    setFiles([]);
  };

  const handleEdit = (index: number) => {
    const event = evenementsNonRealises[index];
    reset({
      nomEvenement: event.nomEvenement,
      anneeEvenement: event.anneeEvenement,
      lieuEvenement: event.lieuEvenement,
      description: event.description,
    });
    setFiles(event.images);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    setEvenementsNonRealises(evenementsNonRealises.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    reset();
    setFiles([]);
    setEditingIndex(null);
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mb: 5,
          display: 'flex',
          gap: 1,
          flexDirection: 'column',
          boxShadow: 3,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Chargez les images et informations des événements passés
        </Typography>

        <Box sx={{ p: 3 }}>
          {/* Section Sélection d'événements */}
          <Box sx={{ marginBottom: 3, borderBottom: 'dashed 1px #cccdcf' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Evènements Passés Réalisés
            </Typography>

            <Box sx={{ mb: 2 }}>
              <InputLabel>Sélectionnez un ou plusieurs événements déjà réalisés</InputLabel>
              <Select
                multiple
                value={selectedEvents}
                label="Sélectionnez un ou plusieurs événements déjà réalisés"
                onChange={handleEventChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                      overflowY: 'auto',
                    },
                  },
                }}
                fullWidth
              >
                {OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'end', gap: 3 }}>
              <Button variant="outlined" color="inherit">
                Annuler
              </Button>

              <Button
                fullWidth
                color="inherit"
                size="medium"
                className="!w-fit"
                type="submit"
                variant="contained"
              >
                Enregistrer
              </Button>
            </Box>
          </Box>

          {/* Description + Inputs + Upload */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Evènements Passés non Réalisés
            </Typography>

            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
              <Field.Text name="nomEvenement" label="Nom de l'évènement" fullWidth />
              <Field.Text name="anneeEvenement" label="Année de l'évènement" fullWidth />
              <Field.Text name="lieuEvenement" label="Lieu de l'évènement" fullWidth />
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                Short Description de l'évènement
              </Typography>
              <Field.Editor name="description" placeholder="Décrivez brièvement l'évènement..." />
            </Box>

            <Upload
              multiple
              thumbnail={showPreview}
              value={files}
              onDrop={handleDropMultiFile}
              onRemove={handleRemoveFile}
              onRemoveAll={handleRemoveAllFiles}
              onUpload={() => console.info('ON UPLOAD')}
            />
          </Box>
          
          <Box sx={{ mb: 3, mt: 3, display: 'flex', justifyContent: 'end', gap: 3 }}>
            <Button variant="outlined" color="inherit" onClick={handleCancel}>
              Annuler
            </Button>

            <Button
              fullWidth
              color="inherit"
              size="medium"
              className="!w-fit"
              type="submit"
              variant="contained"
            >
              {editingIndex !== null ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </Box>

          {/* Tableau récapitulatif */}
          {evenementsNonRealises.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Événements enregistrés ({evenementsNonRealises.length})
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f3f4f6' }}>
                      <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Nom</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Année</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Lieu</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Description</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Images</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600, color: '#374151', width: 120 }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {evenementsNonRealises.map((event, index) => (
                      <TableRow key={index} hover sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                        <TableCell sx={{ fontWeight: 500 }}>{event.nomEvenement}</TableCell>
                        <TableCell>{event.anneeEvenement}</TableCell>
                        <TableCell>{event.lieuEvenement}</TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            dangerouslySetInnerHTML={{ __html: event.description }}
                            sx={{
                              '& p': { margin: 0 },
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          />
                        </TableCell>
                        <TableCell>{event.images.length} image(s)</TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(index)}
                            sx={{ color: 'warning.main', mr: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={18} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(index)}
                            sx={{ color: 'error.main' }}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={18} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </Box>
    </FormProvider>
  );
}