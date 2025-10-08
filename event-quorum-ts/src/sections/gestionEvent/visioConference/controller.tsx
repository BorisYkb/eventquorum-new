import * as z from 'zod';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { today } from 'src/utils/format-time';

import { schemaHelper } from 'src/components/hook-form';

/**
 * Schéma de validation pour la configuration des conférences
 * Inclut les champs pour la visioconférence et la retransmission
 */
const ConferenceSchema = z.object({
  // Activité associée à la conférence
  activite: z.string().min(1, 'Veuillez sélectionner une activité.'),

  // Session de visioconférence
  isActivedSessionVisio: z.boolean(),
  intitule_conference: z.string().min(1, "L'intitulé de la conférence est obligatoire."),
  date_conference: schemaHelper.date({
    message: { required: 'La date de conférence est requise!' },
  }),
  service_visio: z.string().min(1, 'Veuillez sélectionner un service de visioconférence.'),
  mot_de_passe_reunion: z.string().optional(),

  // Accès participants - maintenant un boolean
  autoriser_acces_participants: z.boolean(),

  // Retransmission - maintenant un boolean
  autoriser_retransmission: z.boolean(),

  // Plateformes de retransmission
  isYoutube: z.boolean(),
  isFacebook: z.boolean(),
  isTiktok: z.boolean(),

  // Informations de streaming
  lien_stream: z.string().optional(),
  diffusion_key: z.string().optional(),
}).refine(
  (data) => {
    // Si retransmission activée et au moins une plateforme cochée, le lien est requis
    if (data.autoriser_retransmission &&
      (data.isYoutube || data.isFacebook || data.isTiktok)) {
      return data.lien_stream && data.lien_stream.length > 0;
    }
    return true;
  },
  {
    message: 'Le lien de stream est requis lorsque la retransmission est activée',
    path: ['lien_stream'],
  }
);

export type ConferenceSchemaType = z.infer<typeof ConferenceSchema>;

/**
 * Hook personnalisé pour gérer la logique de la visioconférence
 * Gère les états, la validation et les opérations CRUD des conférences
 */
export const useVisioConferenceController = () => {
  // État pour stocker la liste des conférences
  const [conferences, setConferences] = useState<ConferenceSchemaType[]>([]);

  // Index de la conférence en cours d'édition (null si création)
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Valeurs par défaut pour le formulaire
  const defaultValues: ConferenceSchemaType = {
    activite: '',
    isActivedSessionVisio: false,
    intitule_conference: '',
    date_conference: today(),
    service_visio: '',
    mot_de_passe_reunion: '',
    autoriser_acces_participants: false,
    autoriser_retransmission: false,
    isYoutube: false,
    isFacebook: false,
    isTiktok: false,
    lien_stream: '',
    diffusion_key: '',
  };

  // Configuration du formulaire avec react-hook-form et validation zod
  const methods = useForm<ConferenceSchemaType>({
    resolver: zodResolver(ConferenceSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  // Surveillance des valeurs du formulaire pour gérer les états disabled
  const watchRetransmission = watch('autoriser_retransmission');
  const watchAccesParticipants = watch('autoriser_acces_participants');
  const watchSessionVisioActive = watch('isActivedSessionVisio');

  // Effet pour désactiver la retransmission quand l'accès participants est activé
  useEffect(() => {
    if (watchAccesParticipants) {
      setValue('autoriser_retransmission', false);
    }
  }, [watchAccesParticipants, setValue]);

  /**
   * Gestionnaire de soumission du formulaire
   * Ajoute ou met à jour une conférence selon le mode
   */
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('Données soumises:', data);

      if (editingIndex !== null) {
        // Mode édition : mettre à jour la conférence existante
        const updatedConferences = [...conferences];
        updatedConferences[editingIndex] = data;
        setConferences(updatedConferences);
        setEditingIndex(null);
      } else {
        // Mode création : ajouter une nouvelle conférence
        setConferences([...conferences, data]);
      }

      // Réinitialiser le formulaire après soumission
      reset(defaultValues);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    }
  });

  /**
   * Supprime une conférence de la liste
   * @param index - Index de la conférence à supprimer
   */
  const handleDelete = (index: number) => {
    const updatedConferences = conferences.filter((_, i) => i !== index);
    setConferences(updatedConferences);

    // Si on supprime l'élément en cours d'édition, réinitialiser
    if (editingIndex === index) {
      setEditingIndex(null);
      reset(defaultValues);
    }
  };

  /**
   * Charge une conférence pour édition
   * @param index - Index de la conférence à éditer
   */
  const handleEdit = (index: number) => {
    const conferenceToEdit = conferences[index];
    setEditingIndex(index);
    reset(conferenceToEdit);

    // Scroll vers le formulaire pour une meilleure UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    methods,
    control,
    isSubmitting,
    onSubmit,
    watchRetransmission,
    watchAccesParticipants,
    watchSessionVisioActive,
    conferences,
    handleDelete,
    handleEdit,
    editingIndex,
  };
};