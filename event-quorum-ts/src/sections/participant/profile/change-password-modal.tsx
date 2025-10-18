'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------
// INTERFACE: INDICATEUR DE FORCE DU MOT DE PASSE
// ----------------------------------------------------------------------

interface PasswordStrength {
    score: number;
    label: string;
    color: 'error' | 'warning' | 'info' | 'success';
    requirements: {
        length: boolean;
        uppercase: boolean;
        lowercase: boolean;
        number: boolean;
        special: boolean;
    };
}

// ----------------------------------------------------------------------
// FONCTION: CALCULER LA FORCE DU MOT DE PASSE
// Évalue la robustesse selon plusieurs critères
// ----------------------------------------------------------------------

function calculatePasswordStrength(password: string): PasswordStrength {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[@$!%*?&#]/.test(password),
    };

    const fulfilledCriteria = Object.values(requirements).filter(Boolean).length;

    let score = 0;
    let label = 'Très faible';
    let color: 'error' | 'warning' | 'info' | 'success' = 'error';

    if (fulfilledCriteria === 5 && password.length >= 12) {
        score = 4;
        label = 'Très fort';
        color = 'success';
    } else if (fulfilledCriteria >= 4) {
        score = 3;
        label = 'Fort';
        color = 'success';
    } else if (fulfilledCriteria >= 3) {
        score = 2;
        label = 'Moyen';
        color = 'info';
    } else if (fulfilledCriteria >= 2) {
        score = 1;
        label = 'Faible';
        color = 'warning';
    }

    return { score, label, color, requirements };
}

// ----------------------------------------------------------------------
// SCHÉMA DE VALIDATION ZOD
// Validation stricte des trois champs de mot de passe
// ----------------------------------------------------------------------

export type ChangePasswordSchemaType = zod.infer<typeof ChangePasswordSchema>;

export const ChangePasswordSchema = zod
    .object({
        currentPassword: zod
            .string()
            .min(1, { message: 'Le mot de passe actuel est requis!' }),
        newPassword: zod
            .string()
            .min(1, { message: 'Le nouveau mot de passe est requis!' })
            .min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères!' })
            .regex(/[A-Z]/, { message: 'Le mot de passe doit contenir au moins une majuscule!' })
            .regex(/[a-z]/, { message: 'Le mot de passe doit contenir au moins une minuscule!' })
            .regex(/[0-9]/, { message: 'Le mot de passe doit contenir au moins un chiffre!' })
            .regex(/[@$!%*?&#]/, {
                message: 'Le mot de passe doit contenir au moins un caractère spécial (@$!%*?&#)!',
            }),
        confirmPassword: zod
            .string()
            .min(1, { message: 'La confirmation du mot de passe est requise!' }),
    })
    .refine((data) => data.newPassword !== data.currentPassword, {
        message: 'Le nouveau mot de passe doit être différent de l\'ancien!',
        path: ['newPassword'],
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Les mots de passe ne correspondent pas!',
        path: ['confirmPassword'],
    });

// ----------------------------------------------------------------------
// PROPS DU COMPOSANT
// ----------------------------------------------------------------------

interface ChangePasswordModalProps {
    open: boolean;
    onClose: () => void;
}

// ----------------------------------------------------------------------
// COMPOSANT: MODAL DE CHANGEMENT DE MOT DE PASSE
// Permet à un utilisateur connecté de modifier son mot de passe
// Nécessite le mot de passe actuel pour plus de sécurité
// ----------------------------------------------------------------------

export function ChangePasswordModal({ open, onClose }: ChangePasswordModalProps) {
    const showPassword = useBoolean();
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength | null>(null);

    const defaultValues: ChangePasswordSchemaType = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    const methods = useForm<ChangePasswordSchemaType>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        watch,
        reset,
        formState: { isSubmitting },
    } = methods;

    // Surveillance du nouveau mot de passe pour l'indicateur de force
    const watchNewPassword = watch('newPassword');

    // ----------------------------------------------------------------------
    // EFFET: MISE À JOUR DE L'INDICATEUR DE FORCE
    // Calcule en temps réel la force du nouveau mot de passe
    // ----------------------------------------------------------------------

    useEffect(() => {
        if (watchNewPassword) {
            setPasswordStrength(calculatePasswordStrength(watchNewPassword));
        } else {
            setPasswordStrength(null);
        }
    }, [watchNewPassword]);

    // ----------------------------------------------------------------------
    // EFFET: RÉINITIALISER LE FORMULAIRE À LA FERMETURE
    // Nettoie tous les champs et messages quand la modal se ferme
    // ----------------------------------------------------------------------

    useEffect(() => {
        if (!open) {
            reset();
            setError('');
            setSuccess('');
            setPasswordStrength(null);
            showPassword.onFalse();
        }
    }, [open, reset, showPassword]);

    // ----------------------------------------------------------------------
    // FONCTION: FERMER LA MODAL
    // Gère la fermeture avec nettoyage
    // ----------------------------------------------------------------------

    const handleClose = () => {
        if (!isSubmitting) {
            onClose();
        }
    };

    // ----------------------------------------------------------------------
    // FONCTION: SOUMETTRE LE CHANGEMENT DE MOT DE PASSE
    // Vérifie le mot de passe actuel et enregistre le nouveau
    // ----------------------------------------------------------------------

    const onSubmit = handleSubmit(async (data) => {
        try {
            setError('');
            setSuccess('');

            // Vérifier la force du nouveau mot de passe
            const strength = calculatePasswordStrength(data.newPassword);
            if (strength.score < 2) {
                setError('Le nouveau mot de passe est trop faible. Veuillez en choisir un plus robuste.');
                return;
            }

            // Simulation d'un délai réseau
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // ----------------------------------------------------------------------
            // VALIDATION TEMPORAIRE (À REMPLACER PAR L'API)
            // Vérifie le mot de passe actuel avec les données de test
            // ----------------------------------------------------------------------

            const correctCurrentPassword = '@demo1'; // Mot de passe de test

            if (data.currentPassword !== correctCurrentPassword) {
                setError('Le mot de passe actuel est incorrect!');
                return;
            }

            // ----------------------------------------------------------------------
            // APPEL API À IMPLÉMENTER
            // Envoyer la demande de changement au backend
            // ----------------------------------------------------------------------

            console.info('✅ Mot de passe changé avec succès');
            console.info('📊 Force du nouveau mot de passe:', strength.label);

            setSuccess('✅ Votre mot de passe a été modifié avec succès !');

            // Fermer la modal après 2 secondes
            setTimeout(() => {
                handleClose();
            }, 2000);
        } catch (error) {
            console.error('❌ Erreur lors du changement de mot de passe:', error);
            setError('Une erreur est survenue. Veuillez réessayer.');
        }
    });

    // ----------------------------------------------------------------------
    // RENDU DU FORMULAIRE
    // ----------------------------------------------------------------------

    const renderForm = () => (
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <Form methods={methods} onSubmit={onSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3 } }}>
                    {/* Messages de succès ou d'erreur */}
                    {success && (
                        <Alert
                            severity="success"
                            onClose={() => setSuccess('')}
                            sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}
                        >
                            {success}
                        </Alert>
                    )}

                    {error && (
                        <Alert
                            severity="error"
                            onClose={() => setError('')}
                            sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}
                        >
                            {error}
                        </Alert>
                    )}

                    {/* Champ: Mot de passe actuel */}
                    <Field.Text
                        name="currentPassword"
                        label="Mot de passe actuel"
                        placeholder="Entrez votre mot passe actuel"
                        type={showPassword.value ? 'text' : 'password'}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                                sx: { fontSize: { xs: '0.875rem', sm: '0.938rem' } }
                            },
                            htmlInput: {
                                autoComplete: 'current-password',
                            },
                            input: {
                                sx: { fontSize: { xs: '0.875rem', sm: '0.938rem', md: '1rem' } },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={showPassword.onToggle} edge="end" size="small">
                                            <Iconify
                                                icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                                                width={22}
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Divider />

                    {/* Champ: Nouveau mot de passe */}
                    <Box>
                        <Field.Text
                            name="newPassword"
                            label="Nouveau Mot de passe"
                            placeholder="Entrez le nouveau Mot de passe"
                            type={showPassword.value ? 'text' : 'password'}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                    sx: { fontSize: { xs: '0.875rem', sm: '0.938rem' } }
                                },
                                htmlInput: {
                                    autoComplete: 'new-password',
                                },
                                input: {
                                    sx: { fontSize: { xs: '0.875rem', sm: '0.938rem', md: '1rem' } },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={showPassword.onToggle} edge="end" size="small">
                                                <Iconify
                                                    icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                                                    width={22}
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        {/* Indicateur de force du mot de passe */}
                        {passwordStrength && (
                            <Box sx={{ mt: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ fontSize: { xs: '0.75rem', sm: '0.813rem' } }}
                                    >
                                        Force du mot de passe:
                                    </Typography>
                                    <Chip
                                        label={passwordStrength.label}
                                        size="small"
                                        color={passwordStrength.color}
                                        sx={{
                                            height: { xs: 18, sm: 20 },
                                            fontSize: { xs: '0.65rem', sm: '0.7rem' }
                                        }}
                                    />
                                </Box>

                                <LinearProgress
                                    variant="determinate"
                                    value={(passwordStrength.score / 4) * 100}
                                    color={passwordStrength.color}
                                    sx={{ height: { xs: 5, sm: 6 }, borderRadius: 1 }}
                                />

                                {/* Liste des critères */}
                                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: { xs: '0.75rem', sm: '0.813rem' }
                                        }}
                                    >
                                        Critères requis:
                                    </Typography>

                                    {[
                                        { key: 'length', label: 'Au moins 8 caractères' },
                                        { key: 'uppercase', label: 'Une lettre majuscule' },
                                        { key: 'lowercase', label: 'Une lettre minuscule' },
                                        { key: 'number', label: 'Un chiffre' },
                                        { key: 'special', label: 'Un caractère spécial (@$!%*?&#)' },
                                    ].map((criterion) => (
                                        <Box
                                            key={criterion.key}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                color: passwordStrength.requirements[
                                                    criterion.key as keyof typeof passwordStrength.requirements
                                                ]
                                                    ? 'success.main'
                                                    : 'text.disabled',
                                            }}
                                        >
                                            <Iconify
                                                icon={
                                                    passwordStrength.requirements[
                                                        criterion.key as keyof typeof passwordStrength.requirements
                                                    ]
                                                        ? 'eva:checkmark-circle-2-fill'
                                                        : 'eva:close-circle-outline'
                                                }
                                                width={16}
                                            />
                                            <Typography
                                                variant="caption"
                                                sx={{ fontSize: { xs: '0.75rem', sm: '0.813rem' } }}
                                            >
                                                {criterion.label}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Box>

                    {/* Champ: Confirmer le nouveau mot de passe */}
                    <Field.Text
                        name="confirmPassword"
                        label="Confirmer le nouveau mot de passe"
                        placeholder="Répéter le nouveau mot de passe"
                        type={showPassword.value ? 'text' : 'password'}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                                sx: { fontSize: { xs: '0.875rem', sm: '0.938rem' } }
                            },
                            htmlInput: {
                                autoComplete: 'new-password',
                            },
                            input: {
                                sx: { fontSize: { xs: '0.875rem', sm: '0.938rem', md: '1rem' } },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={showPassword.onToggle} edge="end" size="small">
                                            <Iconify
                                                icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                                                width={22}
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    {/* Boutons d'action */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'flex-end',
                            mt: 2,
                            flexDirection: { xs: 'column', sm: 'row' }
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            disabled={isSubmitting}
                            sx={{
                                minWidth: { xs: '100%', sm: 100 },
                                fontSize: { xs: '0.813rem', sm: '0.875rem' },
                                py: { xs: 1, sm: 0.75 }
                            }}
                        >
                            Annuler
                        </Button>

                        <LoadingButton
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                            loadingIndicator="Mise à jour..."
                            disabled={!passwordStrength || passwordStrength.score < 2}
                            sx={{
                                minWidth: { xs: '100%', sm: 120 },
                                fontSize: { xs: '0.813rem', sm: '0.875rem' },
                                py: { xs: 1, sm: 0.75 }
                            }}
                        >
                            Mettre à jour
                        </LoadingButton>
                    </Box>
                </Box>
            </Form>
        </Box>
    );

    // ----------------------------------------------------------------------
    // RENDU PRINCIPAL DE LA MODAL
    // ----------------------------------------------------------------------

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            fullScreen={false}
            PaperProps={{
                sx: {
                    borderRadius: { xs: 0, sm: 2 },
                    maxHeight: '90vh',
                    m: { xs: 0, sm: 2 },
                    width: { xs: '100%', sm: 'auto' },
                },
            }}
        >
            {/* En-tête de la modal */}
            <Box
                sx={{
                    p: { xs: 2, sm: 3 },
                    pb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                        fontWeight: 600
                    }}
                >
                    Modifier mon Mot de passe
                </Typography>

                <IconButton onClick={handleClose} disabled={isSubmitting} size="small">
                    <Iconify icon="mingcute:close-line" width={22} />
                </IconButton>
            </Box>

            <Divider />

            {/* Formulaire */}
            {renderForm()}
        </Dialog>
    );
}

// ----------------------------------------------------------------------
// INSTRUCTIONS POUR LA CONNEXION BACKEND
// ----------------------------------------------------------------------

/*
CONNEXION AVEC L'API BACKEND

1. Appel API pour changer le mot de passe :

const onSubmit = handleSubmit(async (data) => {
  try {
    setError('');
    setSuccess('');
    
    // Vérifier la force du mot de passe
    const strength = calculatePasswordStrength(data.newPassword);
    if (strength.score < 2) {
      setError('Mot de passe trop faible');
      return;
    }
    
    const token = localStorage.getItem('authToken');
    
    const response = await fetch('/api/user/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors du changement');
    }

    const result = await response.json();
    
    setSuccess('Mot de passe modifié avec succès');
    
    // Fermer après 2 secondes
    setTimeout(() => {
      handleClose();
    }, 2000);
    
  } catch (error) {
    console.error('Erreur:', error);
    setError(error.message || 'Une erreur est survenue');
  }
});

2. Format de la requête API :

POST /api/user/change-password

Headers:
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {token}"
}

Body:
{
  "currentPassword": "ancien_mot_de_passe",
  "newPassword": "nouveau_mot_de_passe",
  "confirmPassword": "nouveau_mot_de_passe"
}

3. Réponses API attendues :

Success:
{
  "success": true,
  "message": "Mot de passe modifié avec succès"
}

Error (mot de passe actuel incorrect):
{
  "success": false,
  "message": "Le mot de passe actuel est incorrect"
}

Error (nouveau mot de passe trop faible):
{
  "success": false,
  "message": "Le nouveau mot de passe ne respecte pas les critères de sécurité"
}

4. Sécurité backend :
   - Vérifier le mot de passe actuel avec le hash en base de données
   - Valider la force du nouveau mot de passe côté serveur
   - Hasher le nouveau mot de passe (bcrypt, argon2, scrypt)
   - Ne jamais logger les mots de passe en clair
   - Vérifier que le nouveau mot de passe est différent de l'ancien
   - Optionnel: Déconnecter toutes les autres sessions actives
   - Optionnel: Envoyer un email de notification du changement

5. Gestion de session après changement :
   - Soit garder la session actuelle
   - Soit forcer une reconnexion avec le nouveau mot de passe
   - Invalider tous les anciens tokens de refresh
*/