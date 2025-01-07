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
  Pagination,
} from "@mui/material";
import { Edit, Delete, Add, Download } from "@mui/icons-material";
import * as XLSX from "xlsx";
import { getAllProductsService } from "../../axios/productService";
import axios from "../../axios/axios";
import Search from "../Search";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    unit: "",
    stock: { quantity: 0 },
    category: null,
    images: [],
  });
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch dữ liệu từ backend
  const fetchProducts = async () => {
    try {
      const res = await getAllProductsService({
        page: page - 1,
        size: 12,
        sortBy: "price",
        sortDirection: "asc",
      });
      setProducts(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories/all");
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [page]);

  useEffect(() => {
    const lowercasedSearch = searchTerm.toLowerCase();
    setFilteredProducts(
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercasedSearch) ||
          product.price.toString().includes(searchTerm)
      )
    );
  }, [searchTerm, products]);

  // Thêm sản phẩm mới
  const handleAddProduct = async () => {
    const productData = new FormData();
    productData.append("name", newProduct.name);
    productData.append("price", newProduct.price);
    productData.append("unit", newProduct.unit);
    productData.append("quantity", newProduct.stock?.quantity);
    productData.append("category", newProduct.category.name);
    newProduct.images.forEach((image) => productData.append("images", image));

    try {
      await axios.post("/products", productData);
      fetchProducts();
      setIsAddModalOpen(false);
      setSnackbarMessage("Sản phẩm đã được thêm thành công!");
      setOpenSnackbar(true);
      setNewProduct({
        name: "",
        price: "",
        unit: "",
        stock: { quantity: 0 },
        category: null,
        images: [],
      });
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };


  

  // Chỉnh sửa sản phẩm
  const handleUpdateProduct = async () => {
    const productData = new FormData();
    productData.append("name", editProduct.name);
    productData.append("price", editProduct.price);
    productData.append("unit", editProduct.unit);
    productData.append("quantity", editProduct.stock?.quantity);
    productData.append("category", editProduct.category.name);
    
    editProduct.images = [];

    // Append new images (if there are any new images)
    editProduct.images.forEach((image) => {
      if (image instanceof File) {
        productData.append("images", image);  // Add new image files
      }
    });

    try {
      await axios.put(`/products/${editProduct.id}`, productData);
      fetchProducts();
      setIsEditModalOpen(false);
      setSnackbarMessage("Sản phẩm đã được cập nhật thành công!");
      setOpenSnackbar(true);

      setEditProduct(null);

    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };
  const handleFileChange = (event, isEdit = false) => {
    const files = Array.from(event.target.files);
    if (isEdit) {
      setEditProduct((prev) => ({
        ...prev,
        images: [...prev.images.filter((img) => !(img instanceof File)), ...files],
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    }
  };

  // Xóa sản phẩm
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

  // Xuất dữ liệu ra Excel
  const handleExportExcel = () => {
    const data = products.map((product) => ({
      "Id sản phẩm": product.id,
      "Tên sản phẩm": product.name,
      Giá: product.price,
      "Đơn vị tính": product.unit,
      "Số lượng tồn": product.stock?.quantity,
      "Danh mục": product.category?.name,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sản phẩm");
    XLSX.writeFile(wb, "Danh_sach_san_pham.xlsx");
  };

  return (
    <Box
      sx={{
        
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
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell align="center" sx={{color: "white"}}>Tên sản phẩm</TableCell>
              <TableCell align="center" sx={{color: "white"}}>Hình ảnh</TableCell>
              <TableCell align="center" sx={{color: "white"}}>Giá</TableCell>
              <TableCell align="center" sx={{color: "white"}}>Đơn vị tính</TableCell>
              <TableCell align="center" sx={{color: "white"}}>Số lượng</TableCell>
              <TableCell align="center" sx={{color: "white"}}>Danh mục</TableCell>
              <TableCell align="center" sx={{color: "white"}}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell align="center" >{product.name}</TableCell>
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
                <TableCell align="center">
                  {product.stock && product.stock.quantity !== undefined
                    ? product.stock.quantity
                    : 0}
                </TableCell>
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
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => handlePageChange(event, value)}
        color="primary"
        sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />

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
            fullWidth
            type="file"
            inputProps={{ multiple: true }}
            onChange={handleFileChange}
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
            label="Đơn vị tính"
            fullWidth
            value={newProduct?.unit || ""}
            onChange={(e) =>
              setNewProduct({ ...newProduct, unit: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Số lượng tồn"
            fullWidth
            type="number"
            value={newProduct.stock.quantity}
            onChange={(e) => {
              setNewProduct({
                ...newProduct,
                stock: {
                  ...newProduct.stock,
                  quantity: Number(e.target.value),
                },
              });
            }}
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Danh mục</InputLabel>
            <Select
              value={newProduct.category?.name || ""}
              onChange={(e) => {
                const selectedCategory = categories.find(
                  (category) => category.name === e.target.value
                );
                setNewProduct({ ...newProduct, category: selectedCategory });
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category.categoryId} value={category.name}>
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
            fullWidth
            type="file"
            inputProps={{ multiple: true }}
            onChange={handleFileChange}
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
            label="Đơn vị tính"
            fullWidth
            value={editProduct?.unit || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, unit: e.target.value })
            }
            margin="normal"
          />

          <TextField
            label="Số lượng tồn"
            fullWidth
            type="number"
            value={editProduct?.stock?.quantity}
            onChange={(e) => {
              setEditProduct({
                ...editProduct,
                stock: {
                  ...editProduct.stock,
                  quantity: Number(e.target.value),
                },
              });
            }}
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Danh mục</InputLabel>
            <Select
              value={editProduct?.category?.name || ""}
              onChange={(e) => {
                const selectedCategory = categories.find(
                  (category) => category.name === e.target.value
                );
                if (selectedCategory) {
                  setEditProduct({
                    ...editProduct,
                    category: selectedCategory,
                  });
                }
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category.categoryId} value={category.name}>
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
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Xóa
          </Button>
          <Button onClick={() => setIsDeleteModalOpen(false)} color="primary">
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;
