import { API_URL } from "./constants";

export const fetcher = async <T>(url: string, options: RequestInit): Promise<T> => {
  const response: Response = await fetch(`${API_URL}/${url}`, options);

  if (!response.ok) {
    throw new Error("Server unavailable");
  }

  if (response.ok && response.status > 499) {
    throw new Error("Server error");
  }

  return await response.json();
};
