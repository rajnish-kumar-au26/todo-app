import React, { createContext, useState, useContext } from "react";
import { addItem, updateItem, deleteItem, fetchItems } from "../api";
import { toast } from "react-toastify";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleAddItem = async (newItem) => {
    try {
      const { data, message } = await addItem(newItem);
      setItems((prevItems) => [...prevItems, data]);
      toast.success(message);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error adding item");
    }
  };

  const handleUpdateItem = async (updatedItem) => {
    try {
      const { data, message } = await updateItem(updatedItem);
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === data.id ? data : item))
      );
      toast.success(message);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error updating item");
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const { message } = await deleteItem(id);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      toast.success(message);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error deleting item");
    }
  };

  const fetchAndSetItems = async () => {
    try {
      const { data, message } = await fetchItems();
      setItems(data);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error fetching items");
    }
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        setItems,
        handleAddItem,
        handleUpdateItem,
        handleDeleteItem,
        fetchAndSetItems,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
