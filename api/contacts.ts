import { axios } from './axios.config';

export const getContacts = async (limit = 10, archived = false) => {
  try {
    const response = await axios.get(`/api/contacts`, {
      params: {
        limit,
        archived,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error getting contacts', error.message);

      throw new Error(error.message);
    }
  }
};
