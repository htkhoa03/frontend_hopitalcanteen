import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import DatePickerProvider from "../DatePickerProvider";

const sampleDataByEmployee = [
  {
    id: 1,
    patientCode: "BN001",
    cardCode: "TH001",
    fullName: "Nguyễn Văn A",
    product: "Thuốc A",
    categoryCode: "D001",
    unit: "Hộp",
    price: 100000,
    quantity: 2,
    department: "Khoa A",
    employee: "Nhân viên 1",
    date: "2025-01-01",
    total: 200000,
  },
  {
    id: 2,
    patientCode: "BN002",
    cardCode: "TH002",
    fullName: "Trần Thị B",
    product: "Thuốc B",
    categoryCode: "D002",
    unit: "Lọ",
    price: 50000,
    quantity: 5,
    department: "Khoa B",
    employee: "Nhân viên 2",
    date: "2025-01-02",
    total: 250000,
  },
];

const sampleDataByPatient = [
  {
    id: 1,
    cardCode: "TH001",
    patientName: "Nguyễn Văn A",
    productCode: "MH001",
    product: "Thuốc A",
    categoryCode: "D001",
    unit: "Hộp",
    price: 100000,
    department: "Khoa A",
    quantity: 2,
    total: 200000,
  },
  {
    id: 2,
    cardCode: "TH002",
    patientName: "Trần Thị B",
    productCode: "MH002",
    product: "Thuốc B",
    categoryCode: "D002",
    unit: "Lọ",
    price: 50000,
    department: "Khoa B",
    quantity: 5,
    total: 250000,
  },
];

const SalesTable = ({ tabType }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleExport = () => {
    const formattedStartDate = startDate ? startDate.format("YYYY-MM-DD") : null;
    const formattedEndDate = endDate ? endDate.format("YYYY-MM-DD") : null;
    console.log("Xuất thống kê từ:", formattedStartDate, "đến:", formattedEndDate);
    // Thêm logic xử lý xuất dữ liệu
  };

  const renderTableHeaders = () => {
    switch (tabType) {
      case "employee":
        return (
          <>
            <TableCell>STT</TableCell>
            <TableCell>Mã bệnh nhân</TableCell>
            <TableCell>Mã thẻ</TableCell>
            <TableCell>Họ và tên</TableCell>
            <TableCell>Hàng hóa</TableCell>
            <TableCell>Danh mục</TableCell>
            <TableCell>Đơn vị tính</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Khoa</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Ngày</TableCell>
            <TableCell>Nhân viên</TableCell>
          </>
        );
      case "patient":
        return (
          <>
            <TableCell>STT</TableCell>
            <TableCell>Mã thẻ</TableCell>
            <TableCell>Tên bệnh nhân</TableCell>
            <TableCell>Mã hàng hóa</TableCell>
            <TableCell>Hàng hóa</TableCell>
            <TableCell>Mã danh mục</TableCell>
            <TableCell>Đơn vị tính</TableCell>
            <TableCell>Giá bán</TableCell>
            <TableCell>Khoa</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Thành tiền</TableCell>
          </>
        );
      default:
        return null;
    }
  };

  const renderTableRows = () => {
    const data = tabType === "employee" ? sampleDataByEmployee : sampleDataByPatient;

    return data.map((row, index) => (
      <TableRow key={row.id}>
        <TableCell>{index + 1}</TableCell>
        {tabType === "employee" ? (
          <>
            <TableCell>{row.patientCode}</TableCell>
            <TableCell>{row.cardCode}</TableCell>
            <TableCell>{row.fullName}</TableCell>
            <TableCell>{row.product}</TableCell>
            <TableCell>{row.categoryCode}</TableCell>
            <TableCell>{row.unit}</TableCell>
            <TableCell>{row.price.toLocaleString()}</TableCell>
            <TableCell>{row.department}</TableCell>
            <TableCell>{row.quantity}</TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.employee}</TableCell>
          </>
        ) : (
          <>
            <TableCell>{row.cardCode}</TableCell>
            <TableCell>{row.patientName}</TableCell>
            <TableCell>{row.productCode}</TableCell>
            <TableCell>{row.product}</TableCell>
            <TableCell>{row.categoryCode}</TableCell>
            <TableCell>{row.unit}</TableCell>
            <TableCell>{row.price.toLocaleString()}</TableCell>
            <TableCell>{row.department}</TableCell>
            <TableCell>{row.quantity}</TableCell>
            <TableCell>{row.total.toLocaleString()}</TableCell>
          </>
        )}
      </TableRow>
    ));
  };

  return (
    <DatePickerProvider>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} md={5}>
          <DatePicker
            label="Từ ngày"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            format="DD/MM/YYYY"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <DatePicker
            label="Đến ngày"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            format="DD/MM/YYYY"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleExport}
            sx={{ height: "100%", width: "100%" }}
          >
            Xuất Excel
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>{renderTableHeaders()}</TableRow>
          </TableHead>
          <TableBody>{renderTableRows()}</TableBody>
        </Table>
      </TableContainer>
    </DatePickerProvider>
  );
};

export default SalesTable;
