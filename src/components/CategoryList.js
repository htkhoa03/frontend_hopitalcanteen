import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const CategoryList = ({ categories, onSelectCategory }) => {
  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "white",
        borderRadius: "8px",
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
              "&.Mui-selected": {
                backgroundColor: "#1976D2",
                color: "white",
              },
            }}
          >
            <ListItemText
              primary={category}
              primaryTypographyProps={{
                style: {
                  fontWeight: "bold",
                  fontSize: "15px",
                  color: "#424242",
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
