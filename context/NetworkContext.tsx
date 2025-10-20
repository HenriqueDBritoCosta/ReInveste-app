// app/context/NetworkContext.tsx
import NetInfo from "@react-native-community/netinfo";
import React, { createContext, useContext, useEffect, useState } from "react";

type NetworkContextType = { online: boolean };

const NetworkContext = createContext<NetworkContextType>({ online: true });

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const sub = NetInfo.addEventListener(state => {
      setOnline(!!state.isConnected && !!state.isInternetReachable);
    });

    // fetch initial state
    NetInfo.fetch().then(state => setOnline(!!state.isConnected && !!state.isInternetReachable));

    return () => sub();
  }, []);

  return <NetworkContext.Provider value={{ online }}>{children}</NetworkContext.Provider>;
};

export const useNetwork = () => useContext(NetworkContext);
