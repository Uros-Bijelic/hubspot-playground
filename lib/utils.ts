import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateInitials = (firstName = '', lastName = '') => {
  if (!firstName && !lastName) return 'N/A';
  return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
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
