import React, { useRef } from "react";
import { Button } from "@mui/material";
import { Print } from "@mui/icons-material";
import { confirmOrders } from "../axios/orderService";

const PrintBill = ({ selectedOrder }) => {
  const printRef = useRef();

  const handlePrint = async () => {
    const originalTitle = document.title; 
    document.title = `HoaDon_DonHang_${selectedOrder.id}`; 

    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    document.title = originalTitle; 

    try {
      // Gọi API để xác nhận đơn hàng
      await confirmOrders(selectedOrder.id);
    } catch (error) {
      console.error("Lỗi khi xác nhận đơn hàng:", error);
      alert("Không thể xác nhận đơn hàng.");
    }

    window.location.reload();
  };

  return (
    <>
      <div ref={printRef} style={{ display: "none", width: "50px" }}>
        <h1>Hóa đơn cho đơn hàng #{selectedOrder.id}</h1>
        <h3>Chi tiết sản phẩm:</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Sản phẩm</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Số lượng</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Giá</th>
            </tr>
          </thead>
          <tbody>
            {selectedOrder?.orderItems?.map((item) => (
              <tr key={item.productName}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.productName}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.quantity}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.price?.toLocaleString()} Đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 style={{ textAlign: "right", marginTop: "16px" }}>
          Tổng giá: {selectedOrder.totalAmount?.toLocaleString()} Đ
        </h3>
      </div>

      <Button
        variant="contained"
        color="primary"
        startIcon={<Print />}
        onClick={handlePrint}
      >
        In hóa đơn
      </Button>
    </>
  );
};

export default PrintBill;
