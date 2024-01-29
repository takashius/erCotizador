import { useMutation, useQuery } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";
import { Address, Customer, CustomerForm } from "../types/customer";
import { write } from "../components/helpers/LocalStorage";

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

export const useCreateCustomer = () => {
  const mutation = useMutation({
    mutationFn: (data: CustomerForm) => {
      return ERDEAxios.post("/customer", data);
    },
    onSuccess: () => {
      write("mutateCustomer", 'true').then((res) => res);
    },
  });

  return mutation;
};

export const useUpdateCustomer = () => {
  const mutation = useMutation({
    mutationFn: (data: CustomerForm) => {
      return ERDEAxios.patch("/customer", data);
    },
  });

  return mutation;
};

export const useDeleteCustomer = () => {
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return ERDEAxios.delete(`/customer/${id}`);
    },
  });

  return mutation;
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
      return ERDEAxios.delete("/customer/address", { data });
    },
  });

  return mutation;
};
