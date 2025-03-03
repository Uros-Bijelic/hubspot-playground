import { updateContact } from '@/api/contacts';
import { QUERY_KEYS } from '@/api/queies-endpoints';
import { BaseUserSchema } from '@/components/features/contacts/create-update-contact-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type QueryFnArgs = {
  data: BaseUserSchema;
  id: string;
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: QueryFnArgs) => updateContact(id, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CONTACTS] });
    },
  });
};
