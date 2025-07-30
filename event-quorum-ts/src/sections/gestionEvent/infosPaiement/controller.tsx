import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Type pour les activités
export interface Activity {
  id: string;
  nom: string;
  categorie: string;
  montant: string;
  nombrePlaces: number;
  placesOccupees: number;
}

const CATEGORY_COUNT_OPTIONS = [
    { value: 1, label: '1 catégorie' },
    { value: 2, label: '2 catégories' },
    { value: 3, label: '3 catégories' },
  ];

// Schéma de validation pour les informations de paiement
const InfoPaiementSchema = z.object({
  mode_paiement: z.string().min(1, 'Veuillez sélectionner un mode de paiement.'),
  compte_beneficiaire: z.string().min(1, 'Le compte bénéficiaire est obligatoire.'),
  autres_infos: z.string().optional(),
  devise: z.string().min(1, 'Veuillez sélectionner une devise.'),
  mode_tarification: z.string().min(1, 'Veuillez sélectionner un mode de tarification.'),
  activite: z.string().optional(),
  type_tarification: z.string().optional(),
  montant_fixe: z.string().optional(),
  nombre_categories: z.number().min(1).max(3).optional(),
  categories: z.array(z.object({
    nom: z.string().min(1, 'Le nom de la catégorie est obligatoire'),
    montant: z.string().min(1, 'Le montant est obligatoire'),
    description: z.string().optional(),
  })).optional(),
//   prix: z.object({
//     vip: z.string().optional(),
//     normal: z.string().optional(),
//     etudiant: z.string().optional(),
//     description: z.string().optional(),
//   }).optional(),
});

export type InfoPaiementSchemaType = z.infer<typeof InfoPaiementSchema>;

export const useInfoPaiementController = () => {
  // État pour les méthodes de paiement sélectionnées
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([
    'orange_ci',
    'wave_ci',
    'visa'
  ]);

  // Données d'exemple pour les activités
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      nom: 'Workshop cyber',
      categorie: '-',
      montant: '25 000',
      nombrePlaces: 250,
      placesOccupees: 65,
    },
    {
      id: '2',
      nom: 'Workshop Dev',
      categorie: 'Standart - VIP',
      montant: '20 000 - 50 000',
      nombrePlaces: 150,
      placesOccupees: 25,
    },
    {
      id: '3',
      nom: 'Workshop Dev',
      categorie: 'Standart - VIP - VVIP',
      montant: '20 000 - 50 000 - 100 000',
      nombrePlaces: 50,
      placesOccupees: 5,
    },
  ]);

  // Valeurs par défaut pour le formulaire
  const defaultValues: InfoPaiementSchemaType = {
    mode_paiement: '',
    compte_beneficiaire: '',
    autres_infos: '',
    devise: 'fcfa',
    mode_tarification: 'gratuit',
    activite: '',
    type_tarification: 'montant_fixe',
    montant_fixe: '',
    nombre_categories: 1,
    categories: [
      { nom: '', montant: '', description: '' }
    ],
  };

  const methods = useForm<InfoPaiementSchemaType>({
    resolver: zodResolver(InfoPaiementSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = methods;

  // Surveiller les changements de  champs
  const watchTarificationMode = watch('mode_tarification');
  const watchPricingType = watch('type_tarification');
  const watchNombreCategories = watch('nombre_categories');

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Actions à effectuer avec les données du formulaire
      console.log('Données du formulaire:', data);
      console.log('Méthodes de paiement sélectionnées:', selectedPaymentMethods);
      
      
      console.log('Informations de paiement sauvegardées avec succès');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  });

  // Gestionnaire pour les méthodes de paiement
  const handlePaymentMethodChange = (method: string, checked: boolean) => {
    setSelectedPaymentMethods(prev => {
      if (checked) {
        return [...prev, method];
      } else {
        return prev.filter(m => m !== method);
      }
    });
  };

  // Gestionnaires pour les activités
  const handleViewActivity = (id: string) => {
    console.log('Voir les détails de l\'activité avec l\'ID:', id);
    const activity = activities.find(act => act.id === id);
    if (activity) {
      console.log('Détails de l\'activité:', activity);
      //  ouvrir un modal ou naviguer vers une page de détails
    }
  };

  const handleEditActivity = (id: string) => {
    console.log('Modifier l\'activité avec l\'ID:', id);
    const activity = activities.find(act => act.id === id);
    if (activity) {
      console.log('Données de l\'activité à modifier:', activity);
      //  ouvrir un modal ou naviguer vers une page d'édition
    }
  };

  const handleDeleteActivity = (id: string) => {
    console.log('Supprimer l\'activité avec l\'ID:', id);
    //  afficher une confirmation avant la suppression
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) {
      setActivities(prev => prev.filter(act => act.id !== id));
      console.log('Activité supprimée avec succès');
    }
  };

  // Fonction pour ajouter une nouvelle activité
  const addActivity = (newActivity: Omit<Activity, 'id'>) => {
    const id = Date.now().toString();
    const activity: Activity = { ...newActivity, id };
    setActivities(prev => [...prev, activity]);
    return activity;
  };

  // Fonction pour mettre à jour une activité existante
  const updateActivity = (id: string, updatedActivity: Partial<Activity>) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === id ? { ...activity, ...updatedActivity } : activity
      )
    );
  };

  // Fonction pour mettre à jour une categories
  const updateCategoriesArray = (count: number) => {
    const currentCategories = methods.getValues('categories') || [];
    const newCategories = Array.from({ length: count }, (_, index) => 
      currentCategories[index] || { nom: '', montant: '', description: '' }
    );
    methods.setValue('categories', newCategories);
  };

  // Fonction pour calculer le total des places
  const getTotalPlaces = () => {
    return activities.reduce((total, activity) => total + activity.nombrePlaces, 0);
  };

  // Fonction pour calculer le total des places occupées
  const getTotalPlacesOccupees = () => {
    return activities.reduce((total, activity) => total + activity.placesOccupees, 0);
  };

  return {
    methods,
    control,
    isSubmitting,
    onSubmit,
    activities,
    handleViewActivity,
    handleEditActivity,
    handleDeleteActivity,
    selectedPaymentMethods,
    handlePaymentMethodChange,
    watchTarificationMode,
    watchPricingType,
    watchNombreCategories,
    updateCategoriesArray,
    CATEGORY_COUNT_OPTIONS,
    addActivity,
    updateActivity,
    getTotalPlaces,
    getTotalPlacesOccupees,
  };
};