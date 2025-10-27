'use client';

import { z as zod } from 'zod';
import { varAlpha } from 'minimal-shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useCallback, useMemo } from 'react';
import { useForm, useFormContext, FormProvider } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from 'src/components/iconify';

const MOCK_ACTIVITIES = [
    {
        id: '1',
        time: '09H00 - 10H00',
        title: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
        description: 'Ouverture officielle de l\'événement',
        status: 'Non démarré',
        statusColor: 'warning',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 5000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 50000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 100000, currency: 'FCFA' }
        ]
    },
    {
        id: '2',
        time: '10H00 - 11H00',
        title: 'POINT DE PRESSE',
        description: 'Conférence de presse',
        status: 'Terminé',
        statusColor: 'error',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 3000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 30000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 75000, currency: 'FCFA' }
        ]
    },
    {
        id: '3',
        time: '11H00 - 12H00',
        title: 'PANEL DE HAUT NIVEAU',
        description: 'Conférence sur la diversité',
        status: 'En cours',
        statusColor: 'success',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 6000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 80000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 150000, currency: 'FCFA' }
        ]
    },
    {
        id: '4',
        time: '12H00 - 13H00',
        title: 'PAUSE CAFÉ',
        description: 'Pause café networking',
        status: 'Non démarré',
        statusColor: 'warning',
        priceOptions: null
    },
    {
        id: '5',
        time: '13H00 - 14H00',
        title: 'COOLING BREAK',
        description: 'Pause détente',
        status: 'Non démarré',
        statusColor: 'warning',
        priceOptions: [
            { id: 'gratuit', label: 'Gratuit', price: 0, currency: 'FCFA' }
        ]
    },
];

const STEPS = ['Informations personnelles', 'Sélection des activités'];

const PAYMENT_OPTIONS = [
    { label: 'Via mobile money', value: 'mobile_money' },
    { label: 'En espèce', value: 'cash' },
];

const MOBILE_MONEY_OPTIONS = [
    { label: 'Orange CI', value: 'orange_ci' },
    { label: 'MTN CI', value: 'mtn_ci' },
    { label: 'MOOV CI', value: 'moov_ci' },
    { label: 'WAVE CI', value: 'wave_ci' },
];

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
    activityId: zod.string(),
    selectedStanding: zod.string().min(1, { message: 'Sélectionnez un type de place!' })
  })).min(1, { message: 'Sélectionnez au moins une activité!' }),
  paymentMethod: zod.string().optional(),
  mobileMoneyNetwork: zod.string().optional(),
});

const ParticipantSchema = zod.object({
  stepOne: StepOneSchema,
  stepTwo: StepTwoSchema,
});

type ParticipantSchemaType = zod.infer<typeof ParticipantSchema>;

const defaultFormValues: ParticipantSchemaType = {
  stepOne: { nom: '', prenom: '', email: '', telephone: '' },
  stepTwo: { activites: [], paymentMethod: '', mobileMoneyNetwork: '' },
};

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

function StepOne() {
  const methods = useFormContext<ParticipantSchemaType>();
  
  if (!methods) {
    return null;
  }

  const { register, formState: { errors } } = methods;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Informations personnelles
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            {...register('stepOne.nom')}
            label="Nom"
            placeholder="Entrez le nom"
            fullWidth
            required
            error={!!errors.stepOne?.nom}
            helperText={errors.stepOne?.nom?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            {...register('stepOne.prenom')}
            label="Prénom"
            placeholder="Entrez le prénom"
            fullWidth
            required
            error={!!errors.stepOne?.prenom}
            helperText={errors.stepOne?.prenom?.message}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            {...register('stepOne.email')}
            label="Email"
            type="email"
            placeholder="exemple@email.com"
            fullWidth
            required
            error={!!errors.stepOne?.email}
            helperText={errors.stepOne?.email?.message}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            {...register('stepOne.telephone')}
            label="Téléphone"
            placeholder="+225 01 02 03 04 05"
            fullWidth
            required
            error={!!errors.stepOne?.telephone}
            helperText={errors.stepOne?.telephone?.message}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function ActivitesSelection({ activites, selectedActivites, onActiviteToggle, onStandingChange }: any) {
  const getStatusColor = (statusColor: string) => {
    switch (statusColor) {
      case 'success': return '#4CAF50';
      case 'warning': return '#FF9800';
      case 'error': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const isActiviteSelected = (activiteId: string) => 
    selectedActivites.some((item: any) => item.activityId === activiteId);

  const getSelectedStanding = (activiteId: string) => {
    const found = selectedActivites.find((item: any) => item.activityId === activiteId);
    return found?.selectedStanding || 'standard';
  };

  const buildRenderedOptions = (a: any) => {
    if (a.priceOptions === null) return [];
    if (a.priceOptions.every((o: any) => o.price === 0)) {
      return [{ id: 'gratuit', label: 'Gratuit', price: 0, currency: 'FCFA' }];
    }
    return a.priceOptions;
  };

  return (
    <Stack spacing={2}>
      {activites.map((activite: any) => {
        const isSelected = isActiviteSelected(activite.id);
        const selectedStanding = getSelectedStanding(activite.id);
        const renderedOptions = buildRenderedOptions(activite);

        return (
          <Card
            key={activite.id}
            sx={{
              border: isSelected ? '2px solid' : '1px solid',
              borderColor: isSelected ? 'primary.main' : 'grey.300',
              bgcolor: isSelected ? 'primary.50' : 'white',
              p: 2,
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: 1
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSelected}
                    onChange={() => onActiviteToggle(activite.id)}
                    color="primary"
                  />
                }
                label=""
                sx={{ m: 0 }}
              />

              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {activite.title}
                  </Typography>
                  <Chip
                    label={activite.status}
                    size="small"
                    sx={{
                      bgcolor: getStatusColor(activite.statusColor),
                      color: 'white',
                      fontWeight: 500
                    }}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {activite.time}
                </Typography>

                {isSelected && renderedOptions.length > 0 && (
                  <Box sx={{ mt: 2, pl: 2, borderLeft: '2px solid', borderColor: 'primary.main' }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                      Type d'accès *
                    </Typography>

                    <RadioGroup
                      value={selectedStanding}
                      onChange={(e) => onStandingChange(activite.id, e.target.value)}
                    >
                      <Stack spacing={1}>
                        {renderedOptions.map((option: any) => (
                          <Box
                            key={option.id}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              p: 1,
                              borderRadius: 1,
                              bgcolor: selectedStanding === option.id ? 'primary.50' : 'transparent',
                              border: '1px solid',
                              borderColor: selectedStanding === option.id ? 'primary.main' : 'grey.300',
                            }}
                          >
                            <FormControlLabel
                              value={option.id}
                              control={<Radio size="small" />}
                              label={
                                <Box>
                                  <Typography variant="body2">{option.label}</Typography>
                                </Box>
                              }
                            />
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                              {option.price.toLocaleString()} {option.currency}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </Box>
                )}
              </Box>
            </Box>
          </Card>
        );
      })}
    </Stack>
  );
}

function ActivitesSummary({ activites, selectedActivites }: any) {
  const activitesSelectionnees = selectedActivites.map((selection: any) => {
    const activite = activites.find((a: any) => a.id === selection.activityId);
    const hasNoPriceOptions = !activite?.priceOptions || activite.priceOptions.length === 0;

    if (hasNoPriceOptions) {
      return {
        id: activite.id,
        title: activite.title,
        selectedStanding: null,
        prix: null,
      };
    }

    const standingOption = activite?.priceOptions?.find((p: any) => p.id === selection.selectedStanding);
    const resolvedOption = standingOption || 
      (selection.selectedStanding === 'gratuit' ? { id: 'gratuit', label: 'Gratuit', price: 0 } : undefined);

    if (!activite || !resolvedOption) return null;

    return {
      id: activite.id,
      title: activite.title,
      selectedStanding: resolvedOption,
      prix: resolvedOption.price,
    };
  }).filter((item: any) => item !== null);

  const totalPrix = activitesSelectionnees.reduce((sum: number, activite: any) => {
    if (activite.prix !== null) return sum + activite.prix;
    return sum;
  }, 0);

  return (
    <Box sx={{ p: 3, borderRadius: 2, bgcolor: 'background.neutral', position: 'sticky', top: 20 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Résumé des activités sélectionnées
      </Typography>

      <Stack spacing={2.5}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Activités sélectionnées
          </Typography>
          <Chip label={activitesSelectionnees.length} color="primary" size="small" />
        </Box>

        <Stack spacing={1.5}>
          {activitesSelectionnees.map((activite: any) => (
            <Box key={activite.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {activite.title}
                </Typography>
                {activite.selectedStanding && activite.prix !== null && activite.prix !== 0 && (
                  <Typography variant="caption" color="primary.main" sx={{ display: 'block' }}>
                    {activite.selectedStanding.label}
                  </Typography>
                )}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: activite.prix === null ? 'text.secondary' : activite.prix === 0 ? 'success.main' : 'text.primary',
                  ml: 1,
                }}
              >
                {activite.prix === null ? '-' : activite.prix === 0 ? 'Gratuit' : `${activite.prix.toLocaleString()} FCFA`}
              </Typography>
            </Box>
          ))}
        </Stack>

        {activitesSelectionnees.length > 0 && (
          <>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">Total</Typography>
              <Typography variant="h6" color="primary">
                {totalPrix.toLocaleString()} FCFA
              </Typography>
            </Box>
            <Divider sx={{ borderStyle: 'dashed' }} />
          </>
        )}
      </Stack>

      {selectedActivites.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
          Aucune activité sélectionnée
        </Typography>
      )}
    </Box>
  );
}

function PaymentMethods({ paymentMethod, mobileMoneyNetwork, onPaymentMethodChange, onMobileMoneyNetworkChange, totalAmount }: any) {
  const isAllFree = totalAmount === 0;

  if (isAllFree) return null;

  return (
    <Box sx={{ p: 3, borderRadius: 2, bgcolor: 'background.neutral', mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Moyen de paiement
      </Typography>

      <Stack spacing={2}>
        {PAYMENT_OPTIONS.map((option) => {
          const isSelected = paymentMethod === option.value;
          
          return (
            <Box key={option.value}>
              <Box
                onClick={() => onPaymentMethodChange(option.value)}
                sx={{
                  p: 2,
                  borderRadius: 1,
                  border: (theme) => `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.24)}`,
                  
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  transition:  (theme) =>
                      theme.transitions.create(['box-shadow'], {
                          easing: theme.transitions.easing.sharp,
                          duration: theme.transitions.duration.shortest,
                      }),
                  ...(isSelected && {
                      boxShadow: (theme) => `0 0 0 2px ${theme.vars.palette.text.primary}`,
                  }),
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: isSelected ? 'primary.main' : 'grey.400',
                    bgcolor: isSelected ? 'primary.main' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isSelected && (
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: 'white',
                      }}
                    />
                    
                  )}
                </Box>
                
                
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  {option.label}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {option.value === 'mobile_money' ? (
                      <>
                        <Iconify width={20} icon="mdi:phone" />
                        {/* <Typography variant="caption">Mobile Money</Typography> */}
                      </>
                  ) : (
                      <>
                        <Iconify width={20} icon="mdi:store" />
                        {/* <Typography variant="caption">Guichet</Typography> */}
                      </>
                  )}
                </Box>
              </Box>

              

              {isSelected && option.value === 'mobile_money' && (
                <Box sx={{ mt: 2, pl: 4 }}>
                  <TextField
                    select
                    fullWidth
                    label="Choisir le réseau mobile money"
                    InputLabelProps={{ shrink: true }}
                    value={mobileMoneyNetwork}
                    onChange={(e) => onMobileMoneyNetworkChange(e.target.value)}
                    slotProps={{ select: { native: true } }}
                  >
                    <option value="">Sélectionner un réseau</option>
                    {MOBILE_MONEY_OPTIONS.map((network) => (
                      <option key={network.value} value={network.value}>
                        {network.label}
                      </option>
                    ))}
                  </TextField>
                </Box>
              )}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}

function StepTwo() {
  const { watch, setValue, getValues } = useFormContext<ParticipantSchemaType>();
  const selectedActivites = watch('stepTwo.activites') || [];
  const paymentMethod = watch('stepTwo.paymentMethod') || '';
  const mobileMoneyNetwork = watch('stepTwo.mobileMoneyNetwork') || '';

  const totalAmount = useMemo(() => selectedActivites.reduce((sum, selection) => {
      const activity = MOCK_ACTIVITIES.find(a => a.id === selection.activityId);
      if (!activity || activity.priceOptions === null) return sum;
      
      const option = activity.priceOptions.find(p => p.id === selection.selectedStanding);
      return sum + (option?.price || 0);
    }, 0), [selectedActivites]);

  const handleActiviteToggle = useCallback((activiteId: string) => {
    const activite = MOCK_ACTIVITIES.find((a) => a.id === activiteId);
    const hasNoPriceOptions = activite && activite.priceOptions === null;
    const isFreeActivity = activite?.priceOptions?.every((opt) => opt.price === 0);

    const currentActivities = getValues('stepTwo.activites') || [];
    const existingIndex = currentActivities.findIndex(a => a.activityId === activiteId);

    if (existingIndex >= 0) {
      setValue('stepTwo.activites', currentActivities.filter(a => a.activityId !== activiteId), { shouldValidate: true });
    } else {
      let defaultStanding = 'standard';
      if (hasNoPriceOptions) defaultStanding = 'included';
      else if (isFreeActivity) defaultStanding = 'gratuit';

      setValue('stepTwo.activites', [
        ...currentActivities,
        { activityId: activiteId, selectedStanding: defaultStanding }
      ], { shouldValidate: true });
    }
  }, [getValues, setValue]);

  const handleStandingChange = useCallback((activiteId: string, standing: string) => {
    const currentActivities = getValues('stepTwo.activites') || [];
    setValue('stepTwo.activites', currentActivities.map(item =>
      item.activityId === activiteId ? { ...item, selectedStanding: standing } : item
    ), { shouldValidate: true });
  }, [getValues, setValue]);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 7 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Activités disponibles
        </Typography>
        <ActivitesSelection
          activites={MOCK_ACTIVITIES}
          selectedActivites={selectedActivites}
          onActiviteToggle={handleActiviteToggle}
          onStandingChange={handleStandingChange}
        />
      </Grid>

      <Grid size={{ xs: 12, lg: 5 }}>
        <Stack spacing={3}>
          <ActivitesSummary
            activites={MOCK_ACTIVITIES}
            selectedActivites={selectedActivites}
          />

          <PaymentMethods
            paymentMethod={paymentMethod}
            mobileMoneyNetwork={mobileMoneyNetwork}
            onPaymentMethodChange={(value: string) => setValue('stepTwo.paymentMethod', value)}
            onMobileMoneyNetworkChange={(value: string) => setValue('stepTwo.mobileMoneyNetwork', value)}
            totalAmount={totalAmount}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}

function StepCompleted({ onReset, onBackToList }: { onReset: () => void; onBackToList: () => void }) {
  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Box sx={{ mb: 4, fontSize: 100 }}>✅</Box>
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

export default function AddParticipantForm({ onBackToList }: { onBackToList?: () => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [cashDialog, setCashDialog] = useState(false);

  const methods = useForm<ParticipantSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(ParticipantSchema),
    defaultValues: defaultFormValues,
  });

  const { reset, trigger, handleSubmit, watch, formState: { isSubmitting } } = methods;
  const watchedValues = watch();

  const handleNext = useCallback(async () => {
    if (activeStep === 0) {
      const isValid = await trigger('stepOne');
      if (!isValid) return;
    }
    setActiveStep((s) => s + 1);
  }, [activeStep, trigger]);

  const handleBack = useCallback(() => {
    setActiveStep((s) => s - 1);
  }, []);

  const handleReset = useCallback(() => {
    reset();
    setActiveStep(0);
    setCashDialog(false);
  }, [reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const isValid = await trigger('stepTwo');
      if (!isValid) return;

      const totalAmount = data.stepTwo.activites.reduce((sum, selection) => {
        const activity = MOCK_ACTIVITIES.find(a => a.id === selection.activityId);
        if (!activity || activity.priceOptions === null) return sum;
        const option = activity.priceOptions.find(p => p.id === selection.selectedStanding);
        return sum + (option?.price || 0);
      }, 0);

      if (totalAmount > 0 && !data.stepTwo.paymentMethod) {
        alert('Veuillez sélectionner un moyen de paiement');
        return;
      }

      if (data.stepTwo.paymentMethod === 'mobile_money' && !data.stepTwo.mobileMoneyNetwork) {
        alert('Veuillez sélectionner un réseau mobile money');
        return;
      }

      console.log('Données du participant:', data);

      if (data.stepTwo.paymentMethod === 'cash') {
        setCashDialog(true);
      } else {
        setActiveStep(STEPS.length);
      }
    } catch (error) {
      console.error(error);
    }
  });

  const handleConfirmCash = useCallback(() => {
    setCashDialog(false);
    setActiveStep(STEPS.length);
  }, []);

  const completedStep = activeStep === STEPS.length;

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={onBackToList} sx={{ mr: 2 }}>
          <span style={{ fontSize: 24 }}>←</span>
        </IconButton>
        <Typography variant="h4">
          Ajouter un participant
        </Typography>
      </Box>

      <Card sx={{ p: 5 }}>
        <CustomStepper steps={STEPS} activeStep={activeStep} />

        <FormProvider {...methods}>
          <Box sx={{ minHeight: 400, mb: 3 }}>
            {activeStep === 0 && <StepOne />}
            {activeStep === 1 && <StepTwo />}
            {completedStep && <StepCompleted onReset={handleReset} onBackToList={onBackToList || (() => {})} />}
          </Box>

          {!completedStep && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleBack} disabled={activeStep === 0} variant="outlined">
                Précédent
              </Button>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" onClick={onBackToList || handleReset}>
                  Annuler
                </Button>

                {activeStep === STEPS.length - 1 ? (
                  <LoadingButton
                    onClick={onSubmit}
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Enregistrer le participant
                  </LoadingButton>
                ) : (
                  <Button variant="contained" onClick={handleNext}>
                    Suivant
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </FormProvider>
      </Card>

      <Dialog open={cashDialog} onClose={() => setCashDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center' }}>Paiement en espèce</DialogTitle>
        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Rapprochez-vous du guichet de paiement
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Merci de préparer la monnaie.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button onClick={handleConfirmCash} variant="contained" size="large">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}