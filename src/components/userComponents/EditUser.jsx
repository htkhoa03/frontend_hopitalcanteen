import React, { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const EditUser = ({ open, handleClose, user, handleUpdateUser }) => {
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    handleUpdateUser(formData);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Sửa Thông Tin Nhân Viên</DialogTitle>
      <DialogContent>
        <TextField
          label="Tên Nhân Viên"
          variant="outlined"
          fullWidth
          margin="normal"
          name="fullName"
          value={formData?.fullName}
          onChange={handleChange}
        />
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          name="username"
          value={formData?.username}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          type="password"
          value={formData?.password}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Vai trò</InputLabel>
          <Select
            label="Vai trò"
            name="role"
            value={formData?.role}
            onChange={handleChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="staff">Nhân viên</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Khoa</InputLabel>
          <Select
            label="Khoa"
            name="department"
            value={formData?.department}
            onChange={handleChange}
          >
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Finance">Tài chính</MenuItem>
          </Select>
        </FormControl>
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
  );
};

export default EditUser;
