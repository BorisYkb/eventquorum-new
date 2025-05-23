import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import GestionEventView from 'src/sections/gestionEvent/view/gestion-event';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Gestion Events - ${CONFIG.appName}` };

export default function Page() {
  return <GestionEventView />;
}
