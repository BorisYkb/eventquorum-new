import type { INewActivityItem, IEventSpeaker } from 'src/types/activity';

import { z as zod } from 'zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormControl, MenuItem, Select, IconButton, Tooltip } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { fIsAfter } from 'src/utils/format-time';

import { _tourGuides } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type NewActivitySchemaType = zod.infer<typeof NewActivitySchema>;

export const NewActivitySchema = zod
  .object({
    title: zod.string().min(1, { message: "Le titre de l'activité est requis!" }),
    description: zod.string().min(1, { message: "La description est requise!" }),
    type: zod.string().min(1, { message: "Le type d'activité est requis!" }),
    speaker: zod
      .array(
        zod.object({
          id: zod.string(),
          name: zod.string(),
          avatarUrl: zod.string(),
          phoneNumber: zod.string().optional(),
        })
      )
      .optional(),
    date: zod.object({
      startDate: schemaHelper.date({ message: { required: 'La date de début est requise!' } }),
      endDate: schemaHelper.date({ message: { required: 'La date de fin est requise!' } }),
    }),
    hour: zod.object({
      startDateHour: schemaHelper.date({ message: { required: "L'heure de début est requise!" } }),
      endDateHour: schemaHelper.date({ message: { required: "L'heure de fin est requise!" } }),
    }),
    status: zod.enum(['non_demarrer', 'en_cours', 'termine']).default('non_demarrer'),
    documents: zod.string().optional(),
    link: zod.string().url({ message: 'Veuillez entrer une URL valide' }).optional().or(zod.literal('')),
    video: zod.string().optional(),
  })
  .refine((data) => !fIsAfter(data.date.startDate, data.date.endDate), {
    message: 'La date de fin ne peut pas être plus tôt que celle du début!',
    path: ['date.endDateHour'],
  })
  .refine((data) => !fIsAfter(data.hour.startDateHour, data.hour.endDateHour), {
    message: "L'heure de fin ne peut pas être plus tôt que celle du début!",
    path: ['hour.endDateHour'],
  });

// ----------------------------------------------------------------------

type Props = {
  currentActivity?: INewActivityItem;
};

const ACTIVITY_TYPES = [
  { id: '1', name: 'Atelier' },
  { id: '2', name: 'Session' },
  { id: '3', name: 'Présentation' },
  { id: '4', name: 'Table ronde' },
  { id: '5', name: 'Démonstration' },
  { id: '6', name: 'Networking' },
  { id: '7', name: 'Pause' },
  { id: '8', name: 'Autre' },
];

const ACTIVITY_STATUS = [
  { value: 'non_demarrer', label: 'Non démarrer' },
  { value: 'en_cours', label: 'En cours' },
  { value: 'termine', label: 'Terminé' },
];

export function ActivityNewEditForm({ currentActivity }: Props) {
  const router = useRouter();

  const defaultValues: NewActivitySchemaType = {
    title: '',
    description: '',
    type: '',
    speaker: [],
    date: {
      startDate: null,
      endDate: null,
    },
    hour: {
      startDateHour: null,
      endDateHour: null,
    },
    status: 'non_demarrer',
    documents: '',
    link: '',
    video: '',
  };

  const methods = useForm<NewActivitySchemaType>({
    mode: 'all',
    resolver: zodResolver(NewActivitySchema),
    defaultValues,
    values: currentActivity as NewActivitySchemaType,
  });

  const {
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data: NewActivitySchemaType) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentActivity ? 'Mise à jour réussie!' : 'Création réussie!');
      router.push(paths.organisateur.gestionevent.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      toast.error('Une erreur est survenue');
    }
  });

  const renderProperties = () => (
    <Card>
      <CardHeader
        title={`${currentActivity ? 'Modification' : 'Création'} d'une nouvelle activité`}
        subheader={`Remplissez le formulaire ${currentActivity ? 'de modification' : 'de création'}`}
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        {/* Date */}
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Date</Typography>
          <Box sx={{ gap: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
            <Field.DatePicker name="date.startDate" label="Date de début" />
            <Field.DatePicker name="date.endDate" label="Date de fin" />
          </Box>
        </Stack>

        {/* Time */}
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Heure</Typography>
          <Box sx={{ gap: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
            <Field.TimePicker name="hour.startDateHour" label="Heure de début" />
            <Field.TimePicker name="hour.endDate" label="Heure de fin" />
          </Box>
        </Stack>

        {/* Intervenant(s) */}
        <div>
          <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
            Intervenant(s) (choix multiple)
          </Typography>

          <Field.Autocomplete
            multiple
            name="speaker"
            placeholder="+ Intervenant"
            disableCloseOnSelect
            options={_tourGuides}
            getOptionLabel={(option) => (option as IEventSpeaker).name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, speaker) => (
              <li {...props} key={speaker.id}>
                <Avatar
                  key={speaker.id}
                  alt={speaker.avatarUrl}
                  src={speaker.avatarUrl}
                  sx={{
                    mr: 1,
                    width: 24,
                    height: 24,
                    flexShrink: 0,
                  }}
                />
                {speaker.name}
              </li>
            )}
            renderTags={(selected, getTagProps) =>
              selected.map((speaker, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={speaker.id}
                  size="small"
                  variant="soft"
                  label={speaker.name}
                  avatar={<Avatar alt={speaker.name} src={speaker.avatarUrl} />}
                />
              ))
            }
          />
        </div>

        {/* Status */}
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Statut</Typography>
          <Field.Select name="status" placeholder="Sélectionnez un statut">
            {ACTIVITY_STATUS.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Field.Select>
        </Stack>

        {/* Type d'activité */}
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Type d'activité</Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
            <Field.Autocomplete
              name="type"
              placeholder="Sélectionnez un type d'activité"
              options={ACTIVITY_TYPES}
              getOptionLabel={(option) => {
                if (typeof option === 'string') return option;
                return option?.name || '';
              }}
              isOptionEqualToValue={(option, value) => {
                if (typeof value === 'string') return option.name === value;
                return option.name === value?.name;
              }}
              onChange={(_, newValue) => {
                methods.setValue('type', newValue?.name || '');
              }}
              sx={{ flex: 1 }}
            />

            <Tooltip title="Ajouter un nouveau type">
              <IconButton
                // component={RouterLink}
                // href={paths.admin.PLANIFIER_UN_EVENEMENT.activity_type}
                sx={{ mb: 1 }}
              >
                <Iconify icon="mingcute:add-fill" />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>

        {/* Titre d'activité */}
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Titre d'activité</Typography>
          <Field.Text name="title" placeholder="Entrez le titre de l'activité" />
        </Stack>

        {/* Capacité de l'activité */}
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Capacité d'activité</Typography>
          <Field.Text name="" type='number' placeholder="Entrez la capacité de l'activité" />
        </Stack>

        {/* Description */}
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Description d'une Activité</Typography>
          <Field.Editor
            fullItem
            name='description_activité'
            sx={{ maxHeight: 400 }}
            placeholder="Décrivez l'activité..."
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderResources = () => (
    <Card>
      <CardHeader
        title="Ressource d'activité"
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        {/* Documents */}
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Documents</Typography>
          <Field.Upload
            name="documents"
            maxSize={3145728}
            onDelete={() => setValue('documents', '', { shouldValidate: true })}
            placeholder="Importer un fichier"
          />
        </Stack>

        {/* Lien */}
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Lien</Typography>
          <Field.Text 
            name="link" 
            placeholder="https://exemple.com"
            type="url"
          />
        </Stack>

        {/* Vidéo */}
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Vidéo</Typography>
          <Field.Upload
            name="video"
            maxSize={52428800} // 50MB for video
            onDelete={() => setValue('video', '', { shouldValidate: true })}
            placeholder="Importer une vidéo"
            accept={{ 'video/*': [] }}
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderActions = () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
      <LoadingButton
        variant="outlined"
        size="large"
        onClick={() => router.back()}
        disabled={isSubmitting}
      >
        Annuler
      </LoadingButton>

      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
        sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' } }}
      >
        {!currentActivity ? 'Enregistrer' : 'Sauvegarder les changements'}
      </LoadingButton>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderProperties()}
        {renderResources()}
        {renderActions()}
      </Stack>
    </Form>
  );
}