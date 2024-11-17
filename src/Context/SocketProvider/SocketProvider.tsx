import React, { useEffect, useState, useMemo } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKETURL } from "../../Base";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { decryptData } from "../../constant/encrytion";

interface ConnectedUser {
  userUniqueId: string;
  // Additional properties if needed
}

interface SocketContextType {
  liveConnectedUsers: ConnectedUser[];
  socket: Socket | null;
  productPurchaseLiveResponse: any;
}

export const SocketContext = React.createContext<SocketContextType | null>(
  null
);

const getToken = () => {
  try {
    const userData = decryptData("userData") || null;
    return userData?.accessToken || null;
  } catch {
    return null;
  }
};

// console.log(token);
let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State to store connected users
  const [liveConnectedUsers, setLiveConnectedUsers] = useState<ConnectedUser[]>(
    []
  );

  const [productPurchaseLiveResponse, setProductPurchaseLiveResponse] =
    useState<any>({});

  //get token from local storage
  const token = getToken();

  // socket connection
  socket = useMemo(() => {
    return io(SOCKETURL, {
      withCredentials: true,
      // extraHeaders: { Authorization: token }, will not work in transport websocket
      transports: ["websocket"], // Enforce WebSocket-only transport
      query: { token },
    });
  }, [token]);

  // initial connection
  useEffect(() => {
    if (!socket || !token) return;

    socket?.connect();

    socket?.on("connect", () => {
      if (socket) {
        console.log("Socket connected:", socket.id);
      }
    });

    socket?.on("users-activity", (data: ConnectedUser[]) => {
      const uniqueUsers = data.filter(
        (user, index, self) =>
          index === self.findIndex((u) => u.userUniqueId === user.userUniqueId)
      );
      setLiveConnectedUsers((prevUsers) =>
        JSON.stringify(prevUsers) !== JSON.stringify(uniqueUsers)
          ? uniqueUsers
          : prevUsers
      );
    });

    socket.on("productPurchaseLiveResponse", (data) => {
      console.log("productPurchaseLiveResponse", data);
      setProductPurchaseLiveResponse(data);
    });

    return () => {
      socket?.off("connect");
      socket?.off("users-activity");
      socket?.disconnect();
    };
  }, [token]); // Re-run only if token changes

  // set context value to provide to children components
  const contextValue = useMemo(
    () => ({ liveConnectedUsers, socket, productPurchaseLiveResponse }),
    [liveConnectedUsers, productPurchaseLiveResponse]
  );

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
