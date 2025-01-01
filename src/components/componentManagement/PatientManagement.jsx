import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Modal,
  Grid,
  Card,
  CardContent,
  IconButton,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { display, styled } from "@mui/system";
import { Edit, Delete, PersonAdd, MonetizationOn } from "@mui/icons-material";
import addPatient, {
  getAllPatients,
  getAllPatientService,
  updatePatient,
  deletePatient,

} from "../../axios/patientService";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "8px",
  padding: "24px",
  width: "100%",
  maxWidth: "600px",
  maxHeight: "90vh",
  overflow: "auto",
}));

const PatientManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [patients, setPatients] = useState(null);
  const [newPatient, setNewPatient] = useState({
    cardNumber: "",
    fullName: "",
    email: "",
    departments: "",
    patientBalance: { balance: 0 },
  });

  const [updatePatient, setUpdatePatient] = useState([]);
  const [deletePatientId, setDeletePatientId] = useState(null);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);


  const fetchPatients = async () => {
    try {
      const res = await getAllPatientService(page, size);
      console.log(res);
      setPatients(res.content);
      setTotalPages(res.totalPages);
      console.log("bệnh nhân", res);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };
 


  useEffect(() => {
    fetchPatients();
  }, [page, size]);

  const handleAddPatient = async () => {
    try {
      const response = await addPatient(newPatient);
      fetchPatients();
      console.log("Patient added successfully:", response);
    } catch (error) {
      console.error("Failed to add patient:", error);
    }
  };

  const handleUpdatePatient = async (patientId) => {
    try {
      const response = await updatePatient(patientId,updatePatient);
      setIsUpdateModalOpen(true);
      fetchPatients();
      console.log("Patient updated successfully:", response);
    } catch (error) {
      console.error("Failed to update patient:", error);
    }
  };
  const handleDeletePatient = async (patientId) => {
      try {
        await deletePatient(patientId);
        setIsDeleteModalOpen(true);
        fetchPatients();
      } catch (error) {
        console.log("Failed to delete patient",error)
      }
    };

  const handleWithdrawMoney = () => {};

  if (!patients) {
    return <Typography>Loading...</Typography>;
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ color: "primary.main" }}>
          Quản lí bệnh nhân
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Thêm bệnh nhân
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search patients by name or contact..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 4 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "white" }}>Mã bệnh nhân</TableCell>
              <TableCell sx={{ color: "white" }}>Tên bệnh nhân</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Department</TableCell>
              <TableCell sx={{ color: "white" }}>Số dư tài khoản</TableCell>
              <TableCell sx={{ color: "white" }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.patientId}>
                <TableCell>{patient.cardNumber}</TableCell>
                <TableCell>{patient.fullName}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.departments.departmentName}</TableCell>
                <TableCell>{patient?.patientBalance?.balance}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="success"
                    onClick={() => handleWithdrawMoney(patient.id)}
                  >
                    <MonetizationOn />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setUpdatePatient(patient);
                      setIsUpdateModalOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                  color="error"
                  onClick={() => {
                    setDeletePatientId(patient.patientId);
                    setIsDeleteModalOpen(true);
                  }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* change page */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        <Pagination
          count={totalPages}
          page={page+1}
          onChange={(event, value) => handlePageChange(event, value)}
          color="primary"
        />
      </Box>

      <StyledModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      >
        <ModalContent>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Thêm Bệnh Nhân
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Code"
                value={newPatient.cardNumber} // Hiển thị giá trị của cardNumber
                onChange={(e) =>
                  setNewPatient({
                    ...newPatient,
                    cardNumber: e.target.value, // Cập nhật giá trị cardNumber (vẫn là chuỗi)
                  })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Name"
                value={newPatient.fullName}
                onChange={(e) =>
                  setNewPatient({
                    ...newPatient,
                    fullName: e.target.value, // Cập nhật giá trị cardNumber (vẫn là chuỗi)
                  })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newPatient.email}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, email: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              fullWidth
              label="Department"
              value={newPatient.departments?.departmentName}
              onChange={(e) =>
                  setNewPatient({
                    ...newPatient,
                    departments: {
                      ...newPatient.departmentName,
                      departmentName: e.target.value,
                    },
                  })
                }
              required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Balance"
                type="number"
                value={newPatient?.patientBalance?.balance || ""}
                onChange={(e) =>
                  setNewPatient({
                    ...newPatient,
                    patientBalance: {
                      ...newPatient.patientBalance,
                      balance: e.target.value,
                    },
                  })
                }
                required
              />
            </Grid>
          </Grid>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button variant="outlined" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => handleAddPatient(newPatient)}
            >
              Submit
            </Button>
          </Box>
        </ModalContent>
      </StyledModal>

      {/* update patient */}

      <StyledModal
        open={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      >
        <ModalContent>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Sửa thông tin bệnh nhân
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Code"
                value={updatePatient.cardNumber}
                onChange={(e) =>
                  setNewPatient({
                    ...updatePatient,
                    cardNumber: e.target.value, 
                  })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Name"
                value={updatePatient.fullName}
                onChange={(e) =>
                  setNewPatient({
                    ...updatePatient,
                    fullName: e.target.value, // Cập nhật giá trị cardNumber (vẫn là chuỗi)
                  })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={updatePatient.email}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, email: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              fullWidth
              label="Department"
              value={updatePatient.departments?.departmentName}
              onChange={(e) =>
                  setNewPatient({
                    ...newPatient,
                    departments: {
                      ...newPatient.departmentName,
                      departmentName: e.target.value,
                    },
                  })
                }
              required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Balance"
                type="number"
                value={updatePatient?.patientBalance?.balance || ""}
                onChange={(e) =>
                  setNewPatient({
                    ...updatePatient,
                    patientBalance: {
                      ...updatePatient.patientBalance,
                      balance: e.target.value,
                    },
                  })
                }
                required
              />
            </Grid>
          </Grid>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button variant="outlined" onClick={() => setIsUpdateModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => handleUpdatePatient(updatePatient)}
            >
              Submit
            </Button>
          </Box>
        </ModalContent>
      </StyledModal>

      {/* Delete patient */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DialogTitle >Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa bệnh nhân này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteModalOpen(false)}>Hủy</Button>
          <Button onClick={()=>handleDeletePatient(deletePatient)} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PatientManagement;
