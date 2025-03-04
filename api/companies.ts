export const getCompanies = async () => {
  try {
    const BASE_URL = process.env.APP_BASE_URL || '';
    const response = await fetch(`${BASE_URL}/api/companies`);
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
