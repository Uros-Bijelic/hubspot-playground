import { axios } from '.';

export const getOwners = async () => {
  try {
    const response = await axios.get(`/api/owners`);
    return response.data;
  } catch (error) {
    console.log('Error getting owners', error);
    if (error instanceof Error) {
      console.log('Error getting owners', error.message);

      throw new Error(error.message);
    }
  }
};
