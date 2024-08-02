import "./App.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { MainPage } from "./pages/MainPage";
import { Typography } from "@mui/material";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Typography sx={{ textAlign: "center", marginTop: "50px" }} variant="h1">
        Write a plot
      </Typography>
      <MainPage />
    </QueryClientProvider>
  );
}

export default App;
