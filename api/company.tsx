import { useMutation, useQuery } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";
import { write } from "../components";
import { Company } from "../types/company";

export const useGetCompany = () => {
  const query = useQuery<Company>({
    queryKey: ["myCompany"],
    retry: false,
    queryFn: () => {
      return ERDEAxios.get("/company/myCompany");
    },
  });
  return query;
};

export const useSetConfig = () => {
  const mutation = useMutation({
    mutationFn: (data: Company) => {
      return ERDEAxios.patch("/company/config", data);
    }
  });

  return mutation;
};