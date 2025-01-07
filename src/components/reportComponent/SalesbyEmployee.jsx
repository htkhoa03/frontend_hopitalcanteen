import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getStatisticsByUser } from "../../axios/statisticsService";
import SalesTable from "./SalesTable";

const SalesbyEmployee = () => {
  const [goodsData, setGoodsData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchDataStatistics = async () => {
    try {
      const response = await getStatisticsByUser(
        startDate?.format("YYYY-MM-DD"),
        endDate?.format("YYYY-MM-DD"),
        "admin"
      );

      setGoodsData(
        response.map((item) => ({
          id: item.patientId || null,
          card: item.cartNumber || null,
          userName: item.fullName || "Không rõ",
          productName: item.productName || "Không rõ",
          category: item.categoryName || "Không rõ",
          unit: item.unit || "Không rõ",
          price: item.price || 0,
          quantity: item.quantity || 0,
          date: item.date || "không rõ",
        }))
      );
    } catch (error) {
      console.error("Fail to get overview statistics", error);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchDataStatistics();
    }
  }, [startDate, endDate]);

  return (
    <>
      <SalesTable
        startDate={startDate}
        setStartDate={setStartDate} 
        endDate={endDate}
        setEndDate={setEndDate} 
        goodsData={goodsData}
      />

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">STT</TableCell>
              <TableCell>Mã bệnh nhân</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell align="center">Tên nhân viên</TableCell>
              <TableCell align="right">Tên sản phẩm</TableCell>
              <TableCell align="right">Danh mục</TableCell>
              <TableCell align="right">ĐVT</TableCell>
              <TableCell align="right">Số tiền</TableCell>
              <TableCell align="right">Số lượng </TableCell>
              <TableCell align="right">Số ngày</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goodsData.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{item.card}</TableCell>
                <TableCell>{item.userName}</TableCell>
                <TableCell align="center">{item.productName}</TableCell>
                <TableCell align="right">{item?.category}</TableCell>
                <TableCell align="right">{item.unit}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{item?.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SalesbyEmployee;
