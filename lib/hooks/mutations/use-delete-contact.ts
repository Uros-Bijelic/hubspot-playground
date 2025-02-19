import { QUERY_KEYS } from '@/api/axios.config';
import { deleteContact } from '@/api/contacts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContact,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CONTACTS] });
    },
  });
};
