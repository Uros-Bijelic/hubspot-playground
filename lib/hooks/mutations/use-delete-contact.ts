import { deleteContact } from '@/api/contacts';
import { QUERY_KEYS } from '@/api/queies-endpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteContact(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CONTACTS] });
    },
  });
};
