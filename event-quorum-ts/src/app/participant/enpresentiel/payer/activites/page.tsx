// src/app/participant/enligne/payer/activites/page.tsx
'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { ActivitesPayeesList } from './components/activites-payees-list';
import { ActivitesNonPayeesList } from './components/activites-non-payees-list';
import { ACTIVITES_PAYEES, ACTIVITES_NON_PAYEES } from './components/activites-payees-data';

// ----------------------------------------------------------------------

/**
 * Page /participant/enpresentiet/payer/activites
 * Affiche les activités payées et non payées avec navigation par onglets
 */
export default function ParticipantEnpresentieiPayerActivitesPage() {
    const [currentTab, setCurrentTab] = useState('payees');

    const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    };

    const renderTabContent = () => {
        switch (currentTab) {
            case 'payees':
                return <ActivitesPayeesList activites={ACTIVITES_PAYEES} />;
            case 'non-payees':
                return <ActivitesNonPayeesList activites={ACTIVITES_NON_PAYEES} />;
            default:
                return <ActivitesPayeesList activites={ACTIVITES_PAYEES} />;
        }
    };

    return (
        <DashboardContent>
            <Container sx={{ py: 1 }}>
                {/* En-tête de la page */}
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                        Activités
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Gérez des activités payées et en attente de paiement
                    </Typography>
                </Box>

                {/* Navigation par onglets */}
                <Box sx={{ mb: 4 }}>
                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                        variant="standard"
                        sx={{
                            borderRadius: 1,
                            bgcolor: 'background.neutral',
                            p: 0.5,
                            '& .MuiTab-root': {
                                borderRadius: 1,
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '0.875rem',
                                minHeight: 44,
                                '&.Mui-selected': {
                                    bgcolor: 'background.paper',
                                    boxShadow: (theme) => theme.customShadows.z1,
                                },
                            },
                            '& .MuiTabs-indicator': {
                                display: 'none',
                            },
                        }}
                    >
                        <Tab
                            value="payees"
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    Activités payées
                                </Box>
                            }
                        />
                        <Tab
                            value="non-payees"
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            bgcolor: 'warning.main',
                                        }}
                                    />
                                    En attente ({ACTIVITES_NON_PAYEES.length})
                                </Box>
                            }
                        />
                    </Tabs>
                </Box>

                {/* Contenu des onglets */}
                <Box sx={{ minHeight: 400 }}>
                    {renderTabContent()}
                </Box>
            </Container>
        </DashboardContent>
    );
}