import { Controller } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
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
  Chip
} from '@mui/material';
import { Iconify } from 'src/components/iconify';

import { Form, Field } from 'src/components/hook-form';
import { useLandingPageController } from './controller';
import { UploadBox } from 'src/components/upload';
import { Label } from 'src/components/label';
import path, { normalize } from 'path';
import { _activityList } from 'src/_mock/_activity';

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
      {/* Informations Générales */}
      <Card>
        <CardHeader
          title="INFORMATIONS GENERALE"
        //   subheader="Configurez les informations générales de votre événement"
        />
        <CardContent>
          <Form methods={methods} onSubmit={onSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Message de bienvenue */}
              <Controller
                name="message_bienvenue"
                control={control}
                render={({ field }) => (
                  <Field.Text
                    {...field}
                    label="Message de bienvenue"
                    placeholder="Bienvenu(e) cher(e) participant(e)"
                    multiline
                    rows={4}
                    fullWidth
                  />
                )}
              />

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
                  name="activer_confirmation_presence"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Switch {...field} checked={field.value} />}
                      label="Activer la confirmation de présence"
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
          title="AGENDA"
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