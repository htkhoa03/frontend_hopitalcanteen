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
} from "@mui/material";
import { Edit, Delete, Add, Download } from "@mui/icons-material";
import * as XLSX from "xlsx";
import { getAllProductsService } from "../../axios/productService";
import axios from "../../axios/axios";
import Search from "../Search";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]); // Dữ liệu lọc
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: 0,
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await getAllProductsService();
      const data = res.data.map((product) => ({
        productId: product.productId,
        name: product.productName,
        price: product.sellPrice,
        stock: product.unit,
      }));
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Lọc sản phẩm dựa trên từ khóa tìm kiếm
    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedSearch) ||
        product.price.toString().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  // Update product
  const handleUpdateProduct = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `/products/${editProduct.productId}`,
        {
          productName: editProduct.name,
          sellPrice: editProduct.price,
          unit: editProduct.stock,
          status: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchProducts();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  // Add new product
  const handleAddProduct = async () => {
    try {
      await axios.post("/products", {
        productName: newProduct.name,
        sellPrice: newProduct.price,
        unit: newProduct.stock,
        status: true,
      });
      fetchProducts();
      setIsAddModalOpen(false);
      setNewProduct({ name: "", price: "", stock: 0 });
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  // Delete product
  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`/products/${deleteProductId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  // Export to Excel
  const handleExportExcel = () => {
    const data = products.map((product) => ({
      "Tên sản phẩm": product.name,
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Box sx={{ flex: 1, maxWidth: "400px" }}>
          {" "}
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
            {products.map((product) => (
              <TableRow key={product.productId}>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">
                  {product.price?.toLocaleString() ?? "N/A"} Đ
                </TableCell>
                <TableCell align="center">{product.stock ?? "N/A"}</TableCell>
                <TableCell align="center">{product.name}</TableCell>
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
                      setDeleteProductId(product.productId);
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
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
            sx={{ marginTop: 2 }}
          >
            Thêm
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
            value={editProduct?.stock || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, stock: e.target.value })
            }
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateProduct}
            sx={{ marginTop: 2 }}
          >
            Lưu thay đổi
          </Button>
        </Box>
      </Dialog>

      {/* Modal xác nhận xóa sản phẩm */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <Box sx={{ padding: 3 }}>
          <Typography>Bạn có chắc chắn muốn xóa sản phẩm này?</Typography>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirmDelete}
              sx={{ marginRight: 2 }}
            >
              Xóa
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;
