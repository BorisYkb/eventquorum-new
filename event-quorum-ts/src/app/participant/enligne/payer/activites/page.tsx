// src/app/participant/enligne/payer/activites/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { ActivitesPayeesList } from './components/activites-payees-list';
import { ACTIVITES_PAYEES } from './components/activites-payees-data';

// ----------------------------------------------------------------------

/**
 * Page /participant/enpresentiet/payer/activites
 * Affiche les activités payées et non payées avec navigation par onglets
 */
export default function ParticipantEnpresentieiPayerActivitesPage() {
    const [currentTab, setCurrentTab] = useState('payees');
    const router = useRouter();

    const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    };



    const handleAddActivite = () => {
        // Rediriger vers la page de sélection des activités
        router.push('/participant/enligne/payer/activites/ajouter');
    }

    return (
        <DashboardContent>
            <Container sx={{ py: 1 }}>
                {/* En-tête de la page */}
                <Box sx={{ mb: 4, textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
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
                                    boxShadow: 'shadows[1]'
                                }
                            }}
                        >
                            Modifier ma sélection
                        </Button>
                    </Tooltip>
                </Box>

                {/* Navigation par onglets */}
                <Box sx={{ mb: 4 }}>
                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                        variant="standard"
                    >
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
                    </Tabs>


                </Box>

                {/* Contenu des onglets */}
                <Box sx={{ minHeight: 400 }}>
                    <ActivitesPayeesList activites={ACTIVITES_PAYEES} />
                </Box>
            </Container>
        </DashboardContent>
    );
}