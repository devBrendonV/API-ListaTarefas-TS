import { useState } from "react";
import { Box, Typography, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface ItemListaProps {
  value: {
    tarefa: string;
    feito: boolean;
    indice: number;
    total: number;
  };
  tarefaFeita: () => void;
  mudarPosicao: (from: number, to: number) => void;
  apagarTarefa: () => void;
}


export const ItemLista  = (props:ItemListaProps) => {
  const data = props.value;
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

  return (
    <Box
      width={"100%"}
      borderRadius={"5px"}
      marginBottom={"5px"}
      padding={"3px 10px"}
      sx={{
        backgroundColor:`${data.feito ? "#22c55e" : "#a8a29e"}`
      }}
      color={`${data.feito ? "#ffffff" : "#000000"}`}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      onMouseLeave={() => setMostrarOpcoes(false)}
      onMouseEnter={() => setMostrarOpcoes(true)}
      minHeight={"50px"}
    >
      <Box
      display={"flex"}
      alignItems={"center"}
      >
        <Checkbox
          checked={data.feito}
          onChange={props.tarefaFeita}
          icon={<FavoriteBorder />}
          checkedIcon={
            <Favorite
              sx={{
                color: "#d61515",
              }}
            />
          }
        />

        <Typography
          paddingLeft={"10px"}
          fontFamily={"Times"}
          fontSize={"18px"}
        >
          {data.tarefa}
        </Typography>
      </Box>
      <Box
        display={mostrarOpcoes ? "flex" : "none"}
        alignItems={"center"}
        width={"200px"}
        justifyContent={"space-evenly"}
      >
        <IconButton
          sx={{
            color: "#1416ade6",
          }}
          disabled={data.indice === 0 ? true : false}
          onClick={() => props.mudarPosicao(data.indice, data.indice - 1)}
        >
          <ArrowUpwardIcon />
        </IconButton>

        <IconButton
          sx={{
            color: "#1416ade6",
          }}
          disabled={data.total - 1 === data.indice ? true : false}
          onClick={() => props.mudarPosicao(data.indice, data.indice + 1)}
        >
          <ArrowDownwardIcon />
        </IconButton>

        <IconButton
          sx={{
            color: "#910f0fe1",
          }}
          onClick={props.apagarTarefa}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
