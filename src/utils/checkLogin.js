import { dataUser } from "./data";

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
