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
  Snackbar,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import axios from "../../axios/axios";
import AddEditItems from "./AddEditItems";
import DeleteItems from "./DeleteItems";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories/all");
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle Add or Update category
  const handleAddEditCategory = async () => {
    try {
      if (editCategory) {
        // Update category
        await axios.put(
          `/categories/category/${editCategory.categoryId}/update`,
          {
            name: editCategory.name,
          }
        );
        setSnackbarMessage("Danh mục đã được cập nhật thành công!");
      } else {
        // Add new category
        await axios.post("/categories/add", { name: newCategory.name });
        setSnackbarMessage("Danh mục đã được thêm thành công!");
      }
      fetchCategories();
      setIsAddEditModalOpen(false);
      setEditCategory(null);
      setNewCategory({ name: "" });
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Failed to add/update category:", error);
    }
  };

  // Handle Delete category
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/categories/category/${deleteCategoryId}/delete`);
      fetchCategories();
      setIsDeleteModalOpen(false);
      setSnackbarMessage("Danh mục đã được xóa!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
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
        Quản lý danh mục
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setNewCategory({ name: "" });
            setIsAddEditModalOpen(true);
          }}
          sx={{ backgroundColor: "#1976d2", color: "#fff" }}
        >
          Thêm danh mục
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: "8px" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell align="center" sx={{color: "white"}}>ID danh mục</TableCell>
              <TableCell align="center" sx={{color: "white"}}>Tên danh mục</TableCell>
              <TableCell align="center" sx={{color: "white"}}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((category) => (
              <TableRow key={category.categoryId}>
                <TableCell align="center">{category.categoryId}</TableCell>
                <TableCell align="center">{category.name}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditCategory(category);
                      setIsAddEditModalOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setDeleteCategoryId(category.categoryId);
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
        sx={{ justifyContent: "flex-end" }}
      />

      {/* Modal thêm/chỉnh sửa danh mục */}
      <AddEditItems
        open={isAddEditModalOpen}
        onClose={() => {
          setIsAddEditModalOpen(false);
          setEditCategory(null);
        }}
        onSubmit={handleAddEditCategory}
        category={editCategory || newCategory}
        setCategory={editCategory ? setEditCategory : setNewCategory}
      />

      {/* Modal xác nhận xóa danh mục */}
      <DeleteItems
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default CategoryManagement;
