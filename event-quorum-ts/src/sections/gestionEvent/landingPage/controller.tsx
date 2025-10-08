import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Type pour les éléments de l'agenda
export interface AgendaItem {
  id: string;
  date_debut: string;
  date_fin: string;
  titre: string;
  statut: 'en_cours' | 'terminer' | 'a_venir';
}

// Type pour les organisateurs
export interface Organizer {
  image: File | string | null;
  description: string;
}

// Schéma de validation pour les informations générales
const LandingPageSchema = z.object({
  message_bienvenue: z.string().min(1, 'Le message de bienvenue est obligatoire.'),
  type_evenement: z.enum(['en_ligne', 'physique', 'mixte'], {
    required_error: 'Veuillez sélectionner un type d\'événement.',
  }),
  type_connexion: z.enum(['mdp', 'lien_personnalise'], {
    required_error: 'Veuillez sélectionner un type de connexion.',
  }),
  activer_selection_activites: z.boolean(),
  activer_confirmation_presence: z.boolean(),
  importer_video_evenement: z.boolean(),
});

export type LandingPageSchemaType = z.infer<typeof LandingPageSchema>;

export const useLandingPageController = () => {
  // État pour gérer les organisateurs
  const [organizateurs, setOrganizateurs] = useState<Organizer[]>([]);
  const [isAddingOrganizer, setIsAddingOrganizer] = useState(false);
  const [currentOrganizer, setCurrentOrganizer] = useState<{
    image: File | string | null;
    description: string;
    index: number | null;
  }>({
    image: null,
    description: '',
    index: null,
  });

  // Données d'exemple pour l'agenda
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([
    {
      id: '1',
      date_debut: '10/12/24 10H00',
      date_fin: '10/12/24 17H00',
      titre: 'Bienvenue',
      statut: 'en_cours',
    },
    {
      id: '2',
      date_debut: '11/12/24 10H00',
      date_fin: '11/12/24 17H00',
      titre: 'Bienvenue',
      statut: 'terminer',
    },
  ]);

  // Valeurs par défaut pour les informations générales
  const defaultValues: LandingPageSchemaType = {
    message_bienvenue: 'Bienvenue à notre événement ! Nous sommes ravis de vous accueillir.',
    type_evenement: 'en_ligne',
    type_connexion: 'mdp',
    activer_selection_activites: true,
    activer_confirmation_presence: true,
    importer_video_evenement: false,
  };

  const methods = useForm<LandingPageSchemaType>({
    resolver: zodResolver(LandingPageSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Actions à effectuer avec les données du formulaire
      console.log('Données du formulaire:', data);
      console.log('Organisateurs:', organizateurs);
      
      // Ici vous pourriez faire un appel API pour sauvegarder les données
      // await saveGeneralInfo(data, organizateurs);
      
      // Afficher un message de succès
      console.log('Informations générales sauvegardées avec succès');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  });

  // Gestionnaires pour les organisateurs
  const handleAddOrganizer = () => {
    if (!currentOrganizer.image || !currentOrganizer.description) {
      console.error('Veuillez remplir tous les champs');
      return;
    }

    if (currentOrganizer.index !== null) {
      // Mode édition
      const updatedOrganizers = [...organizateurs];
      updatedOrganizers[currentOrganizer.index] = {
        image: currentOrganizer.image,
        description: currentOrganizer.description,
      };
      setOrganizateurs(updatedOrganizers);
    } else {
      // Mode ajout
      setOrganizateurs([
        ...organizateurs,
        {
          image: currentOrganizer.image,
          description: currentOrganizer.description,
        },
      ]);
    }

    // Réinitialiser le formulaire d'organisateur
    setCurrentOrganizer({ image: null, description: '', index: null });
    setIsAddingOrganizer(false);
  };

  const handleEditOrganizer = (index: number) => {
    const organizer = organizateurs[index];
    setCurrentOrganizer({
      image: organizer.image,
      description: organizer.description,
      index,
    });
    setIsAddingOrganizer(true);
  };

  const handleDeleteOrganizer = (index: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet organisateur ?')) {
      const updatedOrganizers = organizateurs.filter((_, i) => i !== index);
      setOrganizateurs(updatedOrganizers);
      
      // Si on supprime l'organisateur en cours d'édition, réinitialiser
      if (currentOrganizer.index === index) {
        setCurrentOrganizer({ image: null, description: '', index: null });
        setIsAddingOrganizer(false);
      }
    }
  };

  // Gestionnaires pour l'agenda
  const handleAddAgenda = () => {
    console.log('Ajouter une nouvelle activité à l\'agenda');
  };

  const handleEditAgenda = (id: string) => {
    console.log('Modifier l\'activité avec l\'ID:', id);
    const item = agendaItems.find((item) => item.id === id);
    if (item) {
      console.log('Données de l\'activité à modifier:', item);
    }
  };

  const handleDeleteAgenda = (id: string) => {
    console.log('Supprimer l\'activité avec l\'ID:', id);
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) {
      setAgendaItems((prevItems) => prevItems.filter((item) => item.id !== id));
      console.log('Activité supprimée avec succès');
    }
  };

  const handleViewAgenda = (id: string) => {
    console.log('Voir les détails de l\'activité avec l\'ID:', id);
    const item = agendaItems.find((item) => item.id === id);
    if (item) {
      console.log('Détails de l\'activité:', item);
    }
  };

  // Fonction pour ajouter une nouvelle activité (utilisable depuis l'extérieur)
  const addAgendaItem = (newItem: Omit<AgendaItem, 'id'>) => {
    const id = Date.now().toString();
    const item: AgendaItem = { ...newItem, id };
    setAgendaItems((prevItems) => [...prevItems, item]);
    return item;
  };

  // Fonction pour mettre à jour une activité existante
  const updateAgendaItem = (id: string, updatedItem: Partial<AgendaItem>) => {
    setAgendaItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  return {
    methods,
    control,
    isSubmitting,
    onSubmit,
    agendaItems,
    handleAddAgenda,
    handleEditAgenda,
    handleDeleteAgenda,
    handleViewAgenda,
    addAgendaItem,
    updateAgendaItem,
    // Nouveaux exports pour les organisateurs
    organizateurs,
    handleAddOrganizer,
    handleDeleteOrganizer,
    handleEditOrganizer,
    currentOrganizer,
    setCurrentOrganizer,
    isAddingOrganizer,
    setIsAddingOrganizer,
  };
};