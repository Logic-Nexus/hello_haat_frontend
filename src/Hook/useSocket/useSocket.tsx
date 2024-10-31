import { useContext } from "react";
import { SocketContext } from "../../Context/SocketProvider/SocketProvider";

const useSocket = () => {
  return useContext(SocketContext);
};

export default useSocket;
