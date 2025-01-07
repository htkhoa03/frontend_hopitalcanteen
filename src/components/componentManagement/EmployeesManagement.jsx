import React, { useEffect, useState } from "react";
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
  Toolbar,
  Pagination,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import * as XLSX from "xlsx";
import {
  addUser,
  deleteUserAPI,
  getAllUsers,
  updateUserAPI,
} from "../../axios/userService";
import AddUser from "../userComponents/AddUser";
import EditUser from "../userComponents/EditUser";
import DeleteUser from "../userComponents/DeleteUser";
import SnackbarNotification from "../SnackbarNotification";

const EmployeeManagement = () => {
  const [users, setUsers] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);


  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleShowSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers(page, size);
      setUsers(res);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, size]);

  const handleAddUser = async (userData) => {
    try {
      await addUser(userData);
      console.log("Người dùng được thêm thành công:", userData);
      fetchUsers();
      setOpenAdd(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  const handleUpdateUser = async (updateUser) => {
    try {
      await updateUserAPI(selectedUser.userId, updateUser);
      fetchUsers();
      setOpenEdit(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (deleteUser) => {
    try {
      await deleteUserAPI(selectedUser.userId, deleteUser);
      
      fetchUsers();
      setOpenDelete(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCloseDeleteDialog = () => {
    setSelectedUser(null);
    setOpenDelete(false);
  };
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Nhân viên");
    XLSX.writeFile(wb, "Danh_sach_nhan_vien.xlsx");
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 4,
      }}
    >
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
          mb: 4,
          px: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#1565c0",
          }}
        >
          Quản lý nhân viên
        </Typography>
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1565c0",
              color: "#fff",
              mr: 2,
            }}
            onClick={() => setOpenAdd(true)}
          >
            Thêm nhân viên mới
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1565c0", color: "#fff" }}
            onClick={exportToExcel}
          >
            Xuất file Excel
          </Button>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          maxWidth: "1200px",
          boxShadow: 1,
          borderRadius: 1,
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#1565c0" }}>
            <TableRow>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Tên nhân viên
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Vai trò
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Khoa
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Username
              </TableCell>

              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((employee) => (
              <TableRow key={employee?.userId}>
                <TableCell align="center">{employee?.fullName}</TableCell>
                <TableCell align="center">
                  {employee?.roles?.[0]?.name}
                </TableCell>
                <TableCell align="center">
                  {employee?.departments?.[0]?.departmentName }
                </TableCell>
                <TableCell align="center">{employee?.username}</TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedUser(employee);
                      setOpenEdit(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setSelectedUser(employee);
                      setOpenDelete(true);
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={(event, value) => handlePageChange(event, value)}
          color="primary"
        />
      </Box>
      {/* Add User Modal */}
      <AddUser
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        handleAddUser={handleAddUser}
      />

      {/* Edit User Modal */}
      <EditUser
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        user={selectedUser}
        handleUpdateUser={handleUpdateUser}
      />

      {/* Delete User Modal */}
      <DeleteUser
        open={openDelete}
        handleClose={handleCloseDeleteDialog}
        userId={selectedUser}
        handleDeleteUser={handleDeleteUser}
        handleShowSnackbar={handleShowSnackbar}
      />

      <SnackbarNotification
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)} // Close Snackbar when the user dismisses it
      />
    </Box>
  );
};

export default EmployeeManagement;
