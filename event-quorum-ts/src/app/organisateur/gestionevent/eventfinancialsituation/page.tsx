import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { EventFinancialSituationView } from 'src/sections/gestionEvent/situationFinanciere/event-financial-situation-view';


// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Création d'un nouvel evenement` };

export default function Page() {
  return <EventFinancialSituationView />;
}