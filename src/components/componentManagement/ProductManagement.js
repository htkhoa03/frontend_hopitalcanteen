import React, { useState } from "react";
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
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Edit, Delete, Download } from "@mui/icons-material";
import { allProducts, categories } from "../../utils/data";
import * as XLSX from "xlsx";

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [stockStatus, setStockStatus] = useState("Tất cả");

  const products = Object.entries(allProducts).flatMap(([category, items]) =>
    items.map((product) => ({
      ...product,
      category,
    }))
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tất cả" || product.category === selectedCategory;
    const matchesStockStatus =
      stockStatus === "Tất cả" ||
      (stockStatus === "Còn hàng" && product.stock > 0) ||
      (stockStatus === "Hết hàng" && product.stock === 0);

    return matchesSearchTerm && matchesCategory && matchesStockStatus;
  });

  const handleExportExcel = () => {
    const data = filteredProducts.map((product) => ({
      "Tên sản phẩm": product.name,
      "Danh mục": product.category,
      Giá: product.price,
      "Số lượng tồn": product.stock,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sản phẩm");
    XLSX.writeFile(wb, "Danh_sach_san_pham.xlsx");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#1976d2",
          marginBottom: "10px",
          fontWeight: "bold",
          marginTop: "70px",
        }}
      >
        Quản lý sản phẩm
      </Typography>
      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            padding: "10px 20px",
            fontWeight: "bold",
            borderRadius: "8px",
            whiteSpace: "nowrap",
          }}
        >
          Thêm sản phẩm mới
        </Button>
        <Button
          variant="contained"
          onClick={handleExportExcel}
          startIcon={<Download />}
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            padding: "10px 20px",
            fontWeight: "bold",
            borderRadius: "8px",
            whiteSpace: "nowrap",
          }}
        >
          Thống kê
        </Button>
      </Box>

      {/* Filters and Buttons Container */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          marginBottom: "20px",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: 2,
          flexWrap: "wrap",
        }}
      >
        {/* Search and Filters */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            flex: 1,
          }}
        >
          {/* Search Field */}
          <Box sx={{ flex: 1, minWidth: "250px" }}>
            <label
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "5px",
                display: "block",
              }}
            >
              Tìm kiếm sản phẩm
            </label>
            <TextField
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nhập tên sản phẩm..."
            />
          </Box>

          {/* Category Filter */}
          <Box sx={{ flex: 1, minWidth: "200px" }}>
            <label
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "5px",
                display: "block",
              }}
            >
              Danh mục
            </label>
            <FormControl fullWidth>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="Tất cả">Tất cả</MenuItem>
                {categories.map((category) => (
                  <MenuItem value={category} key={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Stock Status Filter */}
          <Box sx={{ flex: 1, minWidth: "200px" }}>
            <label
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "5px",
                display: "block",
              }}
            >
              Tình trạng
            </label>
            <FormControl fullWidth>
              <Select
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value)}
              >
                <MenuItem value="Tất cả">Tất cả</MenuItem>
                <MenuItem value="Còn hàng">Còn hàng</MenuItem>
                <MenuItem value="Hết hàng">Hết hàng</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* Product Table */}
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: "8px",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
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
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </TableCell>
                <TableCell align="center">{product.category}</TableCell>
                <TableCell align="center">
                  {product.price.toLocaleString()} Đ
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
