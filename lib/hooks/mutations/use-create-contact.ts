import { QUERY_KEYS } from '@/api/axios.config';
import { createContact } from '@/api/contacts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createContact,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CONTACTS] });
    },
  });
};
