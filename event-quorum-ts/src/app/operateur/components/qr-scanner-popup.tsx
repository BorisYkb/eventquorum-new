// src/app/operateur/components/qr-scanner-popup.tsx

'use client';

import { useEffect, useCallback } from 'react';

import { useCamera } from './hooks/use-camera';
import { CameraView } from './camera-view';
import { ScannerDialog } from './scanner-dialog';

// ----------------------------------------------------------------------

interface QRScannerPopupProps {
  open: boolean;
  onClose: () => void;
  onScanSuccess: (qrData: string) => void;
}

export function QRScannerPopup({ open, onClose, onScanSuccess }: QRScannerPopupProps) {
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