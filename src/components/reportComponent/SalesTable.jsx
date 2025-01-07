import React from "react";
import { Grid, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import * as XLSX from "xlsx";
import DatePickerProvider from "../DatePickerProvider";

const SalesTable = ({ startDate, setStartDate, endDate, setEndDate, goodsData }) => {
  const handleExportExcel = () => {
    if (!goodsData || goodsData.length === 0) {
      alert("Không có dữ liệu để xuất.");
      return;
    }

    const formattedData = goodsData.map((item, index) => ({
      STT: index + 1,
      "Hàng hóa": item.name,
      "Danh mục": item.category,
      "Đơn vị tính": item.unit,
      "Giá bán": item.price,
      "Số lượng": item.quantity,
      "Thành tiền": item.total,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Thống kê");
    const fileName = `ThongKe_${startDate?.format("YYYY-MM-DD") || "tungay"}_to_${endDate?.format("YYYY-MM-DD") || "denngay"}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

  return (
    <DatePickerProvider>
      <Grid container spacing={2} sx={{ marginBottom: 2  }}>
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
            onClick={handleExportExcel}
            sx={{ height: "100%", width: "100%" }}
          >
            Xuất Excel
          </Button>
        </Grid>
      </Grid>
    </DatePickerProvider>
  );
};

export default SalesTable;
