const dataUser = [
  {
    username: "khoa",
    password: "khoa",
    customerCode: "12345",
  },
  {
    username: "tien",
    password: "khoa",
    customerCode: "67890",
  },
];

const checkLogin = (username, password, customerCode) => {
  if (customerCode) {
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
