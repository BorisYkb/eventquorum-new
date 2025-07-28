import { Controller } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Card, Button, Divider, MenuItem, CardHeader, CardContent } from '@mui/material';

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
  const { methods, onSubmit, control, isSubmitting } = useVisioConferenceController();
  return (
    <Card>
      <CardHeader
        title="Configurer les visio-conférence"
        // subheader="Configurez la charte graphique de votre événement pour une expérience utilisateur cohérente."
      />
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
                    <MenuItem value="">None</MenuItem>
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

            <div className="grid grid-cols-4 max-md:grid-cols-1 gap-6 gap-y-10">
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
                  <Field.DatePicker
                    // {...field}
                    name="date_conference"
                    label="Date de la conférence"
                  />
                )}
              />

              <Controller
                name="service_visio"
                control={control}
                render={({ field }) => (
                  <Field.Select {...field} name="service_visio" label="Service de visioconférence">
                    <MenuItem value="">Zoom/Teams/Google Meet/8*8</MenuItem>
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
              <div className=' '>
              <p className='text-sm '>Retransmission</p>
              <div className=' flex flex-row'>

              <Controller
                name="isYoutube"
                control={control}
                render={({ field }) => (
                  <Field.Checkbox {...field} label="Youtube" />
                )}
              />
              <Controller
                name="isFacebook"
                control={control}
                render={({ field }) => (
                  <Field.Checkbox {...field} label="Facebook" />
                )}
              />
              </div>
              </div>
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
                  <Field.Text {...field} label="Clé de diffusion" placeholder="Ex: 123456789" />
                )}
              />
            </div>

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
                Enregister
              </LoadingButton>
            </div>
          </Box>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VisioConference;
