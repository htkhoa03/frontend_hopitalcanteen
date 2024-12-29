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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import * as XLSX from "xlsx";
import { getAllUsers } from "../../axios/userService";

const EmployeeManagement = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Nhân viên");
    XLSX.writeFile(wb, "Danh_sach_nhan_vien.xlsx");
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
              <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                Tên nhân viên
              </TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                Vai trò
              </TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                Khoa
              </TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                Username
              </TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                Password
              </TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell align="center">{employee.fullName}</TableCell>
                <TableCell align="center">{employee.role}</TableCell>
                <TableCell align="center">{employee.department}</TableCell>
                <TableCell align="center">{employee.username}</TableCell>
                <TableCell align="center">{employee.password}</TableCell>
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

export default EmployeeManagement;
