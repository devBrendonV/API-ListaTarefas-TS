import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Content } from "./Components/Content";

function App() {
  return (
    <Box
      sx={{
        color: "white",
        backgroundColor: "#9ca3af",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Content />
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        closeOnClick
        theme="dark"
      />
    </Box>
  );
}

export default App;
