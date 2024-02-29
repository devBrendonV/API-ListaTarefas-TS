import { createContext, useState, ReactNode } from "react";


interface FormatoLista {
    tarefa:string,
    feito:boolean
}

interface ContextProps {
  listaAtual: FormatoLista[];
  mensagem: string | undefined;
  idAtual: string;
  logado: boolean;
  setMensagem: (message: string | undefined) => void;
  setListaAtual: (list: FormatoLista[]) => void;
}

export const Context = createContext<ContextProps | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [logado, setLogado] = useState(false);
  const [listaAtual, setListaAtual] = useState<FormatoLista[]>([]);
  const [idAtual, setIdAtual] = useState("");
  const [mensagem, setMensagem] = useState<string | undefined>();

  return (
    <Context.Provider
      value={{
        listaAtual,
        mensagem,
        idAtual,
        logado,
        setMensagem,
        setListaAtual, 
      }}
    >
      {children}
    </Context.Provider>
  );
};
