import { useMutation, useQuery } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";
import { Address, Customer } from "../types/customer";

export const useListCustomer = () => {
  const query = useQuery<Customer[]>({
    queryKey: ["customerList"],
    retry: false,
    queryFn: () => {
      return ERDEAxios.get("/customer");
    },
  });
  return query;
};

export const useGetCustomer = (id: string | string[]) => {
  const query = useQuery<Customer>({
    queryKey: ["customerDetail"],
    retry: false,
    queryFn: () => {
      return ERDEAxios.get("/customer/" + id);
    },
  });
  return query;
};

export const useCreateAddress = () => {
  const mutation = useMutation({
    mutationFn: (data: Address) => {
      return ERDEAxios.post("/customer/address", data);
    },
  });

  return mutation;
};

export const useUpdateAddress = () => {
  const mutation = useMutation({
    mutationFn: (data: Address) => {
      return ERDEAxios.patch("/customer/address", data);
    },
  });

  return mutation;
};

export const useDeleteAddress = () => {
  const mutation = useMutation({
    mutationFn: (data: any) => {
      console.log("useDeleteAddress", data);
      return ERDEAxios.delete("/customer/address", { data });
    },
  });

  return mutation;
};
