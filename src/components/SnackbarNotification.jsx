import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarNotification = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Vị trí cố định
      sx={{ marginTop: 16, marginRight: 16 }} // Tùy chỉnh khoảng cách
    >
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
