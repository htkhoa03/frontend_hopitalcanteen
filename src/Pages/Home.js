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
          "https://th.bing.com/th/id/OIP.M0GvXd20b9ccXOqgqtbjIQHaFb?rs=1&pid=ImgDetMain",
      },
      {
        id: 3,
        name: "Bánh Mì",
        price: 35000,
        image:
          "https://th.bing.com/th/id/OIP.IxSQxenayDYM2oZcHwj7PgHaEo?rs=1&pid=ImgDetMain",
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
        image:
          "https://th.bing.com/th/id/R.628e01734b9f30067602cd6c528a0716?rik=MO%2bUwmGzyXgsmQ&pid=ImgRaw&r=0",
      },
      {
        id: 6,
        name: "Cà phê",
        price: 20000,
        image:
          "https://th.bing.com/th/id/OIP.k0h3OBYznu6i8U5H8W8q8gHaE8?rs=1&pid=ImgDetMain",
      },
    ],
    "Tráng miệng": [
      {
        id: 7,
        name: "Chè",
        price: 15000,
        image:
          "https://th.bing.com/th/id/OIP.PJETXHtjs6GLPGlUrAdmygAAAA?w=450&h=469&rs=1&pid=ImgDetMain",
      },
      {
        id: 8,
        name: "Bánh flan",
        price: 10000,
        image:
          "https://th.bing.com/th/id/OIP.qZgvzvvp4_OPb4c4TX5oJQHaHU?rs=1&pid=ImgDetMain",
      },
    ],
  };

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

  // Apply search term to all products
  const allFilteredProducts = Object.values(allProducts)
    .flat() // Flatten all product arrays into a single array
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Now you can filter based on category, but with the global search applied
  const filteredProducts =
    selectedCategory === "Tất cả" // If you choose "Tất cả" (All categories)
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
            categories={["Tất cả", ...categories]} // Added "Tất cả" for global search
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
              onRemoveFromCart={(id) =>
                setCartItems((prevItems) =>
                  prevItems.filter((item) => item.id !== id)
                )
              }
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
