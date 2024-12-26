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
  Pagination,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getAllProductsService, getProductsByCategoryService } from "../axios/productService";
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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


   const fetchProductsByCategory = async () => {
    try {
      const category = selectedCategory === "Tất cả" ? null : selectedCategory;
      const res = category
        ? await getProductsByCategoryService(category, page - 1, 12, "price", sortOrder)
        : await getAllProductsService({ page: page - 1, size: 12, sortBy: "price", sortDirection: sortOrder });

      setProducts(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  useEffect(() => {
    fetchProductsByCategory();
  }, [selectedCategory, page, sortOrder]);


  const fetchCart = async (cartId) => {
    try {
      const res = await getCartAPI(cartId);

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
    const fetchPatientData = async () => {
      try {
        const res = await axios.get("/patients/my-info");
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

  const addToCart = async (product) => {
    try {
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

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handlePageChange = ( value) => {
    setPage(value);
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
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Products
                  product={product}
                  addToCart={addToCart}
                  // showSnackbar={(msg, severity) =>
                  //   setSnackbar({ open: true, message: msg, severity })
                  // }
                />
              </Grid>
            ))}
          </Grid>

          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => handlePageChange(value)}
            color="primary"
            sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
          />
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
          badgeContent={cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0}
          color="error"
          sx={{ fontSize: "14px" }}
        >
          <ShoppingCartIcon />
        </Badge>
      </Button>

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
