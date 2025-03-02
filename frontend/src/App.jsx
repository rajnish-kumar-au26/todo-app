import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

import { Container } from "@mui/material";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/items"
            element={
              isAuthenticated ? (
                <>
                  <AddItemForm />
                  <ItemList />
                </>
              ) : (
                <p>Please log in to view items</p>
              )
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
