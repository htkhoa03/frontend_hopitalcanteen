import React from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { allProducts } from "../../utils/data";

const ProductManagement = () => {
  const products = Object.entries(allProducts).flatMap(([category, items]) =>
    items.map((product) => ({
      ...product,
      category,
    }))
  );

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", color: "#1976d2", marginBottom: "20px" }}
      >
        Quản lý sản phẩm
      </Typography>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#1976d2", color: "#fff", marginBottom: "20px" }}
      >
        Thêm sản phẩm mới
      </Button>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          maxWidth: "100%",
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
            <TableRow>
              <TableCell align="center">Tên sản phẩm</TableCell>
              <TableCell align="center">Hình ảnh</TableCell>
              <TableCell align="center">Danh mục</TableCell>
              <TableCell align="center">Giá</TableCell>
              <TableCell align="center">Số lượng tồn</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </TableCell>
                <TableCell align="center">{product.category}</TableCell>
                <TableCell align="center">
                  {product.price.toLocaleString()} VNĐ
                </TableCell>
                <TableCell align="center">{product.stock}</TableCell>

                <TableCell align="center">
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductManagement;
