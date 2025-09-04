// src/app/participant/layout.tsx

import { CONFIG } from 'src/global-config';
import { ParticipantLayout } from 'src/layouts/participant';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (CONFIG.auth.skip) {
    return <ParticipantLayout>{children}</ParticipantLayout>;
  }

  return (
    // <AuthGuard>
      <ParticipantLayout>{children}</ParticipantLayout>
    // </AuthGuard>
  );
}