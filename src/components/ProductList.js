import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Products
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <Card key={product.id} style={{ width: "22%", flex: "0 1 auto" }}>
            <CardMedia
              component="img"
              height="140"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2">
                Price: {product.price} VND
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onAddToCart(product)}
                style={{ marginTop: "10px" }}
              >
                Add to cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
