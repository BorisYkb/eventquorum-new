import type { CardProps } from '@mui/material/Card';
import { varAlpha } from 'minimal-shared/utils';

import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

import { fDate } from 'src/utils/format-time';
import { Image } from 'src/components/image';

/**
 * Type pour une photo avec ses métadonnées
 */
type PhotoWithMetadata = {
    id: string;
    file: File;
    url: string;
    activityId?: string;
    activityName?: string;
    isEventPhoto: boolean;
    uploadDate: Date;
    clientName: string;
    clientLogo: string;
};

type PhotoItemProps = CardProps & {
    photo: PhotoWithMetadata;
    isSelected: boolean;
    onPhotoSelect: (photoId: string, isSelected: boolean) => void;
};

/**
 * Composant pour afficher une carte de photo individuelle
 * Basé sur EventItem mais adapté pour la photothèque
 */
export function PhotoItem({ photo, isSelected, onPhotoSelect, sx, ...other }: PhotoItemProps) {
    /**
     * Gère le changement de l'état de sélection de la checkbox
     */
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onPhotoSelect(photo.id, event.target.checked);
    };

    /**
     * Détermine le texte à afficher (nom de l'activité ou "Événement")
     */
    const displayName = photo.isEventPhoto ? 'Image de l\'événement' : photo.activityName;

    return (
        <Card
            sx={[
                {
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: (theme) => theme.customShadows.z20,
                        // Affiche la checkbox au survol de la carte
                        '& .photo-checkbox': {
                            opacity: 1,
                        },
                    },
                    // Ajoute une bordure si la photo est sélectionnée
                    ...(isSelected && {
                        outline: (theme) => `3px solid ${theme.palette.primary.main}`,
                        outlineOffset: '-3px',
                    }),
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        >
            {/* Checkbox de sélection en haut à droite */}
            <Checkbox
                checked={isSelected}
                onChange={handleCheckboxChange}
                className="photo-checkbox"
                sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    zIndex: 10,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: (theme) => theme.customShadows.z8,
                    transition: 'opacity 0.2s ease',
                    '&:hover': {
                        bgcolor: 'background.paper',
                    },
                    // Affiche toujours la checkbox si elle est cochée
                    opacity: isSelected ? 1 : 0,
                }}
            />

            {/* Avatar du client en haut à gauche */}
            <Tooltip title={photo.clientName}>
                <Avatar
                    alt={photo.clientName}
                    src={photo.clientLogo}
                    sx={{
                        top: 12,
                        left: 12,
                        zIndex: 9,
                        position: 'absolute',
                        width: { xs: 36, sm: 40 },
                        height: { xs: 36, sm: 40 },
                    }}
                />
            </Tooltip>

            {/* Image de la photo */}
            <Image
                alt={displayName || ''}
                src={photo.url}
                ratio="4/3"
                sx={{ height: { xs: 240, sm: 280, md: 320, lg: 360 } }}
                slotProps={{
                    overlay: {
                        sx: (theme) => ({
                            bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.64),
                        }),
                    },
                }}
            />

            {/* Contenu de la carte (date et nom) */}
            <CardContent
                sx={{
                    width: 1,
                    zIndex: 9,
                    bottom: 0,
                    position: 'absolute',
                    color: 'common.white',
                    p: { xs: 2, sm: 2.5, md: 3 },
                }}
            >
                {/* Date d'enregistrement */}
                <Typography
                    variant="caption"
                    component="div"
                    sx={{
                        mb: 1,
                        opacity: 0.72,
                        fontSize: { xs: '0.6875rem', sm: '0.75rem' },
                    }}
                >
                    {fDate(photo.uploadDate)}
                </Typography>

                {/* Nom de l'activité ou "Image de l'événement" */}
                <Typography
                    variant="subtitle2"
                    sx={(theme) => ({
                        ...theme.mixins.maxLine({
                            line: 2,
                            persistent: theme.typography.subtitle2,
                        }),
                        fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                        fontWeight: 500,
                    })}
                >
                    {displayName}
                </Typography>
            </CardContent>

            {/* Indicateur visuel pour montrer que la carte est sélectionnée */}
            {isSelected && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        pointerEvents: 'none',
                        opacity: 0.1,
                        bgcolor: 'primary.main',
                    }}
                />
            )}
        </Card>
    );
}