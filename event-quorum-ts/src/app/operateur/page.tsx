import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

// Update the import path below to match the actual file location, for example:
import { OverviewOperateurView } from '../../sections/overview/operateur/view/overview-operateur-view';
// Or create the file at src/sections/overview/operateur/view/overview-operateur-view.tsx if it does not exist.

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Accueil opérateur - ${CONFIG.appName}` };

export default function Page() {
  return <OverviewOperateurView />;
}