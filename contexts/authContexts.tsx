import { login, register } from "@/services/authService";
import { connectSocket, disconnectSocket } from "@/sockets/socket";
import { AuthContextProps, DecodedTokenProps, UserProps } from "@/types/types";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateToken: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const updateToken = async (token: string) => {
    if (token) {
      setToken(token);
      await SecureStore.setItemAsync("token", token);
      const decode = jwtDecode<DecodedTokenProps>(token);
      setUser(decode);
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        setIsLoading(true);
        const savedToken = await SecureStore.getItemAsync("token");
        if (savedToken) {
          if (
            jwtDecode<DecodedTokenProps>(savedToken).exp * 1000 <
            Date.now()
          ) {
            await SecureStore.deleteItemAsync("token");
            setIsLoading(false);
            router.replace("/(auth)/welcome");
            return;
          }
          setToken(savedToken);
          await connectSocket();
          const decode = jwtDecode<DecodedTokenProps>(savedToken);
          setUser(decode);
        }
      } catch (error) {
        console.error("Error loading token:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await login(email, password);
    await updateToken(response.token);
    await connectSocket();
    router.replace("/(main)/home");
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    avatar?: string
  ) => {
    const response = await register(email, password, name, avatar);
    await updateToken(response.token);
    await connectSocket();
    router.replace("/(main)/home");
  };

  const signOut = async () => {
    setToken(null);
    setUser(null);
    await SecureStore.deleteItemAsync("token");
    await disconnectSocket();
    router.replace("/(auth)/welcome");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, isLoading, signIn, signUp, signOut, updateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
