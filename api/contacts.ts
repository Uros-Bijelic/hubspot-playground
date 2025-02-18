import { axios } from './axios.config';

type GetContactsArgs = {
  limit?: number;
  archived?: boolean;
};

export const getContacts = async ({ limit = 30, archived = false }: GetContactsArgs) => {
  try {
    const response = await axios.get(`/api/contacts`, {
      params: {
        limit,
        archived,
      },
    });

    return response.data;
  } catch (error) {
    console.log('Error getting contacts', error);
    if (error instanceof Error) {
      console.log('Error getting contacts', error.message);

      throw new Error(error.message);
    }
  }
};
