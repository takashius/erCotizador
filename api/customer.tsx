import { useQuery } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";
import { Customer } from "../types/customer";

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
