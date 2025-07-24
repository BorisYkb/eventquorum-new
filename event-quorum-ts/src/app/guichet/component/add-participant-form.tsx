'use client';

import React, { useState, useCallback } from 'react';
import { z as zod } from 'zod';
import { useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';

import { DashboardContent } from 'src/layouts/guichet';
import { Form, Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const STEPS = ['Informations personnelles', 'Sélection des activités', 'Confirmation'];

// Mock data pour les activités avec plus d'informations
const MOCK_ACTIVITIES = [
    {
        id: 1,
        code: '09H00 - 09H00',
        name: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
        type: 'Atelier',
        title: 'Formation',
        status: 'Non démarré',
        statusColor: 'warning',
        description: 'Formation professionnelle',
        typePlace: [
            { label: 'Standard', value: 'standard', price: 500 },
            { label: 'VIP', value: 'vip', price: 50000 },
            { label: 'VVIP', value: 'vvip', price: 100000 }
        ]
    },
    {
        id: 2,
        code: '09H00 - 09H00',
        name: 'POINT DE PRESSE',
        type: 'Salon',
        title: 'Innovations',
        status: 'Terminé',
        statusColor: 'error',
        description: 'Salon des innovations',
        typePlace: [
            { label: 'Standard', value: 'standard', price: 300 },
            { label: 'VIP', value: 'vip', price: 30000 },
            { label: 'VVIP', value: 'vvip', price: 75000 }
        ]
    },
    {
        id: 3,
        code: '11H00 - 12H00',
        name: 'PANEL DE HAUT NIVEAU',
        type: 'Conférence',
        title: 'Diversité',
        status: 'En cours',
        statusColor: 'success',
        description: 'Conférence sur la diversité',
        typePlace: [
            { label: 'Standard', value: 'standard', price: 600 },
            { label: 'VIP', value: 'vip', price: 80000 },
            { label: 'VVIP', value: 'vvip', price: 150000 }
        ]
    },
    {
        id: 4,
        code: '12H00 - 13H00',
        name: 'PAUSE CAFE',
        type: 'Festival',
        title: 'Planète Verte',
        status: 'Non démarré',
        statusColor: 'warning',
        description: 'Festival écologique',
        typePlace: [
            { label: 'Standard', value: 'standard', price: 400 },
            { label: 'VIP', value: 'vip', price: 50000 },
            { label: 'VVIP', value: 'vvip', price: 90000 }
        ]
    },
    {
        id: 5,
        code: '13H00 - 14H00',
        name: 'COOLING BREAK',
        type: 'Pause',
        title: 'Détente',
        status: 'Non démarré',
        statusColor: 'warning',
        description: 'Pause détente',
        typePlace: [
            { label: 'Standard', value: 'standard', price: 200 },
            { label: 'VIP', value: 'vip', price: 25000 },
            { label: 'VVIP', value: 'vvip', price: 50000 }
        ]
    },
];

// Schémas de validation
const StepOneSchema = zod.object({
  nom: zod.string().min(1, { message: 'Le nom est requis!' }),
  prenom: zod.string().min(1, { message: 'Le prénom est requis!' }),
  email: zod
    .string()
    .min(1, { message: 'L\'email est requis!' })
    .email({ message: 'L\'email doit être une adresse valide!' }),
  telephone: zod
    .string()
    .min(1, { message: 'Le téléphone est requis!' })
    .regex(/^[0-9+\-\s()]+$/, { message: 'Format de téléphone invalide!' }),
});

const StepTwoSchema = zod.object({
  activites: zod.array(zod.object({
    activityId: zod.number(),
    typePlace: zod.string().min(1, { message: 'Sélectionnez un type de place!' })
  })).min(1, { message: 'Sélectionnez au moins une activité!' }),
});

const StepThreeSchema = zod.object({
  commentaires: zod.string().optional(),
});

const ParticipantSchema = zod.object({
  stepOne: StepOneSchema,
  stepTwo: StepTwoSchema,
  stepThree: StepThreeSchema,
});

type ParticipantSchemaType = zod.infer<typeof ParticipantSchema>;

const defaultFormValues: ParticipantSchemaType = {
  stepOne: { nom: '', prenom: '', email: '', telephone: '' },
  stepTwo: { activites: [] },
  stepThree: { commentaires: '' },
};

// ----------------------------------------------------------------------

// Composant Stepper personnalisé
function CustomStepper({ steps, activeStep }: { steps: string[]; activeStep: number }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {steps.map((step, index) => (
          <Box key={step} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: index <= activeStep ? 'primary.main' : 'grey.300',
                color: index <= activeStep ? 'white' : 'grey.600',
                fontWeight: 'bold',
              }}
            >
              {index + 1}
            </Box>
            <Typography
              variant="body2"
              sx={{
                ml: 1,
                color: index <= activeStep ? 'primary.main' : 'grey.600',
                fontWeight: index === activeStep ? 'bold' : 'normal',
              }}
            >
              {step}
            </Typography>
            {index < steps.length - 1 && (
              <Box
                sx={{
                  width: 60,
                  height: 2,
                  bgcolor: index < activeStep ? 'primary.main' : 'grey.300',
                  mx: 2,
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// Étape 1 : Informations personnelles
function StepOne() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Informations personnelles
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Field.Text
            name="stepOne.nom"
            label="Nom"
            placeholder="Entrez le nom"
            required
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Field.Text
            name="stepOne.prenom"
            label="Prénom"
            placeholder="Entrez le prénom"
            required
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Field.Text
            name="stepOne.email"
            label="Email"
            type="email"
            placeholder="exemple@email.com"
            required
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Field.Text
            name="stepOne.telephone"
            label="Téléphone"
            placeholder="+225 01 02 03 04 05"
            required
          />
        </Grid>
      </Grid>
    </Box>
  );
}

// Étape 2 : Sélection des activités - VERSION CORRIGÉE
function StepTwo() {
  const { watch, setValue, getValues } = useFormContext<ParticipantSchemaType>();
  const watchedActivities = watch('stepTwo.activites') || [];

  const getStatusColor = (statusColor: string) => {
    switch (statusColor) {
      case 'success':
        return '#4CAF50';
      case 'warning':
        return '#FF9800';
      case 'error':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const handleActivityToggle = (activityId: number) => {
    const currentActivities = getValues('stepTwo.activites') || [];
    const existingIndex = currentActivities.findIndex(a => a.activityId === activityId);

    if (existingIndex >= 0) {
      // Retirer l'activité
      const newActivities = currentActivities.filter(a => a.activityId !== activityId);
      setValue('stepTwo.activites', newActivities, { shouldValidate: true });
    } else {
      // Ajouter l'activité avec une valeur par défaut pour typePlace
      const newActivities = [...currentActivities, {
        activityId,
        typePlace: '' // Valeur vide qui forcera l'utilisateur à choisir
      }];
      setValue('stepTwo.activites', newActivities, { shouldValidate: true });
    }
  };

  const handleTypePlaceChange = (activityId: number, typePlace: string) => {
    const currentActivities = getValues('stepTwo.activites') || [];
    const updatedActivities = currentActivities.map(activity =>
      activity.activityId === activityId
        ? { ...activity, typePlace }
        : activity
    );
    setValue('stepTwo.activites', updatedActivities, { shouldValidate: true });
  };

  const isActivitySelected = (activityId: number) => {
    return watchedActivities.some(a => a.activityId === activityId);
  };

  const getSelectedTypePlace = (activityId: number) => {
    const activity = watchedActivities.find(a => a.activityId === activityId);
    return activity?.typePlace || '';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Sélection des activités
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choisissez les activités auxquelles vous souhaitez participer et sélectionnez le type de place pour chacune.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {MOCK_ACTIVITIES.map((activity) => {
          const isSelected = isActivitySelected(activity.id);
          const selectedTypePlace = getSelectedTypePlace(activity.id);

          return (
            <Box
              key={activity.id}
              sx={{
                border: isSelected ? '2px solid' : '1px solid',
                borderColor: isSelected ? 'primary.main' : 'grey.300',
                borderRadius: 2,
                p: 3,
                bgcolor: isSelected ? 'primary.50' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: 1
                }
              }}
            >
              {/* En-tête de l'activité */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleActivityToggle(activity.id)}
                  style={{
                    marginTop: 4,
                    width: 16,
                    height: 16
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Typography variant="body2" sx={{
                      color: 'grey.600',
                      fontSize: '0.75rem',
                      fontWeight: 500
                    }}>
                      {activity.code}
                    </Typography>
                    <Typography variant="body1" sx={{
                      fontWeight: 600,
                      fontSize: '0.875rem'
                    }}>
                      {activity.name}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Box
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: getStatusColor(activity.statusColor),
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 500
                      }}
                    >
                      {activity.status}
                    </Box>
                  </Box>

                  {/* Type de places */}
                  {isSelected && (
                    <Box sx={{ mt: 2, pl: 2, borderLeft: '2px solid', borderColor: 'primary.main' }}>
                      <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
                        Type de place *
                      </Typography>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {activity.typePlace.map((place) => (
                          <Box key={place.value} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, borderRadius: 1, bgcolor: selectedTypePlace === place.value ? 'primary.50' : 'transparent' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <input
                                type="radio"
                                name={`typePlace_${activity.id}`}
                                value={place.value}
                                checked={selectedTypePlace === place.value}
                                onChange={(e) => handleTypePlaceChange(activity.id, e.target.value)}
                                style={{ marginRight: 8 }}
                              />
                              <Typography variant="body2">
                                {place.label}
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                              {place.price.toLocaleString()} F CFA
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      {watchedActivities.length === 0 && (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
          Sélectionnez au moins une activité pour continuer
        </Typography>
      )}
    </Box>
  );
}

// Étape 3 : Confirmation
function StepThree({ watchedValues }: { watchedValues: any }) {
  // Calculer le montant total
  const calculateTotal = () => {
    if (!watchedValues.stepTwo?.activites) return 0;

    return watchedValues.stepTwo.activites.reduce((total: number, selectedActivity: any) => {
      const activity = MOCK_ACTIVITIES.find(a => a.id === selectedActivity.activityId);
      if (activity) {
        const typePlace = activity.typePlace.find(t => t.value === selectedActivity.typePlace);
        if (typePlace) {
          return total + typePlace.price;
        }
      }
      return total;
    }, 0);
  };

  const totalAmount = calculateTotal();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Résumé et confirmation
      </Typography>

      {/* Résumé des informations personnelles */}
      <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
          Informations personnelles
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="text.secondary">Nom complet:</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {watchedValues.stepOne?.nom} {watchedValues.stepOne?.prenom}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="text.secondary">Email:</Typography>
            <Typography variant="body1">{watchedValues.stepOne?.email}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="text.secondary">Téléphone:</Typography>
            <Typography variant="body1">{watchedValues.stepOne?.telephone}</Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Résumé des activités sélectionnées */}
      <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
          Activités sélectionnées ({watchedValues.stepTwo?.activites?.length || 0})
        </Typography>

        {watchedValues.stepTwo?.activites?.map((selectedActivity: any, index: number) => {
          const activity = MOCK_ACTIVITIES.find(a => a.id === selectedActivity.activityId);
          const typePlace = activity?.typePlace.find(t => t.value === selectedActivity.typePlace);

          return (
            <Box key={index} sx={{
              mb: 2,
              p: 2,
              bgcolor: 'white',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'grey.200'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {activity?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {activity?.code}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{
                      px: 1.5,
                      py: 0.5,
                      bgcolor: 'primary.100',
                      color: 'primary.main',
                      borderRadius: 1,
                      fontWeight: 'medium'
                    }}>
                      {typePlace?.label}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      {typePlace?.price.toLocaleString()} F CFA
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Montant total */}
      <Box sx={{
        p: 3,
        bgcolor: 'primary.50',
        borderRadius: 1,
        border: '2px solid',
        borderColor: 'primary.main'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: 'primary.main' }}>
            Montant total à payer
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {totalAmount.toLocaleString()} F CFA
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// Étape finale : Succès
function StepCompleted({ onReset, onBackToList }: { onReset: () => void; onBackToList: () => void }) {
  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Iconify icon="eva:checkmark-circle-2-fill" sx={{ fontSize: 100, color: 'success.main' }} />
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Participant ajouté avec succès !
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Le participant a été enregistré et inscrit aux activités sélectionnées.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button variant="outlined" onClick={onReset}>
          Ajouter un autre participant
        </Button>
        <Button variant="contained" onClick={onBackToList}>
          Retour à la liste
        </Button>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

// Composant principal - Export par défaut
export default function AddParticipantForm({ onBackToList }: { onBackToList: () => void }) {
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm<ParticipantSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(ParticipantSchema),
    defaultValues: defaultFormValues,
  });

  const {
    reset,
    trigger,
    clearErrors,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const watchedValues = watch();

  const handleNext = useCallback(
    async (step?: 'stepOne' | 'stepTwo') => {
      if (step) {
        const isValid = await trigger(step);

        if (isValid) {
          clearErrors();
          setActiveStep((currentStep) => currentStep + 1);
        }
      } else {
        setActiveStep((currentStep) => currentStep + 1);
      }
    },
    [trigger, clearErrors]
  );

  const handleBack = useCallback(() => {
    setActiveStep((currentStep) => currentStep - 1);
  }, []);

  const handleReset = useCallback(() => {
    reset();
    setActiveStep(0);
  }, [reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.info('Données du participant:', data);

      // Ici vous pouvez appeler votre API pour enregistrer le participant
      // await saveParticipant(data);

      handleNext();
    } catch (error) {
      console.error(error);
    }
  });

  const completedStep = activeStep === STEPS.length;

  return (
    <DashboardContent maxWidth="lg">
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={onBackToList} sx={{ mr: 2 }}>
          <Iconify icon="eva:arrow-back-fill" />
        </IconButton>
        <Typography variant="h4">
          Ajouter un participant
        </Typography>
      </Box>

      <Card sx={{ p: 5, width: 1, mx: 'auto', maxWidth: 800 }}>
        <CustomStepper steps={STEPS} activeStep={activeStep} />

        <Form methods={methods} onSubmit={onSubmit}>
          <Box
            sx={{
              p: 3,
              mb: 3,
              gap: 3,
              minHeight: 400,
              display: 'flex',
              borderRadius: 1.5,
              flexDirection: 'column',
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            {activeStep === 0 && <StepOne />}
            {activeStep === 1 && <StepTwo />}
            {activeStep === 2 && <StepThree watchedValues={watchedValues} />}
            {completedStep && (
              <StepCompleted onReset={handleReset} onBackToList={onBackToList} />
            )}
          </Box>

          {!completedStep && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                variant="outlined"
              >
                Précédent
              </Button>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" onClick={onBackToList}>
                  Annuler
                </Button>

                {activeStep === 0 && (
                  <Button
                    variant="contained"
                    onClick={() => handleNext('stepOne')}
                  >
                    Suivant
                  </Button>
                )}

                {activeStep === 1 && (
                  <Button
                    variant="contained"
                    onClick={() => handleNext('stepTwo')}
                  >
                    Suivant
                  </Button>
                )}

                {activeStep === STEPS.length - 1 && (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Enregistrer le participant
                  </LoadingButton>
                )}
              </Box>
            </Box>
          )}
        </Form>
      </Card>
    </DashboardContent>
  );
}
