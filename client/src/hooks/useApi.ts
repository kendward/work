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

export default function useApi({ key, method, config, url }: ApiHookParams) {
  const queryClient = new QueryClient();
  switch (method) {
    case "GET":
      // eslint-disable-next-line
      const get = useQuery({
        queryKey: key,
        queryFn: () =>
          (async () =>
            await apiService.get(url, config).then((res) => res.data))(),
        retry: 0,
      });

      return { get };

    case "POST":
      // eslint-disable-next-line
      const post = useMutation({
        mutationFn: (obj: any) =>
          (async () =>
            await apiService.post(url, obj, config).then((res) => res.data))(),
        retry: 0,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: key });
        },
      });
      return { post };

    case "PUT":
      // eslint-disable-next-line
      const put = useMutation({
        mutationFn: (obj: any) =>
          (async () =>
            await apiService.put(url, obj, config).then((res) => res.data))(),
        retry: 0,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
      });

      return { put };

    case "PATCH":
      // eslint-disable-next-line
      const patch = useMutation({
        mutationFn: (obj: any) =>
          (async () =>
            await apiService.patch(url, obj, config).then((res) => res.data))(),
        retry: 0,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
      });

      return { patch };

    case "DELETE":
      // eslint-disable-next-line
      const deleteObj = useMutation({
        mutationFn: () =>
          (async () =>
            await apiService.delete(url, config).then((res) => res.data))(),
        retry: 0,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
      });
      return { deleteObj };
    default:
      throw new Error(`Invalid method ${method}`);
  }
}
