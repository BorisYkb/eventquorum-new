import * as z from 'zod';
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
  isYoutube: z.boolean(),
  isFacebook: z.boolean(),
  lien_stream: z.string().url('Lien de stream invalide').optional(),
  diffusion_key: z.string().optional(),
});

export type ConferenceSchemaType = z.infer<typeof ConferenceSchema>;

export const useVisioConferenceController = () => {
  // Valeurs par défaut pour les champs
  const defaultValues = {
    activite: '',
    isActivedSessionVisio: false,
    intitule_conference: '',
    date_conference: today(),
    service_visio: '',
    mot_de_passe_reunion: '',
    isYoutube: false,
    isFacebook: false,
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
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // actions à effectuer avec les données du formulaire
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });

  return {
    methods,
    control,
    isSubmitting,
    onSubmit,
  };
};
