import { baseUrl } from "@/constants";
import * as SecureStore from "expo-secure-store";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null; // this is to ensure singleton pattern

export const connectSocket = async (): Promise<Socket> => {
  const token = await SecureStore.getItemAsync("token");
  console.log("Retrieved token for socket connection:", token);
  if (!token) {
    throw new Error("No auth token found. User must login first.");
  }
  if (!socket) {
    socket = io(baseUrl, {
      auth: {
        token,
      },
    });
    await new Promise((resolve) => {
      socket?.on("connect", () => {
        console.log("Socket connected", socket?.id);
        resolve(true);
      });
    });
  }

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Socket disconnected manually");
  }
};
