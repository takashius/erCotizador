import { useQuery } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";
import { Cotiza } from "../types/cotiza";

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
