import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const CategoryList = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div
      style={{
        padding: "50px 20px 0 0 ",
        backgroundColor: "white",
        borderRadius: "8px",
        position: "fixed",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        style={{
          fontWeight: "bold",
          color: "#1976D2",
          fontSize: "18px",
          paddingLeft: "15px",
        }}
      >
        Danh mục Sản phẩm
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem
            button
            key={category}
            onClick={() => onSelectCategory(category)}
            sx={{
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
              backgroundColor:
                selectedCategory === category ? "#1976D2" : "transparent",
            }}
          >
            <ListItemText
              primary={category}
              primaryTypographyProps={{
                style: {
                  fontWeight: "bold",
                  fontSize: "15px",
                  color: selectedCategory === category ? "white" : "#424242",
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CategoryList;
