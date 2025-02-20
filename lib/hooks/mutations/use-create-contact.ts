import { createContact } from '@/api/contacts';
import { useMutation } from '@tanstack/react-query';

export const useCreateContact = () => {
  return useMutation({ mutationFn: createContact });
};
