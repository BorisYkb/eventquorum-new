'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import React, { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  Typography,
  FormControlLabel,
  Switch,
  Divider,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Upload } from 'src/components/upload';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { IParticipantItem } from './types';
import { ACTIVITY_OPTIONS } from './constants';

// Schema de validation pour ajout manuel
const ParticipantSchema = zod.object({
  nom: zod.string().min(1, { message: 'Le nom est requis !' }),
  prenom: zod.string().min(1, { message: 'Le prénom est requis !' }),
  email: zod
    .string()
    .min(1, { message: 'L\'email est requis !' })
    .email({ message: 'L\'adresse email doit être valide !' }),
  telephone: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  adresse: zod.string().min(1, { message: 'L\'adresse est requise !' }),
  activites: zod.array(zod.string()).min(1, { message: 'Au moins une activité doit être sélectionnée !' }),
});

type Props = {
  item?: IParticipantItem;
};

export function ParticipantNewEditForm({ item }: Props) {
  const router = useRouter();
  
  // States pour les différentes méthodes
  const [showPreview1, setShowPreview1] = useState(true);
  const [showPreview2, setShowPreview2] = useState(true);
  const [files1, setFiles1] = useState<File[]>([]);
  const [files2, setFiles2] = useState<File[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [isSubmitting1, setIsSubmitting1] = useState(false);
  const [isSubmitting2, setIsSubmitting2] = useState(false);
  const [isSubmitting3, setIsSubmitting3] = useState(false);

  const defaultValues: Partial<IParticipantItem> = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    activites: [],
  };

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(ParticipantSchema),
    defaultValues,
    values: item
  });

  const {
    reset,
    handleSubmit,
  } = methods;

  // Handlers pour les uploads
  const handleDropMultiFile1 = useCallback((acceptedFiles: File[]) => {
    setFiles1([
      ...files1,
      ...acceptedFiles.map((newFile) =>
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      ),
    ]);
  }, [files1]);

  const handleRemoveFile1 = useCallback((inputFile: File | string) => {
    const filesFiltered = files1.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles1(filesFiltered);
  }, [files1]);

  const handleRemoveAllFiles1 = useCallback(() => {
    setFiles1([]);
  }, []);

  const handleDropMultiFile2 = useCallback((acceptedFiles: File[]) => {
    setFiles2([
      ...files2,
      ...acceptedFiles.map((newFile) =>
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      ),
    ]);
  }, [files2]);

  const handleRemoveFile2 = useCallback((inputFile: File | string) => {
    const filesFiltered = files2.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles2(filesFiltered);
  }, [files2]);

  const handleRemoveAllFiles2 = useCallback(() => {
    setFiles2([]);
  }, []);

  // Submit handlers pour chaque méthode
  const onSubmitManual = handleSubmit(async (data) => {
    setIsSubmitting1(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      console.info('MANUAL PARTICIPANT DATA', data);
      
      toast.success('Participant ajouté avec succès!');
      reset();
    } catch (error) {
      console.error(error);
      toast.error('Une erreur est survenue');
    } finally {
      setIsSubmitting1(false);
    }
  });

  const handleSubmitFileImport = async () => {
    if (files1.length === 0) {
      toast.error('Veuillez sélectionner au moins un fichier');
      return;
    }
    
    setIsSubmitting2(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      console.info('FILE IMPORT', files1);
      
      toast.success(`${files1.length} fichier(s) importé(s) avec succès!`);
      setFiles1([]);
    } catch (error) {
      console.error(error);
      toast.error('Une erreur est survenue lors de l\'importation');
    } finally {
      setIsSubmitting2(false);
    }
  };

  const handleSubmitBulkImport = async () => {
    if (!selectedActivity) {
      toast.error('Veuillez sélectionner une activité');
      return;
    }
    
    if (files2.length === 0) {
      toast.error('Veuillez sélectionner au moins un fichier');
      return;
    }
    
    setIsSubmitting3(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      console.info('BULK IMPORT', { activity: selectedActivity, files: files2 });
      
      toast.success(`Participants importés pour l'activité "${ACTIVITY_OPTIONS.find(a => a.value === selectedActivity)?.label}"!`);
      setFiles2([]);
      setSelectedActivity('');
    } catch (error) {
      console.error(error);
      toast.error('Une erreur est survenue lors de l\'importation');
    } finally {
      setIsSubmitting3(false);
    }
  };

  return (
    <Stack spacing={4}>
      {/* 1. Ajout manuel */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          1. Ajouter un invité manuellement
        </Typography>
        
        <Form methods={methods} onSubmit={onSubmitManual}>
          <Box
            sx={{
              mt: 3,
              rowGap: 3,
              columnGap: 2,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <Field.Text name="nom" label="Nom" />
            <Field.Text name="prenom" label="Prénom" />
            <Field.Text name="email" label="Adresse email" />
            <Field.Phone name="telephone" label="Numéro de téléphone" country="CI" />
            <Field.Text 
              name="adresse" 
              label="Lieu d'habitation" 
              sx={{ gridColumn: { xs: 'span 1', sm: 'span 2' } }}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" gutterBottom>
            Activités
          </Typography>
          
          <Field.MultiCheckbox
            name="activites"
            options={ACTIVITY_OPTIONS}
            sx={{ mt: 2, mb: 3 }}
          />

          <Stack direction="row" justifyContent="flex-end">
            <LoadingButton 
              type="submit" 
              variant="contained" 
              loading={isSubmitting1}
              sx={{ minWidth: 150 }}
            >
              Enregistrer
            </LoadingButton>
          </Stack>
        </Form>
      </Card>

      {/* 2. Import de fichier */}
      {/* <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          2. Importer la liste des invités via un fichier
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Télécharger un fichier contenant la liste des invités (Excel, CSV)
        </Typography>

        <FormControlLabel
          label="Afficher les miniatures"
          control={
            <Switch
              checked={showPreview1}
              onChange={(e) => setShowPreview1(e.target.checked)}
              inputProps={{ id: 'show-thumbnails-switch-1' }}
            />
          }
          sx={{ mb: 3, width: 1, justifyContent: 'flex-end' }}
        />
        
        <Upload
          multiple
          thumbnail={showPreview1}
          value={files1}
          onDrop={handleDropMultiFile1}
          onRemove={handleRemoveFile1}
          onRemoveAll={handleRemoveAllFiles1}
          onUpload={() => console.info('ON UPLOAD')}
          accept={{
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls'],
            'text/csv': ['.csv'],
          }}
          helperText="Formats acceptés: .xlsx, .xls, .csv"
        />

        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
          <LoadingButton 
            variant="contained" 
            loading={isSubmitting2}
            onClick={handleSubmitFileImport}
            sx={{ minWidth: 150 }}
          >
            Enregistrer
          </LoadingButton>
        </Stack>
      </Card> */}

      {/* 2. Import par activité */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          2. Importer la liste des invités par activité
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Choisir l'activité puis télécharger le fichier correspondant
        </Typography>

        <Box sx={{mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: "center"}}>
          <FormControl >
            <InputLabel>Choisir l'activité</InputLabel>
            <Select
              fullWidth

              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              label="Choisir l'activité"
              sx={{ minWidth: 200 }}
              
            >
              <MenuItem value="">
                <em>Sélectionner une activité</em>
              </MenuItem>
              {ACTIVITY_OPTIONS.map((activity) => (
                <MenuItem key={activity.value} value={activity.value}>
                  {activity.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{display: "flex", alignItems: "center", gap: 3}}>

            <Button variant= "contained" sx={{ minWidth: 250 }}>
                Exporter un modèle de fichier
            </Button>

            <FormControlLabel
              label="Afficher les miniatures"
              control={
                <Switch
                  checked={showPreview2}
                  onChange={(e) => setShowPreview2(e.target.checked)}
                  inputProps={{ id: 'show-thumbnails-switch-2' }}
                />
              }
              sx={{ mb: 3, width: 1, justifyContent: 'flex-end' }}
            />
          </Box>
        </Box>
        
        <Upload
          multiple
          thumbnail={showPreview2}
          value={files2}
          onDrop={handleDropMultiFile2}
          onRemove={handleRemoveFile2}
          onRemoveAll={handleRemoveAllFiles2}
          onUpload={() => console.info('ON UPLOAD')}
          accept={{
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls'],
            'text/csv': ['.csv'],
          }}
          helperText={
            <>
              Formats acceptés : <strong>.xlsx, .xls, .csv</strong> |  Formats d’en-têtes autorisés : <em> <strong>nom, prenom, email, numero_tel, lieu_habitation</strong></em>
            </>
          }
          
        />

        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
          <LoadingButton 
            variant="contained" 
            loading={isSubmitting3}
            onClick={handleSubmitBulkImport}
            sx={{ minWidth: 150 }}
          >
            Enregistrer
          </LoadingButton>
        </Stack>
      </Card>

      {/* Bouton retour global
      <Stack direction="row" justifyContent="center" sx={{ pt: 2 }}>
        <Button 
          variant="outlined" 
          onClick={() => router.push(paths.organisateur.gestionparticipant.root)}
          sx={{ minWidth: 200 }}
        >
          Retour à la liste
        </Button>
      </Stack> */}
    </Stack>
  );
}