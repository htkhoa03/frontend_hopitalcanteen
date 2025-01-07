import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SnackbarNotification from "../SnackbarNotification";

const AddUser = ({ open, handleClose, handleAddUser }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    roles: { id: "", name: "" },
    departments: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "rolesName" || name === "rolesId") {
      setFormData((prevData) => ({
        ...prevData,
        roles: {
          ...prevData.roles,
          [name === "rolesName" ? "name" : "id"]: name === "rolesId" ? Number(value) : value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        fullName: formData.fullName.trim(),
        username: formData.username.trim(),
        password: formData.password.trim(),
        roles:formData.roles.name.trim(),

        departments: formData.departments
          .split(",")
          .map((dep) => dep.trim())
          .filter((dep) => dep.length > 0),
      };

      await handleAddUser(dataToSend); 
      setSnackbar({
        open: true,
        message: "Thêm nhân viên thành công!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Đã xảy ra lỗi khi thêm nhân viên!",
        severity: "error",
      });
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm Nhân Viên</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên Nhân Viên"
            variant="outlined"
            fullWidth
            margin="normal"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <TextField
            label="Role Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="rolesName"
            value={formData.roles.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Khoa"
            placeholder="Nhập khoa, cách nhau bằng dấu phẩy"
            variant="outlined"
            fullWidth
            margin="normal"
            name="departments"
            value={formData.departments}
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarNotification
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default AddUser;
