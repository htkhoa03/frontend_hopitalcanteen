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
import { getCartAPI, addToCartAPI } from "../axios/cartService";
import axios from "../axios/axios";
import { setCartId, setCartItems } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items);
  const cartId = useSelector((state) => state.cart?.cartId);


  // Fetch API categories
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

  // Fetch API products
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

  const fetchCart = async (cartId) => {
    try {
      const res = await getCartAPI(cartId);
      // console.log('ressssssssss',res);
      
      if (res) {
        dispatch(setCartItems(res.items));
      } else {
        console.error("Cart data is missing or invalid.");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    // Fetch API patient and cart data
    const fetchPatientData = async () => {
      try {
        const res = await axios.get("/patients/myinfo");
        const patientData = res.data.data;

        if (patientData.cart && patientData.cart.id) {
          const cartId = patientData.cart.id;
          dispatch(setCartId(cartId));
          await fetchCart(cartId);
        } else {
          console.error("Cart ID is missing in patient data.");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatientData();
  }, []);

  // Add product to cart
  const addToCart = async (product) => {
    try {
      // const res = await axios.get("/patients/myinfo");
      // const patientData = res.data.data;

      await addToCartAPI(product.id, 1);
      await fetchCart(cartId);
      setSnackbar({
        open: true,
        message: "Thêm vào giỏ hàng thành công!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      setSnackbar({
        open: true,
        message: "Không thể thêm sản phẩm vào giỏ hàng.",
        severity: "error",
      });
    }
  };

  const toggleCartVisibility = () => setIsCartVisible((prev) => !prev);

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

  const cartQuantity = (cartItems || []).reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

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
                  addToCart={addToCart}
                  showSnackbar={(msg, severity) =>
                    setSnackbar({ open: true, message: msg, severity })
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {isCartVisible && (
          <Box className="cart">
            <Cart />
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
      <SnackbarNotification
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
};

export default Home;
