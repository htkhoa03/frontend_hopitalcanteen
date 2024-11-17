import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";

const ProductList = ({ products, onAddToCart }) => {
  const [quantity, setQuantity] = useState({});

  // const handleIncrease = (id) => {
  //   setQuantity((prevQuantities) => ({
  //     ...prevQuantities,
  //     [id]: (prevQuantities[id] || 1) + 1,
  //   }));
  // };

  // const handleDecrease = (id) => {
  //   setQuantity((prevQuantities) => ({
  //     ...prevQuantities,
  //     [id]: Math.max(1, (prevQuantities[id] || 1) - 1),
  //   }));
  // };

  const handleAddToCart = (product) => {
    onAddToCart({ ...product, quantity: quantity[product.id] || 1 });
    setQuantity((prevQuantities) => ({ ...prevQuantities, [product.id]: 1 }));
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {products.map((product) => (
        <Card
          key={product.id}
          style={{ maxWidth: "calc(25% - 20px)", minWidth: "178px" }}
        >
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.name}
          />
          <CardContent>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2">Giá: {product.price} VND</Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            ></div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddToCart(product)}
              style={{ marginTop: "10px", fontSize: "11px" }}
            >
              Thêm vào giỏ hàng
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
