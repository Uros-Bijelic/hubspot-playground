import { BaseUserSchema } from '@/components/features/contacts/create-update-contact-form';
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
    const response = await axios.delete(`/api/contacts/${id}`);

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error deleting contact', error.message);
    }
  }
};

export const createContact = async (data: BaseUserSchema) => {
  try {
    const response = await axios.post('/api/contacts', data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error deleting contact', error.message);
    }
  }
};

export const updateContact = async (id: string, data: BaseUserSchema) => {
  try {
    const response = await axios.patch(`/api/contacts/${id}`, data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error deleting contact', error.message);
    }
  }
};
