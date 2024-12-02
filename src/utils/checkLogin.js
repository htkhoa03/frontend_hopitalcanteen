import { dataUser, employees } from "./data";

const checkLogin = (username, password, customerCode) => {
  if (customerCode !== null) {
    const user = dataUser.find((user) => user.customerCode === customerCode);
    return user;
  } else if (username && password) {
    const user = employees.find(
      (user) => user.username === username && user.password === password
    );
    return user;
  } else return null;
};
export default checkLogin;
