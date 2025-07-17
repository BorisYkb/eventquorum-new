// src/sections/operateur/components/scanner-dialog.tsx

'use client';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface ScannerDialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showInstructions?: boolean;
}

export function ScannerDialog({ 
  open, 
  onClose, 
  children, 
  showInstructions = true 
}: ScannerDialogProps) {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          pb: 1
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Iconify icon="eva:camera-fill" width={24} />
            <Typography variant="h6">Scanner QR Code</Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0, position: 'relative' }}>
          {children}

          {/* Instructions */}
          {showInstructions && (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Placez le QR code dans le cadre pour le scanner automatiquement
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button onClick={onClose} variant="outlined" fullWidth>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>

      {/* Animation CSS pour l'effet de scan */}
      <style jsx global>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </>
  );
}