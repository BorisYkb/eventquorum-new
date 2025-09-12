//src/app/participant/components/footer.tsx
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

/**
 * Composant Footer pour l'espace Participant
 * Affiche les informations de copyright et les liens utiles
 */
export function Footer() {
  return (
    <Grid size={{ xs: 12 }}>
      <Card sx={{ p: 2, bgcolor: 'grey.50' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="text.secondary">
              © 2024 EVENTQUORUM | Powered by FX_LABS SARL
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={1} justifyContent="flex-end">
              <Grid>
                <Button
                  size="small"
                  color="inherit"
                  sx={{ textTransform: 'none' }}
                >
                  Confidentialité
                </Button>
              </Grid>
              <Grid>
                <Button
                  size="small"
                  color="inherit"
                  sx={{ textTransform: 'none' }}
                >
                  Aide
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}