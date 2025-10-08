import { Controller } from 'react-hook-form';

import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Card,
  Button,
  Divider,
  MenuItem,
  CardHeader,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

import { useVisioConferenceController } from './controller';

const Activites = [
  { value: 'activité 1', label: 'Activité 1' },
  { value: 'activité 2', label: 'Activité 2' },
  { value: 'activité 3', label: 'Activité 3' },
];

const OPTIONS = [
  { value: 'zoom', label: 'Zoom' },
  { value: 'teams', label: 'Teams' },
  { value: 'google', label: 'Google Meet' },
];

const VisioConference = () => {
  const {
    methods,
    onSubmit,
    control,
    isSubmitting,
    watchRetransmission,
    conferences,
    handleDelete,
    handleEdit,
  } = useVisioConferenceController();

  return (
    <Card>
      <CardHeader title="Configurer la visio-conférence" />
      <CardContent>
        <Form methods={methods} onSubmit={onSubmit}>
          <Box
            sx={{
              pb: 3,
              marginBottom: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div className="flex flex-col gap-4 my-3">
              <Controller
                name="activite"
                control={control}
                render={({ field }) => (
                  <Field.Select {...field} name="activite" label="Choisir une activité">
                    <MenuItem value="">Toutes les activités</MenuItem>
                    <Divider sx={{ borderStyle: 'dashed' }} />
                    {Activites.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field.Select>
                )}
              />
              <Controller
                name="isActivedSessionVisio"
                control={control}
                render={({ field }) => (
                  <Field.Switch {...field} label="Activer une session de Visioconference" />
                )}
              />
            </div>

            {/* 4 inputs alignés */}
            <div className="grid grid-cols-4 max-md:grid-cols-1 gap-6">
              <Controller
                name="intitule_conference"
                control={control}
                render={({ field }) => (
                  <Field.Text
                    {...field}
                    label="Intitulé de la conférence"
                    placeholder="Ex: Conférence de développement"
                  />
                )}
              />
              <Controller
                name="date_conference"
                control={control}
                render={({ field }) => (
                  <Field.DatePicker name="date_conference" label="Date de la conférence" />
                )}
              />

              <Controller
                name="service_visio"
                control={control}
                render={({ field }) => (
                  <Field.Select {...field} name="service_visio" label="Service de visioconférence">
                    <MenuItem value="">Sélectionner</MenuItem>
                    <Divider sx={{ borderStyle: 'dashed' }} />
                    {OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field.Select>
                )}
              />
              <Controller
                name="mot_de_passe_reunion"
                control={control}
                render={({ field }) => (
                  <Field.Text
                    {...field}
                    label="Mot de passe de réunion"
                    placeholder="Ex: 123456789"
                  />
                )}
              />
            </div>

            {/* Radio Buttons pour accès participants */}
            <Controller
              name="autoriser_acces_participants"
              control={control}
              render={({ field }) => (
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Autoriser les participants à accéder à la visioconférence
                  </FormLabel>
                  <RadioGroup {...field} row>
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                  </RadioGroup>
                </FormControl>
              )}
            />

            {/* Radio Buttons pour retransmission */}
            <Controller
              name="autoriser_retransmission"
              control={control}
              render={({ field }) => (
                <FormControl component="fieldset">
                  <FormLabel component="legend">Activité la Retransmission de l'évènement pour les participants</FormLabel>
                  <RadioGroup {...field} row>
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                  </RadioGroup>
                </FormControl>
              )}
            />

            {/* Affichage conditionnel si retransmission = oui */}
            {watchRetransmission === 'oui' && (
              <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-row gap-6">
                  <Controller
                    name="isYoutube"
                    control={control}
                    render={({ field }) => <Field.Checkbox {...field} label="Youtube" />}
                  />
                  <Controller
                    name="isFacebook"
                    control={control}
                    render={({ field }) => <Field.Checkbox {...field} label="Facebook" />}
                  />
                  <Controller
                    name="isTiktok"
                    control={control}
                    render={({ field }) => <Field.Checkbox {...field} label="Tiktok" />}
                  />
                </div>

                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
                  <Controller
                    name="lien_stream"
                    control={control}
                    render={({ field }) => (
                      <Field.Text
                        {...field}
                        label="Lien de stream"
                        placeholder="Ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      />
                    )}
                  />

                  <Controller
                    name="diffusion_key"
                    control={control}
                    render={({ field }) => (
                      <Field.Text
                        {...field}
                        label="Clé de diffusion"
                        placeholder="Ex: 123456789"
                      />
                    )}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-5 mt-5">
              <Button variant="outlined" color="inherit" onClick={() => methods.reset()}>
                Annuler
              </Button>

              <LoadingButton
                fullWidth
                color="inherit"
                size="medium"
                className="!w-fit"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                loadingIndicator="Validation..."
              >
                Enregistrer
              </LoadingButton>
            </div>
          </Box>
        </Form>

        {/* Tableau récapitulatif */}
        {conferences.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 3 }} />
            <h3 className="text-lg font-semibold mb-3">
              Récapitulatif des conférences enregistrées
            </h3>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Activité</TableCell>
                    <TableCell>Intitulé</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Service</TableCell>
                    <TableCell>Accès participants</TableCell>
                    <TableCell>Retransmission</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {conferences.map((conf, index) => (
                    <TableRow key={index}>
                      <TableCell>{conf.activite}</TableCell>
                      <TableCell>{conf.intitule_conference}</TableCell>
                      <TableCell>
                        {new Date(conf.date_conference).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell>{conf.service_visio}</TableCell>
                      <TableCell>{conf.autoriser_acces_participants}</TableCell>
                      <TableCell>
                        {conf.autoriser_retransmission === 'oui' ? (
                          <div>
                            {conf.isYoutube && '📺 YouTube '}
                            {conf.isFacebook && '👍 Facebook '}
                            {conf.isTiktok && '🎵 TikTok'}
                          </div>
                        ) : (
                          'Non'
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(index)}
                          aria-label="modifier"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(index)}
                          aria-label="supprimer"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default VisioConference;