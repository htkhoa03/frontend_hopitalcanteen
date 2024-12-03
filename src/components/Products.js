import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      {/* Hình ảnh sản phẩm */}
      <Box
        sx={{
          height: "170px",
          backgroundImage: `url(${
            product.imageUrl || "https://via.placeholder.com/150"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      />

      {/* Nội dung sản phẩm */}
      <CardContent sx={{ padding: "8px 16px" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold" }}
          gutterBottom
        >
          {product.productName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: "8px" }}
        >
          Giá: {product.sellPrice} đ
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Số lượng: {product.unit}
        </Typography>
      </CardContent>

      {/* Nút Add to Cart */}
      <CardActions sx={{ padding: "10px", justifyContent: "center" }}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => onAddToCart(product)}
          sx={{
            width: "100%",
            padding: "12px",
            margin: "5px",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "12px",
            backgroundColor: "#2A95BF",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "#126DA6",
            },
          }}
        >
          Thêm vào giỏ
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
