// src/services/apiService.ts

import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
import { auth } from "./auth";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to refresh access token
const refreshAccessToken = async () => {
  try {
    let session: Session | null = null;
    if (typeof window !== "undefined") {
      session = await getSession();
    } else {
      session = await auth();
    }
    if (session && session.user.tokens.refreshToken) {
      // Make the API request with the refresh token in the headers
      const response = await api.post(
        "/auth/refresh-token",
        {}, // No need to pass a body
        {
          headers: {
            Authorization: `Bearer ${session.user.tokens.refreshToken}`,
          },
        }
      );

      const newToken = response.data.accessToken;

      // Update session with the new access token
      await signIn("credentials", {
        redirect: false,
        accessToken: newToken,
      });

      return newToken;
    }
  } catch (error) {
    console.error("Failed to refresh access token", error);
    throw error;
  }
};

// Request interceptor to add authorization token
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let session: Session | null = null;
    if (typeof window !== "undefined") {
      session = await getSession();
    } else {
      session = await auth();
    }
    if (session && session.user.tokens.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.tokens.accessToken}`;
    }

    // Automatically handle FormData content type
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh on 401 status
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      originalRequest &&
      error.response?.status === 401 &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token fails, sign the user out or redirect to login
        await signIn();
      }
    }

    return Promise.reject(error);
  }
);

// API Service with all HTTP methods
const apiService = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => api.get<T>(url, config),
  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => api.post<T>(url, data, config),
  put: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => api.put<T>(url, data, config),
  patch: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => api.patch<T>(url, data, config),
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => api.delete<T>(url, config),
};

export default apiService;
