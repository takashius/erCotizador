import { useMutation, useQuery } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";
import { Cotiza, CotizaForm } from "../types/cotiza";
import { write } from "../components";

export const useListCotiza = () => {
  const query = useQuery<Cotiza[]>({
    queryKey: ["cotizaList"],
    retry: false,
    queryFn: () => {
      return ERDEAxios.get("/cotiza");
    },
  });
  return query;
};

export const useCreateCotiza = () => {
  const mutation = useMutation({
    mutationFn: (data: CotizaForm) => {
      return ERDEAxios.post("/cotiza", data);
    },
    onSuccess: () => {
      write("mutateCotiza", 'true').then((res) => res);
    },
  });

  return mutation;
};

export const useUpdateCotiza = () => {
  const mutation = useMutation({
    mutationFn: (data: CotizaForm) => {
      return ERDEAxios.patch("/cotiza", data);
    },
    onSuccess: () => {
      write("mutateCotiza", 'true').then((res) => res);
    },
  });

  return mutation;
};

export const useDeleteCotiza = () => {
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return ERDEAxios.delete(`/cotiza/${id}`);
    },
  });

  return mutation;
};
