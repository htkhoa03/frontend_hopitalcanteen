import React, { useState, useEffect } from "react";
import CategoryList from "../components/CategoryList";
import Cart from "../components/Cart";
import Search from "../components/Search";
import Products from "../components/Products";
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
import { categories } from "../utils/data";
import { getAllProductsService } from "../axios/productService";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [products, setProducts] = useState([]);

  // Toggle visibility of Cart
  const toggleCartVisibility = () => setIsCartVisible((prev) => !prev);

  // Add product to cart
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

  // Filter products based on category and search term
  const filteredProducts =
    selectedCategory === "Tất cả"
      ? products.filter((product) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : products.filter(
          (product) =>
            product.category === selectedCategory &&
            product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );

  // Sort products by price
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    return sortOrder === "asc"
      ? a.sellPrice - b.sellPrice
      : b.sellPrice - a.sellPrice;
  });

  // Calculate total items in the cart
  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProductsService();
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container style={{ marginTop: 50, padding: 0, maxWidth: 2000 }}>
      <Box className="menu-container">
        {/* Category and Filter */}
        <Box className="category-list">
          <CategoryList
            categories={["Tất cả", ...categories]}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </Box>

        {/* Product List */}
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

          <Grid container spacing={3}>
            {sortedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.productId}>
                <Products product={product} onAddToCart={handleAddToCart} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Cart */}
        {isCartVisible && (
          <Box className="cart">
            <Cart
              cartItems={cartItems}
              onCheckout={() => setCartItems([])}
              onDecreaseQuantity={(id) =>
                setCartItems((prevItems) =>
                  prevItems.map((item) =>
                    item.id === id && item.quantity > 1
                      ? { ...item, quantity: item.quantity - 1 }
                      : item
                  )
                )
              }
              onIncreaseQuantity={(id) =>
                setCartItems((prevItems) =>
                  prevItems.map((item) =>
                    item.id === id
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
                  )
                )
              }
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

      {/* Floating Cart Button */}
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
