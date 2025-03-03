import { createContact } from '@/api/contacts';
import { QUERY_KEYS } from '@/api/queies-endpoints';
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
