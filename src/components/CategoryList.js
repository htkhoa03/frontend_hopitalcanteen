import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const CategoryList = ({ categories, onSelectCategory }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Danh mục sản phẩm
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem
            button
            key={category}
            onClick={() => onSelectCategory(category)}
          >
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CategoryList;
