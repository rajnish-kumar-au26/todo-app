import React, { useContext } from "react";
import { ItemContext } from "../context/ItemContext";
import Item from "./Item"; // Ensure the path is correct

const ItemList = () => {
  const { items, handleUpdateItem, handleDeleteItem } = useContext(ItemContext);

  return (
    <div>
      {Array.isArray(items) && items.length > 0 ? (
        items.map((item) => (
          <Item
            key={`item${item.id}`}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
};

export default ItemList;
