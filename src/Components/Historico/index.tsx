import { Box } from "@mui/material";
import { ItemLista } from "../Lista/ItemLista";
import { FormatoLista } from "../../types/FormatoLista";

interface HistoricoProps {
  total: number;
  lista: FormatoLista[];
  tarefaFeita: (index: number) => void;
  mudarPosicao: (from: number, to: number) => void;
  apagarTarefa: (index: number) => void;
}

export const Historico = (props: HistoricoProps) => {
  const { total, lista, tarefaFeita, mudarPosicao, apagarTarefa } = props;

  if (total === 0) {
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
      {lista.map((e: FormatoLista, i: number) => {
        return (
          <ItemLista
            key={i}
            tarefaFeita={() => {
              tarefaFeita(i);
            }}
            mudarPosicao={(from, to) => {
              mudarPosicao(from, to);
            }}
            apagarTarefa={() => {
              apagarTarefa(i);
            }}
            tarefa={e.tarefa}
            feito={e.feito}
            indice={i}
            total={total}
          />
        );
      })}
    </Box>
  );
};
