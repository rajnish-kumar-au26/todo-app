import React, { useContext, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { isAuthenticated, handleLogoutUser, errorMessage, setErrorMessage } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !isAuthenticated &&
      !["/login", "/register"].includes(window.location.pathname)
    ) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      setErrorMessage(null);
    }
  }, [errorMessage, setErrorMessage]);

  const handleLogout = async () => {
    try {
      await handleLogoutUser(); // Call the context function to logout user
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      // Error handling is already managed in the context
    }
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          {!isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/items">
                Items
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
