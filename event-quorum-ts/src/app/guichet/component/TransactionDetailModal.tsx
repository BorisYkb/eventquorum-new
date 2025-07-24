// components/TransactionDetailModal.tsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Card,
  Button,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
  Tooltip,
  Stack,
  Divider,
  Chip
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { ArrowBack } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';

interface Transaction {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  montant: number;
  date: string;
  statut: string;
  activite: string;
  activites?: {
    id: number;
    nom: string;
    horaire: string;
    type: string;
    statut: string;
    places: number;
  }[];
}

interface TransactionDetailModalProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  open,
  onClose,
  transaction
}) => {
  const theme = useTheme();

  if (!transaction) return null;

  const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'Validé':
        return 'success';
      case 'En attente':
        return 'warning';
      case 'Refusé':
        return 'error';
      default:
        return 'default';
    }
  };

  const getActivityStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'En cours':
        return 'success';
      case 'Non démarré':
        return 'warning';
      case 'Terminé':
        return 'info';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Informations détaillées de la transaction
  const transactionInfo = [
    { label: 'ID Transaction', value: `#${transaction.id.toString().padStart(6, '0')}` },
    { label: 'Nom complet', value: `${transaction.nom} ${transaction.prenom}` },
    { label: 'Email', value: transaction.email },
    { label: 'Montant', value: `${formatCurrency(transaction.montant)} FCFA` },
    { label: 'Date de transaction', value: formatDate(transaction.date) },
    { label: 'Activité', value: transaction.activite },
    { label: 'Mode de paiement', value: 'Carte bancaire' }, // Exemple
    { label: 'Numéro de reçu', value: `REC-${transaction.id}-2024` }, // Exemple
  ];

  // Détails de paiement (exemple)
  const paymentDetails = [

    {
      category: 'Détails du Paiement',
      items: [
        { name: 'Montant brut', value: `${formatCurrency(transaction.montant)} FCFA` },
        { name: 'Frais de transaction', value: '500 FCFA' },
        { name: 'Montant net', value: `${formatCurrency(transaction.montant - 500)} FCFA` },
        { name: 'Devise', value: 'XOF (Franc CFA)' },
      ]
    },
    {
      category: 'Statut et Validation',
      items: [
        { name: 'Statut actuel', value: transaction.statut },
        { name: 'Validé par', value: transaction.statut === 'Validé' ? 'Système automatique' : 'En attente' },
        { name: 'Date de validation', value: transaction.statut === 'Validé' ? formatDate(transaction.date) : 'N/A' },
        { name: 'Code de confirmation', value: transaction.statut === 'Validé' ? `CONF-${transaction.id}` : 'N/A' },
      ]
    }
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '80vh'
        }
      }}
    >
      <DialogTitle sx={{
        p: 0,
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={onClose}
              sx={{ mr: 2 }}
            >
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
                Détails de la Transaction
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Transaction #{transaction.id.toString().padStart(6, '0')} - {transaction.nom} {transaction.prenom}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mr: 1 }}>
              {formatCurrency(transaction.montant)} FCFA
            </Typography>
            <Label variant="soft" color={getStatusColor(transaction.statut)}>
              {transaction.statut}
            </Label>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Informations de la transaction */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Card sx={{ height: 'fit-content' }}>
                <Box sx={{
                  p: 2,
                  backgroundColor: '#fafafa',
                  borderBottom: '1px solid #e0e0e0'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Informations de la Transaction
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '24px',
                      fontWeight: 600,
                      mr: 2
                    }}>
                      {transaction.nom[0]}{transaction.prenom[0]}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {transaction.nom} {transaction.prenom}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {transaction.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Stack spacing={2}>
                    {transactionInfo.map((info, index) => (
                      <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {info.label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'right' }}>
                          {info.value}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Card>

              {/* Actions rapides */}
              <Card sx={{ mt: 3 }}>
                <Box sx={{
                  p: 2,
                  backgroundColor: '#fafafa',
                  borderBottom: '1px solid #e0e0e0'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Actions
                  </Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Stack spacing={1}>
                    <Button
                      variant="outlined"
                      startIcon={<Iconify icon="eva:download-fill" />}
                      size="small"
                      fullWidth
                    >
                      Télécharger le reçu
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Iconify icon="eva:email-fill" />}
                      size="small"
                      fullWidth
                    >
                      Renvoyer par email
                    </Button>
                    {transaction.statut === 'En attente' && (
                      <Button
                        variant="outlined"
                        startIcon={<Iconify icon="eva:checkmark-fill" />}
                        size="small"
                        fullWidth
                        color="success"
                      >
                        Valider la transaction
                      </Button>
                    )}
                  </Stack>
                </Box>
              </Card>
            </Grid>

            {/* Détails du paiement */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Card sx={{ mb: 3 }}>
                <Box sx={{
                  p: 2,
                  backgroundColor: '#fafafa',
                  borderBottom: '1px solid #e0e0e0'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Activités Inscrites ({transaction.activites?.length || 0})
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  {transaction.activites && transaction.activites.length > 0 ? (
                    <TableContainer component={Paper} variant="outlined">
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#f8f9fa', fontWeight: 600 } }}>
                            <TableCell>Activité</TableCell>
                            <TableCell align="center">Horaire</TableCell>
                            <TableCell align="center">Type de place</TableCell>
                            <TableCell align="center">Places</TableCell>
                            <TableCell align="center">Statut</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {transaction.activites.map((activite, index) => (
                            <TableRow key={activite.id} hover>
                              <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {activite.nom}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2" sx={{
                                  fontFamily: 'monospace',
                                  backgroundColor: '#f5f5f5',
                                  px: 1,
                                  py: 0.5,
                                  borderRadius: 1,
                                  display: 'inline-block',
                                  fontSize: '0.75rem'
                                }}>
                                  {activite.horaire}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={activite.type}
                                  size="small"
                                  variant="outlined"
                                  color="primary"
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {activite.places}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={activite.statut}
                                  size="small"
                                  color={getActivityStatusColor(activite.statut)}
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        Aucune activité enregistrée
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Card>

              <Card>
                <Box sx={{
                  p: 2,
                  backgroundColor: '#fafafa',
                  borderBottom: '1px solid #e0e0e0'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Détails du Paiement
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  {paymentDetails.map((category, categoryIndex) => (
                    <Box key={categoryIndex} sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: '#374151',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <Box sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: theme.palette.primary.main,
                          mr: 1
                        }} />
                        {category.category}
                      </Typography>

                      <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                        <Table size="small">
                          <TableBody>
                            {category.items.map((detail, index) => (
                              <TableRow key={index}>
                                <TableCell sx={{ border: 'none', py: 1 }}>
                                  <Typography variant="body2" color="text.secondary">
                                    {detail.name}
                                  </Typography>
                                </TableCell>
                                <TableCell sx={{ border: 'none', py: 1 }} align="right">
                                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {detail.value}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  ))}
                </Box>
              </Card>
            </Grid>
          </Grid>

          {/* Actions principales */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {transaction.statut === 'En attente' && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<Iconify icon="eva:checkmark-fill" />}
                  >
                    Valider
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Iconify icon="eva:close-fill" />}
                  >
                    Refuser
                  </Button>
                </>
              )}
            </Box>

            <Button
              variant="contained"
              onClick={onClose}
              startIcon={<Iconify icon="eva:arrow-back-fill" />}
            >
              Fermer
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetailModal;
