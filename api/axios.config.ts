import AxiosLib, { AxiosInstance } from 'axios';

class Axios {
  instance: AxiosInstance;

  constructor() {
    const BASE_URL = process.env.HUBSPOT_BASE_URL || '';

    if (!BASE_URL) {
      console.log('Warning: Missing API base URL');
    }

    const axiosInstance = AxiosLib.create({
      baseURL: BASE_URL,
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
