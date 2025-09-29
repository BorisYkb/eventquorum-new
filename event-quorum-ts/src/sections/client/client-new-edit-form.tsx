import { z as zod } from 'zod';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { useMockedUser } from 'src/auth/hooks';

import { IClientItem } from 'src/types/client';
// import Divider from '@mui/material/Divider/Divider';


const { user } = useMockedUser();

const CLIENT_OPTIONS = [
    { label: 'Personne physique' },
    { label: 'Personne morale' },
];

// export type IClientItem = {
//     id: string;
//     name: string;
//     surname: string;
//     client_type: 'Personne physique' | 'Personne morale';
//     city: string;
//     role: string;
//     email: string;
//     state: string;
//     status: string;
//     address: string;
//     country: string;
//     zipCode: string;
//     company: string;
//     avatarUrl: string;
//     phoneNumber: string;
//     isVerified: boolean;
// };

// Common fields schema
const CommonSchema = {
    id: zod.string().optional(),
    email: zod
        .string()
        .min(1, { message: 'L\'email est requis !' })
        .email({ message: 'L\'adresse email doit être valide !' }),
    phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
    country: schemaHelper.nullableInput(zod.string().min(1, { message: 'Pays est requis !' }), {
        message: 'Pays est requis !',
    }),
    city: zod.string().min(1, { message: 'La ville est requise !' }),
    state: zod.string().min(1, { message: 'La région est requise !' }),
    address: zod.string().min(1, { message: 'L\'adresse est requise !' }),
    zipCode: zod.string().min(1, { message: 'Le code postal est requis !' }),
    status: zod.string().optional(),
    isVerified: zod.boolean().optional(),
    role: zod.string().optional(),
    client_type: zod.enum(['Personne physique', 'Personne morale']),
    avatarUrl: schemaHelper.file({ message: 'L\'image est requise !' })
};

const PhysiqueSchema = zod.object({
    ...CommonSchema,
    name: zod.string().min(1, { message: 'Le nom est requis !' }),
    surname: zod.string().min(1, { message: 'Le prénom est requis !' }),
    company: zod.string().optional(),
});

const MoraleSchema = zod.object({
    ...CommonSchema,
    company: zod.string().min(1, { message: 'Le nom de l\'entreprise est requis !' }),
    name: zod.string().optional(),
    surname: zod.string().optional(),
});

type Props = {
    item?: IClientItem;
};

export function ClientNewEditForm({ item }: Props) {
    const router = useRouter();
    const [clientType, setClientType] = useState<'Personne physique' | 'Personne morale'>(
        item?.isMoralePerson ? 'Personne morale' : 'Personne physique'
    );

    const defaultValues: IClientItem = {
        id: '',
        logo: '',
        address: '',
        personLogo: '',
        company_name: '',
        contact_name: '',
        contact_firstname: '',
        isMoralePerson: false,
        email: '',
        eventNumber: 0,
        creationDate: '',
        phoneNumber: '',
        num_identification: '',
    };

    const methods = useForm({
        mode: 'onSubmit',
        resolver: zodResolver(clientType === 'Personne physique' ? PhysiqueSchema : MoraleSchema),
        defaultValues,
        values: item
    });

    const {
        reset,
        watch,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    useEffect(() => {
        reset(item || defaultValues);
    }, [clientType, item, reset]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            reset();
            toast.success(item ? 'Mise à jour réussie!' : 'Création réussie!');
            router.push(paths.dashboard.user.list);
            console.info('DATA', data);
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card >

                        {clientType === 'Personne physique' ? (
                            <ProfilePictureCard />
                        ) : (
                            <Box sx={{ mb: 5, pt: 10, pb: 5, px: 3, height: 375 }}>
                                <Field.UploadLogo
                                    name="logo"
                                    maxSize={3145728}
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
                                            Formats autorisés *.jpeg, *.jpg, *.png, *.gif
                                            <br /> La taille maximale est de {fData(5242880)}
                                        </Typography>
                                    }
                                />
                            </Box>
                        )}
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Card sx={{ p: 3 }}>
                        <Field.Select
                            fullWidth
                            label="Type de client"
                            name="isMoralePerson"
                            onChange={(e) => setClientType(e.target.value as 'Personne physique' | 'Personne morale')}
                            value={clientType}
                            slotProps={{
                                select: { native: true },
                                inputLabel: { shrink: true },
                            }}
                            sx={{ marginBottom: 3, borderBottom: 'dashed 1px #cccdcf', pb: 2 }}
                        >
                            {CLIENT_OPTIONS.map((i) => (
                                <option key={i.label} value={i.label}>
                                    {i.label}
                                </option>
                            ))}
                        </Field.Select>

                        <Box
                            sx={{
                                rowGap: 3,
                                columnGap: 2,
                                display: 'grid',
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                            }}
                        >
                            {/* Client type specific fields */}
                            {clientType === 'Personne physique' ? (
                                <>
                                    <Field.Text
                                        name="company_name"
                                        label="Nom"
                                        // sx={{ gridColumn: { xs: 'span 2' } }}
                                    />
                                    <Field.Text
                                        name="company_name"
                                        label="Prénoms"
                                        // sx={{ gridColumn: { xs: 'span 2' } }}
                                    />
                                    <Field.Text
                                        name="address"
                                        label="Lieu d'habitation"
                                        // sx={{ gridColumn: { xs: 'span 2' } }}
                                    />
                                    <Field.Text
                                        name="email"
                                        label="Adresse email"
                                        // sx={{ gridColumn: { xs: 'span 2' } }}
                                    />
                                    <Field.Phone
                                        name="phoneNumber"
                                        label="Numéro de téléphone"
                                        // sx={{ gridColumn: { xs: 'span 2' } }}
                                        country="CI"
                                    />
                                </>
                            ) : (
                                <>
                                    <Field.Text name="company_name" label="Nom de l'entreprise" />
                                    <Field.Text
                                        name="address"
                                        label="Adresse de l'entreprise"

                                    />
                                    <Field.Text name="contact_name" label="Nom du correspondant" />
                                    <Field.Text name="contact_firstname" label="Prénoms du correspondant" />
                                    <Field.Text name="email" label="Email du correspondant" />
                                    <Field.Text name="num_identification" label="Numéro d'identification de l'entreprise" />
                                    <Field.Phone
                                        name="phoneNumber"
                                        label="Numéro de téléphone du correspondant"
                                        country="CI"
                                    />
                                </>
                            )}
                        </Box>

                        <Stack sx={{ mt: 3, alignItems: 'flex-end' }}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                {!item ? 'Créer client' : 'Sauvegarder les modifications'}
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </Form>
    );
}
// const img = '/assets/images/mock/user/utilisateur.png'
const img = '/assets/images/mock/user/user.png'
// const img = user?.photoURL;
const ProfilePictureCard = ({ imageSrc = img, alt = "Profile Picture", size = 144 }) => (
        <Card className="flex flex-col items-center pt-20  pb-5 px-3 shadow-none border-none h-[415px]">

            <div
                className="relative overflow-hidden rounded-full "
                style={{
                    width: size,
                    height: size
                }}
            >
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={alt}
                        className="w-full h-full object-cover mx-auto"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <svg
                            className="h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>

                    </div>
                )}
            </div>
            <p className=" flex mt-8 mx-auto text-center text-xs text-gray-400">
                Cette image ne peut être modifiée.
            </p>
        </Card>
    );



