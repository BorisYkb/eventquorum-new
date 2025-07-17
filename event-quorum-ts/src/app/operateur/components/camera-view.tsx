// src/app/operateur/components/camera-view.tsx

'use client';

import { RefObject } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface CameraViewProps {
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  isLoading: boolean;
  error: string | null;
  isScanning: boolean;
  onRetry: () => void;
}

export function CameraView({
  videoRef,
  canvasRef,
  isLoading,
  error,
  isScanning,
  onRetry
}: CameraViewProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 400,
        bgcolor: 'grey.900',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Vidéo de la caméra */}
      <video
        ref={videoRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        playsInline
        muted
      />

      {/* Canvas caché pour le traitement */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />

      {/* Overlay de scan */}
      {isScanning && (
        <ScanOverlay />
      )}

      {/* Indicateur de chargement */}
      {isLoading && (
        <LoadingIndicator />
      )}

      {/* Message d'erreur */}
      {error && (
        <ErrorMessage error={error} onRetry={onRetry} />
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function ScanOverlay() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        height: 200,
        border: '3px solid',
        borderColor: 'primary.main',
        borderRadius: 2,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -3,
          left: -3,
          right: -3,
          bottom: -3,
          border: '3px solid transparent',
          borderTopColor: 'success.main',
          borderRadius: 2,
          animation: 'scan 2s linear infinite'
        }
      }}
    />
  );
}

// ----------------------------------------------------------------------

function LoadingIndicator() {
  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        color: 'white'
      }}
    >
      <CircularProgress color="primary" />
      <Typography variant="body2">Démarrage de la caméra...</Typography>
    </Box>
  );
}

// ----------------------------------------------------------------------

interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
}

function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        color: 'white',
        textAlign: 'center',
        p: 2
      }}
    >
      <Iconify icon="eva:alert-circle-fill" width={48} color="error.main" />
      <Typography variant="body2">{error}</Typography>
      <Button variant="contained" onClick={onRetry} size="small">
        Réessayer
      </Button>
    </Box>
  );
}