import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { OverviewOrganisateurView } from 'src/sections/overview/organisateur/view/overview-organisateur-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Accueil organisateur - ${CONFIG.appName}` };

export default function Page() {
  return <OverviewOrganisateurView />;
}
