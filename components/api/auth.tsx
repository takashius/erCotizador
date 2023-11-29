import { useQuery } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";

export const useLogin = (email: String, password: String) => {
  const query = useQuery({
    queryKey: ["login"],
    queryFn: () => {
      return ERDEAxios.post("/user/login", JSON.stringify({ email, password }));
    },
  });
  return query;
};
