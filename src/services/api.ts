import { API_URL } from "./constants";

const headers = { "Content-Type": "application/json" };
export const fetcher = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const response: Response = await fetch(`${API_URL}/${url}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status > 499) {
      throw new Error("Server error");
    } else if (response.status > 399) {
      const { error } = await response.json();
      throw new Error(error);
    }

    throw new Error("Server unavailable");
  }

  return await response.json();
};
