import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ParticipantEditView } from './components/ParticipantEditView';

// ----------------------------------------------------------------------

export const metadata: Metadata = { 
  title: `Modifier un participant | Dashboard - ${CONFIG.appName}` 
};

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  const { id } = params;
  
  return <ParticipantEditView participantId={id} />;
}