// src/app/operateur/components/emargement-popup.tsx

'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface ParticipantInfo {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}

interface EmargementPopupProps {
  open: boolean;
  participant: ParticipantInfo | null;
  onClose: () => void;
  onEmargement: (participantId: string, signature: string, boitierNumber: string) => void;
}

export function EmargementPopup({ 
  open, 
  participant, 
  onClose, 
  onEmargement 
}: EmargementPopupProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [boitierNumber, setBoitierNumber] = useState('');
  const [hasSignature, setHasSignature] = useState(false);

  // Réinitialiser lors de l'ouverture
  useEffect(() => {
    if (open) {
      setBoitierNumber('');
      setHasSignature(false);
      clearSignature();
    }
  }, [open]);

  // Fonctions de signature tactile améliorées
  const getCoordinates = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX, clientY;
    
    if ('touches' in event) {
      event.preventDefault();
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = useCallback((event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    
    const { x, y } = getCoordinates(event);
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#000';
    }
  }, []);

  const draw = useCallback((event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const { x, y } = getCoordinates(event);
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
      setHasSignature(true);
    }
  }, [isDrawing]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearSignature = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasSignature(false);
    }
  }, []);

  const handleEmargement = useCallback(() => {
    if (!participant || !hasSignature || !boitierNumber.trim()) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Convertir la signature en base64
    const signatureData = canvas.toDataURL();
    
    onEmargement(participant.id, signatureData, boitierNumber.trim());
    onClose();
  }, [participant, hasSignature, boitierNumber, onEmargement, onClose]);

  const handleBoitierChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Accepter seulement les nombres naturels
    if (value === '' || /^\d+$/.test(value)) {
      setBoitierNumber(value);
    }
  }, []);

  if (!participant) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: 600
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        pb: 1,
        bgcolor: 'grey.100'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Informations personnelles
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Ces informations portent sur le Nom & prénom,Email,Telephone
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Détail
          </Typography>
        </Box>

        {/* Informations du participant */}
        <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 500 }}>
              Nom
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              {participant.nom}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 500 }}>
              Prénom
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              {participant.prenom}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 500 }}>
              Email
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              {participant.email}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex' }}>
            <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 500 }}>
              Téléphone
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              {participant.telephone}
            </Typography>
          </Box>
        </Box>

        {/* Numéro de boîtier */}
        <Box sx={{ mb: 3 }}>
          <TextField
            size="small"
            label="Numéro de boîtier de vote"
            value={boitierNumber}
            onChange={handleBoitierChange}
            placeholder="Ex: 123"
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*'
            }}
            sx={{ width: 200 }}
          />
        </Box>

        {/* Zone de signature */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Signature du participant
          </Typography>
          <Paper
            elevation={0}
            sx={{
              border: '2px solid',
              borderColor: 'grey.300',
              borderRadius: 1,
              p: 1,
              cursor: 'crosshair',
              position: 'relative',
              width: 350,
              mx: 'auto'
            }}
          >
            <canvas
              ref={canvasRef}
              width={320}
              height={150}
              style={{
                width: '100%',
                height: '150px',
                display: 'block',
                touchAction: 'none'
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            
            {/* Placeholder quand pas de signature */}
            {!hasSignature && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  textAlign: 'center'
                }}
              >
                <Typography variant="body2" color="text.disabled">
                  Signer ici
                </Typography>
              </Box>
            )}
          </Paper>
          
          {/* Bouton effacer signature */}
          <Box sx={{ mt: 1, textAlign: 'center' }}>
            <Button
              variant="text"
              size="small"
              onClick={clearSignature}
              disabled={!hasSignature}
              sx={{ color: 'error.main' }}
            >
              Effacer la signature
            </Button>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, gap: 2 }}>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          color="inherit"
          sx={{ flex: 1 }}
        >
          Annuler
        </Button>
        <Button 
          onClick={handleEmargement}
          variant="contained" 
          color="success"
          disabled={!hasSignature || !boitierNumber.trim()}
          sx={{ flex: 1 }}
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
}