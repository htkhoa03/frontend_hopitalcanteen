import React, { useState } from "react";
import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import "../components/componentStyles/Home.css";
import {
  Box,
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Grid,
} from "@mui/material";

import { useSelector } from "react-redux";
import ".././components/componentStyles/Home.css";

const Home = () => {
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
        image:
          "https://th.bing.com/th/id/OIP.v8ofvC7Wv_tSfdUj1edmugHaEK?rs=1&pid=ImgDetMain",
      },
      {
        id: 3,
        name: "Bánh Mì",
        price: 35000,
        image:
          "https://th.bing.com/th/id/OIP.ZXlR7TWg7XS2HlDhqRqWRAHaEJ?w=2000&h=1121&rs=1&pid=ImgDetMain",
      },
      {
        id: 4,
        name: "Xôi",
        price: 35000,
        image:
          "https://th.bing.com/th/id/R.2a19c1c524a3492b20535f931e47c73e?rik=ypoG7wHQcwqEiQ&pid=ImgRaw&r=0",
      },
    ],
    "Nước uống": [
      {
        id: 5,
        name: "Trà sữa",
        price: 25000,
        image: "https://example.com/tra-sua.jpg",
      },
      {
        id: 6,
        name: "Cà phê",
        price: 20000,
        image: "https://example.com/ca-phe.jpg",
      },
    ],
    "Tráng miệng": [
      {
        id: 7,
        name: "Chè",
        price: 15000,
        image: "https://www.mazevietnam.com/wp-content/uploads/2018/01/des.jpg",
      },
      {
        id: 8,
        name: "Bánh flan",
        price: 10000,
        image:
          "https://th.bing.com/th/id/R.698765417fd21717594b106b1f179275?rik=FM9Bi27Xok5XpQ&pid=ImgRaw&r=0",
      },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState("Đồ ăn");
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const login = useSelector((state) => state.user.login);

  console.log("Đăng nhập:", login);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleIncreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleCheckout = () => {
    setCartItems([]);
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
    <Container style={{ margin: 0, padding: 0, maxWidth: 2000 }}>
      <Box className="menu-container">
        <Box className="category-list">
          <CategoryList
            categories={categories}
            onSelectCategory={(category) => setSelectedCategory(category)}
            sx={{ maxWidth: "100px" }}
          />
        </Box>

        <Box className="product-list">
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "20px" }}
          />

          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <Select
              labelId="sort-label"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="asc">Giá từ thấp đến cao</MenuItem>
              <MenuItem value="desc">Giá từ cao đến thấp</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={2}>
            {sortedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductList
                  products={[product]}
                  onAddToCart={handleAddToCart}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box className="cart">
          <Cart
            cartItems={cartItems}
            onCheckout={handleCheckout}
            onRemoveFromCart={handleRemoveFromCart}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            onUpdateQuantity={handleUpdateQuantity}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
