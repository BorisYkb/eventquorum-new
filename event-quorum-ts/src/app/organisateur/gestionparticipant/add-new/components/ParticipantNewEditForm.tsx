//src/app/organisateur/gestionparticipant/add-new/components/ParticipantNewEditForm.tsx

'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import React, { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import { LoadingButton } from '@mui/lab';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Box,
  Grid,
  Stack,
  Button,
  Typography,
  Divider,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Upload } from 'src/components/upload';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { IParticipantItem } from './types';
import { ACTIVITY_OPTIONS } from './constants';

/**
 * Schema de validation pour ajout manuel d'un participant
 */
const ParticipantSchema = zod.object({
  nom: zod.string().min(1, { message: 'Le nom est requis !' }),
  prenom: zod.string().min(1, { message: 'Le prénom est requis !' }),
  email: zod
    .string()
    .min(1, { message: "L'email est requis !" })
    .email({ message: "L'adresse email doit être valide !" }),
  telephone: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  adresse: zod.string().min(1, { message: "L'adresse est requise !" }),
  activites: zod
    .array(zod.string())
    .min(1, { message: 'Au moins une activité doit être sélectionnée !' }),
});

type Props = {
  item?: IParticipantItem;
};

/**
 * Formulaire d'ajout/édition de participant
 * Permet l'ajout manuel ou l'import par fichier
 */
export function ParticipantNewEditForm({ item }: Props) {
  const router = useRouter();

  // États pour la gestion des accordions
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>('panel1');

  // États pour l'import par activité
  const [files2, setFiles2] = useState<File[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  // États de chargement
  const [isSubmitting1, setIsSubmitting1] = useState(false);
  const [isSubmitting3, setIsSubmitting3] = useState(false);

  /**
   * Valeurs par défaut du formulaire
   */
  const defaultValues: Partial<IParticipantItem> = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    activites: [],
  };

  /**
   * Configuration du formulaire avec react-hook-form
   */
  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(ParticipantSchema),
    defaultValues,
    values: item,
  });

  const { reset, handleSubmit, watch, setValue } = methods;

  // Surveillance des activités sélectionnées dans le formulaire
  const selectedFormActivities = watch('activites') || [];

  /**
   * Gestion de l'expansion des accordions
   */
  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedAccordion(isExpanded ? panel : false);
    };

  /**
   * Gestion du drop de fichiers pour l'import par activité
   */
  const handleDropMultiFile2 = useCallback(
    (acceptedFiles: File[]) => {
      setFiles2([
        ...files2,
        ...acceptedFiles.map((newFile) =>
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        ),
      ]);
    },
    [files2]
  );

  /**
   * Suppression d'un fichier spécifique
   */
  const handleRemoveFile2 = useCallback(
    (inputFile: File | string) => {
      const filesFiltered = files2.filter((fileFiltered) => fileFiltered !== inputFile);
      setFiles2(filesFiltered);
    },
    [files2]
  );

  /**
   * Suppression de tous les fichiers
   */
  const handleRemoveAllFiles2 = useCallback(() => {
    setFiles2([]);
  }, []);

  /**
   * Soumission du formulaire d'ajout manuel
   */
  const onSubmitManual = handleSubmit(async (data) => {
    setIsSubmitting1(true);
    try {
      // Simulation d'un appel API
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

  /**
   * Soumission de l'import par activité
   */
  const handleSubmitBulkImport = async () => {
    if (selectedActivities.length === 0) {
      toast.error('Veuillez sélectionner au moins une activité');
      return;
    }

    if (files2.length === 0) {
      toast.error('Veuillez sélectionner au moins un fichier');
      return;
    }

    setIsSubmitting3(true);
    try {
      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.info('BULK IMPORT', { activities: selectedActivities, files: files2 });

      const activitiesLabels = selectedActivities
        .map((activityValue) => ACTIVITY_OPTIONS.find((a) => a.value === activityValue)?.label)
        .join(', ');

      toast.success(
        `Participants importés pour ${selectedActivities.length > 1 ? 'les activités' : "l'activité"} "${activitiesLabels}"!`
      );
      setFiles2([]);
      setSelectedActivities([]);
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de l'importation");
    } finally {
      setIsSubmitting3(false);
    }
  };

  return (
    <Stack spacing={3}>
      {/* 1. Accordion - Ajout manuel */}
      <Accordion
        expanded={expandedAccordion === 'panel1'}
        onChange={handleAccordionChange('panel1')}
        sx={{
          borderRadius: 2,
          boxShadow:
            'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          '&:before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            px: 3,
            py: 2,
            '& .MuiAccordionSummary-content': {
              my: 0,
            },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            1. Ajouter un invité manuellement
          </Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ px: 3, pb: 3 }}>
          <Form methods={methods} onSubmit={onSubmitManual}>
            <Box
              sx={{
                mt: 2,
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

            {/* Select multiple pour les activités */}
            <FormControl fullWidth sx={{ mt: 2, mb: 3 }}>
              <InputLabel>Sélectionner une ou plusieurs activités</InputLabel>
              <Select
                multiple
                value={selectedFormActivities}
                onChange={(e) => setValue('activites', e.target.value as string[])}
                label="Sélectionner une ou plusieurs activités"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const activity = ACTIVITY_OPTIONS.find((a) => a.value === value);
                      return <Chip key={value} label={activity?.label} size="small" />;
                    })}
                  </Box>
                )}
              >
                {ACTIVITY_OPTIONS.map((activity) => (
                  <MenuItem key={activity.value} value={activity.value}>
                    {activity.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
        </AccordionDetails>
      </Accordion>

      {/* 2. Accordion - Import par activité */}
      <Accordion
        expanded={expandedAccordion === 'panel2'}
        onChange={handleAccordionChange('panel2')}
        sx={{
          borderRadius: 2,
          boxShadow:
            'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          '&:before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            px: 3,
            py: 2,
            '& .MuiAccordionSummary-content': {
              my: 0,
            },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            2. Importer la liste des invités par activité
          </Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ px: 3, pb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Choisir une ou plusieurs activités puis télécharger le fichier correspondant
          </Typography>

          {/* Sélecteur d'activité et bouton d'export */}
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <FormControl sx={{ minWidth: 300 }}>
              <InputLabel>Choisir une ou plusieurs activités</InputLabel>
              <Select
                multiple
                value={selectedActivities}
                onChange={(e) => setSelectedActivities(e.target.value as string[])}
                label="Choisir une ou plusieurs activités"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const activity = ACTIVITY_OPTIONS.find((a) => a.value === value);
                      return <Chip key={value} label={activity?.label} size="small" />;
                    })}
                  </Box>
                )}
              >
                {ACTIVITY_OPTIONS.map((activity) => (
                  <MenuItem key={activity.value} value={activity.value}>
                    {activity.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" sx={{ minWidth: 250 }}>
              Exporter un modèle de fichier
            </Button>
          </Box>

          {/* Zone de drop des fichiers */}
          <Upload
            multiple
            thumbnail
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
                Formats acceptés : <strong>.xlsx, .xls, .csv</strong> | Formats d'en-têtes
                autorisés :{' '}
                <em>
                  <strong>nom, prenom, email, numero_tel, lieu_habitation</strong>
                </em>
              </>
            }
          />

          {/* Bouton d'enregistrement */}
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
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}