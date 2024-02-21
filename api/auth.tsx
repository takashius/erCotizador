import { Register, useMutation, useQuery } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";

export interface UserLogin {
  name: string;
  lastname: string;
  email: string;
  token: string;
  _id: string;
}

export const useLogin = (email: String, password: String) => {
  const query = useQuery<UserLogin>({
    queryKey: ["login"],
    enabled: false,
    retry: false,
    queryFn: () => {
      return ERDEAxios.post("/user/login", JSON.stringify({ email, password }));
    },
  });
  return query;
};

export const useLogout = () => {
  const query = useQuery({
    queryKey: ["logout"],
    queryFn: () => {
      return ERDEAxios.post("/user/logout");
    },
  });
  return query;
};

export const useRegister = () => {
  const mutation = useMutation({
    mutationFn: (data: Register) => {
      return ERDEAxios.post("/user/register", data);
    }
  });

  return mutation;
};
