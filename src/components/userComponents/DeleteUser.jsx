import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const DeleteUser = ({ open, handleClose, userId, handleDeleteUser, handleShowSnackbar}) => {

  const handleDelete = async () => {
    try {
      await handleDeleteUser(userId); 
      handleShowSnackbar("Người dùng đã được xóa thành công!", "success"); 
      handleClose(); 
    } catch (error) {
        handleShowSnackbar("Không thể xóa người dùng!", "error"); 
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Xóa Người Dùng</DialogTitle>
      <DialogContent>
        <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleDelete} color="primary">
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUser;
