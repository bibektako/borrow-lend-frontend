import React, { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../auth/Authprovider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    let socket;
    if (user && user._id) {
      socket = io("http://localhost:5050");
      socket.emit("addNewUser", user._id);
      socket.on("getNotification", (data) => {
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
        
        toast.info(<span>🔔 {data.message}</span>);
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user, queryClient]);

  return (
    <SocketContext.Provider value={null}>
      {children}
    </SocketContext.Provider>
  );
};