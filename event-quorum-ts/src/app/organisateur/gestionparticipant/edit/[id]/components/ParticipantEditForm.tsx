'use client';

import { z as zod } from 'zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Stack,
  Button,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { IParticipantEditItem } from './types';

// Options d'activités disponibles
const ACTIVITY_OPTIONS = [
  { value: 'conference', label: 'Conférence principale' },
  { value: 'workshop', label: 'Atelier pratique' },
  { value: 'networking', label: 'Session networking' },
  { value: 'cocktail', label: 'Cocktail de clôture' },
];

// Schema de validation
const ParticipantEditSchema = zod.object({
  nom: zod.string().min(1, { message: 'Le nom est requis !' }),
  prenom: zod.string().min(1, { message: 'Le prénom est requis !' }),
  telephone: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  email: zod
    .string()
    .min(1, { message: 'L\'email est requis !' })
    .email({ message: 'L\'adresse email doit être valide !' }),
  motDePasse: zod.string().optional(),
});

type Props = {
  participant: IParticipantEditItem;
};

export function ParticipantEditForm({ participant }: Props) {
  const router = useRouter();
  const [selectedActivities, setSelectedActivities] = useState<string[]>(participant.activites);

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(ParticipantEditSchema),
    defaultValues: {
      nom: participant.nom,
      prenom: participant.prenom,
      telephone: participant.telephone,
      email: participant.email,
      motDePasse: participant.motDePasse,
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleActivityChange = (event: any) => {
    const value = event.target.value;
    setSelectedActivities(typeof value === 'string' ? value.split(',') : value);
  };

  const handleActivityDelete = (activityToDelete: string) => {
    setSelectedActivities(selectedActivities.filter(activity => activity !== activityToDelete));
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const updateData = {
        ...data,
        activites: selectedActivities,
        id: participant.id,
      };
      
      console.info('PARTICIPANT UPDATE DATA', updateData);
      
      toast.success('Participant mis à jour avec succès!');
      router.push(paths.organisateur.gestionparticipant.root);
    } catch (error) {
      console.error(error);
      toast.error('Une erreur est survenue lors de la mise à jour');
    }
  });

  const getActivityLabel = (value: string) => ACTIVITY_OPTIONS.find(option => option.value === value)?.label || value;

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom color="error.main">
        MODIFIER UN INVITÉ
      </Typography>
      
      <Form methods={methods} onSubmit={onSubmit}>
        <Box
          sx={{
            mt: 3,
            rowGap: 3,
            columnGap: 2,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
          }}
        >
          <Field.Text name="nom" label="Nom" />
          <Field.Text name="prenom" label="Prénom" />
          <Field.Phone name="telephone" label="Téléphone" country="CI" />
        </Box>

        <Box
          sx={{
            mt: 3,
            rowGap: 3,
            columnGap: 2,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          }}
        >
          <Field.Text name="email" label="Email" />
          <Field.Text 
            name="motDePasse" 
            label="Mot de passe" 
            type="password"
            placeholder="••••••••"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" gutterBottom>
          Sélectionner les activités de l'invité
        </Typography>
        
        <FormControl fullWidth sx={{ mt: 2, mb: 3 }}>
          <InputLabel>Toutes les activités</InputLabel>
          <Select
            multiple
            value={selectedActivities}
            onChange={handleActivityChange}
            input={<OutlinedInput label="Toutes les activités" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip 
                    key={value} 
                    label={getActivityLabel(value)}
                    onDelete={() => handleActivityDelete(value)}
                    onMouseDown={(event) => event.stopPropagation()}
                    size="small"
                  />
                ))}
              </Box>
            )}
          >
            {ACTIVITY_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button 
            variant="outlined" 
            onClick={() => router.push(paths.organisateur.gestionparticipant.root)}
            sx={{
              bgcolor: 'error.main',
              color: 'white',
              '&:hover': { bgcolor: 'error.dark' },
              borderColor: 'error.main',
            }}
          >
            Annuler
          </Button>
          <LoadingButton 
            type="submit" 
            variant="contained" 
            loading={isSubmitting}
            sx={{
              bgcolor: 'success.main',
              '&:hover': { bgcolor: 'success.dark' },
            }}
          >
            Modifier
          </LoadingButton>
        </Stack>
      </Form>
    </Card>
  );
}