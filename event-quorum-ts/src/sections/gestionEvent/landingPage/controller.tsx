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
    message_bienvenue: 'Bienvenu(e) cher(e) participant(e)',
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
      
      // Ici vous pourriez faire un appel API pour sauvegarder les données
      // await saveGeneralInfo(data);
      
      // Afficher un message de succès
      console.log('Informations générales sauvegardées avec succès');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  });

  // Gestionnaires pour l'agenda
  const handleAddAgenda = () => {
    console.log('Ajouter une nouvelle activité à l\'agenda');
    // Ici vous pourriez ouvrir un modal ou naviguer vers une page d'ajout
    // Par exemple, ouvrir un dialog avec un formulaire
  };

  const handleEditAgenda = (id: string) => {
    console.log('Modifier l\'activité avec l\'ID:', id);
    const item = agendaItems.find((item) => item.id === id);
    if (item) {
      console.log('Données de l\'activité à modifier:', item);
      // Ici vous pourriez ouvrir un modal ou naviguer vers une page d'édition
    }
  };

  const handleDeleteAgenda = (id: string) => {
    console.log('Supprimer l\'activité avec l\'ID:', id);
    // Ici vous pourriez afficher une confirmation avant la suppression
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
      // Ici vous pourriez ouvrir un modal ou naviguer vers une page de détails
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
  };
};