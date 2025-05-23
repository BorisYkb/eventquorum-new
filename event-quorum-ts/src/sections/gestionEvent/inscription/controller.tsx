import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const InscriptionSchema = z.object({
  nom: z.boolean(),
  prenom: z.boolean(),
  email: z.boolean(),
  numeroTelephone: z.boolean(),
  adresse: z.boolean(),
  paiementEnLigne: z.boolean(),
  selectionnerActivites: z.boolean(),
});

const GenerateQrCodeSchema = z.object({
  isCodeQrGenerated: z.boolean(),
});

export type InscriptionSchemaType = z.infer<typeof InscriptionSchema>;
export type GenerateQrCodeSchemaType = z.infer<typeof GenerateQrCodeSchema>;

export const useInscription = () => {
  const defaultValues = {
    nom: false,
    prenom: false,
    email: false,
    numeroTelephone: false,
    adresse: false,
    paiementEnLigne: false,
    selectionnerActivites: false,
    isCodeQrGenerated: false,
  };

  const defaultValuesQrCode = {
    isCodeQrGenerated: false,
  };

  const methods = useForm<InscriptionSchemaType>({
    resolver: zodResolver(InscriptionSchema),
    defaultValues,
  });

  const methodsQrCode = useForm<GenerateQrCodeSchemaType>({
    resolver: zodResolver(GenerateQrCodeSchema),
    defaultValues: defaultValuesQrCode,
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const {
    handleSubmit: handleSubmitQrCode,
    control: controlQrCode,
    formState: { isSubmitting: isSubmittingQrCode },
  } = methodsQrCode;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // actions
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });

  const onSubmitQrCode = handleSubmitQrCode(async (data) => {
    try {
      // actions
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });

  return {
    methods,
    control,
    isSubmitting,
    methodsQrCode,
    controlQrCode,
    isSubmittingQrCode,
    onSubmit,
    onSubmitQrCode,
  };
};
