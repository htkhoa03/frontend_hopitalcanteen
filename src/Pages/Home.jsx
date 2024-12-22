import React, { useState, useEffect } from "react";
import CategoryList from "../components/CategoryList";
import Cart from "../components/Cart";
import Search from "../components/Search";
import Products from "../components/Products";
import SnackbarNotification from "../components/SnackbarNotification";
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
import { getAllProductsService } from "../axios/productService";
import { getAllCategoriesService } from "../axios/categoryService";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategoriesService();
        setCategories([{ categoryId: 0, name: "Tất cả" }, ...response]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProductsService();
        setProducts(res.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const toggleCartVisibility = () => setIsCartVisible((prev) => !prev);

  const handleAddToCart = (product) =>
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

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const filteredProducts =
    selectedCategory === "Tất cả"
      ? products.filter((product) =>
          product.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : products.filter(
          (product) =>
            product.category?.name === selectedCategory &&
            product.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Container style={{ marginTop: 50, padding: 0, maxWidth: 2000 }}>
      <Box className="menu-container">
        <Box className="category-list">
          {categories && (
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          )}
        </Box>

        <Box className="product-list">
          <Box sx={{ display: "flex", marginBottom: "20px" }}>
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

          <Grid container spacing={3}>
            {sortedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Products
                  product={product}
                  onAddToCart={handleAddToCart}
                  showSnackbar={showSnackbar} // Truyền hàm xuống
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {isCartVisible && (
          <Box className="cart">
            <Cart cartItems={cartItems} onCheckout={() => setCartItems([])} />
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

      {/* Snackbar */}
      {/* <SnackbarNotification
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      /> */}
    </Container>
  );
};

export default Home;
