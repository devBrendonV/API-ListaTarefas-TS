import React from "react";
import { Box } from "@mui/material";
import { ItemLista } from "../Lista/ItemLista"; 
import { FormatoLista } from "../../types/types";

interface HistoricoProps {
  value: {
    total: number;
    lista: FormatoLista[]; 
  };
  func: {
    tarefaFeita: (index: number) => void;
    mudarPosicao: (from: number, to: number) => void;
    apagarTarefa: (index: number) => void;
  };
}

export const Historico = (props:HistoricoProps) => {
  if (props.value.total === 0) {
    return (
      <Box
        display={"flex"}
        height={"40vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        Lista Vazia
      </Box>
    );
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      padding={"5px"}
      overflow={"auto"}
      width={"100%"}
      height={"40vh"}
      alignItems={"center"}
    >
      {props.value.lista.map((e, i) => {
        return (
          <ItemLista
            key={i}
            tarefaFeita={() => {
              props.func.tarefaFeita(i);
            }}
            mudarPosicao={(from, to) => {
              props.func.mudarPosicao(from, to);
            }}
            apagarTarefa={() => {
              props.func.apagarTarefa(i);
            }}
            value={{
              tarefa: e.tarefa,
              feito: e.feito,
              indice: i,
              total: props.value.total,
            }}
          />
        );
      })}
    </Box>
  );
};
