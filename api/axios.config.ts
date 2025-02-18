import AxiosLib, { AxiosInstance } from 'axios';

class Axios {
  instance: AxiosInstance;

  constructor() {
    const BASE_URL = process.env.HUBSPOT_BASE_URL || '';
    const API_KEY = process.env.HUBSPOT_API_KEY || '';

    if (!BASE_URL || !API_KEY) {
      console.log('Warning: Missing API base URL or API key.');
    }

    const axiosInstance = AxiosLib.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
      },
    });
    this.instance = axiosInstance;
  }
}

export const axios = new Axios().instance;

export const QUERY_KEYS = {
  CONTACTS: 'contacts',
  OWNERS: 'owners',
  OWNER: 'owner',
};
