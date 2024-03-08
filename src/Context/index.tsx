import { createContext, useState, ReactNode } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { FormatoLista } from "../types/FormatoLista";

const URL = "http://localhost:3000";

interface ContextProps {
  listaAtual: FormatoLista[];
  idAtual: string;
  logado: boolean;
  deslogar: () => void;
  puxarDados: (recebido: string) => void;
  criar: () => void;
  salvar: (recebido: FormatoLista[]) => void;
  apagar: (recebido: string) => void;
}

export const Context = createContext<ContextProps>({
  listaAtual: [],
  idAtual: "",
  logado: false,
  deslogar: () => {},
  puxarDados: () => {},
  criar: () => {},
  salvar: () => {},
  apagar: () => {},
});

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [logado, setLogado] = useState(false);
  const [listaAtual, setListaAtual] = useState<FormatoLista[]>([]);
  const [idAtual, setIdAtual] = useState("");

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

  const salvar = async (recebido: FormatoLista[]) => {
    try {
      const respo = await axios.put(`${URL}/lista/${idAtual}`, {
        lista: recebido,
      });
      setListaAtual(respo.data.lista);
      toast.success("Lista Salva");
    } catch (error) {
      toast.error("Falha ao processar informação");
    }
  };

  const apagar = async (recebido: string) => {
    try {
      await axios.delete(`${URL}/lista/${recebido}`);
      toast.success("Lista Deletada");
      setLogado(false);
      setListaAtual([]);
      setIdAtual("");
    } catch (e) {
      if ((e as TypeError).message.includes("404")) {
        toast.error("ID não encontrado");
      } else {
        toast.error("Falha ao processar informação");
      }
    }
  };

  return (
    <Context.Provider
      value={{
        listaAtual,
        idAtual,
        logado,
        deslogar,
        puxarDados,
        criar,
        salvar,
        apagar,
      }}
    >
      {children}
    </Context.Provider>
  );
};
