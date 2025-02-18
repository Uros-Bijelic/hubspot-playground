import { axios } from './axios.config';

export const getOwners = async () => {
  try {
    const response = await axios.get(`/api/owners/`);
    return response.data;
  } catch (error) {
    console.log('Error getting owners', error);
    if (error instanceof Error) {
      console.log('Error getting owners', error.message);

      throw new Error(error.message);
    }
  }
};

type GetSpecificOwnerArgs = {
  ownerId: string;
  archived?: boolean;
};

export const getSpecificOwner = async ({ ownerId }: GetSpecificOwnerArgs) => {
  try {
    const response = await axios.get(`/api/owners/${ownerId}`);
    return response.data;
  } catch (error) {
    console.log('Error getting specific owner', error);
    if (error instanceof Error) {
      console.log('Error getting specific owner', error.message);

      throw new Error(error.message);
    }
  }
};
