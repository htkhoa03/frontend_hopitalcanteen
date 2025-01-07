import React from "react";
import { Button } from "@mui/material";
import { Print } from "@mui/icons-material";
import { confirmOrders } from "../axios/orderService";
import jsPDF from "jspdf";

const PrintBill = ({ selectedOrder }) => {
  const handlePrint = async () => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
      });

      // Encode Vietnamese text
      const encodeVNText = (str) => {
        return str
          .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
          .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
          .replace(/ì|í|ị|ỉ|ĩ/g, "i")
          .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
          .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
          .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
          .replace(/đ/g, "d")
          .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
          .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
          .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
          .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
          .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
          .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
          .replace(/Đ/g, "D");
      };

      // Adjusted positions for A5 format
      // A5 dimensions: 148 x 210 mm

      // Set font size and style for title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(`Hoa don cho don hang`, 10, 15);
      doc.text(`#${selectedOrder.id}`, 10, 22);

      // Set font for content
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text("Chi tiet san pham:", 10, 35);

      // Headers for the "table" layout
      doc.setFontSize(10);
      doc.text("San pham", 10, 45);
      doc.text("So luong", 85, 45);
      doc.text("Gia", 120, 45);

      // Draw a light line under headers
      doc.setDrawColor(200, 200, 200);
      doc.line(10, 47, 138, 47);

      // Content rows
      let y = 55;
      selectedOrder?.orderItems?.forEach((item) => {
        // Split long product names
        const productName = encodeVNText(item.productName);
        const lines = doc.splitTextToSize(productName, 70);

        doc.text(lines, 10, y);
        doc.text(item.quantity.toString(), 85, y);
        doc.text(`${item.price?.toLocaleString()} D`, 120, y);

        // Adjust y position based on number of lines in product name
        y += Math.max(lines.length * 6, 8);
      });

      // Draw a light line above total
      doc.setDrawColor(200, 200, 200);
      doc.line(10, y + 2, 138, y + 2);

      // Total amount
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`Tong gia: ${selectedOrder.totalAmount?.toLocaleString()} D`, 10, y + 10);

      // Add footer
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text("Cam on quy khach!", 64, 200);

      // Save the PDF
      const fileName = `HoaDon_DonHang_${selectedOrder.id}.pdf`;
      doc.save(fileName);

      // Confirm order
      await confirmOrders(selectedOrder.id);
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi xử lý hóa đơn:", error);
      alert("Không thể xử lý hóa đơn.");
    }
  };

  // Rest of the component remains the same
  return (
    <>
      <div style={{ width: "300px" }}>
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

