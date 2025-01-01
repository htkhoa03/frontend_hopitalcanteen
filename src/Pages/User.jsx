import React from "react";

import Info from "../components/Info";

const UserPage = () => {
  const fields = [
    { label: "Họ và tên", key: "fullName" },
    { label: "Vai trò", key: "roles?.name" },
  ];

  return <Info apiEndpoint="/users/my-info" fields={fields} />;
};

export default UserPage;
