// src/app/operateur/components/hooks/use-camera.ts

import { useRef, useEffect, useState, useCallback } from 'react';

// ----------------------------------------------------------------------

interface UseCameraOptions {
  onScanSuccess?: (qrData: string) => void;
  scanInterval?: number;
}

export function useCamera({ onScanSuccess, scanInterval = 500 }: UseCameraOptions = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Démarrer la caméra
  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Caméra arrière si disponible
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        await videoRef.current.play();
        setIsScanning(true);
      }
    } catch (err) {
      console.error('Erreur accès caméra:', err);
      setError('Impossible d\'accéder à la caméra. Vérifiez les permissions.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Arrêter la caméra
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  }, []);

  // Scanner le QR code (simulation - dans un vrai projet, utilisez une librairie comme jsQR)
  const scanQRCode = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !onScanSuccess) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Simulation d'un scan réussi (remplacer par une vraie librairie QR)
    // Dans un vrai projet, utilisez jsQR ou une autre librairie
    const simulateQRDetection = Math.random() > 0.95; // 5% de chance de détecter
    
    if (simulateQRDetection) {
      const mockQRData = `PARTICIPANT_${Date.now()}`;
      onScanSuccess(mockQRData);
    }
  }, [onScanSuccess]);

  // Effet pour le scan continu
  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(scanQRCode, scanInterval);

    return () => clearInterval(interval);
  }, [isScanning, scanQRCode, scanInterval]);

  const handleRetry = useCallback(() => {
    setError(null);
    startCamera();
  }, [startCamera]);

  return {
    videoRef,
    canvasRef,
    isLoading,
    error,
    isScanning,
    startCamera,
    stopCamera,
    handleRetry
  };
}