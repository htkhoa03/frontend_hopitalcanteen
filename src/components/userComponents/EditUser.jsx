import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SnackbarNotification from "../SnackbarNotification";

const EditUser = ({ open, handleClose, user, handleUpdateUser }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    roles: { name: "" },
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
  

  useEffect(() => {
    setFormData({
      fullName: user?.fullName || "",
      username: user?.username || "",
      password: "", 
      roles: { name: user?.roles?.name || "" },
      departments: (user?.departments.departmentName || []).join(", "), 
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "rolesName") {
      setFormData((prevData) => ({
        ...prevData,
        roles: { ...prevData.roles, name: value },
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
        password: formData.password.trim() || undefined, 
        roles: formData.roles.name.trim(),
        departments: formData?.departments
          .split(",")
          .map((dep) => dep.trim())
          .filter((dep) => dep.length > 0),
      };

      await handleUpdateUser(dataToSend); 
      setSnackbar({
        open: true,
        message: "Chỉnh sửa nhân viên thành công!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Chỉnh sửa nhân viên không thành công!",
        severity: "error",
      });
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Sửa Thông Tin Nhân Viên</DialogTitle>
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
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          label="Vai trò"
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
          value={formData?.departments}
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

export default EditUser;
