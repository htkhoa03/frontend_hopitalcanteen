import React from "react";
import { Modal, Box, Typography, Grid, Button } from "@mui/material";

const ViewPatient = ({ open, patient, onClose }) => {
  if (!patient) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          width: "100%",
          maxWidth: "600px",
          margin: "auto",
          marginTop: "10%",
        }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>
          Thông tin chi tiết bệnh nhân
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Mã bệnh nhân:</strong> {patient.cardNumber}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Tên bệnh nhân:</strong> {patient.fullName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Email:</strong> {patient.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Địa chỉ:</strong> {patient.address}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Số phòng:</strong> {patient.room}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Số điện thoại:</strong> {patient.phoneNumber}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Khoa:</strong> {patient.departments.map((dept) => dept.departmentName).join(", ")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Số dư tài khoản:</strong> {patient.patientBalance.balance}</Typography>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button variant="contained" onClick={onClose}>Đóng</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ViewPatient;
