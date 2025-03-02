import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { ItemContext } from "../context/ItemContext";
import { toast } from "react-toastify";

const AddItemForm = () => {
  const { handleAddItem, errorMessage, setErrorMessage } =
    useContext(ItemContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      setErrorMessage(null);
    }
  }, [errorMessage, setErrorMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItem({ title, description }); // Call the context function to add item
    setTitle("");
    setDescription("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ marginTop: 2, marginBottom: 2 }} // Add marginTop and marginBottom using sx prop
    >
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
        sx={{ marginBottom: 1 }} // Add marginBottom using sx prop
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        fullWidth
        multiline
        rows={4}
        sx={{ marginBottom: 1 }} // Add marginBottom using sx prop
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit" variant="contained" color="primary">
          Add Item
        </Button>
      </Box>
    </Box>
  );
};

export default AddItemForm;
