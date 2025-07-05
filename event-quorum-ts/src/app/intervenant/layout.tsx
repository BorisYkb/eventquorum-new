import { CONFIG } from 'src/global-config';

import { AuthGuard } from 'src/auth/guard';
import { IntervenantLayout } from 'src/layouts/intervenant';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (CONFIG.auth.skip) {
    return <IntervenantLayout>{children}</IntervenantLayout>;
  }

  return (
    <AuthGuard>
      <IntervenantLayout>{children}</IntervenantLayout>
    </AuthGuard>
  );
}