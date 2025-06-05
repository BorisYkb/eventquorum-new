// src/app/superviseur/page.tsx
import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { OverviewSuperviseurView } from 'src/sections/overview/e-commerce/view/overview-superviseur-view';


// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Accueil superviseur - ${CONFIG.appName}` };

export default function Page() {
  return <OverviewSuperviseurView />;
}
