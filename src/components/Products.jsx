import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import SnackbarNotification from "./SnackbarNotification";

const Product = ({ product, onAddToCart }) => {
  const [isOutOfStock, setIsOutOfStock] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(false);

  const handleAddToCart = () => {
    if (product.stock?.quantity > 0) {
      onAddToCart(product);
      setSuccessMessage(true);
    } else {
      setIsOutOfStock(true);
    }
  };

  const handleCloseSnackbar = () => {
    setIsOutOfStock(false);
    setSuccessMessage(false);
  };

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
          backgroundImage: `url(http://localhost:8080${
            product.images.length > 0
              ? product.images[0].downloadUrl
              : "/images/default-placeholder.png"
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
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: "8px" }}
        >
          Giá: {product.price.toLocaleString()} đ
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Số lượng:{" "}
          {product.stock?.quantity > 0 ? product.stock.quantity : "Hết hàng"}
        </Typography>
      </CardContent>

      {/* Nút Add to Cart */}
      <CardActions sx={{ padding: "10px", justifyContent: "center" }}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          disabled={product.stock?.quantity === 0}
          sx={{
            width: "100%",
            padding: "12px",
            margin: "5px",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "12px",
            backgroundColor: product.stock?.quantity === 0 ? "#ddd" : "#2A95BF",
            color: product.stock?.quantity === 0 ? "#888" : "#fff",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor:
                product.stock?.quantity === 0 ? "#ddd" : "#126DA6",
            },
          }}
        >
          {product.stock?.quantity === 0 ? "Hết hàng" : "Thêm vào giỏ"}
        </Button>
      </CardActions>

      {/* Snackbar thông báo */}
      <SnackbarNotification
        open={isOutOfStock}
        message="Sản phẩm đã hết hàng!"
        severity="warning"
        onClose={handleCloseSnackbar}
      />
      <SnackbarNotification
        open={successMessage}
        message="Đã thêm sản phẩm vào giỏ hàng!"
        severity="success"
        onClose={handleCloseSnackbar}
      />
    </Card>
  );
};

export default Product;
