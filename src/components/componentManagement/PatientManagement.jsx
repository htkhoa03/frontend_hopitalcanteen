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
} from "@mui/material";
import { styled } from "@mui/system";
import { Edit, Delete, Visibility, PersonAdd } from "@mui/icons-material";
import { getAllPatients, getAllPatientService} from "../../axios/patientService";



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
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    contact: "",
    additionalNotes: "",
  });
  
  // Fetch API patient
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await getAllPatientService();
        setPatients(res);
        console.log("bệnh nhân",res)
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);
  const handleAddPatient = () => {
    // if (!newPatient.name || !newPatient.age || !newPatient.contact) return;

    // const patient = {
    //   id: `P${String(patients.length + 1).padStart(3, "0")}`,
    //   ...newPatient,
    //   medicalHistory: "",
    };

  //   setPatients([...patients, patient]);
  //   setNewPatient({ name: "", age: "", contact: "", additionalNotes: "" });
  //   setIsAddModalOpen(false);
  // };

  // const handleDeletePatient = (id) => {
  //   setPatients(patients.filter((patient) => patient.id !== id));
  // };

  // const handleViewPatient = (patient) => {
  //   setSelectedPatient(patient);
  //   setIsViewModalOpen(true);
  // };

  // const filteredPatients = patients.filter(
  //   (patient) =>
  //     patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     patient.contact.includes(searchQuery)
  // );
  const handleViewPatient = (patient) => {
    setSelectedPatient(patient); // Cập nhật thông tin bệnh nhân được chọn
    setIsViewModalOpen(true); // Mở modal hiển thị chi tiết
  };
  
  if (!patients) {
    return <Typography>Loading...</Typography>;
  }
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
              <TableCell sx={{ color: "white" }}>Số điện thoại</TableCell>
              <TableCell sx={{ color: "white" }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.patientId}>
                <TableCell>{patient.cardNumber}</TableCell>
                <TableCell>{patient.fullName}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.phoneNumber}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleViewPatient(patient)}
                    color="primary"
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton
                    // onClick={() => handleDeletePatient(patient.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <StyledModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      >
        <ModalContent>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Add New Patient
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Name"
                value={newPatient.name}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, name: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={newPatient.age}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, age: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                value={newPatient.contact}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, contact: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Notes"
                multiline
                rows={4}
                value={newPatient.additionalNotes}
                onChange={(e) =>
                  setNewPatient({
                    ...newPatient,
                    additionalNotes: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button variant="outlined" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleAddPatient}>
              Submit
            </Button>
          </Box>
        </ModalContent>
      </StyledModal>

      <StyledModal
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      >
        <ModalContent>
          {selectedPatient && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Patient Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Mã bệnh nhân</Typography>
                    <Typography>{selectedPatient.cardNumber}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">tên bệnh nhân</Typography>
                    <Typography>{selectedPatient.fullName}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Ngày sinh</Typography>
                    <Typography>{selectedPatient.age}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Số điện thoại</Typography>
                    <Typography>{selectedPatient.phoneNumber}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Tài khoản</Typography>
                    <Typography>100000</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Địa chỉ</Typography>
                    <Typography>{selectedPatient.address}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">
                      Additional Notes
                    </Typography>
                    <Typography>{selectedPatient.additionalNotes}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </ModalContent>
      </StyledModal>
    </Container>
  );
};

export default PatientManagement;
