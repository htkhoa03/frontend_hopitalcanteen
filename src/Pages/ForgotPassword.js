import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setError("");
      // Xử lý khi email hợp lệ (ví dụ: gửi yêu cầu đặt lại mật khẩu)
      alert(`Link reset password đã được gửi tới: ${email}`);
    } else {
      setError("Vui lòng nhập địa chỉ email hợp lệ");
    }
  };

  const validateEmail = (email) => {
    // Kiểm tra định dạng email cơ bản
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Forgot Password
        </Typography>
        <Typography variant="body1" gutterBottom align="center">
          Entering your email
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              helperText={error}
            />
          </Box>
          <Grid container justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size={isMobile ? "small" : "large"}
              sx={{ width: isMobile ? "100%" : "auto" }}
            >
              Gửi liên kết đặt lại mật khẩu
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
