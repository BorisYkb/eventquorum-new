'use client';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Divider,
    IconButton
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface TransactionDetail {
    nom_prenom: string;
    email: string;
    place: string;
    date_heure: string;
}

interface TransactionDetailModalProps {
    open: boolean;
    onClose: () => void;
    transaction: TransactionDetail | null;
}

export function TransactionDetailModal({ 
    open, 
    onClose, 
    transaction 
}: TransactionDetailModalProps) {
    if (!transaction) return null;

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">Détails de la transaction</Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Iconify icon="mingcute:close-line" />
                </IconButton>
            </DialogTitle>
            
            <Divider />
            
            <DialogContent sx={{ pt: 3 }}>
                <Box display="flex" flexDirection="column" gap={2.5}>
                    <Box>
                        <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                            Nom & Prénom
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                            {transaction.nom_prenom}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                            Email
                        </Typography>
                        <Typography variant="body1">
                            {transaction.email}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                            Place
                        </Typography>
                        <Typography variant="body1">
                            {transaction.place}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                            Date & Heure
                        </Typography>
                        <Typography variant="body1">
                            {transaction.date_heure}
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>

            <Divider />
            
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} variant="contained">
                    Fermer
                </Button>
            </DialogActions>
        </Dialog>
    );
}