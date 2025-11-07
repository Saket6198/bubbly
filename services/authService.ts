import { baseUrl } from "@/constants";
import axios from "axios";
export const login = async (
  email: string,
  password: string
): Promise<{ token: string }> => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (err: any) {
    console.log("Login error:", err);
    return Promise.reject(err);
  }
};

export const register = async (
  email: string,
  password: string,
  name: string,
  avatar?: string
): Promise<{ token: string }> => {
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, {
      email,
      password,
      name,
      avatar,
    });
    return response.data;
  } catch (err: any) {
    console.log("Register error:", err);
    throw new Error(err);
  }
};
