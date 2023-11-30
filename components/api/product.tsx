import { useQuery } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";
import { Product } from "../types/products";

export const useListProduct = () => {
  const query = useQuery<Product[]>({
    queryKey: ["productList"],
    retry: false,
    queryFn: () => {
      return ERDEAxios.get("/product");
    },
  });
  return query;
};
