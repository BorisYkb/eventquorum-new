// src/app/participant/enligne/components/payment-methods.tsx
'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { varAlpha } from 'minimal-shared/utils';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

// Options de paiement
const PAYMENT_OPTIONS = [
    { label: 'Via mobile money', value: 'mobile_money' },
    { label: 'Via le guichet de paiement', value: 'guichet' },
];

// Réseaux mobile money
const MOBILE_MONEY_OPTIONS = [
    { label: 'Orange CI', value: 'orange_ci' },
    { label: 'MTN CI', value: 'mtn_ci' },
    { label: 'MOOV CI', value: 'moov_ci' },
    { label: 'WAVE CI', value: 'wave_ci' },
];

// ----------------------------------------------------------------------

interface PaymentMethodsProps {
    paymentMethod: string;
    mobileMoneyNetwork: string;
    onPaymentMethodChange: (method: string) => void;
    onMobileMoneyNetworkChange: (network: string) => void;
}

export function PaymentMethods({
    paymentMethod,
    mobileMoneyNetwork,
    onPaymentMethodChange,
    onMobileMoneyNetworkChange,
}: PaymentMethodsProps) {
    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
                Comment voulez-vous payer?
            </Typography>

            <Stack spacing={2}>
                {PAYMENT_OPTIONS.map((option) => {
                    const isSelected = paymentMethod === option.value;

                    return (
                        <Box
                            key={option.value}
                            onClick={() => onPaymentMethodChange(option.value)}
                            sx={{
                                borderRadius: 1,
                                border: (theme) => `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.24)}`,
                                transition: (theme) => theme.transitions.create(['box-shadow'], {
                                    easing: theme.transitions.easing.sharp,
                                    duration: theme.transitions.duration.shortest,
                                }),
                                cursor: 'pointer',
                                ...(isSelected && {
                                    boxShadow: (theme) => `0 0 0 2px ${theme.vars.palette.text.primary}`
                                }),
                            }}
                        >
                            <Box
                                sx={{
                                    px: 2,
                                    py: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Iconify
                                    width={24}
                                    icon={isSelected ? 'solar:check-circle-bold' : 'carbon:radio-button'}
                                    sx={{ color: 'text.disabled', ...(isSelected && { color: 'primary.main' }) }}
                                />

                                <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                                    {option.label}
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {option.value === 'mobile_money' ? (
                                        <>
                                            <Iconify width={20} icon="mdi:phone" />
                                            <Typography variant="caption">Mobile Money</Typography>
                                        </>
                                    ) : (
                                        <>
                                            <Iconify width={20} icon="mdi:store" />
                                            <Typography variant="caption">Guichet</Typography>
                                        </>
                                    )}
                                </Box>
                            </Box>

                            {/* Sélection réseau mobile money si mobile money sélectionné */}
                            {isSelected && option.value === 'mobile_money' && (
                                <Box sx={{ px: 3, pb: 2 }}>
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