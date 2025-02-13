import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// type TypedFetch = {
//   url: string;
//   method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
//   headers?: { [key: string]: string };
//   body?: object;
//   cache?: RequestCache;
// };

// export const typedFetch = async <T extends object>({
//   url,
//   method,
//   headers,
//   body,
// }: TypedFetch): Promise<T> => {
//   const response = await fetch(url, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUBSPOT_API_KEY}`,
//       ...headers,
//     },
//     body: JSON.stringify(body),
//   });

//   return (await response.json()) as T;
// };
