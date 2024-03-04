import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface TarefaConcluidaProps {
  tarefaConcluida: (concluida: boolean) => void;
}

const TarefaConcluida = (props: TarefaConcluidaProps) => {
  const {tarefaConcluida} = props
  return (
    <FormControl
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <FormLabel
        id="demo-row-radio-buttons-group-label"
        sx={{ marginRight: "10px", fontSize: "18px" }}
      >
        Tarefa Concluída:
      </FormLabel>
      <RadioGroup
        defaultValue="nao"
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="sim"
          control={
            <Radio
              size="small"
              color="success"
              onClick={() => tarefaConcluida(true)}
            />
          }
          label="Sim"
        />
        <FormControlLabel
          value="nao"
          control={
            <Radio
              size="small"
              sx={{
                color: "#f30c0cf4",
                "&.Mui-checked": {
                  color: "#f30c0cf4",
                },
              }}
              id="feito"
              name="tarefafeita"
              onClick={() => tarefaConcluida(false)}
            />
          }
          label="Não"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default TarefaConcluida;
