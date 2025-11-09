import { getSocket } from "./socket";

export const updateProfile = (payload: any, off: boolean = false) => {
  const socket = getSocket();
  if (!socket) {
    console.log("Socket not connected. Cannot emit updateProfile event.");
    return;
  }

  if (off) {
    socket.off("updatedProfile", payload);
  } else if (typeof payload === "function") {
    socket.on("updatedProfile", payload);
  } else {
    socket.emit("updateProfile", payload);
  }
};
