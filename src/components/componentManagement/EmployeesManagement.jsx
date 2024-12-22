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
import * as XLSX from "xlsx";
import { employees } from "../../utils/data";

const EmployeeManagement = () => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(employees);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Nhân viên");
    XLSX.writeFile(wb, "Danh_sach_nhan_vien.xlsx");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", color: "#1976d2", marginBottom: "20px" }}
      >
        Quản lý Nhân viên
      </Typography>
      <Box sx={{ marginBottom: "20px" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            marginRight: "10px",
          }}
        >
          Thêm nhân viên mới
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#1976d2", color: "#fff" }}
          onClick={exportToExcel}
        >
          Xuất file Excel
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, width: "100%", maxWidth: 800 }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
            <TableRow sx={{ fontWeigh: "bold" }}>
              <TableCell align="center">Tên nhân viên</TableCell>
              <TableCell align="center">Vai trò</TableCell>
              <TableCell align="center">Khoa</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Password</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell align="center">{employee.name}</TableCell>
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
