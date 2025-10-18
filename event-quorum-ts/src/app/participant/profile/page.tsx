import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { UserProfileView } from 'src/sections/participant/profile';

// ----------------------------------------------------------------------

export const metadata: Metadata = { 
  title: `Mon Profil | ${CONFIG.appName}` 
};

export default function Page() {
  return <UserProfileView />;
}