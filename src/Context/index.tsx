import { createContext, ReactNode } from "react";

interface ContextProps {}

export const Context = createContext<ContextProps | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};
