import { BaseUserSchema } from '@/components/features/contacts/create-update-contact-form';

export const getContacts = async (limit = 8, after = '', archived = false) => {
  try {
    const BASE_URL = process.env.APP_BASE_URL || '';
    const response = await fetch(
      `${BASE_URL}/api/contacts?limit=${limit}&archived=${archived}&after=${after}`,
    );

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error getting contacts', error.message);

      throw new Error(error.message);
    }
  }
};

export const deleteContact = async (id: string) => {
  try {
    const BASE_URL = process.env.APP_BASE_URL || '';
    const response = await fetch(`${BASE_URL}/api/contacts/${id}`, {
      method: 'DELETE',
    });

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error deleting contact', error.message);
    }
  }
};

export const createContact = async (data: BaseUserSchema) => {
  try {
    const BASE_URL = process.env.APP_BASE_URL || '';
    const response = await fetch(`${BASE_URL}/api/contacts`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error deleting contact', error.message);
    }
  }
};

export const updateContact = async (id: string, data: BaseUserSchema) => {
  try {
    const BASE_URL = process.env.APP_BASE_URL || '';
    const response = await fetch(`${BASE_URL}/api/contacts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error deleting contact', error.message);
    }
  }
};
