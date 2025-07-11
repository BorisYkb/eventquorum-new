import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
} from 'src/components/carousel';

// ----------------------------------------------------------------------

// Mock data pour le carrousel des partenaires
const CAROUSEL_DATA = [
  {
    id: '1',
    title: 'BIIC',
    coverUrl: '/logo_biic1.png',
    description: 'Partenaire BIIC',
  },
  {
    id: '2',
    title: 'INB', 
    coverUrl: '/logo_lnb.jpg',
    description: 'Partenaire INB',
  },
  {
    id: '3',
    title: 'Nestlé',
    coverUrl: '/logo_nesle.png', 
    description: 'Partenaire Nestlé',
  },
  {
    id: '4',
    title: 'SMB',
    coverUrl: '/logo_smb.png',
    description: 'Partenaire SMB',
  },
  {
    id: '5',
    title: 'NSIA Bank',
    coverUrl: '/logo-NSIA-BANK.png',
    description: 'Partenaire NSIA Bank',
  },
  {
    id: '6',
    title: 'Orange',
    coverUrl: '/logoOrange.png',
    description: 'Partenaire Orange',
  },
  {
    id: '7',
    title: 'SAPH',
    coverUrl: '/logoSAPH.png',
    description: 'Partenaire SAPH',
  },
  {
    id: '8',
    title: 'Société Générale',
    coverUrl: '/logoSocieteGenerale.png',
    description: 'Partenaire Société Générale',
  },
];

// ----------------------------------------------------------------------

type Props = {
  data?: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  }[];
};

export function IntervenantCarousel({ data = CAROUSEL_DATA }: Props) {
  const carousel = useCarousel({
    align: 'start',
    slideSpacing: '16px',
    slidesToShow: { xs: 2, sm: 3, md: 4, lg: 6 }, // Plus d'éléments pour les logos
    loop: true, // Boucle infinie
    // autoplay and autoplayDelay removed as they are not valid CarouselOptions
  });

  return (
    <Card sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
        NOS SPONSORS ET PARTENAIRES
      </Typography>
      
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Carousel carousel={carousel} sx={{ maxWidth: '100%' }}>
          {data.map((item, index) => (
            <CarouselItem key={item.id} index={index} item={item} />
          ))}
        </Carousel>

        {/* Points de navigation */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <CarouselDotButtons
            scrollSnaps={carousel.dots.scrollSnaps}
            selectedIndex={carousel.dots.selectedIndex}
            onClickDot={carousel.dots.onClickDot}
            sx={{ color: 'primary.main' }}
          />
        </Box>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  index: number;
  item: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  };
};

function CarouselItem({ item, index }: CarouselItemProps) {
  return (
    <Box 
      sx={{ 
        borderRadius: 2, 
        overflow: 'hidden', 
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        height: 120, // Augmenté de 80 à 120px
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.50',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        component="img"
        alt={item.title}
        src={item.coverUrl}
        sx={{ 
          maxWidth: '90%',
          maxHeight: '90%',
          objectFit: 'contain',
        }}
        onError={(e) => {
          // Fallback si l'image ne charge pas
          e.currentTarget.style.display = 'none';
          if (e.currentTarget.parentElement) {
            e.currentTarget.parentElement.innerHTML = `<div style="color: #666; font-size: 14px;">${item.title}</div>`;
          }
        }}
      />
    </Box>
  );
}