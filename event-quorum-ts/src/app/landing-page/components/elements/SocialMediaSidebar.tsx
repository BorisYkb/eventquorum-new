// components/SocialMediaSidebar.tsx
'use client';

import React from 'react';
import { Fab, Tooltip, Box } from '@mui/material';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  
  LinkedIn,
  YouTube 
} from '@mui/icons-material';

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
  hoverColor: string;
}

interface SocialMediaSidebarProps {
  className?: string;
  showLabels?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const SocialMediaSidebar: React.FC<SocialMediaSidebarProps> = ({ 
  className = '',
  showLabels = false,
  size = 'medium'
}) => {
  const socialLinks: SocialLink[] = [
    {
      name: 'Facebook',
      icon: <Facebook />,
      url: 'https://facebook.com/votre-page',
      color: '#1877F2',
      hoverColor: '#166FE5'
    },
    {
      name: 'Twitter',
      icon: <Twitter />,
      url: 'https://twitter.com/votre-compte',
      color: '#1DA1F2',
      hoverColor: '#1A91DA'
    },
    {
      name: 'Instagram',
      icon: <Instagram />,
      url: 'https://instagram.com/votre-compte',
      color: '#E4405F',
      hoverColor: '#D93654'
    },
    
    {
      name: 'LinkedIn',
      icon: <LinkedIn />,
      url: 'https://linkedin.com/company/votre-entreprise',
      color: '#0A66C2',
      hoverColor: '#0958A5'
    },
    {
      name: 'YouTube',
      icon: <YouTube />,
      url: 'https://youtube.com/votre-chaine',
      color: '#FF0000',
      hoverColor: '#E60000'
    }
  ];

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getSizeProps = () => {
    switch (size) {
      case 'small':
        return { size: 'small' as const, spacing: 1 };
      case 'large':
        return { size: 'large' as const, spacing: 2 };
      default:
        return { size: 'medium' as const, spacing: 1.5 };
    }
  };

  const { size: fabSize, spacing } = getSizeProps();

  return (
    <Box
      className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-50 ${className}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing,
        animation: 'slideInRight 0.5s ease-out'
      }}
    >
      {socialLinks.map((social, index) => (
        <Tooltip 
          key={social.name}
          title={social.name}
          placement="left"
          arrow
        >
          <Fab
            size={fabSize}
            onClick={() => handleSocialClick(social.url)}
            className="transition-all duration-300 hover:scale-110 hover:shadow-lg"
            sx={{
              backgroundColor: social.color,
              color: 'white',
              '&:hover': {
                backgroundColor: social.hoverColor,
                transform: 'scale(1.1)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
              },
              animationDelay: `${index * 0.1}s`,
              animation: 'fadeInUp 0.6s ease-out both'
            }}
            aria-label={`Suivez-nous sur ${social.name}`}
          >
            {social.icon}
          </Fab>
        </Tooltip>
      ))}
      
      {showLabels && (
        <Box className="mt-2 text-center">
          <span className="text-sm text-gray-600 font-medium">
            Suivez-nous
          </span>
        </Box>
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%) translateY(-50%);
            opacity: 0;
          }
          to {
            transform: translateX(0) translateY(-50%);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
};

export default SocialMediaSidebar;