import React, { useState, useContext, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { Context } from "../../Context";

export const Login: React.FC = () => {
  const { criar, idAtual, puxarDados } = useContext(Context);
  const [meuID, setMeuID] = useState<string>("");
  useEffect(() => {
    setMeuID(idAtual);
  }, [idAtual]);

  return (
    <Box
      sx={{
        color: "white",
        borderRadius: "10px",
        backgroundColor: "#e8e8ec",
        padding: "15px",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "25px",
          color: "black",
          padding: "5px 0",
        }}
      >
        Lista de Tarefas
      </Typography>

      <Box sx={{ textAlign: "center", marginBottom: "15px" }}>
        <TextField
          value={meuID}
          id="standard-basic"
          label="ID:"
          placeholder="Insira seu ID"
          variant="standard"
          inputProps={{
            maxLength: 4,
          }}
          sx={{
            marginLeft: "10px",
            backgroundColor: "#e8e8ec",
            fontSize: "15px",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && meuID.length === 4) {
              puxarDados(meuID);
            }
          }}
          onChange={(e) => {
            setMeuID(e.target.value.trim());
          }}
        />
      </Box>

      <Box
        sx={{
          width: "450px",
          margin: "auto",
          display: "flex",
          justifyContent: "space-evenly",
          alignContent: "center",
          padding: "8px",
        }}
      >
        <Button
          size="small"
          variant="contained"
          disabled={meuID.length < 4}
          onClick={() => puxarDados(meuID)}
        >
          Puxar Lista
        </Button>

        <Button
          size="small"
          variant="contained"
          disabled={meuID.length !== 0}
          onClick={() => criar()}
        >
          Gerar ID
        </Button>
      </Box>
    </Box>
  );
};
