import { AuthSplitLayout } from 'src/layouts/auth-split';

import { GuestGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthSplitLayout
        slotProps={{
          section: { title: 'Salut, Heureux de vous revoir !' },
        }}
      >
        {children}
      </AuthSplitLayout>
    </GuestGuard>
  );
}
