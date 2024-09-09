import apiService from "@/utils/api";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiHookParams {
  key: string[];
  method: Method;
  url: string;
  scrollMethod?: "GET";
  config?: AxiosRequestConfig;
}

// Add a generic type T for the expected response type
export default function useApi<T>({ key, method, config, url }: ApiHookParams) {
  const queryClient = new QueryClient();

  switch (method) {
    case "GET":
      // eslint-disable-next-line
      const get = useQuery<T>({
        queryKey: key,
        queryFn: async () => {
          const response = await apiService.get<T>(url, config);
          return response.data; // response is now typed as T
        },
        retry: 0,
      });

      return { get };

    case "POST":
      // eslint-disable-next-line
      const post = useMutation<T, any, any>({
        mutationFn: async (obj: any) => {
          const response = await apiService.post<T>(url, obj, config);
          return response.data;
        },
        retry: 0,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: key });
        },
      });

      return { post };

    case "PUT":
      // eslint-disable-next-line
      const put = useMutation<T, any, any>({
        mutationFn: async (obj: any) => {
          const response = await apiService.put<T>(url, obj, config);
          return response.data;
        },
        retry: 0,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
      });

      return { put };

    case "PATCH":
      // eslint-disable-next-line
      const patch = useMutation<T, any, any>({
        mutationFn: async (obj: any) => {
          const response = await apiService.patch<T>(url, obj, config);
          return response.data;
        },
        retry: 0,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
      });

      return { patch };

    case "DELETE":
      // eslint-disable-next-line
      const deleteObj = useMutation<T>({
        mutationFn: async () => {
          const response = await apiService.delete<T>(url, config);
          return response.data;
        },
        retry: 0,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
      });

      return { deleteObj };

    default:
      throw new Error(`Invalid method ${method}`);
  }
}
