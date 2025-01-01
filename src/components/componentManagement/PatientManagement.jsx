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
import {
  Edit,
  Delete,
  PersonAdd,
  MonetizationOn,
  Visibility,
} from "@mui/icons-material";
import addPatient, {
  getAllPatients,
  getAllPatientService,
  updatePatient,
  deletePatient,
  updatePatientAPI,
  deletePatientAPI,
} from "../../axios/patientService";
import { useDispatch, useSelector } from "react-redux";
import SnackbarNotification from "../SnackbarNotification";
import ViewPatient from "../ViewPatient";
import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

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
    phoneNumber: "",
    address: "",
    departments: [],
    patientBalance: [],
  });

  const [updatePatient, setUpdatePatient] = useState([]);
  const [deletePatient, setDeletePatient] = useState(null);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [isViewModalOpen, setIsViewModalOpen] = useState(false); 
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [tempDepartmentsInput, setTempDepartmentsInput] = useState("");

  const fetchPatients = async () => {
    try {
      const res = await getAllPatientService(page, size);
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
      const payload = {
        ...newPatient,
        departments: tempDepartmentsInput
        .split(",")
        .map((dept) => dept.trim()) 
        .filter((dept) => dept.length > 0),
      };
      await addPatient(payload);
      setSnackbarMessage("Patient added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      fetchPatients();
      setIsAddModalOpen(false);
    } catch (error) {
      setSnackbarMessage("Failed to add patient.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Failed to add patient:", error);
    }
  };

  const handleUpdatePatient = async (patientId) => {
    try {

      const payload = {
        ...updatePatient,
        departments: tempDepartmentsInput
        .split(",")
        .map((dept) => dept.trim()) 
        .filter((dept) => dept.length > 0), 
      };
      await updatePatientAPI(patientId, payload);
      setSnackbarMessage("Cập nhật thông tin bệnh nhân thành công!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      fetchPatients();
      setIsUpdateModalOpen(false);
    } catch (error) {
      setSnackbarMessage("Cập nhật thông tin bệnh nhân không thành công.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Failed to update patient:", error);
    }
  };
  const handleDeletePatient = async (patientId) => {
    try {
      await deletePatientAPI(patientId, deletePatient);
      fetchPatients();
      setIsDeleteModalOpen(false);
      setSnackbarMessage("Xóa bệnh nhân thành công!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Không thể xóa bệnh nhân.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.log("Failed to delete patient", error);
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
              <TableCell sx={{ color: "white" }}>Department</TableCell>
              <TableCell sx={{ color: "white" }}>Số dư tài khoản</TableCell>
              <TableCell sx={{ color: "white" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.patientId}>
                <TableCell>{patient.cardNumber}</TableCell>
                <TableCell>{patient.fullName}</TableCell>
                <TableCell>
                  {patient.departments
                    ? patient.departments
                        .map((dept) => dept.departmentName)
                        .join(", ")
                    : "N/A"}
                </TableCell>

                <TableCell>{patient?.patientBalance?.balance}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      setSelectedPatient(patient);
                      setIsViewModalOpen(true);
                    }}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    color="success"
                    onClick={() => handleWithdrawMoney(patient.patientId)}
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
                      setDeletePatient(patient.patientId);
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
          page={page + 1}
          onChange={(event, value) => handlePageChange(event, value)}
          color="primary"
        />
      </Box>

      <ViewPatient
        open={isViewModalOpen}
        patient={selectedPatient}
        onClose={() => setIsViewModalOpen(false)}
      />

      <SnackbarNotification
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />

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
                label="Mã bệnh nhân"
                value={newPatient.cardNumber}
                onChange={(e) =>
                  setNewPatient({
                    ...newPatient,
                    cardNumber: e.target.value,
                  })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên bệnh nhân"
                value={newPatient.fullName}
                onChange={(e) =>
                  setNewPatient({
                    ...newPatient,
                    fullName: e.target.value,
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
                label="Địa chỉ"
                value={newPatient.address}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, address: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số phòng"
                value={newPatient.room}
                onChange={(e) =>
                  setNewPatient({
                    ...newPatient,
                    room: e.target.value,
                  })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số điện thoại"
                type="number"
                value={newPatient.phoneNumber}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, phoneNumber: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Khoa"
                placeholder="Nhập khoa, cách nhau bằng dấu phẩy"
                value={tempDepartmentsInput}
                onChange={(e) => setTempDepartmentsInput(e.target.value)}
                onBlur={() => {
                  const departments = tempDepartmentsInput
                    .split(",")
                    .map((dept) => dept.trim())
                    .filter((dept) => dept.length > 0)
                    

                  setNewPatient({
                    ...newPatient,
                    departments,
                  });
                }}
                required
              />
            </Grid>
          </Grid>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button
              variant="outli2ned"
              onClick={() => setIsAddModalOpen(false)}
            >
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
                label="Tên bệnh nhân"
                value={updatePatient.fullName}
                onChange={(e) =>
                  setUpdatePatient({
                    ...updatePatient,
                    fullName: e.target.value,
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
                  setUpdatePatient({ ...updatePatient, email: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ"
                value={updatePatient.address}
                onChange={(e) =>
                  setUpdatePatient({
                    ...updatePatient,
                    address: e.target.value,
                  })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số phòng"
                value={updatePatient.room}
                onChange={(e) =>
                  setUpdatePatient({
                    ...updatePatient,
                    room: e.target.value,
                  })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số điện thoại"
                type="number"
                value={updatePatient.phoneNumber}
                onChange={(e) =>
                  setUpdatePatient({
                    ...updatePatient,
                    phoneNumber: e.target.value,
                  })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                label="Khoa"
                placeholder="Nhập khoa, cách nhau bằng dấu phẩy"
                value={tempDepartmentsInput}
                onChange={(e) => setTempDepartmentsInput(e.target.value)}
                onBlur={() => {
                  const departments = tempDepartmentsInput
                    .split(",")
                    .map((dept) => dept.trim())
                    .filter((dept) => dept.length > 0)

                  setUpdatePatient({
                    ...updatePatient,
                    departments,
                    
                  });
                }}
                required
              />
            </Grid>
          </Grid>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button
              variant="outlined"
              onClick={() => setIsUpdateModalOpen(false)}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              onClick={() => handleUpdatePatient(updatePatient.patientId)}
            >
              Xác nhận
            </Button>
          </Box>
        </ModalContent>
      </StyledModal>

      {/* Delete patient */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa bệnh nhân này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteModalOpen(false)}>Hủy</Button>
          <Button
            onClick={() => handleDeletePatient(deletePatient)}
            color="error"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PatientManagement;
