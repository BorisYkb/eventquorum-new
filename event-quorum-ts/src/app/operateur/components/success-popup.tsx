// src/app/operateur/components/success-popup.tsx

'use client';

import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { keyframes } from '@mui/system';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

// Animations
const slideInBounce = keyframes`
  0% {
    transform: translateY(-100px) scale(0.5);
    opacity: 0;
  }
  50% {
    transform: translateY(0px) scale(1.1);
    opacity: 1;
  }
  100% {
    transform: translateY(0px) scale(1);
    opacity: 1;
  }
`;

const checkmarkDraw = keyframes`
  0% {
    stroke-dashoffset: 50;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const circleAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(76, 175, 80, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
  }
`;

const fadeInUp = keyframes`
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

// const progressBar = keyframes`
//   0% {
//     transform: scaleX(1);
//   }
//   100% {
//     transform: scaleX(0);
//   }
// `;

// ----------------------------------------------------------------------

interface SuccessPopupProps {
  open: boolean;
  onClose: () => void;
  autoCloseDelay?: number; // en millisecondes
}

export function SuccessPopup({ 
  open, 
  onClose, 
  autoCloseDelay = 3700 
}: SuccessPopupProps) {
  
  const [showContent, setShowContent] = useState(false);

  // Déclencher l'animation du contenu
  useEffect(() => {
    if (open) {
      setShowContent(false);
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [open]);

  // Auto-fermeture après délai
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [open, onClose, autoCloseDelay]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 2,
          width: 500,
          height: 300,
          textAlign: 'center',
          position: 'relative',
          overflow: 'visible',
          animation: open ? `${slideInBounce} 0.6s ease-out` : 'none',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fffe 100%)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        }
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)'
        }
      }}
    >
      {/* Bouton fermer animé */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          color: 'error.main',
          bgcolor: 'rgba(244, 67, 54, 0.1)',
          width: 32,
          height: 32,
          transition: 'all 0.3s ease',
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(180deg)',
          '&:hover': {
            bgcolor: 'error.main',
            color: 'white',
            transform: 'scale(1.1) rotate(90deg)'
          }
        }}
      >
        <Iconify icon="eva:close-fill" width={18} />
      </IconButton>

      {/* Contenu principal */}
      <Box sx={{ p: 4, pt: 5, pb: 4 }}>
        {/* Container pour l'icône avec animations */}
        <Box 
          sx={{ 
            mb: 3,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          {/* Cercle principal avec animation */}
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              bgcolor: 'success.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              animation: showContent ? `${circleAnimation} 0.5s ease-out 0.2s both, ${pulseAnimation} 2s infinite 0.8s` : 'none',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -10,
                left: -10,
                right: -10,
                bottom: -10,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, rgba(76, 175, 80, 0.3), rgba(76, 175, 80, 0.1))',
                animation: showContent ? `${pulseAnimation} 2s infinite 1s` : 'none',
              }
            }}
          >
            {/* SVG Checkmark animé */}
            <Box
              component="svg"
              sx={{
                width: 50,
                height: 50,
                overflow: 'visible'
              }}
              viewBox="0 0 50 50"
            >
              <Box
                component="path"
                sx={{
                  fill: 'none',
                  stroke: 'white',
                  strokeWidth: 4,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeDasharray: 50,
                  strokeDashoffset: showContent ? 0 : 50,
                  animation: showContent ? `${checkmarkDraw} 0.6s ease-out 0.5s both` : 'none',
                  transition: 'stroke-dashoffset 0.6s ease-out'
                }}
                d="M14 27l8 8 16-16"
              />
            </Box>
          </Box>

          {/* Particules décoratives */}
          {[...Array(6)].map((_, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: 'success.main',
                opacity: showContent ? 1 : 0,
                animation: showContent ? `${fadeInUp} 0.5s ease-out ${0.8 + index * 0.1}s both` : 'none',
                ...(index === 0 && { top: 10, left: 20, transform: 'scale(0.8)' }),
                ...(index === 1 && { top: 25, right: 15, transform: 'scale(1.2)' }),
                ...(index === 2 && { bottom: 20, left: 25, transform: 'scale(0.6)' }),
                ...(index === 3 && { bottom: 10, right: 30, transform: 'scale(1)' }),
                ...(index === 4 && { top: 40, left: 5, transform: 'scale(0.9)' }),
                ...(index === 5 && { top: 15, right: 5, transform: 'scale(0.7)' }),
              }}
            />
          ))}
        </Box>

        {/* Message principal */}
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'success.main',
            fontWeight: 700,
            fontSize: '1.4rem',
            mb: 1,
            animation: showContent ? `${fadeInUp} 0.5s ease-out 0.6s both` : 'none',
            opacity: showContent ? 1 : 0
          }}
        >
          Enregistrement effectué
        </Typography>

        {/* Message secondaire */}
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            fontSize: '0.95rem',
            animation: showContent ? `${fadeInUp} 0.5s ease-out 0.7s both` : 'none',
            opacity: showContent ? 1 : 0
          }}
        >
          Le participant a été émargé avec succès
        </Typography>

        {/* Barre de progression pour l'auto-fermeture */}
        {/* <Box
          sx={{
            mt: 3,
            height: 3,
            borderRadius: 1.5,
            bgcolor: 'grey.200',
            overflow: 'hidden',
            animation: showContent ? `${fadeInUp} 0.5s ease-out 0.8s both` : 'none',
            opacity: showContent ? 1 : 0
          }}
        >
          <Box
            sx={{
              height: '100%',
              bgcolor: 'success.main',
              borderRadius: 1.5,
              animation: showContent ? `${progressBar} ${autoCloseDelay}ms linear 0.8s both` : 'none',
              transformOrigin: 'left center',
            }}
          />
        </Box> */}
      </Box>
    </Dialog>
  );
}