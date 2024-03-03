import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Context } from "../../Context";
import { useContext, useState } from "react";
import { IconButton } from "@mui/material";

export default function DeletarLista() {
  const { apagar, idAtual } = useContext(Context);
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        title="Deletar Lista"
        sx={{
          color: "#d80909",
        }}
        onClick={handleClickOpen}
      >
        <DeleteForeverIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseja realmente excluir essa lista?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Essa ação não pode ser revertida.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => apagar(idAtual)}>Sim</Button>
          <Button onClick={handleClose}>Não</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
