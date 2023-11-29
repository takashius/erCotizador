import { useQuery } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";

export interface UserLogin {
  name: string;
  lastname: string;
  email: string;
  token: string;
  _id: string;
}

export const useLogin = (email: String, password: String) => {
  const query = useQuery({
    queryKey: ["login"],
    enabled: false,
    retry: false,
    queryFn: () => {
      return ERDEAxios.post("/user/login", JSON.stringify({ email, password }));
    },
  });
  return query;
};
