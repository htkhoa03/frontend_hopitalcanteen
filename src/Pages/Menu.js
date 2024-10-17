import React, { useState } from "react";
import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import {
  Box,
  Container,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import "../components/Menu.css";
import Header from "../components/Header";

const Menu = () => {
  const categories = ["Đồ ăn", "Nước uống", "Tráng miệng"];
  const allProducts = {
    "Đồ ăn": [
      {
        id: 1,
        name: "Bún bò",
        price: 40000,
        image:
          "https://vietnamtimes.org.vn/stores/news_dataimages/huonglyvnt/012022/17/15/in_article/3756_bun-bo-hue-cookingwithmamamui.jpg?rt=20220117153757",
      },
      {
        id: 2,
        name: "Phở",
        price: 35000,
        image: "https://example.com/pho.jpg",
      },
      {
        id: 2,
        name: "Bánh Mì",
        price: 35000,
        image: "https://example.com/pho.jpg",
      },
      {
        id: 2,
        name: "Xôi",
        price: 35000,
        image: "https://example.com/pho.jpg",
      },
    ],
    "Nước uống": [
      {
        id: 3,
        name: "Trà sữa",
        price: 25000,
        image: "https://example.com/tra-sua.jpg",
      },
      {
        id: 4,
        name: "Cà phê",
        price: 20000,
        image: "https://example.com/ca-phe.jpg",
      },
    ],
    "Tráng miệng": [
      {
        id: 5,
        name: "Chè",
        price: 15000,
        image: "https://example.com/che.jpg",
      },
      {
        id: 6,
        name: "Bánh flan",
        price: 10000,
        image: "https://example.com/banh-flan.jpg",
      },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState("Đồ ăn");
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleAddToCart = (product) => {
    const itemIndex = cart.findIndex((item) => item.id === product.id);
    if (itemIndex === -1) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      const newCart = [...cart];
      newCart[itemIndex].quantity += 1;
      setCart(newCart);
    }
  };

  const handleCheckout = () => {
    alert("Thanh toán thành công!");
    setCart([]);
  };

  const filteredProducts = allProducts[selectedCategory].filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    }
    return b.price - a.price;
  });

  return (
    <Container maxWidth="lg">
      <Header />
      <Box className="menu-container">
        <Box className="category-list">
          <CategoryList
            categories={categories}
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
        </Box>

        <Box className="product-list">
          <TextField
            label="Tìm kiếm sản phẩm"
            variant="outlined"
            fullWidth
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "20px" }}
          />

          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <InputLabel id="sort-label">Sắp xếp theo</InputLabel>
            <Select
              labelId="sort-label"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="asc">Giá thấp đến cao</MenuItem>
              <MenuItem value="desc">Giá cao đến thấp</MenuItem>
            </Select>
          </FormControl>

          <ProductList
            products={sortedProducts}
            onAddToCart={handleAddToCart}
          />
        </Box>

        <Box className="cart">
          <Cart cartItems={cart} onCheckout={handleCheckout} />
        </Box>
      </Box>
    </Container>
  );
};

export default Menu;
