import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCustomerDetails, setCustomerData } from "../reducers/bank-reducer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerData = await dispatch(getCustomerDetails({ "userName": userName, "password": password }));
    if (customerData !== null && customerData !== undefined) {
      dispatch(setCustomerData(customerData));
      navigate("/abcdBank/summary")
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
