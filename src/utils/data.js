const dataUser = [
  {
    username: "NVBH",
    password: "NVBH",
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

const checkLogin = (username, password, customerCode) => {
  if (customerCode !== null) {
    const user = dataUser.find((user) => user.customerCode === customerCode);
    return user;
  }
  if (username && password) {
    const user = dataUser.find(
      (user) => user.username === username && user.password === password
    );
    return user;
  }
  return null;
};

export default checkLogin;
