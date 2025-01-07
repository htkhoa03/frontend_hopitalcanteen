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
import { getOverviewStatistics } from "../../axios/statisticsService";
import SalesTable from "./SalesTable";

const OverviewStatistics = () => {
  const [goodsData, setGoodsData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchDataStatistics = async () => {
    try {
      const response = await getOverviewStatistics(
        startDate?.format("YYYY-MM-DD"),
        endDate?.format("YYYY-MM-DD"),
        "Thức uống"
      );

      setGoodsData(
        response.map((item) => ({
          id: item.id || null,
          name: item.productName || "Không rõ",
          category: item.categoryName || "Không rõ",
          unit: item.unit || "Không rõ",
          price: item.unitPrice || 0,
          quantity: item.quantity || 0,
          total: item.totalPrice || 0,
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
              <TableCell>Hàng hóa</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell align="center">Đơn vị tính</TableCell>
              <TableCell align="right">Giá bán</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Thành tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goodsData.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell align="center">{item.unit}</TableCell>
                <TableCell align="right">
                  {item?.price?.toLocaleString()} đ
                </TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">
                  {item?.total?.toLocaleString()} đ
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OverviewStatistics;
