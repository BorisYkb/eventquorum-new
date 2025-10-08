import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { today } from 'src/utils/format-time';

import { schemaHelper } from 'src/components/hook-form';

// Schéma de validation pour les nouveaux champs
const ConferenceSchema = z.object({
  activite: z.string().min(1, 'Veuillez sélectionner une activité.'),
  isActivedSessionVisio: z.boolean(),
  intitule_conference: z.string().min(1, "L'intitulé de la conférence est obligatoire."),
  date_conference: schemaHelper.date({
    message: { required: 'La date de conférence est requise!' },
  }),
  service_visio: z.string().min(1, 'Veuillez sélectionner un service de visioconférence.'),
  mot_de_passe_reunion: z.string().optional(),
  autoriser_acces_participants: z.enum(['oui', 'non']),
  autoriser_retransmission: z.enum(['oui', 'non']),
  isYoutube: z.boolean(),
  isFacebook: z.boolean(),
  isTiktok: z.boolean(),
  lien_stream: z.string().optional(),
  diffusion_key: z.string().optional(),
}).refine(
  (data) => {
    // Si retransmission activée et au moins une plateforme cochée, le lien est requis
    if (data.autoriser_retransmission === 'oui' && 
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

export const useVisioConferenceController = () => {
  const [conferences, setConferences] = useState<ConferenceSchemaType[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Valeurs par défaut pour les champs
  const defaultValues: ConferenceSchemaType = {
    activite: '',
    isActivedSessionVisio: false,
    intitule_conference: '',
    date_conference: today(),
    service_visio: '',
    mot_de_passe_reunion: '',
    autoriser_acces_participants: 'non',
    autoriser_retransmission: 'non',
    isYoutube: false,
    isFacebook: false,
    isTiktok: false,
    lien_stream: '',
    diffusion_key: '',
  };

  const methods = useForm<ConferenceSchemaType>({
    resolver: zodResolver(ConferenceSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting },
  } = methods;

  // Surveiller la valeur du champ retransmission
  const watchRetransmission = watch('autoriser_retransmission');

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

  const handleDelete = (index: number) => {
    const updatedConferences = conferences.filter((_, i) => i !== index);
    setConferences(updatedConferences);
    
    // Si on supprime l'élément en cours d'édition, réinitialiser
    if (editingIndex === index) {
      setEditingIndex(null);
      reset(defaultValues);
    }
  };

  const handleEdit = (index: number) => {
    const conferenceToEdit = conferences[index];
    setEditingIndex(index);
    reset(conferenceToEdit);
    
    // Scroll vers le formulaire
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    methods,
    control,
    isSubmitting,
    onSubmit,
    watchRetransmission,
    conferences,
    handleDelete,
    handleEdit,
    editingIndex,
  };
};