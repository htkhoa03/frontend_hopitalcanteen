import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Box,
} from "@mui/material";

const ProductList = ({ products, onAddToCart }) => {
  const [quantity, setQuantity] = useState({});

  const handleAddToCart = (product) => {
    onAddToCart({ ...product, quantity: quantity[product.id] || 1 });
    setQuantity((prevQuantities) => ({ ...prevQuantities, [product.id]: 1 }));
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "20px",
      }}
    >
      {products.map((product) => (
        <Card
          key={product.id}
          sx={{
            borderRadius: "10px",
            overflow: "hidden",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              transform: "translateY(-1px)",
              // boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
            },
            marginRight: "5px",
          }}
        >
          <CardMedia
            component="img"
            height="150"
            image={product.image}
            alt={product.name}
            sx={{
              objectFit: "cover",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
          <CardContent
            sx={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "18px",
                color: "#333333",
                textAlign: "center",
              }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "16px",
                color: "#666666",
                margin: "8px 0",
              }}
            >
              Giá: {product.price.toLocaleString()}
            </Typography>
            <Button
              variant="contained"
              onClick={() => handleAddToCart(product)}
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                padding: "10px 16px",
                backgroundColor: "#4BB4DE",
                color: "white",
                fontWeight: "bold",
                marginTop: "12px",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#345DA7",
                },
              }}
            >
              Thêm sản phẩm
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ProductList;
