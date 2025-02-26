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

interface IFetchRequest {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
  headers?: HeadersInit;
  body?: object;
  cache?: RequestCache;
}

export const typedFetch = async <T extends object>({
  url,
  method,
  headers,
  body,
  cache,
}: IFetchRequest): Promise<T> => {
  const BASE_API_URL = process.env.HUBSPOT_BASE_URL;
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
    cache,
  });

  if (!response.ok) throw new Error('Fetch failed for URL:' + BASE_API_URL + url);

  return (await response.json()) as T;
};
