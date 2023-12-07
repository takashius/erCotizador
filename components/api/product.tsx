import { useQuery, useMutation } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";
import { Product, ProductForm } from "../types/products";

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

export const useCreateProduct = (data: ProductForm) => {
  const mutation = useMutation({
    mutationFn: (data: ProductForm) => {
      return ERDEAxios.post("/product", data);
    },
  });
  return mutation.mutate(data);
};
