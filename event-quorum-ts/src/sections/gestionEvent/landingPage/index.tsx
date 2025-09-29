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
  Stack
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
    handleViewAgenda
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
        startIcon={<Iconify icon="mingcute:add-line" width={16} height={16} />  }
        onClick={handleAddAgenda}
      //   sx={{ backgroundColor: '#1976d2' }}
      >
        Ajouter une activité
      </Button>
      </Box>
      

      {/* Informations Générales */}
      <Card>
        <CardHeader
          title="INFORMATIONS GENERALE"
        //   subheader="Configurez les informations générales de votre événement"
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

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Image bannière de l'évènement (Login)</Typography>
                
                <Upload
                  multiple
                  thumbnail={showPreview.value}
                  value={files}
                  onDrop={handleDropMultiFile}
                  onRemove={handleRemoveFile}
                  onRemoveAll={handleRemoveAllFiles}
                  onUpload={() => console.info('ON UPLOAD')}
                />

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
                    <Field.Select {...field} label="Type de connexion" sx={{ minWidth: 200,  }}>
                      {CONNECTION_TYPES.map((option) => (
                        <MenuItem key={option.value} value={option.value} sx={{}}>
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
                      control={<UploadBox sx={{ mr: 3}}/>}
                      label="Importer la vidéo de l'événement"
                    />
                  )}
                />

                
              </Box>

              

              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Field.UploadLogo
                      name="logo"
                      maxSize={314572}
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
                            {/* Formats autorisés *.jpeg, *.jpg, *.png, *.gif */}
                            Logo des sponsors

                          </Typography>
                      }
                  />

                  <Field.UploadLogo
                    name="logo"
                    maxSize={314572}
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
                          {/* Formats autorisés *.jpeg, *.jpg, *.png, *.gif */}
                          Logo de l'événement
                        </Typography>
                    }
                  />
                  <Box sx={{  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

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

                  <Box sx={{  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

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
                //   loading={isSubmitting}
                //   loadingIndicator="Enregistrement..."
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
          title="ACTIVITES / AGENDA"
          action={
            <Button
              variant="contained"
              component={RouterLink}
              href={paths.organisateur.gestionevent.newactivity}
              startIcon={<Iconify icon="mingcute:add-line" width={16} height={16} />  }
              onClick={handleAddAgenda}
            //   sx={{ backgroundColor: '#1976d2' }}
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
                      {/* <Chip
                        label={getStatusLabel(item.statut)}
                        color={getStatusColor(item.statut)}
                        size="small"
                      /> */}
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