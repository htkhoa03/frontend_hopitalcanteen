import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const CategoryList = ({ categories, selectedCategory, onSelectCategory }) => {
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhh", categories);
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
        {categories?.map((category) => (
          <ListItem
            button
            key={category.categoryId}
            onClick={() => onSelectCategory(category.name)}
            sx={{
              borderRadius: "8px",
              backgroundColor:
                selectedCategory === category.name ? "#1976D2" : "transparent",
              pointerEvents:
                selectedCategory === category.name ? "none" : "auto",
              "&:hover": {
                backgroundColor:
                  selectedCategory === category.name
                    ? "transparent"
                    : "#e3f2fd",
              },
            }}
          >
            <ListItemText
              primary={category.name}
              primaryTypographyProps={{
                style: {
                  fontWeight: "bold",
                  fontSize: "15px",
                  color:
                    selectedCategory === category.name ? "white" : "#424242",
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
