export const dataUser = [
  {
    username: "kt",
    password: "kt",
    customerCode: "",
    name: "Nhan vien ban hang",
    phone: "0123456781",
    room: "B301",
    balance: "2,000,000",
    role: "Admin",
  },
  {
    username: "NVBH",
    password: "NVBH",
    customerCode: "12345",
    name: "Nguyen Thi B",
    phone: "0123456781",
    room: "B301",
    balance: "2,000,000",
    role: "Patient",
  },
  {
    username: "tien",
    password: "khoa",
    customerCode: "67890",
    name: "Nguyen Thi B",
    phone: "0123456781",
    room: "B312321301",
    balance: "2,000,000",
    role: "Patient",
  },
];
//data staff
export const employees = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    role: "Quản lý",
    department: "Kinh doanh",
    username: "admin",
    password: "admin",
  },
  {
    id: 2,
    name: "Trần Thị B",
    role: "Nhân viên",
    department: "Marketing",
    username: "marketing",
    password: "marketing",
  },
  {
    id: 3,
    name: "Lê Minh C",
    role: "Quản lý",
    department: "Kỹ thuật",
    username: "admintech",
    password: "admintech",
  },
  {
    id: 4,
    name: "Phan Thị D",
    role: "Nhân viên",
    department: "Kế toán",
    username: "kt",
    password: "kt",
  },
];

//data dashboard
export const salesData = {
  today: {
    productsSold: 100,
    ordersPlaced: 50,
    totalRevenue: 1500000, // Tổng tiền hôm nay
  },
  month: {
    productsSold: 2500,
    ordersPlaced: 1200,
    totalRevenue: 45000000, // Tổng tiền tháng này
  },
  year: {
    productsSold: 30000,
    ordersPlaced: 15000,
    totalRevenue: 550000000, // Tổng tiền năm nay
  },
};

//data product and categories
export const categories = ["Đồ ăn", "Nước uống", "Tráng miệng"];
export const allProducts = {
  "Đồ ăn": [
    {
      id: 1,
      name: "Bún bò",
      price: 40000,
      stock: 30,
      image:
        "https://vietnamtimes.org.vn/stores/news_dataimages/huonglyvnt/012022/17/15/in_article/3756_bun-bo-hue-cookingwithmamamui.jpg?rt=20220117153757",
    },
    {
      id: 2,
      name: "Phở",
      price: 35000,
      stock: 30,
      image:
        "https://th.bing.com/th/id/OIP.M0GvXd20b9ccXOqgqtbjIQHaFb?rs=1&pid=ImgDetMain",
    },
    {
      id: 3,
      name: "Bánh Mì",
      price: 35000,
      stock: 30,
      image:
        "https://th.bing.com/th/id/OIP.IxSQxenayDYM2oZcHwj7PgHaEo?rs=1&pid=ImgDetMain",
    },
    {
      id: 4,
      name: "Xôi",
      price: 35000,
      stock: 30,
      image:
        "https://th.bing.com/th/id/R.2a19c1c524a3492b20535f931e47c73e?rik=ypoG7wHQcwqEiQ&pid=ImgRaw&r=0",
    },
  ],
  "Nước uống": [
    {
      id: 5,
      name: "Trà sữa",
      price: 25000,
      stock: 30,
      image:
        "https://th.bing.com/th/id/R.628e01734b9f30067602cd6c528a0716?rik=MO%2bUwmGzyXgsmQ&pid=ImgRaw&r=0",
    },
    {
      id: 6,
      name: "Cà phê",
      price: 20000,
      stock: 30,
      image:
        "https://th.bing.com/th/id/OIP.k0h3OBYznu6i8U5H8W8q8gHaE8?rs=1&pid=ImgDetMain",
    },
  ],
  "Tráng miệng": [
    {
      id: 7,
      name: "Chè",
      price: 15000,
      stock: 30,
      image:
        "https://th.bing.com/th/id/OIP.PJETXHtjs6GLPGlUrAdmygAAAA?w=450&h=469&rs=1&pid=ImgDetMain",
    },
    {
      id: 8,
      name: "Bánh flan",
      price: 10000,
      stock: 30,
      image:
        "https://th.bing.com/th/id/OIP.qZgvzvvp4_OPb4c4TX5oJQHaHU?rs=1&pid=ImgDetMain",
    },
  ],
};
