import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { browser } from "$app/environment";

const client: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    if (browser) {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response) {
      console.error(
        `HTTP Error: ${error.response.status} - ${error.response.data}`,
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Axios error:", error.message);
    }
    return Promise.reject(error);
  },
);

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await client.get<T>(url, config);
  return response.data;
};

export const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await client.post<T>(url, data, config);
  return response.data;
};

export const put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await client.put<T>(url, data, config);
  return response.data;
};

export const remove = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await client.delete<T>(url, config);
  return response.data;
};

export const uploadFile = async <T>(
  url: string,
  file: File,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await client.post<T>(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...(config?.headers || {}),
    },
    ...config,
  });

  return response.data;
};

export default client;
