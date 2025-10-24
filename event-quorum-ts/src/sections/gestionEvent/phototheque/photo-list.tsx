import { useState, useMemo } from 'react';

import Grid from '@mui/material/Grid2';
import {
    Box,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Button,
    Pagination,
    InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { PhotoItem } from './photo-item';

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

type Props = {
    photos: PhotoWithMetadata[];
    onDeletePhotos: (photoIds: string[]) => void;
    onPublishPhotos: (photoIds: string[]) => void;
};

// Nombre de photos par page
const PHOTOS_PER_PAGE = 12;

/**
 * Composant pour afficher la liste des photos avec filtres et pagination
 * Toutes les données sont gérées en frontend (pas d'appels API)
 */
export function PhotoList({ photos, onDeletePhotos, onPublishPhotos }: Props) {
    // État pour le filtre par activité
    const [activityFilter, setActivityFilter] = useState<string>('all');

    // État pour la recherche textuelle
    const [searchQuery, setSearchQuery] = useState('');

    // État pour les photos sélectionnées (pour suppression multiple)
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

    // État pour la page courante (commence à 1)
    const [currentPage, setCurrentPage] = useState(1);

    /**
     * Gère le changement du filtre d'activité
     */
    const handleActivityFilterChange = (event: SelectChangeEvent) => {
        setActivityFilter(event.target.value);
        setCurrentPage(1); // Réinitialise à la page 1 lors du changement de filtre
    };

    /**
     * Gère le changement de la recherche textuelle
     */
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Réinitialise à la page 1 lors de la recherche
    };

    /**
     * Gère le changement de page dans la pagination
     */
    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        // Scroll vers le haut de la liste lors du changement de page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /**
     * Gère la sélection/désélection d'une photo
     * @param photoId - ID de la photo
     * @param isSelected - Nouveau état de sélection
     */
    const handlePhotoSelect = (photoId: string, isSelected: boolean) => {
        if (isSelected) {
            setSelectedPhotos([...selectedPhotos, photoId]);
        } else {
            setSelectedPhotos(selectedPhotos.filter((id) => id !== photoId));
        }
    };

    /**
     * Supprime les photos sélectionnées
     * Demande confirmation avant suppression
     */
    const handleDeleteSelected = () => {
        if (selectedPhotos.length === 0) return;

        const confirmMessage =
            selectedPhotos.length === 1
                ? 'Êtes-vous sûr de vouloir supprimer cette photo ?'
                : `Êtes-vous sûr de vouloir supprimer ces ${selectedPhotos.length} photos ?`;

        if (window.confirm(confirmMessage)) {
            onDeletePhotos(selectedPhotos);
            setSelectedPhotos([]);
        }
    };

    /**
     * Publie les photos sélectionnées
     */
    const handlePublishSelected = () => {
        if (selectedPhotos.length === 0) return;

        onPublishPhotos(selectedPhotos);
        setSelectedPhotos([]);
    };

    /**
     * Extrait la liste unique des activités présentes dans les photos
     * Utilisé pour remplir le select de filtrage
     */
    const availableActivities = useMemo(() => {
        const activities = new Map<string, string>();

        photos.forEach((photo) => {
            if (photo.activityId && photo.activityName) {
                activities.set(photo.activityId, photo.activityName);
            }
        });

        return Array.from(activities, ([id, name]) => ({ id, name }));
    }, [photos]);

    /**
     * Applique les filtres et la recherche sur les photos
     * 1. Filtre par activité ou événement
     * 2. Recherche textuelle sur le nom d'activité ou client
     */
    const filteredPhotos = useMemo(() => {
        let filtered = photos;

        // Filtre par activité ou événement
        if (activityFilter !== 'all') {
            if (activityFilter === 'event') {
                // Affiche uniquement les images de l'événement
                filtered = filtered.filter((photo) => photo.isEventPhoto);
            } else {
                // Affiche uniquement les photos de l'activité sélectionnée
                filtered = filtered.filter((photo) => photo.activityId === activityFilter);
            }
        }

        // Recherche textuelle (insensible à la casse)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (photo) =>
                    photo.activityName?.toLowerCase().includes(query) ||
                    photo.clientName.toLowerCase().includes(query) ||
                    (photo.isEventPhoto && 'événement'.includes(query))
            );
        }

        return filtered;
    }, [photos, activityFilter, searchQuery]);

    /**
     * Calcule le nombre total de pages
     */
    const totalPages = Math.ceil(filteredPhotos.length / PHOTOS_PER_PAGE);

    /**
     * Photos à afficher sur la page courante
     */
    const displayedPhotos = useMemo(() => {
        const startIndex = (currentPage - 1) * PHOTOS_PER_PAGE;
        const endIndex = startIndex + PHOTOS_PER_PAGE;
        return filteredPhotos.slice(startIndex, endIndex);
    }, [filteredPhotos, currentPage]);

    /**
     * Calcule les indices de début et fin pour l'affichage
     */
    const startIndex = (currentPage - 1) * PHOTOS_PER_PAGE + 1;
    const endIndex = Math.min(currentPage * PHOTOS_PER_PAGE, filteredPhotos.length);

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 3,
                flexDirection: 'column',
                boxShadow: 3,
                p: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
            }}
        >
            {/* ============ EN-TÊTE : TITRE ET COMPTEUR ============ */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
                    }}
                >
                    Photos enregistrées
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                    }}
                >
                    {filteredPhotos.length > 0
                        ? `${startIndex}-${endIndex} sur ${filteredPhotos.length}`
                        : '0 photo'}
                </Typography>
            </Box>

            {/* ============ BARRE DE FILTRES ET RECHERCHE ============ */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'stretch', sm: 'center' },
                }}
            >
                {/* Filtre par activité */}
                <FormControl
                    sx={{
                        minWidth: { xs: '100%', sm: 250 },
                        flex: { sm: '0 0 auto' },
                    }}
                >
                    <InputLabel id="activity-filter-label">Filtrer par activité</InputLabel>
                    <Select
                        labelId="activity-filter-label"
                        value={activityFilter}
                        label="Filtrer par activité"
                        onChange={handleActivityFilterChange}
                        size="small"
                    >
                        <MenuItem value="all">Toutes les photos</MenuItem>
                        <MenuItem value="event">Images de l'événement</MenuItem>
                        {availableActivities.map((activity) => (
                            <MenuItem key={activity.id} value={activity.id}>
                                {activity.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Barre de recherche */}
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Rechercher par activité ou client..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" width={20} />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Boutons d'action (visibles uniquement si des photos sont sélectionnées) */}
                {selectedPhotos.length > 0 && (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handlePublishSelected}
                            startIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
                            sx={{
                                minWidth: { xs: '100%', sm: 'auto' },
                                whiteSpace: 'nowrap',
                                fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                            }}
                        >
                            Publier ({selectedPhotos.length})
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDeleteSelected}
                            startIcon={<Iconify icon="eva:trash-2-fill" />}
                            sx={{
                                minWidth: { xs: '100%', sm: 'auto' },
                                whiteSpace: 'nowrap',
                                fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                            }}
                        >
                            Supprimer ({selectedPhotos.length})
                        </Button>
                    </>
                )}
            </Box>

            {/* ============ GRILLE DE PHOTOS ============ */}
            {displayedPhotos.length === 0 ? (
                // Message si aucune photo trouvée
                <Box
                    sx={{
                        py: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Iconify
                        icon="solar:gallery-bold-duotone"
                        width={64}
                        sx={{ color: 'text.disabled' }}
                    />
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        {searchQuery || activityFilter !== 'all'
                            ? 'Aucune photo trouvée avec ces critères'
                            : 'Aucune photo enregistrée'}
                    </Typography>
                </Box>
            ) : (
                // Grille responsive des photos (4 colonnes sur desktop)
                <Grid container spacing={3}>
                    {displayedPhotos.map((photo) => (
                        <Grid key={photo.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <PhotoItem
                                photo={photo}
                                isSelected={selectedPhotos.includes(photo.id)}
                                onPhotoSelect={handlePhotoSelect}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* ============ PAGINATION ============ */}
            {totalPages > 1 && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 2,
                    }}
                >
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        showFirstButton
                        showLastButton
                        sx={{
                            '& .MuiPaginationItem-root': {
                                fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                            },
                        }}
                    />
                </Box>
            )}
        </Box>
    );
}