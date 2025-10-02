'use client';

import React from 'react';
import { render } from 'nprogress';
import { useTabs } from 'minimal-shared/hooks';

import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { Tab, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/organisateur';

import { CustomTabs } from 'src/components/custom-tabs';

import Faqs from '../faqs';
import EventPasse from '../eventpasse';
import Inscription from '../inscription';
import LandingPage from '../landingPage';
import Phototheque from '../phototheque';
import InfoPaiement from '../infosPaiement';
import VisioConference from '../visioConference';
import CharteGraphiqueView from '../charte-graphique-view';

// ----------------------------------------------------------------------

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
  { value: 'faqs', label: "FAQ's", render: () => <Faqs /> },
  { value: 'eventpasse', label: "Evènement passé", render: () => <EventPasse /> },
  { value: 'phototheque', label: 'Photothèque', render: () => <Phototheque/> },
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
          Gestion de l&apos;événement
        </Typography>

        {renderTabs()}
      </DashboardContent>
    </section>
  );
};

export default GestionEventView;
