import path, { normalize } from 'path';
import { Controller } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Card,
  Button,
  MenuItem,
  CardHeader,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Stack,
  Divider
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _activityList } from 'src/_mock/_activity';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { UploadBox } from 'src/components/upload';
import { Form, Field } from 'src/components/hook-form';
import { Upload, UploadAvatar } from 'src/components/upload';

import { useLandingPageController } from './controller';

const EVENT_TYPES = [
  { value: 'en_ligne', label: 'En ligne' },
  { value: 'physique', label: 'Physique' },
  { value: 'mixte', label: 'Mixte' },
];

const CONNECTION_TYPES = [
  { value: 'mdp', label: 'Mot de passe' },
  { value: 'lien_personnalise', label: 'Lien personnalisé' },
];

const LandingPage = () => {
  const {
    methods,
    onSubmit,
    control,
    isSubmitting,
    agendaItems,
    handleAddAgenda,
    handleEditAgenda,
    handleDeleteAgenda,
    handleViewAgenda,
    organizateurs,
    handleAddOrganizer,
    handleDeleteOrganizer,
    handleEditOrganizer,
    currentOrganizer,
    setCurrentOrganizer,
    isAddingOrganizer,
    setIsAddingOrganizer
  } = useLandingPageController();

  const showPreview = useBoolean();

  const [files, setFiles] = useState<(File | string)[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<File | string | null>(null);

  const handleDropAvatar = useCallback((acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    setAvatarUrl(newFile);
  }, []);

  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles(filesFiltered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_cours':
        return 'success';
      case 'terminer':
        return 'error';
      case 'non_demarrer':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'en_cours':
        return 'En cours';
      case 'terminer':
        return 'Terminé';
      case 'non_demarrer':
        return 'Non demarré';
      default:
        return status;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          component={RouterLink}
          href={paths.organisateur.gestionevent.newactivity}
          startIcon={<Iconify icon="mingcute:add-line" width={16} height={16} />}
          onClick={handleAddAgenda}
        >
          Ajouter une activité
        </Button>
      </Box>


      {/* Informations Générales */}
      <Card>
        <CardHeader
          title="Informations Générales"
        />
        <CardContent>
          <Form methods={methods} onSubmit={onSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Short description */}
              <Stack>
                <Typography variant="subtitle2">Short Description de l'évènement</Typography>
                <Field.Editor
                  fullItem
                  name='short_description'
                  placeholder="Ecrivez un texte court pour décrire l'évènement en quelques phrases."
                  sx={{ maxHeight: 400 }}
                />
              </Stack>

              <Stack>
                <Typography variant="subtitle2">Description de l'évènement</Typography>
                <Field.Editor
                  fullItem
                  name='description'
                  placeholder="Ecrivez un texte court pour décrire l'évènement en quelques phrases."
                  sx={{ maxHeight: 400 }}
                />
              </Stack>

              {/* Section A propos de l'organisateur */}
              <Stack>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2">A propos de l'organisateur</Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Iconify icon="mingcute:add-line" width={16} height={16} />}
                    onClick={() => setIsAddingOrganizer(true)}
                    size="small"
                  >
                    Ajouter un organisateur
                  </Button>
                </Box>

                {/* Formulaire d'ajout/édition d'organisateur */}
                {isAddingOrganizer && (
                  <Card variant="outlined" sx={{ p: 3, mb: 3, backgroundColor: '#f9f9f9' }}>
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>
                      {currentOrganizer.index !== null ? 'Modifier l\'organisateur' : 'Nouvel organisateur'}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                      {/* Image à gauche */}
                      <Box sx={{ minWidth: 200 }}>
                        <UploadAvatar
                          value={currentOrganizer.image}
                          onDrop={(acceptedFiles: File[]) => {
                            setCurrentOrganizer({
                              ...currentOrganizer,
                              image: acceptedFiles[0]
                            });
                          }}
                          validator={(fileData) => {
                            if (fileData.size > 2000000) {
                              return { code: 'file-too-large', message: 'Fichier trop volumineux' };
                            }
                            return null;
                          }}
                          helperText={
                            <Typography
                              variant="caption"
                              sx={{
                                mt: 2,
                                display: 'block',
                                textAlign: 'center',
                                color: 'text.disabled',
                              }}
                            >
                              Photo de l'organisateur
                            </Typography>
                          }
                        />
                      </Box>

                      {/* Description à droite */}
                      <Box sx={{ flex: 1 }}>
                        <Field.Editor
                          fullItem
                          name='organizer_description'
                          value={currentOrganizer.description}
                          onChange={(value: string) => {
                            setCurrentOrganizer({
                              ...currentOrganizer,
                              description: value
                            });
                          }}
                          placeholder="Décrivez l'organisateur (nom, fonction, biographie...)"
                          sx={{ maxHeight: 300 }}
                        />

                        <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'flex-end' }}>
                          <Button
                            variant="outlined"
                            color="inherit"
                            onClick={() => {
                              setIsAddingOrganizer(false);
                              setCurrentOrganizer({ image: null, description: '', index: null });
                            }}
                          >
                            Annuler
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddOrganizer}
                            disabled={!currentOrganizer.image || !currentOrganizer.description}
                          >
                            {currentOrganizer.index !== null ? 'Mettre à jour' : 'Ajouter'}
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                )}

                {/* Liste des organisateurs ajoutés */}
                {organizateurs.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                      {organizateurs.length} organisateur(s) ajouté(s)
                    </Typography>
                    <Stack spacing={2}>
                      {organizateurs.map((org, index) => (
                        <Card key={index} variant="outlined" sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                            <Box
                              component="img"
                              src={
                                typeof org.image === 'string'
                                  ? org.image
                                  : org.image
                                    ? URL.createObjectURL(org.image)
                                    : undefined
                              }

                              alt={`Organisateur ${index + 1}`}
                              sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 1,
                                objectFit: 'cover'
                              }}
                            />
                            <Box sx={{ flex: 1 }}>
                              <Typography
                                variant="body2"
                                dangerouslySetInnerHTML={{ __html: org.description }}
                                sx={{
                                  '& p': { margin: 0 },
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                }}
                              />
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleEditOrganizer(index)}
                                sx={{ color: 'warning.main' }}
                              >
                                <Iconify icon="solar:pen-bold" width={18} height={18} />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteOrganizer(index)}
                                sx={{ color: 'error.main' }}
                              >
                                <Iconify icon="solar:trash-bin-trash-bold" width={18} height={18} />
                              </IconButton>
                            </Box>
                          </Box>
                        </Card>
                      ))}
                    </Stack>
                  </Box>
                )}
              </Stack>

              {/* Type d'événement et Type de connexion */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Controller
                  name="type_evenement"
                  control={control}
                  render={({ field }) => (
                    <Field.Select {...field} label="Type événement" sx={{ minWidth: 200 }}>
                      {EVENT_TYPES.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field.Select>
                  )}
                />

                <Controller
                  name="type_connexion"
                  control={control}
                  render={({ field }) => (
                    <Field.Select {...field} label="Type de connexion" sx={{ minWidth: 200 }}>
                      {CONNECTION_TYPES.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field.Select>
                  )}
                />
              </Box>

              {/* Options d'activation */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Controller
                  name="activer_selection_activites"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Switch {...field} checked={field.value} />}
                      label="Activer la page de sélection des activités"
                    />
                  )}
                />

                <Controller
                  name="importer_video_evenement"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<UploadBox sx={{ mr: 3 }} />}
                      label="Importer la vidéo de l'événement"
                    />
                  )}
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <UploadAvatar
                    value={avatarUrl}
                    onDrop={handleDropAvatar}
                    validator={(fileData) => {
                      if (fileData.size > 1000000) {
                        return { code: 'file-too-large', message: '' };
                      }
                      return null;
                    }}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 3,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.disabled',
                        }}
                      >
                        Image background (Carré)
                      </Typography>
                    }
                  />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <UploadAvatar
                    value={avatarUrl}
                    onDrop={handleDropAvatar}
                    validator={(fileData) => {
                      if (fileData.size > 1000000) {
                        return { code: 'file-too-large', message: '' };
                      }
                      return null;
                    }}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 3,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.disabled',
                        }}
                      >
                        Image background (Rectangle)
                      </Typography>
                    }
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  Enregistrer
                </Button>
              </Box>
            </Box>
          </Form>
        </CardContent>
      </Card>

      {/* Agenda */}
      <Card>
        <CardHeader
          title="Activités / Agenda"
          action={
            <Button
              variant="contained"
              component={RouterLink}
              href={paths.organisateur.gestionevent.newactivity}
              startIcon={<Iconify icon="mingcute:add-line" width={16} height={16} />}
              onClick={handleAddAgenda}
            >
              Ajouter une activité
            </Button>
          }
        />
        <CardContent>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell>Date de début</TableCell>
                  <TableCell>Date de fin</TableCell>
                  <TableCell>Titre</TableCell>
                  <TableCell>Statuts</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {_activityList.slice(0, 3).map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.date.startDate.toLocaleDateString()}</TableCell>
                    <TableCell>{item.date.endDate.toLocaleDateString()}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      <Label
                        variant="soft"
                        color={getStatusColor(item.status)}
                      >
                        {getStatusLabel(item.status)}
                      </Label>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleViewAgenda(item.id)}
                        sx={{ color: 'text.secondary' }}
                      >
                        <Iconify icon="solar:eye-bold" width={16} height={16} />
                      </IconButton>
                      <IconButton
                        component={RouterLink}
                        href={paths.organisateur.gestionevent.edit(item.id)}
                        size="small"
                        onClick={() => handleEditAgenda(item.id)}
                        sx={{ color: 'warning.main' }}
                      >
                        <Iconify icon="solar:pen-bold" width={16} height={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteAgenda(item.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" width={16} height={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LandingPage;