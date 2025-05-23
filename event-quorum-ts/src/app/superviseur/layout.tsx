import { CONFIG } from 'src/global-config';

import { AuthGuard } from 'src/auth/guard';
import { SuperviseurLayout } from 'src/layouts/superviseur';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (CONFIG.auth.skip) {
    return <SuperviseurLayout>{children}</SuperviseurLayout>;
  }

  return (
    <AuthGuard>
      <SuperviseurLayout>{children}</SuperviseurLayout>
    </AuthGuard>
  );
}
