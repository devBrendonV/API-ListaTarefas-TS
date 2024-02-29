import { createContext, useState, ReactNode } from "react";
import axios from "axios";
import { toast } from "react-toastify";


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
  deslogar: () => void;
  puxarDados: (recebido: string) => void;
  criar: () => void;
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

  function deslogar() {
    setLogado(false);
    setListaAtual([]);
    setIdAtual("");
  }

  const puxarDados = async (recebido: string) => {
    try {
      const respo = await axios.get(`${URL}/lista/${recebido}`);
      setIdAtual(respo.data.id);
      setListaAtual(respo.data.lista);
      setLogado(true);
    } catch (e) {
      if ((e as TypeError).message.includes("404")) {
        toast.error("ID não encontrado");
      } else {
        toast.error("Falha ao processar informação");
      }
    }
  };

  const criar = async () => {
    try {
      const respo = await axios.post(`${URL}/lista`, { lista: [] });
      setIdAtual(respo.data.id);
      setListaAtual(respo.data.lista);
      toast.success(`Seu novo ID: ${respo.data.id}`);
      setLogado(true);
    } catch (error) {
      toast.error("Falha ao processar informação");
    }
  };

  return (
    <Context.Provider
      value={{
        listaAtual,
        mensagem,
        idAtual,
        logado,
        setMensagem,
        setListaAtual,
        deslogar,
        puxarDados,
        criar 
      }}
    >
      {children}
    </Context.Provider>
  );
};
