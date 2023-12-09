import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";
import { Product, ProductForm } from "../types/products";
const queryClient = new QueryClient();

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

export const useDeleteProduct = () => {
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return ERDEAxios.delete(`/product/${id}`);
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["productList"], type: "all" });
    },
  });

  return mutation;
};
