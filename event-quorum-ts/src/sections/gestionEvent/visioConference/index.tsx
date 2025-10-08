//src/sections/gestionEvent/visioConference/index.tsx
import { useState } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

import { useVisioConferenceController } from './controller';

// Liste des activités disponibles
const Activites = [
  { value: 'activité 1', label: 'Activité 1' },
  { value: 'activité 2', label: 'Activité 2' },
  { value: 'activité 3', label: 'Activité 3' },
];

// Services de visioconférence disponibles
const OPTIONS = [
  { value: 'zoom', label: 'Zoom' },
  { value: 'teams', label: 'Teams' },
  { value: 'google', label: 'Google Meet' },
];

/**
 * Interface pour le TabPanel
 * Permet d'afficher le contenu d'un onglet spécifique
 */
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

/**
 * Composant TabPanel pour gérer l'affichage des onglets
 */
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`visio-tabpanel-${index}`}
      aria-labelledby={`visio-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

/**
 * Props d'accessibilité pour les onglets
 */
function a11yProps(index: number) {
  return {
    id: `visio-tab-${index}`,
    'aria-controls': `visio-tabpanel-${index}`,
  };
}

/**
 * Composant principal de configuration de la visioconférence
 * Permet de configurer les sessions de visioconférence et de retransmission
 */
const VisioConference = () => {
  const {
    methods,
    onSubmit,
    control,
    isSubmitting,
    watchRetransmission,
    watchAccesParticipants,
    watchSessionVisioActive,
    conferences,
    handleDelete,
    handleEdit,
  } = useVisioConferenceController();

  // État pour gérer l'onglet actif
  const [currentTab, setCurrentTab] = useState(0);

  /**
   * Gestionnaire de changement d'onglet
   */
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Card>
      <CardHeader title="Configurer les visio-conférences" />
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
            {/* Sélection de l'activité */}
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
            </div>

            {/* Onglets pour Session de Visioconférence et Retransmission */}
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={currentTab}
                  onChange={handleTabChange}
                  aria-label="Configuration de visioconférence"
                >
                  <Tab label="Session de Visioconférence" {...a11yProps(0)} />
                  <Tab label="Session de Retransmission" {...a11yProps(1)} />
                </Tabs>
              </Box>

              {/* Onglet 1: Session de Visioconférence */}
              <TabPanel value={currentTab} index={0}>
                <div className="flex flex-col gap-6">
                  {/* Switch pour activer la session de visioconférence */}
                  <Controller
                    name="isActivedSessionVisio"
                    control={control}
                    render={({ field }) => (
                      <Field.Switch {...field} label="Activer une session de Visioconference" />
                    )}
                  />

                  {/* 4 inputs alignés - Grisés si session visio désactivée */}
                  <div className="grid grid-cols-4 max-md:grid-cols-1 gap-6">
                    <Controller
                      name="intitule_conference"
                      control={control}
                      render={({ field }) => (
                        <Field.Text
                          {...field}
                          label="Intitulé de la conférence"
                          placeholder="Ex: Conférence de développement"
                          disabled={!watchSessionVisioActive}
                        />
                      )}
                    />
                    <Controller
                      name="date_conference"
                      control={control}
                      render={({ field }) => (
                        <Field.DatePicker
                          name="date_conference"
                          label="Date de la conférence"
                          disabled={!watchSessionVisioActive}
                        />
                      )}
                    />

                    <Controller
                      name="service_visio"
                      control={control}
                      render={({ field }) => (
                        <Field.Select
                          {...field}
                          name="service_visio"
                          label="Service de visioconférence"
                          disabled={!watchSessionVisioActive}
                        >
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
                          disabled={!watchSessionVisioActive}
                        />
                      )}
                    />
                  </div>

                  {/* Switch pour autoriser l'accès des participants - Grisé si session visio désactivée */}
                  <Controller
                    name="autoriser_acces_participants"
                    control={control}
                    render={({ field }) => (
                      <Field.Switch
                        {...field}
                        label="Autoriser les participants à accéder à la visioconférence"
                        disabled={!watchSessionVisioActive}
                      />
                    )}
                  />
                </div>
              </TabPanel>

              {/* Onglet 2: Session de Retransmission */}
              <TabPanel value={currentTab} index={1}>
                <div className="flex flex-col gap-6">
                  {/* Switch pour activer la retransmission - Grisé si accès participants activé */}
                  <Controller
                    name="autoriser_retransmission"
                    control={control}
                    render={({ field }) => (
                      <Field.Switch
                        {...field}
                        label="Activer la Retransmission de l'évènement pour les participants"
                        disabled={watchAccesParticipants}
                      />
                    )}
                  />

                  {/* Affichage conditionnel si retransmission activée */}
                  {watchRetransmission && (
                    <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg">
                      {/* Checkboxes pour les plateformes de diffusion */}
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

                      {/* Champs pour les informations de streaming */}
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
                </div>
              </TabPanel>
            </Box>

            {/* Boutons d'action */}
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

        {/* Tableau récapitulatif des conférences */}
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
                        {conf.date_conference
                          ? new Date(conf.date_conference).toLocaleDateString('fr-FR')
                          : ''}
                      </TableCell>
                      <TableCell>{conf.service_visio}</TableCell>
                      <TableCell>{conf.autoriser_acces_participants ? 'Oui' : 'Non'}</TableCell>
                      <TableCell>
                        {conf.autoriser_retransmission ? (
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