import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from "./components/nav-bar";
import { createTheme, LinearProgress, ThemeProvider } from "@mui/material";
import Home from "./pages/home/home";
import Users from "./pages/users/users";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0277bd"
    },
    secondary: {
      main: "#ffc107"
    }
  }
})
const App = () => {
  const Home = lazy(() => import('./pages/home/home'));
  const Users = lazy(() => import('./pages/users/users'));

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar/>
        <Suspense fallback={<LinearProgress/>}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="users" element={<Users/>}/>
            <Route path="about" element={<div>about</div>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
