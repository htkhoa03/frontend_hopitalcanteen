import React, { useState, useEffect } from "react";
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
  Dialog,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Edit, Delete, Add, Download } from "@mui/icons-material";
import * as XLSX from "xlsx";
import { getAllProductsService } from "../../axios/productService";
import axios from "../../axios/axios";
import Search from "../Search";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    unit: 0,
    category: "",
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch products and categories
  const fetchProducts = async () => {
    try {
      const res = await getAllProductsService();
      const data = res.data.data;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    // Giả sử bạn có API để lấy danh mục
    try {
      const res = await axios.get("/categories");
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedSearch) ||
        product.price.toString().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  // Handle Add product
  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("unit", newProduct.unit);
    formData.append("category", newProduct.category);
    newProduct.images.forEach((image) => formData.append("files", image));

    try {
      await axios.post("/products", formData);
      fetchProducts();
      setIsAddModalOpen(false);
      setNewProduct({
        name: "",
        price: "",
        unit: 0,
        category: [],
        images: [],
      });
      setSnackbarMessage("Sản phẩm đã được thêm thành công!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  // Handle Update product
  const handleUpdateProduct = async () => {
    const formData = new FormData();
    formData.append("name", editProduct.name);
    formData.append("price", editProduct.price);
    formData.append("unit", editProduct.unit);
    formData.append("category", editProduct.category.name);
    editProduct.images.forEach((image) => formData.append("files", image));

    try {
      await axios.put(`/products/${editProduct.id}`, formData);
      fetchProducts();
      setIsEditModalOpen(false);
      setSnackbarMessage("Sản phẩm đã được cập nhật thành công!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  // Handle delete product
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/products/${deleteProductId}`);
      fetchProducts();
      setIsDeleteModalOpen(false);
      setSnackbarMessage("Sản phẩm đã được xóa!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  // Export to Excel
  const handleExportExcel = () => {
    const data = products.map((product) => ({
      "Tên sản phẩm": product.name,
      Giá: product.price,
      "Số lượng tồn": product.unit,
      "Danh mục": product.category.name,
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Box sx={{ flex: 1, maxWidth: "400px" }}>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setIsAddModalOpen(true)}
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
            }}
          >
            Thêm sản phẩm
          </Button>
          <Button
            variant="contained"
            onClick={handleExportExcel}
            startIcon={<Download />}
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
            }}
          >
            Thống kê
          </Button>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: "8px" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell align="center">Tên sản phẩm</TableCell>
              <TableCell align="center">Hình ảnh</TableCell>
              <TableCell align="center">Giá</TableCell>
              <TableCell align="center">Số lượng tồn</TableCell>
              <TableCell align="center">Danh mục</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">
                  <img
                    src={`http://localhost:8080${
                      product.images.length > 0
                        ? product.images[0].downloadUrl
                        : "/images/default-placeholder.png"
                    }`}
                    alt={product.name}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  {product.price?.toLocaleString()} Đ
                </TableCell>
                <TableCell align="center">{product.unit}</TableCell>
                <TableCell align="center">{product.category.name}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditProduct(product);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setDeleteProductId(product.id);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar thông báo */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />

      {/* Modal thêm sản phẩm */}
      <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6" marginBottom={2}>
            Thêm sản phẩm mới
          </Typography>
          <TextField
            label="Tên sản phẩm"
            fullWidth
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Giá"
            fullWidth
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Số lượng tồn"
            fullWidth
            type="number"
            value={newProduct.unit}
            onChange={(e) =>
              setNewProduct({ ...newProduct, unit: e.target.value })
            }
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Danh mục</InputLabel>
            <Select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleAddProduct}>
            Thêm sản phẩm
          </Button>
        </Box>
      </Dialog>

      {/* Modal chỉnh sửa sản phẩm */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6" marginBottom={2}>
            Chỉnh sửa sản phẩm
          </Typography>
          <TextField
            label="Tên sản phẩm"
            fullWidth
            value={editProduct?.name || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Giá"
            fullWidth
            type="number"
            value={editProduct?.price || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, price: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Số lượng tồn"
            fullWidth
            type="number"
            value={editProduct?.unit || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, unit: e.target.value })
            }
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Danh mục</InputLabel>
            <Select
              value={editProduct?.category || ""}
              onChange={(e) =>
                setEditProduct({ ...editProduct, category: e.target.value })
              }
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleUpdateProduct}>
            Lưu thay đổi
          </Button>
        </Box>
      </Dialog>

      {/* Modal xác nhận xóa sản phẩm */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa sản phẩm này?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteModalOpen(false)} color="primary">
            Hủy
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;
