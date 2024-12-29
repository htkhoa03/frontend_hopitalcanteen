import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "./../axios/axios";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: "auto",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: "4px solid #fff",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  margin: "20px auto",
}));

const InfoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "12px",
}));

const Info = ({ apiEndpoint, fields }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiEndpoint);

        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Unable to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  if (loading) {
    return <Typography align="center">Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography align="center" color="error">
        {error}
      </Typography>
    );
  }
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    navigate("/", { replace: true });
  };

  return (
    <StyledCard sx={{ marginTop: "100px" }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <ProfileAvatar
              src={data.profilePicture || "https://via.placeholder.com/150"}
              alt={data.fullName || "Profile"}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              {data.fullName || "No Name"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Thông tin cá nhân
              </Typography>
              <Divider sx={{ mb: 3 }} />

              {fields.map(({ label, key }) => (
                <InfoContainer key={key}>
                  <Typography sx={{ fontWeight: "bold", width: "120px" }}>
                    {label}:
                  </Typography>
                  <Typography>{data[key] || "N/A"}</Typography>
                </InfoContainer>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center", 
          }}
        >
          <Button
            sx={{
              backgroundColor:"#1565c0",
              color:"#fff",
              justifyContent: "center",
              textAlign: "center",
            }}
            onClick={handleLogout}
            startIcon={<LogoutIcon />} 
          >
            Đăng xuất
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default Info;
