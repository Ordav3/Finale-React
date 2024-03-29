import { useMemo,useEffect } from "react";
import {
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NavbarComp from "../src/components/navbar/NavbarComp";
import FooterComp from "./components/Footer";
import Router from "./routes/Router";
import useLoggedIn from "./hooks/useLoggedIn";

const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

const App = () => {
  const loggedIn = useLoggedIn();
  useEffect(() => {
    loggedIn();
  }, [loggedIn]);
 
  const isDarkTheme = useSelector((bigPie) => bigPie.darkModeSlice.isDarkMode);
  const theme = useMemo(() => {
    let ttt = createTheme(isDarkTheme ? dark : light);
    return ttt;
  }, [isDarkTheme]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <ToastContainer
        position="top-center"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
      />

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <header>
          <NavbarComp />
        </header>
        <main>
          <Router />
        </main>
        <FooterComp />
      </Container>
    </ThemeProvider>
  );
};

export default App;
