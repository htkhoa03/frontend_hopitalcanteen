import React, { useState } from "react";
import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import Search from "../components/Search";
import "../components/componentStyles/Home.css";
import {
  Box,
  Container,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Button,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { categories, allProducts } from "../utils/data";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCartVisibility = () => {
    setIsCartVisible((prev) => !prev);
  };

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

  const allFilteredProducts = Object.values(allProducts)
    .flat()
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filteredProducts =
    selectedCategory === "Tất cả"
      ? allFilteredProducts
      : allProducts[selectedCategory].filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    }
    return b.price - a.price;
  });

  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Container style={{ marginTop: 50, padding: 0, maxWidth: 2000 }}>
      <Box className="menu-container">
        <Box className="category-list">
          <CategoryList
            categories={["Tất cả", ...categories]}
            selectedCategory={selectedCategory}
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
        </Box>

        <Box className="product-list">
          <Box
            sx={{
              display: "flex",
              marginBottom: "20px",
            }}
          >
            <Box sx={{ flex: 1, marginRight: "20px" }}>
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </Box>
            <Box sx={{ marginTop: "20px" }}>
              <FormControl>
                <Select
                  labelId="sort-label"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <MenuItem value="asc">Giá từ thấp đến cao</MenuItem>
                  <MenuItem value="desc">Giá từ cao đến thấp</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Grid container spacing={2}>
            {sortedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductList
                  products={[product]}
                  onAddToCart={handleAddToCart}
                  onToggleCartVisibility={toggleCartVisibility}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {isCartVisible && (
          <Box className="cart">
            <Cart
              cartItems={cartItems}
              onCheckout={() => setCartItems([])}
              onDecreaseQuantity={(id) => {
                setCartItems((prevItems) =>
                  prevItems.map((item) =>
                    item.id === id && item.quantity > 1
                      ? { ...item, quantity: item.quantity - 1 }
                      : item
                  )
                );
              }}
              onIncreaseQuantity={(id) => {
                setCartItems((prevItems) =>
                  prevItems.map((item) =>
                    item.id === id
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
                  )
                );
              }}
              onRemoveFromCart={(id) =>
                setCartItems((prevItems) =>
                  prevItems.filter((item) => item.id !== id)
                )
              }
              onUpdateQuantity={(id, quantity) => {
                const newQuantity = Math.max(1, parseInt(quantity, 10) || 1);
                setCartItems((prevItems) =>
                  prevItems.map((item) =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                  )
                );
              }}
            />
          </Box>
        )}
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={toggleCartVisibility}
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          backgroundColor: "#345DA7",
        }}
      >
        <Badge
          badgeContent={cartQuantity}
          color="error"
          sx={{ fontSize: "14px" }}
        >
          <ShoppingCartIcon />
        </Badge>
      </Button>
    </Container>
  );
};

export default Home;
