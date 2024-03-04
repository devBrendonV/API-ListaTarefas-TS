import { useState, useContext, useEffect } from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Context } from "../../Context";
import { FormatoLista } from "../../types/FormatoLista";
import { Historico } from "../Historico";
import OpcoesLista from "./OpcoesLista";
import TarefaConcluida from "./TarefaConcluida";

export const Lista = () => {
  const context = useContext(Context);
  if (!context) {
    return null;
  }
  const { listaAtual, idAtual } = context;
  const [listaProvisoria, setListaProvisoria] = useState<FormatoLista[]>([]);
  const [salvarMudancas, setSalvarMudancas] = useState<boolean>(false);
  const [tarefaConcluida, setTarefaConcluida] = useState<boolean>(false);
  const [texto, setTexto] = useState<string>("");

  useEffect(() => {
    setListaProvisoria(listaAtual);
    setTexto("");
  }, [listaAtual]);

  useEffect(() => {
    conferirMudancas();
  }, [listaProvisoria]);

  function adicionarTarefa() {
    setListaProvisoria([
      ...listaProvisoria,
      { tarefa: texto, feito: tarefaConcluida },
    ]);
    setTexto("");
  }

  function tarefaFeita(posicao: number) {
    const atualizarTarefa = listaProvisoria.map((arr, i) => {
      if (posicao === i) {
        return {
          tarefa: listaProvisoria[posicao].tarefa,
          feito: !listaProvisoria[posicao].feito,
        };
      } else {
        return arr;
      }
    });
    setListaProvisoria(atualizarTarefa);
  }

  function conferirMudancas() {
    if (listaProvisoria.length === 0 && listaAtual.length === 0) {
      setSalvarMudancas(true);
    } else if (listaProvisoria.length === 0 && listaAtual.length > 0) {
      setSalvarMudancas(false);
    } else {
      setSalvarMudancas(
        listaProvisoria.every((arr, i) => {
          if (listaProvisoria.length === listaAtual.length) {
            return (
              arr.feito === listaAtual[i].feito &&
              arr.tarefa === listaAtual[i].tarefa
            );
          } else {
            return false;
          }
        })
      );
    }
  }

  function apagarTarefa(posicao: number) {
    const remocao = listaProvisoria.filter((_, i) => posicao !== i);
    setListaProvisoria(remocao);
  }

  const mudarPosicao = (posicaoAtual: number, posicaoNova: number) => {
    setListaProvisoria((prevLista) => {
      const listaMudancaProvisoria = [...prevLista];
      const temp = listaMudancaProvisoria[posicaoAtual];
      listaMudancaProvisoria[posicaoAtual] =
        listaMudancaProvisoria[posicaoNova];
      listaMudancaProvisoria[posicaoNova] = temp;
      return listaMudancaProvisoria;
    });
  };

  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      sx={{
        "& > div": {
          borderRadius: "15px 15px 0 0",
          borderBottom: "2px solid #555",
          backgroundColor: "#e8e8ec",
          marginTop: "2px",
          color: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "10px",
          textAlign: "center",
        },
        "& .row-container": {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          width: "100%",
          textAlign: "left",
          color: "#555",
          fontWeight: "bold",
        },
        "& .text-field-container": {
          marginTop: "10px",
        },
        "& .send-button-container": {
          marginTop: "10px",
        },
      }}
    >
      <Box>
        <Box className="row-container">
          <Typography sx={{ marginLeft: "10px", width: "50%" }}>
            Meu ID: {idAtual}
          </Typography>

          <OpcoesLista
            mudarListaProvisoria={(lista:FormatoLista[])=>setListaProvisoria(lista)}
            value={{ listaProvisoria, salvarMudancas }}
          />
        </Box>
        <Box className="text-field-container">
          <TextField
            variant="standard"
            value={texto}
            placeholder="Digite sua nova tarefa..."
            inputProps={{
              maxLength: 13,
            }}
            onChange={(e) => setTexto(e.target.value.trim())}
            onKeyDown={(e) => {
              if (e.key === "Enter" && texto.length > 0) {
                adicionarTarefa();
              }
            }}
          />

          <IconButton
            title="Enviar"
            size="small"
            disabled={texto.length === 0}
            onClick={() => adicionarTarefa()}
            sx={{ fontSize: "5px", variant: "contained" }}
          >
            <SendIcon />
          </IconButton>
        </Box>

        <Box className="send-button-container">
          <TarefaConcluida tarefaConcluida={(tarefa:boolean)=>setTarefaConcluida(tarefa)}/>
        </Box>
      </Box>
      <Box flex={1} width="100%" color="black">
        <Historico
          tarefaFeita={(posicao: number) => tarefaFeita(posicao)}
          mudarPosicao={(posicaoAtual: number, posicaoNova: number) =>
            mudarPosicao(posicaoAtual, posicaoNova)
          }
          apagarTarefa={(posicao: number) => apagarTarefa(posicao)}
          value={{ lista: listaProvisoria, total: listaProvisoria.length }}
        />
      </Box>
    </Box>
  );
};
