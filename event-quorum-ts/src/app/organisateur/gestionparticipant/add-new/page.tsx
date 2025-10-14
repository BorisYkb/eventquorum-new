//src/app/organisateur/gestionparticipant/add-new/page.tsx

import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ParticipantCreateView } from './components/ParticipantCreateView';

// ----------------------------------------------------------------------

export const metadata: Metadata = { 
  title: `Ajouter un nouveau participant | Dashboard - ${CONFIG.appName}` 
};

export default function Page() {
  return <ParticipantCreateView />;
}