import React, { useState } from "react";
import { Typography, Button, Box, TextField } from "@mui/material";

const Item = ({ item, onUpdateItem, onDeleteItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const handleUpdate = async () => {
    await onUpdateItem({ ...item, title, description });
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      {isEditing ? (
        <>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleUpdate} color="primary" variant="contained">
              Save
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              color="secondary"
              variant="outlined"
            >
              Cancel
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="body1">{item.description}</Typography>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button
              onClick={() => setIsEditing(true)}
              color="primary"
              sx={{ marginRight: 1 }}
            >
              Edit
            </Button>
            <Button onClick={() => onDeleteItem(item.id)} color="secondary">
              Delete
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Item;
