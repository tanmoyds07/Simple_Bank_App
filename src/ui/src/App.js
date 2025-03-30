import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import themes from "./theme";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import CreditCards from "./pages/credit-cards";
import AccountsPage from "./pages/accounts";
import Layout from "./layout";
import { Box } from "@mui/material";

const theme = createTheme(themes.dark);

const App = () => {
  return (
    <Box sx={{  background: "linear-gradient(to bottom, #121212, #1e1e2e, #243b55)", height: "97.5vh", width: "100%", color: "white", overflow: "hidden"}}>
      <Router>
        <ThemeProvider theme={theme}>
          <Routes>
            {/* Parent Route */}
            <Route path="/" element={<Login />}></Route>
            <Route path="/abcdBank" element={<Layout />}>
              {/* Default page when visiting "/abcdBank" */}
              <Route index element={<Dashboard />} />
              {/* Explicit Dashboard path */}
              <Route path="summary" element={<Dashboard />} />
              <Route path="creditCards" element={<CreditCards />} />
              <Route path="accounts" element={<AccountsPage />} />
            </Route>
          </Routes>

        </ThemeProvider>
      </Router>
    </Box>
  );
};

export default App;
