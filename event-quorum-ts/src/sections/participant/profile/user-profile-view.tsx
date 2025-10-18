'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

// Import de la modal de changement de mot de passe
import { ChangePasswordModal } from './change-password-modal';

// ----------------------------------------------------------------------
// TYPES DE DONNÉES UTILISATEUR
// ----------------------------------------------------------------------

interface UserData {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
}

// ----------------------------------------------------------------------
// SCHÉMA DE VALIDATION POUR LES INFORMATIONS PERSONNELLES
// ----------------------------------------------------------------------

export type PersonalInfoSchemaType = zod.infer<typeof PersonalInfoSchema>;

export const PersonalInfoSchema = zod.object({
    nom: zod
        .string()
        .min(1, { message: 'Le nom est requis!' })
        .min(2, { message: 'Le nom doit contenir au moins 2 caractères!' })
        .max(50, { message: 'Le nom ne peut pas dépasser 50 caractères!' }),
    prenom: zod
        .string()
        .min(1, { message: 'Le prénom est requis!' })
        .min(2, { message: 'Le prénom doit contenir au moins 2 caractères!' })
        .max(50, { message: 'Le prénom ne peut pas dépasser 50 caractères!' }),
    email: zod
        .string()
        .min(1, { message: 'L\'email est requis!' })
        .email({ message: 'L\'email doit être une adresse valide!' }),
    telephone: zod
        .string()
        .min(1, { message: 'Le téléphone est requis!' })
        .regex(/^[0-9]{10}$/, { message: 'Le téléphone doit contenir exactement 10 chiffres!' }),
});

// ----------------------------------------------------------------------
// COMPOSANT: PAGE PROFIL UTILISATEUR COMPLÈTE
// Intègre les informations personnelles ET la modal de changement de mot de passe
// ----------------------------------------------------------------------

export function UserProfileView() {
    const router = useRouter();

    // États pour gérer l'édition et les notifications
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    // État pour contrôler l'ouverture de la modal de mot de passe
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);

    // ----------------------------------------------------------------------
    // DONNÉES UTILISATEUR DE TEST
    // À remplacer par les données récupérées depuis l'API
    // ----------------------------------------------------------------------

    const [userData, setUserData] = useState<UserData>({
        nom: 'Bouadou',
        prenom: 'Kouacou Evarist',
        email: 'demo@qurumevent.com',
        telephone: '0789560751',
    });

    // Configuration du formulaire avec React Hook Form
    const methods = useForm<PersonalInfoSchemaType>({
        resolver: zodResolver(PersonalInfoSchema),
        defaultValues: userData,
    });

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods;

    // ----------------------------------------------------------------------
    // FONCTION: BASCULER LE MODE ÉDITION
    // ----------------------------------------------------------------------

    const handleEditToggle = () => {
        if (isEditing) {
            reset(userData);
            setErrorMessage('');
            setSuccessMessage('');
        }
        setIsEditing(!isEditing);
    };

    // ----------------------------------------------------------------------
    // FONCTION: SOUMETTRE LES MODIFICATIONS
    // ----------------------------------------------------------------------

    const onSubmit = handleSubmit(async (data) => {
        try {
            setErrorMessage('');
            setSuccessMessage('');

            await new Promise((resolve) => setTimeout(resolve, 1000));

            // TODO: Remplacer par l'appel API réel
            // const response = await fetch('/api/user/profile', { ... });

            setUserData(data);
            setIsEditing(false);
            setSuccessMessage('✅ Vos informations ont été mises à jour avec succès !');

            console.info('✅ Profil mis à jour:', data);

            setTimeout(() => setSuccessMessage(''), 5000);
        } catch (error) {
            console.error('❌ Erreur lors de la mise à jour:', error);
            setErrorMessage('Une erreur est survenue lors de la mise à jour. Veuillez réessayer.');
        }
    });

    // ----------------------------------------------------------------------
    // FONCTION: OUVRIR LA MODAL DE CHANGEMENT DE MOT DE PASSE
    // ----------------------------------------------------------------------

    const handleChangePassword = () => {
        setPasswordModalOpen(true);
    };

    // ----------------------------------------------------------------------
    // FONCTION: FERMER LA MODAL DE MOT DE PASSE
    // ----------------------------------------------------------------------

    const handleClosePasswordModal = () => {
        setPasswordModalOpen(false);
    };

    // ----------------------------------------------------------------------
    // RENDU: SECTION INFORMATIONS PERSONNELLES
    // ----------------------------------------------------------------------

    const renderPersonalInfo = () => (
        <Card sx={{ p: { xs: 2, sm: 3 } }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 0 },
                    mb: 3
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                        fontWeight: 600
                    }}
                >
                    Informations personnelles
                </Typography>

                {!isEditing ? (
                    <Button
                        variant="outlined"
                        // color="inherit"
                        size="small"
                        // startIcon={<Iconify icon="solar:pen-bold" width={20} />}
                        onClick={handleEditToggle}
                        sx={{
                            fontSize: { xs: '0.75rem', sm: '0.813rem', md: '0.875rem' },
                            px: { xs: 1.5, sm: 2 },
                            py: { xs: 0.75, sm: 1 },
                            whiteSpace: { xs: 'normal', sm: 'nowrap' },
                            width: { xs: '100%', sm: 'auto' },
                        }}
                    >
                        Modifier mes informations personnelles
                    </Button>
                ) : (
                    <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={handleEditToggle}
                            disabled={isSubmitting}
                            sx={{
                                fontSize: { xs: '0.75rem', sm: '0.813rem', md: '0.875rem' },
                                flex: { xs: 1, sm: 'none' },
                                py: { xs: 0.75, sm: 1 }
                            }}
                        >
                            Annuler
                        </Button>
                        <LoadingButton
                            variant="contained"
                            size="small"
                            loading={isSubmitting}
                            onClick={onSubmit}
                            sx={{
                                fontSize: { xs: '0.75rem', sm: '0.813rem', md: '0.875rem' },
                                flex: { xs: 1, sm: 'none' },
                                py: { xs: 0.75, sm: 1 }
                            }}
                        >
                            Enregistrer
                        </LoadingButton>
                    </Box>
                )}
            </Box>

            <Divider sx={{ mb: 3 }} />

            {successMessage && (
                <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMessage('')}>
                    {successMessage}
                </Alert>
            )}

            {errorMessage && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErrorMessage('')}>
                    {errorMessage}
                </Alert>
            )}

            <Form methods={methods} onSubmit={onSubmit}>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 3,
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                        },
                    }}
                >
                    <Field.Text
                        name="nom"
                        label="Nom"
                        disabled={!isEditing}
                        slotProps={{
                            inputLabel: { shrink: true },
                        }}
                    />

                    <Field.Text
                        name="prenom"
                        label="Prénom"
                        disabled={!isEditing}
                        slotProps={{
                            inputLabel: { shrink: true },
                        }}
                    />

                    <Field.Text
                        name="email"
                        label="Email"
                        disabled={!isEditing}
                        slotProps={{
                            inputLabel: { shrink: true },
                            htmlInput: {
                                type: 'email',
                                autoComplete: 'email',
                            },
                        }}
                    />

                    <Field.Text
                        name="telephone"
                        label="Téléphone"
                        disabled={!isEditing}
                        placeholder="0789560751"
                        slotProps={{
                            inputLabel: { shrink: true },
                            htmlInput: {
                                type: 'tel',
                                maxLength: 10,
                            },
                        }}
                    />
                </Box>
            </Form>
        </Card>
    );

    // ----------------------------------------------------------------------
    // RENDU: SECTION INFORMATION DE CONNEXION
    // ----------------------------------------------------------------------

    const renderConnectionInfo = () => (
        <Card sx={{ p: { xs: 2, sm: 3 } }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 0 },
                    mb: 3
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                        fontWeight: 600
                    }}
                >
                    Information de connexion
                </Typography>

                <Button
                    variant="outlined"
                    color="inherit"
                    size="small"
                    // startIcon={<Iconify icon="solar:lock-password-bold" width={20} />}
                    onClick={handleChangePassword}
                    sx={{
                        fontSize: { xs: '0.75rem', sm: '0.813rem', md: '0.875rem' },
                        px: { xs: 1.5, sm: 2 },
                        py: { xs: 0.75, sm: 1 },
                        whiteSpace: { xs: 'normal', sm: 'nowrap' },
                        width: { xs: '100%', sm: 'auto' },
                    }}
                >
                    Modifier mon Mot de passe
                </Button>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Stack spacing={3}>
                <Box>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            mb: 0.5,
                            display: 'block',
                            fontSize: { xs: '0.75rem', sm: '0.813rem' }
                        }}
                    >
                        Email
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            p: { xs: 1.25, sm: 1.5 },
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 1,
                            bgcolor: 'background.neutral',
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: { xs: '0.813rem', sm: '0.875rem', md: '0.938rem' },
                                wordBreak: 'break-word'
                            }}
                        >
                            {userData.email}
                        </Typography>
                        <Iconify
                            icon="solar:lock-password-bold"
                            width={18}
                            sx={{ ml: 'auto', color: 'text.disabled', flexShrink: 0 }}
                        />
                    </Box>
                </Box>

                <Box>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            mb: 0.5,
                            display: 'block',
                            fontSize: { xs: '0.75rem', sm: '0.813rem' }
                        }}
                    >
                        Mot de passe
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            p: { xs: 1.25, sm: 1.5 },
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 1,
                            bgcolor: 'background.neutral',
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: { xs: '0.813rem', sm: '0.875rem', md: '0.938rem' }
                            }}
                        >
                            ••••••••••••
                        </Typography>
                    </Box>
                </Box>
            </Stack>
        </Card>
    );

    // ----------------------------------------------------------------------
    // RENDU PRINCIPAL
    // ----------------------------------------------------------------------

    return (
        <>
            <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                <Stack spacing={3} sx={{ maxWidth: 900, mx: 'auto' }}>
                    {/* En-tête de la page */}
                    <Box>
                        {/* Bouton Retour */}
                        <Button
                            startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={20} />}
                            onClick={() => router.back()}
                            sx={{
                                mb: 2,
                                fontSize: { xs: '0.813rem', sm: '0.875rem', md: '0.938rem' },
                                py: { xs: 0.5, sm: 0.75 },
                                px: { xs: 1, sm: 1.5 }
                            }}
                        >
                            Retour
                        </Button>

                        <Typography
                            variant="h4"
                            sx={{
                                mb: 1,
                                fontSize: { xs: '1.5rem', sm: '1.875rem', md: '2.125rem' },
                                fontWeight: 700
                            }}
                        >
                            Mon Profil
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                fontSize: { xs: '0.813rem', sm: '0.875rem' },
                                lineHeight: 1.6
                            }}
                        >
                            Gérez vos informations personnelles et vos paramètres de connexion
                        </Typography>
                    </Box>

                    {/* Section Informations personnelles */}
                    {renderPersonalInfo()}

                    {/* Section Information de connexion */}
                    {renderConnectionInfo()}
                </Stack>
            </Box>

            {/* Modal de changement de mot de passe */}
            <ChangePasswordModal open={passwordModalOpen} onClose={handleClosePasswordModal} />
        </>
    );
}

// ----------------------------------------------------------------------
// UTILISATION DANS UNE PAGE NEXT.JS
// ----------------------------------------------------------------------

/*
Fichier: src/app/profile/page.tsx

import type { Metadata } from 'next';
import { CONFIG } from 'src/global-config';
import { UserProfileView } from 'src/sections/profile';

export const metadata: Metadata = {
  title: `Mon Profil | ${CONFIG.appName}`
};

export default function Page() {
  return <UserProfileView />;
}
*/

// ----------------------------------------------------------------------
// STRUCTURE DES FICHIERS RECOMMANDÉE
// ----------------------------------------------------------------------

/*
src/sections/profile/
├── index.ts                          // Exports centralisés
├── user-profile-view.tsx             // Ce fichier (page complète)
└── change-password-modal.tsx         // Modal de changement de mot de passe

src/app/profile/
├── layout.tsx                        // Layout (DashboardLayout)
└── page.tsx                          // Page utilisant UserProfileView
*/