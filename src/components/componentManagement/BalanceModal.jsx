import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { topUpBalanceAPI, withDrawBalanceAPI } from "../../axios/balanceService"; // Ensure these functions exist in your service

const BalanceModal = ({ open, onClose, patient, onSuccess }) => {
  const [balanceAmount, setBalanceAmount] = useState("");
  const [isDeposit, setIsDeposit] = useState(true); 
  const [errorMessage, setErrorMessage] = useState("");

  const handleBalanceAction = async () => {
    if ((balanceAmount) <= 0) {
      setErrorMessage("Please enter a valid amount.");
      return;
    }

    try {
      if (isDeposit) {
        await topUpBalanceAPI(patient.patientId, Number(balanceAmount));
        onSuccess("Nạp tiền thành công!");
      } else {
        await withDrawBalanceAPI(patient.patientId, Number(balanceAmount));
        onSuccess("Nạp tiền không thành công!");
      }
      onClose();
    } catch (error) {
      setErrorMessage("Error updating balance. Please try again.");
      console.error("Error handling balance action", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          maxWidth: "90%",
          bgcolor: "white",
          p: 3,
          borderRadius: "8px",
          margin: "auto",
          marginTop: "10%",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {isDeposit ? "Nạp tiền" : "Rút tiền"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Số dư hiện tại: {patient?.patientBalance?.balance || "N/A"} Đ
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={isDeposit ? "Số tiền nạp vào" : "Số tiền rút ra"}
              value={balanceAmount}
              onChange={(e) => setBalanceAmount(e.target.value)}
              type="number"
              error={!!errorMessage}
              helperText={errorMessage}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                color={isDeposit ? "success" : "error"}
                onClick={handleBalanceAction}
              >
                {isDeposit ? "Nạp tiền" : "Rút tiền"}
              </Button>
              <Button variant="outlined" onClick={onClose}>
                Hủy
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="text"
              onClick={() => setIsDeposit(!isDeposit)}
              sx={{ width: "100%" }}
            >
            {isDeposit ? "Rút tiền" : "Nạp tiền"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default BalanceModal;
