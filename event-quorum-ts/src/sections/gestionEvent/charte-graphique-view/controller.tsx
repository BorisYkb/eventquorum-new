import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { schemaHelper } from 'src/components/hook-form';

import { getErrorMessage } from 'src/auth/utils';

export type CharteGraphiqueSchemaType = zod.infer<typeof CharteGraphiqueSchema>;

export const CharteGraphiqueSchema = zod.object({
  logo_event: schemaHelper.file({ message: "L'image est requise !" }),
  logo_partenaire: schemaHelper.file({ message: "L'image est requise !" }),
  slides: schemaHelper.files({ message: 'Images is required!' }),
  taille_logo_event_login: zod.coerce
    .number()
    .positive({ message: 'Logo event login size must be a positive number!' }),
  taille_logo_event_navbar: zod.coerce
    .number()
    .positive({ message: 'Logo event navbar size must be a positive number!' }),
  taille_logo_event_pdf: zod.coerce
    .number()
    .positive({ message: 'Logo event PDF size must be a positive number!' }),
  taille_logo_event_partenaire: zod.coerce
    .number()
    .positive({ message: 'Logo event partner size must be a positive number!' }),
  couleur_navbar: zod.string().min(1, { message: 'Navbar color is required!' }),
  couleur_texte: zod.string().min(1, { message: 'Text color is required!' }),
  ui_style: zod.string().min(1, { message: 'UI style is required!' }),
  background_color_navbar: zod.string().min(1, { message: 'Navbar background color is required!' }),
  color_boutons: zod.string().min(1, { message: 'Button color is required!' }),
  color_icons: zod.string().min(1, { message: 'Icon color is required!' }),
  model_landing_page: schemaHelper.file({ message: "L'image est requise !" }),
  primary_color_landing_page: zod
    .string()
    .min(1, { message: 'Primary color of the landing page is required!' }),
  secondary_color_landing_page: zod
    .string()
    .min(1, { message: 'Secondary color of the landing page is required!' }),
});

export const useCharteGraphiqueView = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const defaultValues: CharteGraphiqueSchemaType = {
    logo_event: '',
    logo_partenaire: '',
    slides: [''],
    taille_logo_event_login: 0,
    taille_logo_event_navbar: 0,
    taille_logo_event_pdf: 0,
    taille_logo_event_partenaire: 0,
    couleur_navbar: '',
    couleur_texte: '',
    ui_style: '',
    background_color_navbar: '',
    color_boutons: '',
    color_icons: '',
    model_landing_page: '',
    primary_color_landing_page: '',
    secondary_color_landing_page: '',
  };

  const methods = useForm<CharteGraphiqueSchemaType>({
    resolver: zodResolver(CharteGraphiqueSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered = values.slides && values.slides?.filter((file) => file !== inputFile);
      setValue('slides', filtered);
    },
    [setValue, values.slides]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('slides', [], { shouldValidate: true });
  }, [setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // actions
      console.log(data);

      router.refresh();
    } catch (error) {
      console.error(error);
      const feedbackMessage = getErrorMessage(error);
      setErrorMessage(feedbackMessage);
    }
  });

  return {
    errorMessage,
    isSubmitting,
    methods,
    control,
    handleRemoveAllFiles,
    handleRemoveFile,
    onSubmit,
  };
};
