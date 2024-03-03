import { useMutation, useQuery } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";
import { Company, Image } from "../types/company";
import { parseImage } from "../components/helpers/ParseImage";
import { write } from "../components";

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

export const useUploadImage: any = () => {
  const mutation = useMutation({
    mutationFn: (data: Image) => {
      write("contentType", 'true').then((res) => res);
      var formData = new FormData();
      formData.append("image", parseImage(data.image));
      formData.append("imageType", data.imageType);
      return ERDEAxios.post("/company/upload", formData);
    },
    onSuccess: () => {
      write("contentType", 'false').then((res) => res);
    },
  });

  return mutation;
};