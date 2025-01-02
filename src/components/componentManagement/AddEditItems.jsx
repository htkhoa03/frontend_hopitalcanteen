import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const AddEditItems = ({ open, onClose, onSubmit, category, setCategory }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {category ? "Thêm danh mục mới" : "Chỉnh sửa danh mục"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Tên danh mục"
          fullWidth
          margin="normal"
          value={category?.name || ""}
          onChange={(e) =>
            setCategory({ ...(category || {}), name: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button onClick={onSubmit} color="primary" variant="contained">
          {category ? "Lưu thay đổi" : "Thêm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditItems;
