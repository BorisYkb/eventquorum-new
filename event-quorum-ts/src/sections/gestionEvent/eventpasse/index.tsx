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
} from '@mui/material';

import { Upload } from 'src/components/upload';
import { Field } from 'src/components/hook-form';

export default function EventPasse() {
  const methods = useForm({
    defaultValues: {
      description: '',
      nomEvenement: '',
      anneeEvenement: '',
      lieuEvenement: '',
    },
  });

  const { handleSubmit } = methods;

  const OPTIONS = [
    { value: 'option 1', label: 'Option 1' },
    { value: 'option 2', label: 'Option 2' },
    { value: 'option 3', label: 'Option 3' },
    { value: 'option 4', label: 'Option 4' },
    { value: 'option 5', label: 'Option 5' },
    { value: 'option 6', label: 'Option 6' },
    { value: 'option 7', label: 'Option 7' },
    { value: 'option 8', label: 'Option 8' },
  ];

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [showPreview, setShowPreview] = useState(true);

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
    console.log('Formulaire soumis ✅', data);
    console.log('Événements sélectionnés :', selectedEvents);
    console.log('Fichiers :', files);
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
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                Short Description de l'évènement
              </Typography>
              <Field.Editor name="description" placeholder="Décrivez brièvement l'évènement..." />
            </Box>

            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
              <Field.Text name="nomEvenement" label="Nom de l'évènement" fullWidth />
              <Field.Text name="anneeEvenement" label="Année de l'évènement" fullWidth />
              <Field.Text name="lieuEvenement" label="Lieu de l'évènement" fullWidth />
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
      </Box>
    </FormProvider>
  );
}
