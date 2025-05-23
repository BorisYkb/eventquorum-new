import { Controller } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Card, CardHeader, CardContent } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

import { useInscription } from './controller';

const Inscription = () => {
  const {
    methods,
    onSubmit,
    control,
    isSubmitting,
    methodsQrCode,
    onSubmitQrCode,
    isSubmittingQrCode,
  } = useInscription();

  return (
    <Card>
      <CardHeader
        title="Charte Graphique de l'évènement"
        subheader="Configurez la charte graphique de votre événement pour une expérience utilisateur cohérente."
      />
      <CardContent>
        <Form methods={methods} onSubmit={onSubmit}>
          <Box
            sx={{
              pb: 3,
              marginBottom: 3,
              borderBottom: 'dashed 1px #cccdcf',
            }}
          >
            <Controller
              name="nom"
              control={control}
              render={({ field }) => (
                <Field.Switch
                  {...field}
                  label="Attribuer des boitiers électroniques aux participants"
                />
              )}
            />

            <div className="ml-16">
              <p className="text-sm">
                L&apos;ID virtuel des participants en ligne commence à partir de :{' '}
                <span className="border border-gray-700 p-3 border-dashed">3001</span>
              </p>
            </div>
          </Box>

          <Box
            sx={{
              pb: 3,
              marginBottom: 3,
              borderBottom: 'dashed 1px #cccdcf',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-7 mb-14">
              <Controller
                name="nom"
                control={control}
                render={({ field }) => <Field.Checkbox {...field} label="Nom" />}
              />
              <Controller
                name="prenom"
                control={control}
                render={({ field }) => <Field.Checkbox {...field} label="Prénom" />}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Field.Checkbox {...field} label="Adresse Email" />}
              />
              <Controller
                name="numeroTelephone"
                control={control}
                render={({ field }) => <Field.Checkbox {...field} label="Numéro de téléphone" />}
              />
              <Controller
                name="adresse"
                control={control}
                render={({ field }) => <Field.Checkbox {...field} label="Adresse" />}
              />
              <Controller
                name="paiementEnLigne"
                control={control}
                render={({ field }) => <Field.Checkbox {...field} label="Paiement en ligne" />}
              />
              <Controller
                name="selectionnerActivites"
                control={control}
                render={({ field }) => (
                  <Field.Checkbox {...field} label="Sélectionner les activités" />
                )}
              />
            </div>

            <LoadingButton
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              loadingIndicator="Validation..."
            >
              Mettre à jour
            </LoadingButton>
          </Box>
        </Form>

        <Form methods={methodsQrCode} onSubmit={onSubmitQrCode}>
          <Box
            sx={{
              maxWidth: 720,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
              justifyContent: 'center',
            }}
          >
            <div className="flex-auto flex flex-col items-start justify-center w-full gap-4">
              <Field.Switch
                name="isCodeQrGenerated"
                label="Générer le code QR de la page d'inscription"
              />

              <div className="flex flex-wrap gap-5 items-end">
                <div className="ml-14 border border-dashed border-gray-700 px-4 rounded-lg w-fit">
                  <p className="text-sm">Titre</p>
                  <div>
                    <p className="text-sm">Scanner ici pour vous inscrire</p>

                    {/* Code QR */}
                    <div className="flex flex-col items-center">
                      <div className="w-full max-w-xs">
                        {/* <QRCode value="https://www.eventquorum.com/inscription" /> */}
                      </div>
                    </div>
                  </div>
                </div>

                <LoadingButton
                  fullWidth
                  color="inherit"
                  size="medium"
                  className="!w-fit"
                  type="submit"
                  variant="contained"
                  loading={isSubmittingQrCode}
                  loadingIndicator="Validation..."
                >
                  Générer le code QR
                </LoadingButton>
              </div>
            </div>
          </Box>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Inscription;
