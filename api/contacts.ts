import { axios } from './axios.config';

export const getContacts = async (limit = 8, urlToFetch = '', archived = false) => {
  try {
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

export const deleteContact = async (id: string) => {
  try {
    const response = await axios.delete(`/api/contact/${id}`);

    console.log('response u delete contact function', response);
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error deleting contact', error.message);
    }
  }
};
