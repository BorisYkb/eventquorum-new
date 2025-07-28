import { Controller } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect } from 'react';
import {
    Box,
    Card,
    Button,
    MenuItem,
    CardHeader,
    CardContent,
    Typography,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TextField,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    Grid2 as Grid,
    Divider
} from '@mui/material';
import { Icon } from '@iconify/react';

import { Form, Field } from 'src/components/hook-form';
import { useInfoPaiementController } from './controller';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

const PAYMENT_METHODS = [
    { value: 'orange_ci', label: 'ORANGE CI' },
    { value: 'mtn_ci', label: 'MTN CI' },
    { value: 'moov_ci', label: 'MOOV CI' },
    { value: 'wave_ci', label: 'WAVE CI' },
    { value: 'visa', label: 'VISA' },
];

const CURRENCIES = [
    { value: 'fcfa', label: 'FCFA' },
    { value: 'euro', label: 'Euro' },
    { value: 'dollars', label: 'Dollars' },
];

const TARIFICATION_MODES = [
    { value: 'gratuit', label: 'Accés gratuit à l\'évènement' },
    //   { value: 'montant_fixe', label: 'Fixer un montant fixe' },
    { value: 'montant_unique', label: 'Fixer un montant unique' },
    { value: 'montant_activite', label: 'Fixer un montant par activité' },
];

const PRICING_TYPES = [
    { value: 'montant_fixe', label: 'Montant fixe' },
    { value: 'montant_parametrable', label: 'Montant paramétrable (3 max)' },
];

const InfoPaiement = () => {
    const {
        methods,
        onSubmit,
        control,
        isSubmitting,
        activities,
        handleViewActivity,
        handleEditActivity,
        handleDeleteActivity,
        selectedPaymentMethods,
        handlePaymentMethodChange,
        watchTarificationMode,
        watchPricingType,
        watchNombreCategories,
        updateCategoriesArray,
        CATEGORY_COUNT_OPTIONS
    } = useInfoPaiementController();

    useEffect(() => {
        if (watchNombreCategories) {
            updateCategoriesArray(watchNombreCategories);
        }
    }, [watchNombreCategories, updateCategoriesArray]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Form methods={methods} onSubmit={onSubmit}>
                {/* Mode de règlement autorisé */}
                <Card>
                    <CardHeader
                        title="Mode de règlement autorisé"
                        action={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Button
                                    component={RouterLink}
                                    href={paths.organisateur.gestionevent.eventfinancialsituation.root}
                                    variant='outlined'
                                    startIcon={<Icon icon="lucide:file-chart-pie" width={20} height={20} />}
                                >
                                    Consulter la situation financière de l'événement
                                </Button>
                            </Box>
                        }
                    />
                    <CardContent>
                        <FormGroup row>
                            {PAYMENT_METHODS.map((method) => (
                                <FormControlLabel
                                    key={method.value}
                                    control={
                                        <Checkbox
                                            checked={selectedPaymentMethods.includes(method.value)}
                                            onChange={(e) => handlePaymentMethodChange(method.value, e.target.checked)}
                                        />
                                    }
                                    label={method.label}
                                />
                            ))}
                        </FormGroup>
                    </CardContent>
                    {/* </Card> */}

                    {/* Préciser les informations d'un mode de paiement */}
                    {/* <Card> */}
                    <CardHeader title="Préciser les informations d'un mode de paiement" />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Controller
                                    name="mode_paiement"
                                    control={control}
                                    render={({ field }) => (
                                        <Field.Select {...field} label="Choix d'un mode de paiement">
                                            <MenuItem value="">Sélectionner un mode</MenuItem>
                                            {PAYMENT_METHODS.map((method) => (
                                                <MenuItem key={method.value} value={method.value}>
                                                    {method.label}
                                                </MenuItem>
                                            ))}
                                        </Field.Select>
                                    )}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 3 }} >
                                <Controller
                                    name="compte_beneficiaire"
                                    control={control}
                                    render={({ field }) => (
                                        <Field.Text
                                            {...field}
                                            label="Compte bénéficiaire"
                                            placeholder="Numéro de compte"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 3 }}>
                                <Controller
                                    name="autres_infos"
                                    control={control}
                                    render={({ field }) => (
                                        <Field.Text
                                            {...field}
                                            label="Autres infos"
                                            placeholder="Informations supplémentaires"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 2 }}>
                                <Controller
                                    name="devise"
                                    control={control}
                                    render={({ field }) => (
                                        <Field.Select {...field} label="Devise">
                                            {CURRENCIES.map((currency) => (
                                                <MenuItem key={currency.value} value={currency.value}>
                                                    {currency.label}
                                                </MenuItem>
                                            ))}
                                        </Field.Select>
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    {/* </Card> */}

                    {/* Tarification pour participer à l'événement */}
                    {/* <Card> */}
                    <CardHeader title="Tarification pour participer à l'événement" />
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Controller
                                        name="mode_tarification"
                                        control={control}
                                        render={({ field }) => (
                                            <Field.Select {...field} label="Choix du mode de tarification">
                                                {TARIFICATION_MODES.map((mode) => (
                                                    <MenuItem key={mode.value} value={mode.value}>
                                                        {mode.label}
                                                    </MenuItem>
                                                ))}
                                            </Field.Select>
                                        )}
                                    />
                                </Grid>
                                {watchTarificationMode !== 'gratuit' && (
                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <Controller
                                            name="activite"
                                            control={control}
                                            render={({ field }) => (
                                                <Field.Select {...field} label="Sélectionner une activité">
                                                    <MenuItem value="">Sélectionner</MenuItem>
                                                    <MenuItem value="activite1">Activité 1</MenuItem>
                                                    <MenuItem value="activite2">Activité 2</MenuItem>
                                                </Field.Select>
                                            )}
                                        />
                                    </Grid>)}
                            </Grid>

                            {watchTarificationMode !== 'gratuit' && (
                                <Box>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Type de tarification</FormLabel>
                                        <Controller
                                            name="type_tarification"
                                            control={control}
                                            render={({ field }) => (
                                                <RadioGroup {...field} row>
                                                    {PRICING_TYPES.map((type) => (
                                                        <FormControlLabel
                                                            key={type.value}
                                                            value={type.value}
                                                            control={<Radio />}
                                                            label={type.label}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            )}
                                        />
                                    </FormControl>

                                    {watchPricingType === 'montant_fixe' && (
                                        <Box sx={{ mt: 2 }}>
                                            <Controller
                                                name="montant_fixe"
                                                control={control}
                                                render={({ field }) => (
                                                    <Field.Text
                                                        {...field}
                                                        label="Montant"
                                                        type="number"
                                                        sx={{ width: 200 }}
                                                    />
                                                )}
                                            />
                                        </Box>
                                    )}

                                    {watchPricingType === 'montant_parametrable' && (
                                        <Box sx={{ mt: 2 }}>
                                            <Grid container spacing={2}>
                                                <Grid size={{ xs: 12, md: 3 }}>
                                                    <Controller
                                                        name="nombre_categories"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Field.Select
                                                                {...field}
                                                                label="Nombre de catégories"
                                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                            >
                                                                {CATEGORY_COUNT_OPTIONS.map((option) => (
                                                                    <MenuItem key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </MenuItem>
                                                                ))}
                                                            </Field.Select>
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>

                                            {watchNombreCategories && (
                                                <Box sx={{ mt: 3 }}>
                                                    <Typography variant="subtitle2" gutterBottom>
                                                        Informations des catégories
                                                    </Typography>
                                                    {Array.from({ length: watchNombreCategories }, (_, index) => (
                                                        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                                Catégorie {index + 1}
                                                            </Typography>
                                                            <Grid container spacing={2}>
                                                                <Grid size={{ xs: 12, md: 4 }}>
                                                                    <Controller
                                                                        name={`categories.${index}.nom`}
                                                                        control={control}
                                                                        render={({ field }) => (
                                                                            <Field.Text
                                                                                {...field}
                                                                                label="Nom de la catégorie"
                                                                                placeholder="Ex: VIP, Normal, Étudiant"
                                                                            />
                                                                        )}
                                                                    />
                                                                </Grid>
                                                                <Grid size={{ xs: 12, md: 3 }}>
                                                                    <Controller
                                                                        name={`categories.${index}.montant`}
                                                                        control={control}
                                                                        render={({ field }) => (
                                                                            <Field.Text
                                                                                {...field}
                                                                                label="Montant"
                                                                                type="number"
                                                                                placeholder="0"
                                                                            />
                                                                        )}
                                                                    />
                                                                </Grid>
                                                                <Grid size={{ xs: 12, md: 5 }}>
                                                                    <Controller
                                                                        name={`categories.${index}.description`}
                                                                        control={control}
                                                                        render={({ field }) => (
                                                                            <Field.Text
                                                                                {...field}
                                                                                label="Description (optionnel)"
                                                                                placeholder="Description de la catégorie"
                                                                            />
                                                                        )}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            )}
                                        </Box>
                                    )}
                                </Box>
                            )}

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <LoadingButton
                                    variant="contained"
                                    color="success"
                                    type="submit"
                                    loading={isSubmitting}
                                    loadingIndicator="Enregistrement..."
                                >
                                    Enregistrer
                                </LoadingButton>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Form>

            {/* Tarification par activité */}
            <Card>
                <CardHeader title="Tarification par activité" />
                <CardContent>
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableCell>Activité</TableCell>
                                    <TableCell>Catégorie</TableCell>
                                    <TableCell>Montant</TableCell>
                                    <TableCell>Nombre de places</TableCell>
                                    <TableCell>Places occupées</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {activities.map((activity) => (
                                    <TableRow key={activity.id} hover>
                                        <TableCell>{activity.nom}</TableCell>
                                        <TableCell>{activity.categorie}</TableCell>
                                        <TableCell>{activity.montant}</TableCell>
                                        <TableCell>{activity.nombrePlaces}</TableCell>
                                        <TableCell>{activity.placesOccupees}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleViewActivity(activity.id)}
                                                sx={{ color: 'text.secondary' }}
                                            >
                                                <Icon icon="solar:eye-bold" width={16} height={16} />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEditActivity(activity.id)}
                                                sx={{ color: 'warning.main' }}
                                            >
                                                <Icon icon="solar:pen-bold" width={16} height={16} />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDeleteActivity(activity.id)}
                                                sx={{ color: 'error.main' }}
                                            >
                                                <Icon icon="solar:trash-bin-trash-bold" width={16} height={16} />
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

export default InfoPaiement;