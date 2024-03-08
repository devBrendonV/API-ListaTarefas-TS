import { useContext } from "react";
import { Box } from "@mui/material";
import { Login } from "../Login";
import { Lista } from "../Lista";
import { Context } from "../../Context";

export const Content = () => {
  const { logado } = useContext(Context);

  if (!logado) {
    return (
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={"auto"}
        padding={"5px"}
        borderRadius={"10px"}
        sx={{
          backgroundColor: "#d4d4d4",
        }}
      >
        <Login />
      </Box>
    );
  } else {
    return (
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={"500px"}
        height={"550px"}
        borderRadius={"15px"}
        sx={{
          backgroundColor: "#d4d4d4",
        }}
      >
        <Lista />
      </Box>
    );
  }
};
