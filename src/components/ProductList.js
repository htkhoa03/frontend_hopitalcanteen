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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            style={{
              flex: "1 1 calc(25% - 20px)",
              boxSizing: "border-box",
              maxWidth: "calc(25% - 20px)",
              minWidth: "178px",
            }}
          >
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
                Thêm vào giỏ hàng
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
