export const getOwners = async () => {
  try {
    const BASE_URL = process.env.APP_BASE_URL || '';
    const response = await fetch(`${BASE_URL}/api/owners/`);
    return response.json();
  } catch (error) {
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
    const BASE_URL = process.env.APP_BASE_URL || '';
    const response = await fetch(`${BASE_URL}/api/owners/${ownerId}`);
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
