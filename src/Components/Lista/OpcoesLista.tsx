import { Box, IconButton } from "@mui/material";
import React, { useState, useContext } from "react";
import { Settings } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { Context } from "../../Context";
import DeletarLista from "./DeletarLista";

import { FormatoLista } from "../../types/FormatoLista";


interface OpcoesListaProps {
  value: {
    listaProvisoria: FormatoLista[]; 
    salvarMudancas: boolean; 
  };
  func: {
    setListaProvisoria: React.Dispatch<React.SetStateAction<FormatoLista[]>>; 
  };
}

const OpcoesLista = (props:OpcoesListaProps) => {
  const [mostrar, setMostrar] = useState(true);
  const { salvar, puxarDados, idAtual, deslogar } = useContext(Context);

  return (
    <Box
      display={"flex"}
      justifyContent={"flex-end"}
      width={"100%"}
      height={"50px"}
      padding={"5px"}
    >
      <Box display={mostrar ? "flex" : "none"}>
        <Box
          display={"flex"}
          textAlign={"center"}
          flexDirection={"row"}
          padding={"5px"}
          width={"100%"}
          justifyContent={"space-evenly"}
        >
          <IconButton
            sx={{
              color: "#250616",
            }}
            title="Salvar Lista"
            size="small"
            disabled={props.value.salvarMudancas}
            onClick={() => salvar(props.value.listaProvisoria)}
          >
            <SaveIcon />
          </IconButton>

          <IconButton
            sx={{
              color: "#172ce7",
            }}
            title="Recarregar"
            size="small"
            disabled={props.value.salvarMudancas}
            onClick={() => puxarDados(idAtual)}
          >
            <RefreshIcon />
          </IconButton>

          <IconButton
            sx={{
              color: "#172ce7",
            }}
            title="Limpar lista atual"
            size="small"
            disabled={props.value.listaProvisoria.length === 0}
            onClick={() => props.func.setListaProvisoria([])}
          >
            <PlaylistRemoveIcon />
          </IconButton>

          <DeletarLista />

          <IconButton
            sx={{
              color: "#000",
            }}
            title="Deslogar"
            size="small"
            onClick={() => deslogar()}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>

      <IconButton title="Menu" onClick={() => setMostrar(!mostrar)}>
        <Settings />
      </IconButton>
    </Box>
  );
};

export default OpcoesLista;
