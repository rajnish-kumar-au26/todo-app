import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ItemContext } from "../context/ItemContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLoginUser, errorMessage, setErrorMessage } =
    useContext(AuthContext);
  const { fetchAndSetItems } = useContext(ItemContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLoginUser({ email, password });
      await fetchAndSetItems();
      toast.success("Login successful");
      navigate("/items");
    } catch (error) {
      console.log(`Error ${error.message}`);
    }
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} style={{ marginTop: 30 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
