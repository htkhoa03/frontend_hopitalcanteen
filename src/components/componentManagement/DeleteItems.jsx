import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const DeleteItems = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận xóa</DialogTitle>
      <DialogContent>
        <Typography>Bạn có chắc chắn muốn xóa danh mục này?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="error" variant="contained">
          Xóa
        </Button>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteItems;
