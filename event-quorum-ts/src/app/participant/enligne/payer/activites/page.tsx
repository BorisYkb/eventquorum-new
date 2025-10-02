// src/app/participant/enligne/payer/activites/page.tsx

'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { FacturesList } from './components/factures-list';
import { FACTURES_DATA } from './components/data-facture';
import { ActivitesPayeesList } from './components/activites-payees-list';
import { ACTIVITES_PAYEES } from './components/activites-payees-data';

// ----------------------------------------------------------------------

/**
 * Page /participant/enpresentiel/payer/activites
 * Affiche les activités payées et les factures avec navigation par onglets
 */
export default function ParticipantEnpresentieiPayerActivitesPage() {
    const [currentTab, setCurrentTab] = useState('payees');
    const router = useRouter();

    const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    };

    const handleAddActivite = () => {
        router.push('/participant/enligne/payer/activites/ajouter');
    };

    // Calcul du montant total (on ignore les prix null)
    const montantTotal = useMemo(() => {
        return ACTIVITES_PAYEES.reduce((sum, activite) => {
            if (activite.prix !== null) {
                return sum + activite.prix;
            }
            return sum;
        }, 0);
    }, []);

    return (
        <DashboardContent>
            <Container sx={{ py: 1 }}>
                {/* En-tête de la page */}
                <Box
                    sx={{
                        mb: 4,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 2,
                            fontWeight: 600,
                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                        }}
                    >
                        Gérez Mes Activités
                    </Typography>

                    {/* Bouton Ajouter une activité */}
                    <Tooltip title="Modifier ma sélection d'activité" arrow>
                        <Button
                            variant="outlined"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            size="small"
                            onClick={handleAddActivite}
                            sx={{
                                textTransform: 'none',
                                borderColor: 'grey.300',
                                color: 'white',
                                bgcolor: 'black',
                                '&:hover': {
                                    borderColor: 'grey.400',
                                    bgcolor: 'black',
                                    boxShadow: 'shadows[1]',
                                },
                            }}
                        >
                            Modifier ma sélection
                        </Button>
                    </Tooltip>
                </Box>

                {/* Cadre Montant Total */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
                    <Card
                        sx={{
                            width: 250,
                            maxWidth: '100%',
                            boxShadow: 3,
                            borderRadius: 1,
                            bgcolor: 'grey.200',
                        }}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'black',
                                    fontWeight: 600,
                                    mb: 1,
                                    fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' },
                                }}
                            >
                                Montant total payé
                            </Typography>
                            <Typography
                                variant="h3"
                                sx={{
                                    color: 'primary.main',
                                    fontWeight: 700,
                                    fontSize: { xs: '1rem', sm: '1rem', md: '1.5rem' },
                                }}
                            >
                                {montantTotal.toLocaleString()} FCFA
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* Navigation par onglets */}
                <Box sx={{ mb: 4 }}>
                    <Tabs value={currentTab} onChange={handleTabChange} variant="standard">
                        <Tab
                            value="payees"
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            bgcolor: 'success.main',
                                        }}
                                    />
                                    Mes Activités ({ACTIVITES_PAYEES.length})
                                </Box>
                            }
                        />
                        <Tab
                            value="factures"
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Iconify icon="eva:file-text-outline" width={18} />
                                    Mes Factures ({FACTURES_DATA.length})
                                </Box>
                            }
                        />
                    </Tabs>
                </Box>

                {/* Contenu des onglets */}
                <Box sx={{ minHeight: 400 }}>
                    {currentTab === 'payees' && (
                        <ActivitesPayeesList activites={ACTIVITES_PAYEES} />
                    )}
                    {currentTab === 'factures' && <FacturesList factures={FACTURES_DATA} />}
                </Box>
            </Container>
        </DashboardContent>
    );
}