import { axios } from './axios.config';

export const getContacts = async (limit = 8, urlToFetch = '', archived = false) => {
  try {
    console.log('urlToFetch GET CONTACTS', urlToFetch);

    const response = await axios.get(`/api/contacts`, {
      params: {
        limit,
        urlToFetch,
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
