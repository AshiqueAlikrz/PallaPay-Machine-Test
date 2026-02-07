import api from "@/app/lib/axiosInstance";

interface LoginData {
  email: string;
  password: string;
}

interface RegistrationData extends LoginData {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export default function useAction() {
  const login = async (value: LoginData) => {
    const res = await api.get("https://jnn-pa.googleapis.com/$rpc/google.internal.waa.v1.Waa/GenerateI", value);
    return res;
  };

  const signUp = async (value: RegistrationData) => {
    const res = await api.get("https://jnn-pa.googleapis.com/$rpc/google.internal.waa.v1.Waa/GenerateI", value);
    return res;
  };

  return {
    login,
    signUp,
  };
}
