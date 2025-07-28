'use client';

import React from 'react';
import { useTabs } from 'minimal-shared/hooks';

import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { Tab, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/organisateur';

import { CustomTabs } from 'src/components/custom-tabs';

import Inscription from '../inscription';
import VisioConference from '../visioConference';
import CharteGraphiqueView from '../charte-graphique-view';
import LandingPage from '../landingPage';
import InfoPaiement from '../infosPaiement';

const TABS = [
  {
    value: 'charteGraphique',
    label: 'Charte Graphique',
    render: () => <CharteGraphiqueView />,
  },
  { value: 'inscription', label: 'Inscription', render: () => <Inscription /> },
  { value: 'visioconference', label: 'Visioconférence', render: () => <VisioConference /> },
  { value: 'landingPage', label: 'LandingPage', render: () => <LandingPage /> },
  { value: 'infosPaiement', label: 'Infos paiement', render: () => <InfoPaiement/> },
  { value: 'phototheque', label: 'Photothèque', render: () => <div>Photothèque</div> },
];

const GestionEventView = () => {
  const tabs = useTabs('charteGraphique');

  const renderTabs = () => (
    <TabContext value={tabs.value}>
      <CustomTabs
        value={tabs.value}
        onChange={tabs.onChange}
        variant="fullWidth"
        slotProps={{ tab: { px: 0 } }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </CustomTabs>

      {TABS.map((tab) => (
        <TabPanel value={tab.value}>{tab.render && tab.render()}</TabPanel>
      ))}
    </TabContext>
  );

  return (
    <section>
      <DashboardContent
        maxWidth={false}
        sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}
      >
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Gestion Events
        </Typography>

        {renderTabs()}
      </DashboardContent>
    </section>
  );
};

export default GestionEventView;
