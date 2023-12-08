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

export const useCreateProduct = () => {
  const mutation = useMutation({
    mutationFn: (data: ProductForm) => {
      return ERDEAxios.post("/product", data);
    },
  });

  return mutation;
};

export const useUpdateProduct = () => {
  const mutation = useMutation({
    mutationFn: (data: ProductForm) => {
      return ERDEAxios.patch("/product", data);
    },
  });

  return mutation;
};
