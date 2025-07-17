// src/app/operateur/admissionactivite/components/qr-scanner-activite-popup.tsx

'use client';

import { useEffect, useCallback } from 'react';

import { useCamera } from '../../components/hooks/use-camera';
import { CameraView } from '../../components/camera-view';
import { ScannerDialog } from '../../components/scanner-dialog';

// ----------------------------------------------------------------------

interface QRScannerActivitePopupProps {
  open: boolean;
  onClose: () => void;
  onScanSuccess: (qrData: string) => void;
  activiteSelectionnee?: string;
}

export function QRScannerActivitePopup({ 
  open, 
  onClose, 
  onScanSuccess,
  activiteSelectionnee 
}: QRScannerActivitePopupProps) {
  const {
    videoRef,
    canvasRef,
    isLoading,
    error,
    isScanning,
    startCamera,
    stopCamera,
    handleRetry
  } = useCamera({
    onScanSuccess: (qrData: string) => {
      onScanSuccess(qrData);
      handleClose();
    },
    scanInterval: 500
  });

  // Effet pour démarrer/arrêter la caméra
  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [open, startCamera, stopCamera]);

  const handleClose = useCallback(() => {
    stopCamera();
    onClose();
  }, [stopCamera, onClose]);

  return (
    <ScannerDialog 
      open={open} 
      onClose={handleClose}
      showInstructions={isScanning}
      title={`Scanner QR Code - ${activiteSelectionnee || 'Activité'}`}
      instructions="Placez le QR code du participant dans le cadre pour confirmer sa présence à l'activité"
    >
      <CameraView
        videoRef={videoRef}
        canvasRef={canvasRef}
        isLoading={isLoading}
        error={error}
        isScanning={isScanning}
        onRetry={handleRetry}
      />
    </ScannerDialog>
  );
}